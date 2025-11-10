"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerForm from "../components/customer-form";
import { useGetCustomerByIdQuery } from "@/redux/features/customers/cutomersApi";

export default function EditCustomerPage() {
  const params = useParams();
  const customerId = Number.parseInt(params.id as string);
 const { data, isLoading } = useGetCustomerByIdQuery(customerId);
   const customerData = data?.data;
 
   console.log(customerData);

  if (!isLoading) {
    return (
      <main className="min-h-screen bg-linear-gradient(to-br, from-background, via-background, to-muted/30)">
        <div className="px-4 py-6 md:px-6 lg:px-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 mb-4">
              <ChevronLeft className="h-4 w-4" />
              Back to Customers
            </Button>
          </Link>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground">
              Customer not found
            </h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-gradient(to-br, from-background, via-background, to-muted/30)">
      <div className="px-4 py-6 md:px-6 lg:px-8">
        {/* Form Container */}
        <div className="mx-auto">
          <CustomerForm customer={customerData} />
        </div>
      </div>
    </main>
  );
}
