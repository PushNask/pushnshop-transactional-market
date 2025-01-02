import { useState } from 'react';

const MyProducts = () => {
  const [activeTab, setActiveTab] = useState('active');
  
  const activeListings = [
    {
      id: 'p101',
      title: 'iPhone 13 Pro',
      price: 999,
      duration: '48h',
      views: 256,
      chats: 32
    },
    {
      id: 'p102',
      title: 'Samsung Galaxy S24',
      price: 899,
      duration: '24h',
      views: 100,
      chats: 12
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Products</h2>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'active' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab('expired')}
            className={`px-4 py-2 rounded-lg ${activeTab === 'expired' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
          >
            Expired
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Product</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Price</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Views</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeListings.map(product => (
                <tr key={product.id} className="border-t">
                  <td className="py-4">{product.title}</td>
                  <td className="py-4">${product.price}</td>
                  <td className="py-4">{product.views}</td>
                  <td className="py-4">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
