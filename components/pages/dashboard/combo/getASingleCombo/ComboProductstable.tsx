/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TCombo, TComboPackageItem } from "@/types/comboPackage";
import { Badge } from "@/components/ui/badge";
import { useUpdateComboPackageMutation } from "@/redux/features/combo/comboApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";

const ComboProductstable = ({ ComboPackage }: { ComboPackage: TCombo }) => {
  // local state
  const [formData, setFormData] = useState<TCombo | null>(ComboPackage || null);
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  // redux state
  const user = useAppSelector(currentUser);
  const { permissions } = getPermissions(user as TAuthUSer);
  const [updatePackage] = useUpdateComboPackageMutation();

  useEffect(() => {
    if (ComboPackage) {
      Promise.resolve().then(() => {
        setFormData(ComboPackage);
      });
    }
  }, [ComboPackage]);

  const handleQuantityChange = (index: number, delta: number) => {
    // setFormData((prev) => {
    //   const newItems = [...prev!.items];
    //   newItems[index].quantity += delta;
    //   if (newItems[index].quantity < 1) newItems[index].quantity = 1;
    //   return { ...prev!, items: newItems };
    // });
  };

  // Remove product from combo
  const handleRemoveProduct = (index: number) => {
    setFormData((prev) => {
      const newItems = prev!.items.filter((_, i) => i !== index);
      return { ...prev!, items: newItems };
    });
  };

  // Send updated combo data to backend
  const handleUpdateCombo = async () => {
    setIsLoading(true);

    const updatedData = formData?.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
    return;
    setIsLoading(true);
    try {
      const res = await updatePackage({
        id: ComboPackage.id,
        items: updatedData,
      }).unwrap();

      if (res?.success) {
        toast.success(res.message, { duration: 3000 });
        setEditing(false);
        // dispatch(refreshCombo());
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong", {
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border dark:border-gray-700">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold">
          Included Products
        </CardTitle>
        {permissions.includes("PACKAGES UPDATE") && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Done" : "Edit"}
          </Button>
        )}
      </CardHeader>

      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Stock Status</TableHead>
              {editing && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {formData?.items.map((item: TComboPackageItem, index: number) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium flex items-center gap-1">
                  <Image
                    src={
                      item.product?.image_url ||
                      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                    }
                    alt={item.product?.name}
                    width={200}
                    height={200}
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  {item.product?.name}
                </TableCell>
                <TableCell>{item.product?.brand}</TableCell>
                <TableCell>{item.product?.category}</TableCell>
                <TableCell>{parseFloat(item.product?.price)} ৳</TableCell>
                <TableCell>{item?.product?.discountPrice ?? 0} ৳</TableCell>
                <TableCell>
                  {editing ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(index, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    item.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.product?.stock_status === "IN_STOCK"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {item.product?.stock_status}
                  </Badge>
                </TableCell>
                {editing && (
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {editing && (
        <CardContent className="flex justify-end border-t dark:border-gray-700 pt-4">
          <Button
            disabled={isLoading}
            variant="secondary"
            onClick={handleUpdateCombo}
          >
            Update Combo
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

export default ComboProductstable;
