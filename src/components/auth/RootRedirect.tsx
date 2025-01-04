import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const RootRedirect: React.FC = () => {
  const { user, userRole, loading } = useAuth();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    console.log('RootRedirect - Current user:', user);
    console.log('RootRedirect - Current role:', userRole);
    
    // Set a timeout to prevent infinite loading
    const timer = setTimeout(() => {
      console.log('Timeout reached');
      setTimeoutReached(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [user, userRole]);

  // Show loading state only if we're still loading and within timeout
  if (loading && !timeoutReached) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If authenticated but no role or timeout reached, redirect to home
  if (!userRole || timeoutReached) {
    console.log('No user role or timeout reached, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Redirect based on user role
  console.log('Redirecting based on role:', userRole);
  switch (userRole) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'seller':
      return <Navigate to="/seller" replace />;
    default:
      return <Navigate to="/" replace />;
  }
};

export { RootRedirect };