import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";
import { useCreateAddressMutation } from "@/redux/features/address/addressApi";

interface AddressPayload {
  name: string;
  user_id: number;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  is_default: boolean;
}

const AddAddressDialog = ({
  userId,
  userName,
}: {
  userId: number;
  userName: string;
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AddressPayload>({
    name: userName,
    user_id: userId,
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
    phone: "",
    is_default: false,
  });

  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof AddressPayload, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setForm((prev) => ({ ...prev, is_default: checked }));
  };

  const handleSubmit = async () => {
    // TODO: integrate RTK mutation here
    setLoading(true);

    setOpen(false);
    try {
      const res = await createAddress({
        division: "Dhaka",
        city: "Dhaka",
        thana: "Dhanmondi",
        post: "1209",
        street: "Road 27, House 12, Dhanmondi Residential Area",
        zone_id: 1,
        geo_lat: 23.7465,
        geo_lng: 90.3763,
      }).unwrap();
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
              id="name"
              name="name"
              placeholder="Customer Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="user_id">User ID</Label>
            <Input
              id="user_id"
              name="user_id"
              type="number"
              placeholder={`${userId}`}
              disabled
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="address_line1">Address Line 1</Label>
            <Input
              id="address_line1"
              name="address_line1"
              placeholder="123 Main St"
              value={form.address_line1}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="address_line2">Address Line 2</Label>
            <Input
              id="address_line2"
              name="address_line2"
              placeholder="Apt 4B"
              value={form.address_line2}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Dhaka"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              placeholder="Dhaka"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
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
                {/* Add more as needed */}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
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
          </div>

          <div className="flex items-center gap-2 sm:col-span-2">
            <Checkbox
              id="is_default"
              checked={form.is_default}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="is_default" className="cursor-pointer">
              Set as default address
            </Label>
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
