import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useUpdateCustomerInfoMutation } from "@/redux/features/customers/cutomersApi";
import React, { useState } from "react";

import { toast } from "sonner";

interface AddressPayload {
  name: string;
  phone: string;
  email: string | null;
  date_of_birth: string | null;
  profession: string | null;
  isMarried?: boolean | null;
}

const EditCustomerDetails = ({ userId, details }: { userId: number, details: AddressPayload }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<AddressPayload>({
    name: details.name || "",
    phone: details.phone || "",
    email: details.email || "",
    date_of_birth: details.date_of_birth || "",
    profession: details.profession || "",
    isMarried: details.isMarried || false,
  });

  const [updateCustomerInfo, { isLoading }] = useUpdateCustomerInfoMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      id: userId,
      customerData: form,
    };

    setOpen(false);
    try {
      const res = await updateCustomerInfo(payload).unwrap();
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
          Updating customer info...
        </span>
      </div>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white hover:text-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer mb-2"
        >
          Edit Info
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-2xl rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Customer Info</DialogTitle>
          <DialogDescription>
            Fill in the details below to edit the customer info.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Dhaka"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              maxLength={11}
              placeholder="01234567890"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="example@domain.com"
              value={form.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              name="date_of_birth"
              placeholder="DD-MM-YYYY"
              value={form.date_of_birth || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="profession">Profession</Label>
            <Input
              id="profession"
              name="profession"
              placeholder="Software Engineer"
              value={form.profession || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="isMarried">Is Married</Label>
            <Checkbox
              id="isMarried"
              name="isMarried"
              checked={form.isMarried || false}
              onCheckedChange={(checked) =>
                setForm((prev) => ({ ...prev, isMarried: !!checked }))
              }
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
            Save Info
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCustomerDetails;
