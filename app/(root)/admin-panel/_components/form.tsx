"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { navlinks } from "@/constants";
import { toast } from "sonner";
import { api } from "@/trpc/react";

import FormUploadImages from "./form-upload-images";
import { uploadImage } from "@/lib/utils";
import { InsertProductSchema, insertProductSchema } from "@/types/zod-schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductSizeEnum } from "@/server/db";

const sizes = ["S", "M", "L"] as ProductSizeEnum[];

export function AdminProductForm() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertProductSchema>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      gender: "men",
      category: "",
      images: [],
      sizes: [],
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

  const createProduct = api.products.createProduct.useMutation();
  const utils = api.useUtils();
  const onSubmit = async (data: InsertProductSchema) => {
    setIsSubmitting(true);

    const uploadedImages = await uploadImage(images);

    if (!uploadedImages) {
      setIsSubmitting(false);
      toast.error("Failed to upload images. Please try again.");
      return;
    }

    await createProduct.mutateAsync(
      { ...data, images: uploadedImages },
      {
        onSuccess: async ({}) => {
          toast.success("Product created successfully");
          form.reset({
            name: "",
            description: "",
            gender: "men",
            category: "",
            images: [],
          });
          setImages([]);
          await utils.products.getProducts.invalidate();
          await utils.stats.quickStats.invalidate();
        },
        onError: ({ message }) => {
          toast.error(
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold text-black uppercase tracking-wide">
                Failed to create product
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

    const options = genderNavlink.children.map((child) => ({
      value: child.href.split("=")[1],
      label: child.label,
    }));

    options.push({
      value: "wedding",
      label: "Wedding",
    });

    return options;
  };

  const categoryOptions = getCategoryOptions(form.watch("gender"));

  // Clear category when gender changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "gender") {
        form.setValue("category", "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-light tracking-wider uppercase text-center">
            Add New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
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
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  className="font-medium tracking-wide uppercase"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Product...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Create Product
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
}
