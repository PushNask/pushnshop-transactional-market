import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductImageUploadProps {
  handleImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImages: File[];
}

export const ProductImageUpload = ({ handleImageSelect, selectedImages }: ProductImageUploadProps) => {
  return (
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
  );
};