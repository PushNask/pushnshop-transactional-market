import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MyProducts from "./MyProducts";
import AddNewProduct from "./AddNewProduct";
import PaymentHistory from "./PaymentHistory";
import Analytics from "./Analytics";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-sm h-[calc(100vh-4rem)] ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
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
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<MyProducts />} />
          <Route path="/add" element={<AddNewProduct />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default SellerDashboard;