import { useState, useEffect } from 'react';
import { AlertCircle, BarChart3, CircleDollarSign } from 'lucide-react';

const Analytics = () => {
  const [activeVisitors, setActiveVisitors] = useState({
    total: 342,
    byPage: {
      'featured': 156,
      'standard': 186
    },
    trend: '+12%'
  });

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVisitors(prev => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 5) - 2,
        byPage: {
          featured: prev.byPage.featured + Math.floor(Math.random() * 3) - 1,
          standard: prev.byPage.standard + Math.floor(Math.random() * 3) - 1
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Analytics</h2>
      
      {/* Active Visitors Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Active Visitors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Active</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-blue-600">{activeVisitors.total}</p>
              <span className="text-sm text-green-600 mb-1">{activeVisitors.trend}</span>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Featured Section</p>
            <p className="text-3xl font-bold text-purple-600">{activeVisitors.byPage.featured}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Standard Section</p>
            <p className="text-3xl font-bold text-green-600">{activeVisitors.byPage.standard}</p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Products</p>
              <p className="text-2xl font-semibold mt-1">87</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <BarChart3 className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Revenue</p>
              <p className="text-2xl font-semibold mt-1">$1,500</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <CircleDollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-semibold mt-1">12</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">New product submission</p>
                <p className="text-sm text-gray-500">iPhone 13 Pro - Featured Listing</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
