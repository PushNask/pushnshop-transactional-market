import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Activity, CreditCard, Menu, Package, PlusCircle, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/shared/Navbar';
import MyProducts from './MyProducts';
import AddNewProduct from './AddNewProduct';
import PaymentHistory from './PaymentHistory';
import Analytics from './Analytics';
import { toast } from 'sonner';

const SellerDashboard = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { signOut, user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // If auth is still loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user is found, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* Mobile Menu */}
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b p-4 z-40">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r transition-transform duration-200 ease-in-out z-30`}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Search className="h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your products</p>
        </div>

        <nav className="mt-2 flex flex-col">
          <Button
            variant="ghost"
            className="justify-start px-6 py-3"
            onClick={() => {
              navigate('/seller');
              setIsMobileSidebarOpen(false);
            }}
          >
            <Package className="h-5 w-5 mr-3" />
            My Products
          </Button>

          <Button
            variant="ghost"
            className="justify-start px-6 py-3"
            onClick={() => {
              navigate('/seller/add');
              setIsMobileSidebarOpen(false);
            }}
          >
            <PlusCircle className="h-5 w-5 mr-3" />
            Add New
          </Button>

          <Button
            variant="ghost"
            className="justify-start px-6 py-3"
            onClick={() => {
              navigate('/seller/payments');
              setIsMobileSidebarOpen(false);
            }}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            Payments
          </Button>

          <Button
            variant="ghost"
            className="justify-start px-6 py-3"
            onClick={() => {
              navigate('/seller/analytics');
              setIsMobileSidebarOpen(false);
            }}
          >
            <Activity className="h-5 w-5 mr-3" />
            Analytics
          </Button>

          <div className="mt-auto p-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`lg:ml-64 min-h-screen pt-16 ${isMobileSidebarOpen ? 'blur-sm' : ''}`}>
        <div className="p-6">
          <Routes>
            <Route index element={<MyProducts searchQuery={searchQuery} />} />
            <Route path="add" element={<AddNewProduct />} />
            <Route path="payments" element={<PaymentHistory />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SellerDashboard;