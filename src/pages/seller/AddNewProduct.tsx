import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';
import { ProductBasicInfo } from '@/components/seller/ProductBasicInfo';
import { ProductCategorySelect } from '@/components/seller/ProductCategorySelect';
import { ProductLinkInfo } from '@/components/seller/ProductLinkInfo';
import { FormData } from '@/types/product';
import { useNavigate } from 'react-router-dom';

const AddNewProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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

  const uploadImages = async (productId: string): Promise<string[]> => {
    const uploadPromises = selectedImages.map(async (file, index) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}/${index}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

      return publicUrl;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to add a product');
      return;
    }

    setIsLoading(true);

    try {
      // Insert product
      const { error: productError, data: productData } = await supabase
        .from('products')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
            location: formData.location,
            link_type: formData.linkType,
            link_number: parseInt(formData.linkNumber),
            expires_at: new Date(formData.expiresAt).toISOString(),
            seller_id: user.id,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (productError) throw productError;

      // Upload images if any
      if (selectedImages.length > 0) {
        const imageUrls = await uploadImages(productData.id);
        
        // Insert image records
        const imageRecords = imageUrls.map((url, index) => ({
          product_id: productData.id,
          image_url: url,
          display_order: index,
        }));

        const { error: imageError } = await supabase
          .from('product_images')
          .insert(imageRecords);

        if (imageError) throw imageError;
      }

      toast.success('Product added successfully!');
      navigate('/seller');
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
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

            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expires At</Label>
              <Input
                id="expiresAt"
                name="expiresAt"
                type="date"
                value={formData.expiresAt}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Product Images (Max 7)</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              />
              {selectedImages.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedImages.length} image(s) selected
                </p>
              )}
            </div>

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
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewProduct;