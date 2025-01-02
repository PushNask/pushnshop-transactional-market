import { UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateAdminForm } from '@/components/admin/CreateAdminForm';
import { AdminList } from '@/components/admin/AdminList';

const AdminManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Create Admin Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CreateAdminForm onSuccess={() => {}} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminManagement;