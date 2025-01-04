import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const RootRedirect = () => {
  const { user, userRole, loading } = useAuth();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (loading && !user) {
      timeoutId = setTimeout(() => {
        if (!userRole) {
          toast.error('Could not determine user role. Please try logging in again.');
        }
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [loading, user, userRole]);

  if (loading) {
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

  if (!userRole) {
    toast.error('Could not determine user role. Please try logging in again.');
    return <Navigate to="/" replace />;
  }

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