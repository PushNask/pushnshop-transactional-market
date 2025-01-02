import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Admin {
  id: string;
  name: string;
  created_at: string;
  is_super_admin: boolean | null;
}

export const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('seller_profiles')
        .select('id, name, created_at, is_super_admin')
        .eq('role', 'admin')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdmins(data || []);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  return (
    <div className="space-y-4">
      {admins.map((admin) => (
        <div
          key={admin.id}
          className="p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{admin.name}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(admin.created_at).toLocaleDateString()}
              </p>
              {admin.is_super_admin && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                  Super Admin
                </span>
              )}
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
  );
};