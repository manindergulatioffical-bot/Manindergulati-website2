import { AdminProductForm } from "./form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Package, LucideIcon } from "lucide-react";
import Products from "./products";
import QuickStats from "./quick-stats";

export function AdminDashboard() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto  px-2 py-4 md:px-4 md:py-8">
        <QuickStats />

        <Tabs defaultValue={"products"} className="space-y-6">
          <div className="w-full overflow-x-auto">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-white border rounded-lg shadow-sm min-w-[300px]">
              <Trigger value="products" icon={Package} label="Products" />
              <Trigger value="add-product" icon={Plus} label="Add Product" />
            </TabsList>
          </div>
          <TabsContent value="products" className="space-y-6">
            <Products />
          </TabsContent>

          <TabsContent value="add-product">
            <AdminProductForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const Trigger = ({
  value,
  icon,
  label,
}: {
  value: string;
  icon: LucideIcon;
  label: string;
}) => {
  const Icon = icon;
  return (
    <TabsTrigger
      value={value}
      className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 text-xs sm:text-sm data-[state=active]:bg-gray-100"
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </TabsTrigger>
  );
};
