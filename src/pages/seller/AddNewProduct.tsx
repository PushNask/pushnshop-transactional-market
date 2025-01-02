import React, { useState, ChangeEvent } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
  title: string;
  description: string;
  price: string;
  currency: string;
  category: string;
  condition: string;
  listingType: string;
  duration: string;
  paymentMethod: string;
  images: File[];
  shippingOptions: {
    pickup: boolean;
    shipping: boolean;
  };
  location: string;
}

interface Category {
  id: string;
  name: string;
}

const AddNewProduct = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    currency: 'XAF',
    category: '',
    condition: 'new',
    listingType: 'standard',
    duration: '24',
    paymentMethod: 'Money Money',
    images: [],
    shippingOptions: {
      pickup: true,
      shipping: false
    },
    location: ''
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const categories: Category[] = [
    { id: 'home', name: 'Home & Furniture' },
    { id: 'building', name: 'Building Materials & Hardware' },
    { id: 'automotive', name: 'Automotive & Transportation' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'office', name: 'Office & School Supplies' },
    { id: 'sports', name: 'Sports & Outdoor Gear' },
    { id: 'services', name: 'Services & Digital Goods' },
    { id: 'properties', name: 'Properties' },
    { id: 'business', name: 'Business' },
    { id: 'agricultural', name: 'Agricultural' },
    { id: 'arts', name: 'Arts, Crafts' },
    { id: 'clothing', name: 'Clothing & Fashion' },
    { id: 'electronics', name: 'Electronics & Appliances' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'containers', name: 'Containers' }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    if (fileArray.length + formData.images.length > 7) {
      alert('Maximum 7 images allowed');
      return;
    }

    // Create preview URLs
    const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);

    // Add files to form data
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...fileArray]
    }));
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    
    const newPreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]);
    newPreviewUrls.splice(index, 1);

    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // TODO: Upload images to storage
    // TODO: Submit product data
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 999"
              className="w-full rounded-lg border-gray-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Douala, Cameroon"
                className="w-full rounded-lg border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="XAF">XAF (FCFA)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
          </div>

          {/* Shipping Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Delivery Options
            </label>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pickup"
                  checked={formData.shippingOptions.pickup}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      shippingOptions: {
                        ...prev.shippingOptions,
                        pickup: e.target.checked
                      }
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="pickup" className="ml-2 flex items-center text-sm text-gray-700">
                  <AlertCircle className="w-4 h-4 mr-1 text-green-600" />
                  Pick-up Available
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="shipping"
                  checked={formData.shippingOptions.shipping}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      shippingOptions: {
                        ...prev.shippingOptions,
                        shipping: e.target.checked
                      }
                    }));
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="shipping" className="ml-2 flex items-center text-sm text-gray-700">
                  <AlertCircle className="w-4 h-4 mr-1 text-green-600" />
                  Shipping Available
                </label>
              </div>

              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-gray-600">Select at least one delivery option</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category and Condition */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Category & Condition</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300"
              required
            >
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
              <option value="for-parts">For Parts</option>
            </select>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Product Images ({formData.images.length}/7)
          </h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={formData.images.length >= 7}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer block text-center"
            >
              <div className="space-y-2">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-gray-600">
                  <span className="text-blue-600">Upload images</span> or drag and drop
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB each (max 7 images)
                </p>
              </div>
            </label>
          </div>

          {imagePreviewUrls.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Listing Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">Listing Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Listing Type
            </label>
            <select
              name="listingType"
              value={formData.listingType}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300"
              required
            >
              <option value="standard">Standard</option>
              <option value="featured">Featured (Premium)</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Featured listings appear in top positions and get more visibility
            </p>
          </div>

          {/* Fee Schedule Table */}
          <div className="mt-4 border rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h4 className="font-medium text-gray-700">
                {formData.listingType === 'featured' ? 'Featured' : 'Standard'} Listing Fees
              </h4>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-3 text-sm font-medium text-gray-500 bg-gray-50 p-4">
                <div>Duration</div>
                <div>Fee</div>
                <div></div>
              </div>
              {[
                { duration: '24', fee: formData.listingType === 'featured' ? 25 : 10 },
                { duration: '48', fee: formData.listingType === 'featured' ? 40 : 17 },
                { duration: '72', fee: formData.listingType === 'featured' ? 60 : 25 },
                { duration: '96', fee: formData.listingType === 'featured' ? 80 : 30 },
                { duration: '120', fee: formData.listingType === 'featured' ? 100 : 40 },
              ].map((option) => (
                <div
                  key={option.duration}
                  className={`grid grid-cols-3 p-4 text-sm ${
                    formData.duration === option.duration ? 'bg-blue-50' : ''
                  }`}
                >
                  <div>{option.duration} hours</div>
                  <div>${option.fee}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleChange({
                        target: { name: 'duration', value: option.duration }
                      })}
                      className={`px-3 py-1 rounded-full text-xs ${
                        formData.duration === option.duration
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {formData.duration === option.duration ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Fee Summary */}
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-700">Selected Plan</h4>
                <p className="text-sm text-gray-600">
                  {formData.listingType === 'featured' ? 'Featured' : 'Standard'} listing for {formData.duration} hours
                </p>
              </div>
              <div className="text-xl font-bold text-blue-600">
                ${formData.listingType === 'featured' 
                  ? {
                      '24': 25,
                      '48': 40,
                      '72': 60,
                      '96': 80,
                      '120': 100
                    }[formData.duration]
                  : {
                      '24': 10,
                      '48': 17,
                      '72': 25,
                      '96': 30,
                      '120': 40
                    }[formData.duration]
                }
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300"
              required
            >
              <option value="Money Money">Money Money</option>
              <option value="Stripe">Stripe</option>
              <option value="Cash">Cash (3rd Party)</option>
            </select>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewProduct;
