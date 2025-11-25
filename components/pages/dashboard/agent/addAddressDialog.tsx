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
  zone_id: number;
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
    zone_id: 1,
    geo_lat: 0,
    geo_lng: 0,
  });

  const [createAddress, { isLoading }] = useCreateCustomerAddressMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /*   const handleSelectChange = (name: keyof AddressPayload, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, is_default: checked }));
  }; */

  const handleSubmit = async () => {
    // TODO: integrate RTK mutation here
    setLoading(true);

    
    const payload = {
      data: form,
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
        <Button variant="outline" size="sm" className="w-full sm:w-auto">
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="division"
              name="division"
              placeholder="Customer Name"
              value={form.division}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="thana">Thana</Label>
            <Input
              id="thana"
              name="thana"
              placeholder={form.thana}
              value={form.thana}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="post">Postal Code</Label>
            <Input
              id="post"
              name="post"
              placeholder="1209"
              value={form.post}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder={form.city}
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              name="street"
              placeholder={form.street}
              value={form.street}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="city">Zone ID</Label>
            <Input
              id="zone_id"
              name="zone_id"
              placeholder={form.zone_id.toString()}
              value={form.zone_id.toString()}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/*  <div className="flex flex-col gap-2">
            <Label htmlFor="country">Country</Label>
            <Select
              value={form.country}
              onValueChange={(val) => handleSelectChange("country", val)}
            >
              <SelectTrigger id="country">
                <SelectValue defaultValue="BD" placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BD">Bangladesh</SelectItem>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="CA">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <Label htmlFor="postal_code">Postal Code</Label>
            <Input
              id="postal_code"
              name="postal_code"
              placeholder="10001"
              value={form.postal_code}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="01712345678"
              value={form.phone}
              onChange={handleChange}
            />
          </div> */}

          {/*  <div className="flex items-center gap-2 sm:col-span-2">
            <Checkbox
              id="is_default"
              checked={form.is_default}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="is_default" className="cursor-pointer">
              Set as default address
            </Label>
          </div> */}
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
