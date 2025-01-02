import { useState } from 'react';

const Analytics = () => {
  const [data, setData] = useState({
    totalViews: 356,
    activeProducts: 2,
    totalChats: 44,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total Views</p>
          <p className="text-2xl font-bold">{data.totalViews}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Active Products</p>
          <p className="text-2xl font-bold">{data.activeProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-500 text-sm">Total Chats</p>
          <p className="text-2xl font-bold">{data.totalChats}</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
