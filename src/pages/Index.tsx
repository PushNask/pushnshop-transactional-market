import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Navbar } from "@/components/shared/Navbar";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for initial display
const featuredProducts = [
  {
    id: "1",
    title: "iPhone 13 Pro - 256GB - Perfect Condition",
    description: "Barely used iPhone 13 Pro with all accessories. No scratches, perfect battery health.",
    price: 450000,
    location: "Douala, Cameroon",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    linkNumber: 1
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra - Brand New",
    description: "Latest Samsung flagship with 1TB storage. Full warranty included.",
    price: 899000,
    location: "Yaoundé, Cameroon",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    linkNumber: 2
  },
  {
    id: "3",
    title: "MacBook Pro M3 Max - Sealed",
    description: "Latest Apple MacBook Pro with M3 Max chip. Space Black color.",
    price: 2500000,
    location: "Douala, Cameroon",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    linkNumber: 3
  },
  {
    id: "4",
    title: "Sony WH-1000XM5 Headphones",
    description: "Premium noise-cancelling headphones. Like new condition.",
    price: 180000,
    location: "Bamenda, Cameroon",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    linkNumber: 4
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
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

        {/* Featured Products */}
        <section className="py-16">
          <Container>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Featured Products</h2>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Index;