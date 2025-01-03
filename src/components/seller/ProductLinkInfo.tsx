import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "@/types/product";

interface ProductLinkInfoProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export const ProductLinkInfo = ({ formData, handleChange, handleSelectChange }: ProductLinkInfoProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="linkType">Link Type</Label>
        <Select
          name="linkType"
          value={formData.linkType}
          onValueChange={(value) => handleSelectChange('linkType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
            <SelectItem value="telegram">Telegram</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkNumber">Link Number</Label>
        <Input
          id="linkNumber"
          name="linkNumber"
          type="number"
          value={formData.linkNumber}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};