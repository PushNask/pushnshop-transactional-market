import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductForm } from '@/components/seller/ProductForm';

const AddNewProduct = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewProduct;