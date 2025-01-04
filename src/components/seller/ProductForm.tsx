import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductBasicInfo } from './ProductBasicInfo';
import { ProductCategorySelect } from './ProductCategorySelect';
import { ProductLinkInfo } from './ProductLinkInfo';
import { ProductImageUpload } from './ProductImageUpload';
import { FormData } from '@/types/product';
import { useAddProduct } from '@/hooks/useAddProduct';

export const ProductForm = () => {
  const navigate = useNavigate();
  const { addProduct, isLoading } = useAddProduct();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    linkType: 'whatsapp',
    linkNumber: '',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 7) {
      toast.error('Maximum 7 images allowed');
      return;
    }
    setSelectedImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProduct(formData, selectedImages);
      toast.success('Product added successfully!');
      navigate('/seller');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProductBasicInfo formData={formData} handleChange={handleChange} />
      
      <ProductCategorySelect 
        category={formData.category}
        onValueChange={(value) => handleSelectChange('category', value)}
      />

      <ProductLinkInfo 
        formData={formData}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
      />

      <ProductImageUpload
        handleImageSelect={handleImageSelect}
        selectedImages={selectedImages}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Product...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Add Product
          </>
        )}
      </Button>
    </form>
  );
};