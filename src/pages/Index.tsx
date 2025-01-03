import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PRODUCTS_PER_PAGE = 12;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', currentPage, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          product_images (
            id,
            image_url,
            display_order
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data: products, error, count } = await query
        .range((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { products, count };
    },
  });

  const totalPages = data?.count ? Math.ceil(data.count / PRODUCTS_PER_PAGE) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 animate-slideUp">
              Welcome to PushNshop Marketplace
            </h1>
            <p className="text-lg mb-8 opacity-90 animate-slideUp" style={{ animationDelay: "0.1s" }}>
              The trusted marketplace for buyers and sellers in Cameroon
            </p>
            <div className="relative max-w-xl mx-auto animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/20 rounded-full transition-colors"
                variant="ghost"
                size="icon"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      <section className="py-16">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-destructive">Error loading products. Please try again later.</p>
            </div>
          ) : !data?.products?.length ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  images={product.product_images}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 7) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                    return false;
                  })
                  .map((page, i, array) => {
                    if (i > 0 && array[i - 1] !== page - 1) {
                      return (
                        <PaginationItem key={`ellipsis-${page}`}>
                          <PaginationLink>...</PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Index;