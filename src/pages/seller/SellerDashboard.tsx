import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/shared/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Menu } from "lucide-react";
import { toast } from "sonner";
import MyProducts from "./MyProducts";
import AddNewProduct from "./AddNewProduct";
import PaymentHistory from "./PaymentHistory";
import Analytics from "./Analytics";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to access the seller dashboard");
      navigate("/login");
      return;
    }

    if (!loading && userRole && userRole !== 'seller') {
      toast.error("You don't have permission to access the seller dashboard");
      navigate("/");
      return;
    }
  }, [user, userRole, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        {/* Mobile Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-20 left-4 lg:hidden z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-sm pt-20 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          <nav className="mt-8 px-4">
            <Link to="/seller">
              <Button variant="ghost" className="w-full justify-start mb-2">
                My Products
              </Button>
            </Link>
            <Link to="/seller/add">
              <Button variant="ghost" className="w-full justify-start mb-2">
                Add New Product
              </Button>
            </Link>
            <Link to="/seller/payments">
              <Button variant="ghost" className="w-full justify-start mb-2">
                Payment History
              </Button>
            </Link>
            <Link to="/seller/analytics">
              <Button variant="ghost" className="w-full justify-start">
                Analytics
              </Button>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-20 px-4 md:px-8 lg:pl-72">
          <Routes>
            <Route path="/" element={<MyProducts />} />
            <Route path="/add" element={<AddNewProduct />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 lg:hidden z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;