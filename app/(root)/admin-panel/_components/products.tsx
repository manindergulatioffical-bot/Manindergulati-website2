"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Eye, Search, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebouce";
import { api } from "@/trpc/react";
import Image from "next/image";
import { Product } from "@/server/db";
import { toast } from "sonner";
import { decryptImageUrl } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EditProductForm from "./edit-product";

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("both");
  const debouncedSearchQuery = useDebounce(searchQuery, 200);
  const memoizedProductList = useMemo(() => {
    return (
      <ProductTable query={debouncedSearchQuery} genderFilter={genderFilter} />
    );
  }, [debouncedSearchQuery, genderFilter]);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products by name or product id"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <div>
                <Select
                  onValueChange={(value) => setGenderFilter(value)}
                  defaultValue="both"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Both" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">Both</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="bg-transparent w-full"
                  onClick={() => {
                    setSearchQuery("");
                    setGenderFilter("both");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-16">Image</TableHead>
                <TableHead className="w-16">ID</TableHead>
                <TableHead className="w-16">Product Name</TableHead>
                <TableHead className="w-16">Category</TableHead>
                <TableHead className="w-16">Gender</TableHead>
                <TableHead className="w-16">Sizes</TableHead>
                <TableHead className="w-16">Description</TableHead>
                <TableHead className="w-16">Created</TableHead>
                <TableHead className="w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{memoizedProductList}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
const isUUID = (str: string) => {
  // UUID v1 or v4 regex (case-insensitive)
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    str.trim()
  );
};

const ProductTable = ({
  query,
  genderFilter,
}: {
  query: string;
  genderFilter: string;
}) => {
  const queryIsUUID = isUUID(query);

  const {
    data: productData,
    isLoading: isLoadingProduct,
    error: productError,
  } = queryIsUUID
    ? api.products.getProductById.useQuery({
        id: query,
      })
    : { data: null, isLoading: false, error: null };

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = !queryIsUUID
    ? api.products.getProducts.useQuery({
        gender:
          genderFilter === "both"
            ? undefined
            : (genderFilter as "men" | "women"),
        query,
      })
    : { data: null, isLoading: false, error: null };

  const isLoading = isLoadingProduct || isLoadingProducts;
  const error = productError || productsError;

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={9} className="text-center py-8">
          <p className="text-gray-500">Loading products...</p>
        </TableCell>
      </TableRow>
    );
  }

  if (error) {
    return (
      <TableRow>
        <TableCell colSpan={9} className="text-center py-8">
          <p className="text-red-500">
            Error loading products: {error.message}
          </p>
        </TableCell>
      </TableRow>
    );
  }

  let products: Product[] = [];

  if (queryIsUUID) {
    // Handle single product query
    if (productData) {
      products = [productData];
    }
  } else {
    // Handle products list query
    if (productsData?.products) {
      products = productsData.products;
    }
  }

  if (products.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={9} className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </TableCell>
      </TableRow>
    );
  }

  return products.map((product) => (
    <ProductRow key={product.id} product={product} />
  ));
};

const ProductRow = ({ product }: { product: Product }) => {
  const { mutate: deleteProduct } = api.products.deleteProduct.useMutation();
  const utils = api.useUtils();
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(
        { id: product.id },
        {
          onSuccess: async () => {
            toast.success("Product deleted successfully");
            await utils.products.getProducts.invalidate();
            await utils.stats.quickStats.invalidate();
          },
          onError: () => {
            toast.error("Failed to delete product");
          },
        }
      );
    }
  };

  return (
    <TableRow key={product.id} className="hover:bg-transparent">
      <TableCell>
        <Image
          src={decryptImageUrl(product.images[0]).url}
          alt={product.name}
          className="object-cover rounded"
          width={48}
          height={48}
        />
      </TableCell>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{product.gender}</TableCell>
      <TableCell>{product.sizes.join(", ")}</TableCell>
      <TableCell className="max-w-[100px] truncate">
        {product.description}
      </TableCell>
      <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Tip content="View product">
            <Button type="button" variant="outline" size="icon" asChild>
              <Link href={`/product/${product.id}`}>
                <Eye className="w-4 h-4" />
              </Link>
            </Button>
          </Tip>
          <EditProduct productId={product.id} />
          <Tip content="Delete product">
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete()}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tip>
        </div>
      </TableCell>
    </TableRow>
  );
};

function EditProduct({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tip content="Edit product">
          <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
            <Edit2 className="w-4 h-4" />
          </Button>
        </Tip>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light tracking-wider uppercase">
            Edit Product
          </DialogTitle>
          <DialogDescription>
            Adding new images will replace the old ones
          </DialogDescription>
        </DialogHeader>
        <EditProductForm productId={productId} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function Tip({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
export default Products;
