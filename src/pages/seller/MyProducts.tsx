import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ProductCard } from '@/components/shared/ProductCard';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MyProductsProps {
  searchQuery?: string;
}

const MyProducts = ({ searchQuery = '' }: MyProductsProps) => {
  const { user } = useAuth();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['seller-products', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            display_order
          )
        `)
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
        throw error;
      }

      return data || [];
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (products) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error loading products. Please try again later.</p>
      </div>
    );
  }

  if (!filteredProducts?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {searchQuery ? 'No products found matching your search.' : 'You haven\'t added any products yet.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          images={product.product_images}
        />
      ))}
    </div>
  );
};

export default MyProducts;