import { useState } from 'react';
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data generator for permanent links
const generateMockProducts = () => {
  return Array.from({ length: 120 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Product ${i + 1}`,
    description: "Sample product description with details about features and condition.",
    price: Math.floor(Math.random() * 1000000) + 100000,
    location: "Douala, Cameroon",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    linkNumber: i + 1,
    seller: {
      name: `Seller ${i + 1}`,
      rating: 4 + Math.random(),
      isVerified: Math.random() > 0.5,
      responseTime: "~5 mins",
      shippingOptions: {
        pickup: Math.random() > 0.3,
        shipping: Math.random() > 0.5
      }
    }
  }));
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const products = generateMockProducts();
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

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
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

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
        </Container>
      </section>
    </div>
  );
};

export default Index;