import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/shared/ProductCard";
import { Navbar } from "@/components/shared/Navbar";
import { Search } from "lucide-react";

// Mock data for initial display
const featuredProducts = [
  {
    id: 1,
    title: "Premium Smartphone",
    price: 699,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Designer Watch",
    price: 299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    category: "Accessories",
  },
  {
    id: 3,
    title: "Wireless Headphones",
    price: 199,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics",
  },
  {
    id: 4,
    title: "Premium Backpack",
    price: 89,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "Fashion",
  },
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
                Discover Amazing Products
              </h1>
              <p className="text-lg mb-8 opacity-90 animate-slideUp" style={{ animationDelay: "0.1s" }}>
                Your one-stop marketplace for quality products
              </p>
              <div className="relative max-w-xl mx-auto animate-slideUp" style={{ animationDelay: "0.2s" }}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/20 rounded-full transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Featured Products */}
        <section className="py-16">
          <Container>
            <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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