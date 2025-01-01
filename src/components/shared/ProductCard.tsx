import { useState, useEffect } from 'react';
import { Heart, Share2, MessageCircle, Eye, Star, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  location: string;
  image: string;
  linkNumber?: number;
  expiresAt?: Date;
  seller?: {
    name: string;
    rating: number;
    isVerified: boolean;
    responseTime: string;
    shippingOptions: {
      pickup: boolean;
      shipping: boolean;
    }
  }
}

export const ProductCard = ({ 
  id, 
  title, 
  description, 
  price, 
  currency = 'XAF',
  location,
  image,
  linkNumber,
  expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000),
  seller = {
    name: "Seller Name",
    rating: 4.5,
    isVerified: true,
    responseTime: "~5 mins",
    shippingOptions: {
      pickup: true,
      shipping: false
    }
  }
}: ProductCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [timerColor, setTimerColor] = useState('text-green-500');
  const [isSharing, setIsSharing] = useState(false);
  const [shareAnalytics, setShareAnalytics] = useState({
    whatsapp: 0,
    facebook: 0,
    twitter: 0,
    clipboard: 0
  });

  // Timer effect
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const diff = expiresAt.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours < 0) {
        setTimeRemaining('Expired');
        setTimerColor('text-gray-500');
      } else {
        setTimeRemaining(`${hours}h ${minutes}m`);
        if (hours < 12) {
          setTimerColor('text-red-500');
        } else if (hours < 24) {
          setTimerColor('text-orange-500');
        } else {
          setTimerColor('text-green-500');
        }
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleShare = async (platform: string) => {
    setIsSharing(true);
    const productUrl = `${window.location.origin}/product/${id}`;
    const shareText = `Check out this product: ${title}`;
    
    try {
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`, '_blank');
          break;
        case 'clipboard':
          await navigator.clipboard.writeText(productUrl);
          alert('Link copied to clipboard!');
          break;
      }
      
      setShareAnalytics(prev => ({
        ...prev,
        [platform]: prev[platform] + 1
      }));
    } catch (error) {
      console.error('Share error:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      {/* Header section */}
      <div className="p-3 border-b">
        <div className="flex items-center justify-between">
          {linkNumber && (
            <Badge variant="secondary" className="text-xs">
              P{linkNumber}
            </Badge>
          )}
          <span className={`text-sm font-medium ${timerColor}`}>
            {timeRemaining}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="w-4 h-4 mr-1" />
                  156
                </div>
              </TooltipTrigger>
              <TooltipContent>Total Views</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Image section */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content section */}
      <div className="p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{description}</p>
        <p className="text-lg font-bold text-green-600 mb-2">
          {formatPrice(price)}
        </p>

        {/* Seller Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <span className="font-medium">{seller.name}</span>
            {seller.isVerified && (
              <Badge variant="secondary" className="ml-1">Verified</Badge>
            )}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{seller.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          📍 {location} • Response: {seller.responseTime}
        </p>

        {/* Delivery Options */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Delivery:</span>
          <div className="flex gap-3">
            {seller.shippingOptions.pickup && (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                <span>Pick-up</span>
              </div>
            )}
            {seller.shippingOptions.shipping ? (
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                <span>Shipping</span>
              </div>
            ) : (
              <div className="flex items-center text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span>No Shipping</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions section */}
      <div className="p-4 pt-0 flex gap-2">
        <Button 
          className="flex-1 bg-green-600 hover:bg-green-700"
          onClick={() => window.open(`https://wa.me/237612345678?text=Hi, I'm interested in: ${title}`, '_blank')}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="w-4 h-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
              Share via WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('facebook')}>
              Share on Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('twitter')}>
              Share on Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleShare('clipboard')}>
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};