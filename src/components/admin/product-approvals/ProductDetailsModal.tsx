import { Button } from "@/components/ui/button";

interface ProductDetailsModalProps {
  product: any;
  onClose: () => void;
  onApprove: () => void;
}

export const ProductDetailsModal = ({ product, onClose, onApprove }: ProductDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="border-b px-6 py-4 flex justify-between items-center sticky top-0 bg-white">
          <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
          <button
            onClick={onClose}
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
                <p className="font-medium">{product.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium">${product.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Condition</p>
                <p className="font-medium">{product.condition}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Description</p>
              <p className="mt-1">{product.description}</p>
            </div>
          </div>

          {/* Seller Information */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Seller Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{product.seller.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{product.seller.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{product.seller.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">WhatsApp</p>
                <p className="font-medium">{product.seller.whatsapp}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{product.seller.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">{product.seller.joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Listing Details */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Listing Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Listing Type</p>
                <p className="font-medium">{product.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-medium">{product.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Amount</p>
                <p className="font-medium">${product.paymentAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Reference</p>
                <p className="font-medium">{product.paymentReference}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t px-6 py-4 bg-gray-50 flex justify-end gap-4 sticky bottom-0">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            onClick={onApprove}
          >
            {product.status === 'Pending Payment' ? 'Verify Payment' : 'Approve'}
          </Button>
        </div>
      </div>
    </div>
  );
};