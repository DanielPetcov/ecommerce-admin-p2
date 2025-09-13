import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "@/components/ui/image-upload";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "./product-image-type";

export default function ProductImageForm({
  form,
  loading,
}: {
  form: UseFormReturn<ProductFormValues>;
  loading: boolean;
}) {
  const { getValues, setValue } = useFormContext();
  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <ImageUpload
              values={field.value.map((image: { url: string }) => image.url)}
              disabled={loading}
              onChange={(url) => {
                const current = getValues("images");
                if (!current.some((img: { url: string }) => img.url === url)) {
                  setValue("images", [...current, { url }]);
                }
              }}
              onRemove={(url) => {
                const current = getValues("images");
                field.onChange(
                  current.filter((image: { url: string }) => image.url !== url)
                );
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
