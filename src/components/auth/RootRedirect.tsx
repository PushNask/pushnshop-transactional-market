import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const RootRedirect: React.FC = () => {
  const { user, userRole, loading } = useAuth();
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setTimeoutReached(true);
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timer);
  }, []);

  // Show loading state only if we're still within the timeout period
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

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If we have a user but no role or timeout reached, redirect to home
  if (!userRole || timeoutReached) {
    return <Navigate to="/home" replace />;
  }

  switch (userRole) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'seller':
      return <Navigate to="/seller" replace />;
    case 'user':
      return <Navigate to="/home" replace />;
    default:
      return <Navigate to="/home" replace />;
  }
};

export { RootRedirect };