"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormLabel } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import FormUploadImages from "./form-upload-images";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { editProductSchema, EditProductSchema } from "@/types/zod-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { navlinks } from "@/constants";
import { Loader2, Save } from "lucide-react";
import { api } from "@/trpc/react";
import { Product, ProductSizeEnum } from "@/server/db";
import { toast } from "sonner";
import { uploadImage } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const sizes = ["S", "M", "L"] as ProductSizeEnum[];

const EditProductForm = ({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) => {
  const { data: product, isLoading } = api.products.getProductById.useQuery({
    id: productId,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );

  if (!product) return <div>Product not found</div>;

  return <EditForm product={product} onClose={onClose} />;
};

const EditForm = ({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      description: product.description,
      gender: product.gender,
      category: product.category,
      images: undefined,
      sizes: product.sizes,
    },
    
  });

  const onImageChange = (images: ImageFile[]) => {
    setImages(images);
    if (images.length > 0) {
      form.setValue(
        "images",
        images.map((image) => image.preview)
      );
    }
  };

  const getCategoryOptions = (selectedGender: string | undefined) => {
    if (!selectedGender) return [];

    const genderMap = {
      men: "Men",
      women: "Women",
    };

    const genderLabel = genderMap[selectedGender as keyof typeof genderMap];
    if (!genderLabel) return [];

    const genderNavlink = navlinks.find((link) => link.label === genderLabel);
    if (!genderNavlink || !genderNavlink.children) return [];

    return genderNavlink.children.map((child) => ({
      value: child.href.split("=")[1],
      label: child.label,
    }));
  };

  const editProduct = api.products.editProduct.useMutation();
  const utils = api.useUtils();
  const onSubmit = async (data: EditProductSchema) => {
    setIsSubmitting(true);
    console.log(data.description);

    let uploadedImages: string[] | null = [];
    if (images.length) {
      uploadedImages = await uploadImage(images);
      if (!uploadedImages) {
        setIsSubmitting(false);
        toast.error("Failed to upload images. Please try again.");
        return;
      }
    }

    await editProduct.mutateAsync(
      { ...data, images: uploadedImages },
      {
        onSuccess: async ({}) => {
          toast.success("Product updated successfully");
          onClose();
          await utils.products.getProducts.invalidate();
          await utils.stats.quickStats.invalidate();
          await utils.products.getProductById.invalidate({
            id: data.id,
          });
        },
        onError: ({ message }) => {
          toast.error(
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-black uppercase tracking-wide">
                Failed to Update product
              </p>
              <p className="text-xs text-gray-900">{message}</p>
            </div>
          );
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const categoryOptions = getCategoryOptions(form.watch("gender"));
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "gender") {
        form.setValue("category", product.category);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, product.category]);
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-none border-none">
        <CardContent className="p-0 shadow-none">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Image Upload Section */}
              <FormUploadImages images={images} setImages={onImageChange} />

              {form.formState.errors.images && (
                <FormMessage>
                  {form.formState.errors.images.message}
                </FormMessage>
              )}

              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      Product Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                        Gender Category *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={product.gender}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                        Category *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={product.category}
                        disabled={!form.watch("gender")}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      Available Sizes *
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-2 md:justify-between">
                          <p className="text-sm text-gray-600">
                            Select all available sizes for this product:
                          </p>
                          <div className="flex gap-6">
                            {sizes.map((size) => (
                              <div
                                key={size}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`size-${size}`}
                                  checked={field.value.includes(size)}
                                  onCheckedChange={(checked) => {
                                    const updatedSizes = checked
                                      ? [...field.value, size]
                                      : field.value.filter((s) => s !== size);
                                    field.onChange(updatedSizes);
                                  }}
                                />
                                <Label
                                  htmlFor={`size-${size}`}
                                  className="text-sm font-medium text-gray-700 cursor-pointer select-none uppercase tracking-wide"
                                >
                                  {size}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium">Selected sizes:</span>
                          <span className="font-mono">
                            {field.value.length > 0
                              ? sizes
                                  .filter((size) => field.value.includes(size))
                                  .join(", ")
                              : "None"}
                          </span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                      Product Description *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6">
                <Button variant="outline" onClick={onClose} type="button">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="font-medium tracking-wide uppercase"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating Product...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Update Product
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductForm;
