import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Login } from "@/pages/auth/Login";
import { SignUp } from "@/pages/auth/SignUp";
import { ProtectedRoute, SellerRoute, AdminRoute } from "@/components/auth/ProtectedRoute";
import { RootLayout } from "@/components/shared/RootLayout";
import { RootRedirect } from "@/components/auth/RootRedirect";
import Index from "./pages/Index";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/"
              element={
                <RootLayout>
                  <Index />
                </RootLayout>
              }
            />
            <Route path="/dashboard" element={<RootRedirect />} />
            <Route
              path="/seller/*"
              element={
                <SellerRoute>
                  <RootLayout>
                    <SellerDashboard />
                  </RootLayout>
                </SellerRoute>
              }
            />
            <Route
              path="/admin/*"
              element={
                <AdminRoute>
                  <RootLayout>
                    <AdminDashboard />
                  </RootLayout>
                </AdminRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;