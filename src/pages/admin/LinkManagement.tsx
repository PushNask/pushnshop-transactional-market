import { useState } from 'react';

const LinkManagement = () => {
  const featuredSlots = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    status: i % 3 === 0 ? 'available' : 'occupied',
    product: i % 3 === 0 ? null : `Product ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 500,
    stats: {
      visits24h: Math.floor(Math.random() * 1000),
      totalVisits: Math.floor(Math.random() * 10000),
      chatsInitiated24h: Math.floor(Math.random() * 100),
      totalChatsInitiated: Math.floor(Math.random() * 1000),
      clickRate24h: (Math.random() * 15 + 5).toFixed(1) + '%',
      avgTimeOnPage: Math.floor(Math.random() * 180 + 60) + 's',
      bounceRate: (Math.random() * 30 + 20).toFixed(1) + '%'
    },
    rank: i % 3 === 0 ? null : Math.floor(Math.random() * 10) + 1,
    activeVisitors: Math.floor(Math.random() * 20),
    lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString()
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Link Management</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Featured Slots (1-12)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredSlots.map((slot) => (
            <div key={slot.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-lg font-medium">Slot {slot.number}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  slot.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {slot.status === 'available' ? 'Available' : 'Occupied'}
                </span>
              </div>
              {slot.status === 'occupied' && (
                <>
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">{slot.product}</p>
                    <p className="text-sm text-gray-500">Price: ${slot.price}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Real-time stats */}
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-blue-700">Active Visitors</span>
                        <span className="text-sm font-bold text-blue-700">{slot.activeVisitors}</span>
                      </div>
                    </div>

                    {/* 24h Stats */}
                    <div className="bg-gray-50 p-2 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Visits (24h)</span>
                        <span className="text-xs font-medium">{slot.stats.visits24h}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Chats Initiated (24h)</span>
                        <span className="text-xs font-medium">{slot.stats.chatsInitiated24h}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Click Rate (24h)</span>
                        <span className="text-xs font-medium">{slot.stats.clickRate24h}</span>
                      </div>
                    </div>

                    {/* Overall Stats */}
                    <div className="bg-gray-50 p-2 rounded-lg space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Total Visits</span>
                        <span className="text-xs font-medium">{slot.stats.totalVisits}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Total Chats</span>
                        <span className="text-xs font-medium">{slot.stats.totalChatsInitiated}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Avg Time on Page</span>
                        <span className="text-xs font-medium">{slot.stats.avgTimeOnPage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Bounce Rate</span>
                        <span className="text-xs font-medium">{slot.stats.bounceRate}</span>
                      </div>
                    </div>

                    {/* Ranking */}
                    {slot.rank && (
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-blue-600 font-medium">Rank #{slot.rank}</span>
                        <span className="text-xs text-gray-500">
                          Updated {new Date(slot.lastUpdated).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkManagement;
