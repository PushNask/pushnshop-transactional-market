import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FormData } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';

export const useAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const uploadImages = async (productId: string, images: File[]): Promise<string[]> => {
    const uploadPromises = images.map(async (file, index) => {
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

  const addProduct = async (formData: FormData, selectedImages: File[]) => {
    if (!user) {
      throw new Error('You must be logged in to add a product');
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
        const imageUrls = await uploadImages(productData.id, selectedImages);
        
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

      return productData;
    } finally {
      setIsLoading(false);
    }
  };

  return { addProduct, isLoading };
};