"use client";

import { Card } from "@/components/ui/card";
import { TCouriarperformanceType } from "@/types/overAllReport/couriarPerformanceType";
import { CheckCircle, Package, RotateCcw, Truck } from "lucide-react";

const CouriarPerformence = ({
  couriarPerformance,
}: {
  couriarPerformance: TCouriarperformanceType;
}) => {
  const summary = couriarPerformance?.summary;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6">
        {/* Total Couriers */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalCouriers ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Couriers
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <Truck className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
          </div>
        </Card>

        {/* Total Shipments */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalShipments ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Shipments
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
          </div>
        </Card>

        {/* Total Delivered */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalDelivered ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Delivered
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        </Card>

        {/* Total Returned */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {summary?.totalReturned ?? 0}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Returned
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CouriarPerformence;
