import { Container } from "@/components/ui/Container";
import { Search, ShoppingBag, User } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-x-8">
            <a href="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/d2eb9101-0bb7-4e43-9a47-ac3fa2c683f1.png" alt="PushNshop" className="h-8 w-8" />
              <span className="text-xl font-semibold">PushNshop</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
                Categories
              </a>
              <a href="/featured" className="text-sm font-medium hover:text-primary transition-colors">
                Featured
              </a>
              <a href="/sell" className="text-sm font-medium hover:text-primary transition-colors">
                Sell
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};