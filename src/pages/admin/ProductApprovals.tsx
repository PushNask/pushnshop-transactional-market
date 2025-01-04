import { useState } from 'react';
import { ProductDetailsModal } from '@/components/admin/product-approvals/ProductDetailsModal';
import { ProductTable } from '@/components/admin/product-approvals/ProductTable';

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

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Product Approvals</h2>
      
      <ProductTable 
        products={pendingProducts}
        onProductClick={handleProductClick}
      />

      {isModalOpen && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onApprove={() => {
            // Handle approval logic here
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductApprovals;
