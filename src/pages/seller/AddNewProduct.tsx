import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { ProductBasicInfo } from '@/components/seller/ProductBasicInfo';
import { ProductCategorySelect } from '@/components/seller/ProductCategorySelect';
import { ProductLinkInfo } from '@/components/seller/ProductLinkInfo';
import { FormData } from '@/types/product';

const AddNewProduct = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to add a product');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('products').insert([
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
      ]);

      if (error) throw error;

      toast.success('Product added successfully!');
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        location: '',
        linkType: 'whatsapp',
        linkNumber: '',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      });
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Product...
                </>
              ) : (
                'Add Product'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewProduct;