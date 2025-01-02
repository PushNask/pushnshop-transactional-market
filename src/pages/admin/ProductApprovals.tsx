import { useState } from 'react';

const ProductApprovals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pendingProducts = [
    {
      id: 1,
      title: 'iPhone 13 Pro',
      description: 'Brand new iPhone 13 Pro, 256GB, Pacific Blue. Original packaging with 1-year warranty.',
      price: 999,
      condition: 'New',
      category: 'Electronics',
      images: ['image1.jpg', 'image2.jpg'],
      seller: {
        name: 'John Doe',
        phone: '+237 612345678',
        whatsapp: '+237 612345678',
        email: 'john@example.com',
        location: 'Douala, Cameroon',
        joinedDate: '2023-10-15',
        totalListings: 15,
        successfulSales: 12
      },
      type: 'Featured',
      duration: '48 hours',
      status: 'Pending Payment',
      paymentAmount: 25.99,
      paymentReference: 'PAY-123456',
      submitted: '2024-12-27'
    },
    {
      id: 2,
      title: 'Samsung Galaxy S24',
      description: 'Latest Samsung Galaxy S24, 512GB storage, Phantom Black. Includes all accessories.',
      price: 899,
      condition: 'New',
      category: 'Electronics',
      images: ['image3.jpg', 'image4.jpg'],
      seller: {
        name: 'Jane Smith',
        phone: '+237 687654321',
        whatsapp: '+237 687654321',
        email: 'jane@example.com',
        location: 'Yaoundé, Cameroon',
        joinedDate: '2024-01-05',
        totalListings: 8,
        successfulSales: 6
      },
      type: 'Standard',
      duration: '24 hours',
      status: 'Payment Verified',
      paymentAmount: 15.99,
      paymentReference: 'PAY-789012',
      submitted: '2024-12-28'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Product Approvals</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap" onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}>
                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                    <div className="text-sm text-gray-500">Submitted {product.submitted}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{product.seller.name}</div>
                    <div className="text-gray-400">{product.seller.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.type === 'Featured' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {product.type} • {product.duration}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Payment Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {product.paymentAmount ? `${product.paymentAmount}` : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      {product.status === 'Pending Payment' ? 'Verify Payment' : 'Approve'}
                    </button>
                    <button className="text-red-600 hover:text-red-900">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Product Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Product Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Title</p>
                    <p className="font-medium">{selectedProduct.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price</p>
                    <p className="font-medium">${selectedProduct.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Condition</p>
                    <p className="font-medium">{selectedProduct.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{selectedProduct.category}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="mt-1">{selectedProduct.description}</p>
                </div>
              </div>

              {/* Seller Information */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Seller Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedProduct.seller.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{selectedProduct.seller.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{selectedProduct.seller.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">WhatsApp</p>
                    <p className="font-medium">{selectedProduct.seller.whatsapp}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedProduct.seller.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-medium">{selectedProduct.seller.joinedDate}</p>
                  </div>
                </div>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Listings</p>
                      <p className="font-medium">{selectedProduct.seller.totalListings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Successful Sales</p>
                      <p className="font-medium">{selectedProduct.seller.successfulSales}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="font-medium">
                        {Math.round((selectedProduct.seller.successfulSales / selectedProduct.seller.totalListings) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listing Details */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Listing Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Listing Type</p>
                    <p className="font-medium">{selectedProduct.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium">{selectedProduct.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Amount</p>
                    <p className="font-medium">${selectedProduct.paymentAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Reference</p>
                    <p className="font-medium">{selectedProduct.paymentReference}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-4 sticky bottom-0">
              <button
                className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  // Handle approval logic here
                  setIsModalOpen(false);
                }}
              >
                {selectedProduct.status === 'Pending Payment' ? 'Verify Payment' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductApprovals;
