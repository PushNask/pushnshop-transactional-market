import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface ProductImage {
  id: string;
  image_url: string;
  display_order: number;
}

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  location: string;
  category: string;
  description?: string;
  expires_at: string;
  status: string;
}

interface ProductCardProps {
  product: Product;
  images: ProductImage[];
}

export const ProductCard = ({ product, images = [] }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sortedImages = [...images].sort((a, b) => a.display_order - b.display_order);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? sortedImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === sortedImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.title,
        text: `Check out ${product.title} on PushNshop!`,
        url: window.location.href,
      });
    } catch (err) {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency || 'XAF',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        {sortedImages.length > 0 ? (
          <>
            <img
              src={sortedImages[currentImageIndex]?.image_url || '/placeholder.svg'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {sortedImages.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h3 className="font-semibold truncate">{product.title}</h3>
            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-muted-foreground">{product.location}</p>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex justify-between items-center text-sm">
          <span className={`px-2 py-1 rounded-full ${
            product.status === 'active' ? 'bg-green-100 text-green-800' :
            product.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </span>
          <span className="text-muted-foreground">
            Expires: {new Date(product.expires_at).toLocaleDateString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};