import { useState, useEffect } from 'react';
import { AlertCircle, Loader2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

const AdminManagement = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Fetch existing admins on mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('seller_profiles')
        .select('id, email, created_at')
        .eq('role', 'admin')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear messages when form changes
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      // Create the new admin user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw signUpError;

      // Get current user for created_by field
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      // Create admin profile
      const { error: profileError } = await supabase
        .from('seller_profiles')
        .insert([
          {
            id: user.id,
            name: formData.email.split('@')[0],
            role: 'admin',
          }
        ]);

      if (profileError) throw profileError;

      setSuccess('Admin account created successfully');
      setFormData({ email: '', password: '', confirmPassword: '' });
      fetchAdmins(); // Refresh the admin list
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Admin Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create Admin Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Admin Account...
                  </>
                ) : (
                  'Create Admin Account'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Admin List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{admin.email}</p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {admins.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  No other admin accounts found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminManagement;
