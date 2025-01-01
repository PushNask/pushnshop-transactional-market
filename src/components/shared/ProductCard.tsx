import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  category: string;
}

export const ProductCard = ({ title, price, image, category }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg animate-fadeIn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
            {category}
          </span>
        </div>
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">${price.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};