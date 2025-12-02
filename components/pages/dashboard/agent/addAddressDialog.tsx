import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

import { useCreateCustomerAddressMutation } from "@/redux/features/customers/cutomersApi";
import { toast } from "sonner";

interface AddressPayload {
  division: string;
  city: string;
  thana: string;
  post: string;
  street: string;
  zone_id?: number;
  geo_lat: number;
  geo_lng: number;
}

const AddAddressDialog = ({ userId }: { userId: number }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AddressPayload>({
    division: "",
    city: "",
    thana: "",
    post: "",
    street: "",
    geo_lat: 0,
    geo_lng: 0,
  });

  const [createAddress, { isLoading }] = useCreateCustomerAddressMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      data: {
        ...form,
        post: form.post ? form.post : "00"
      },
      customerId: userId,
    };

    setOpen(false);
    try {
      const res = await createAddress(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
        setLoading(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-4">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="ml-2 text-sm text-muted-foreground">
          Creating address...
        </span>
      </div>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mb-2">
          Add Address
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-2xl rounded-lg">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new address for the user.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="division">Division</Label>
            <Input
              id="division"
              name="division"
              placeholder="Dhaka"
              value={form.division}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="thana">Thana</Label>
            <Input
              id="thana"
              name="thana"
              placeholder="Dhaka"
              value={form.thana}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="post">Postal Code</Label>
            <Input
              id="post"
              name="post"
              placeholder="1203"
              value={form.post}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Dhaka"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              name="street"
              placeholder="123 Main St"
              value={form.street}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="city">Zone ID</Label>
            <Input
              id="zone_id"
              name="zone_id"
              placeholder="1"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            disabled={loading}
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto"
          >
            Save Address
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
