"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RecentActivity from "./recentActivity/RecentActivity";
import UserActivity from "./userActivity/UserActivity";
import CustomerHistory from "./customerHistory/CustomerHistory";
import ProductHistory from "./productHistory/ProductHistory";
import OrderHistory from "./orderHistory/OrderHistory";
import ActivityStats from "./activityStats/ActivityStats";

const tabs = [
  "Statistics",
  "Recent Activity",
  "User Activity",
  "Customer History",
  "Product History",
  "Order History",
];

const Activity = () => {
  type TTabs =
    | "Statistics"
    | "Recent Activity"
    | "User Activity"
    | "Customer History"
    | "Product History"
    | "Order History";

  const [activeTab, setActiveTab] = useState<TTabs | string>("Statistics");

  return (
    <CardContent className="p-1 lg:p-8 w-full ">
      <div className=" w-full">
        {/* Sidebar Tabs */}
        <Card className="lg:h-full p-2 ">
          <CardContent className="p-2 space-y-2 flex flex-wrap ">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "ghost"}
                className=" justify-start cursor-pointer"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Activity Content */}
        {activeTab === "Statistics" && <ActivityStats />}
        {activeTab === "Recent Activity" && <RecentActivity />}
        {activeTab === "User Activity" && <UserActivity />}
        {activeTab === "Customer History" && <CustomerHistory />}
        {activeTab === "Product History" && <ProductHistory />}
        {activeTab === "Order History" && <OrderHistory />}
      </div>
    </CardContent>
  );
};

export default Activity;
