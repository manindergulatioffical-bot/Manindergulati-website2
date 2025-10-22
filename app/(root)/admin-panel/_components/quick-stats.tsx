"use client";

import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Package, BarChart3 } from "lucide-react";

function QuickStats() {
  const { data: stats, isLoading } = api.stats.quickStats.useQuery();

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">
                Total Products
              </p>
              <p className="text-2xl md:text-3xl font-light text-gray-900">
                {isLoading ? "Loading..." : stats?.totalProducts}
              </p>
            </div>
            <Package className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wide">
                Categories
              </p>
              <p className="text-2xl md:text-3xl font-light text-gray-900">
                {isLoading ? "Loading..." : stats?.categories}
              </p>
            </div>
            <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuickStats;
