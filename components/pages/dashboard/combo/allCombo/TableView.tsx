"use client";

import { TComboPackage } from "@/types/comboPackage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

const TableView = ({ packages }: { packages: TComboPackage[] }) => {
  const keys = [
    "Combo Details",
    "SKU",
    "Sales",
    "Stock",
    "Discount",
    "Price",
    "Status",
    "Actions",
  ];

  return (
    <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden w-full border-none p-0">
      <div className="overflow-x-auto w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {keys.map((label, ind) => (
                <TableHead
                  first={ind === 0}
                  last={ind === keys.length - 1}
                  key={label}
                  className="text-left text-xs font-semibold uppercase text-muted-foreground"
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages?.map((item: TComboPackage) => {
              const newPrice =
                Number(item?.packagePrice) - Number(item?.discountPrice);
              return (
                <TableRow
                  key={item?.id}
                  className="border-muted hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          item?.image_url ||
                          "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                        }
                        alt={item?.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <p className="font-medium">{item?.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-center">
                    {item?.sku}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm text-center">
                    0
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-medium text-center">
                    0
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                    ${item?.savingsPercent}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex flex-col gap-1">
                      <span>TK {newPrice}</span>
                      <span className="text-red-600 line-through">
                        TK {item?.packagePrice}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <LiquidGlass shadowIntensity="xs" borderRadius="18px">
                      {item?.is_active ? (
                        <Card className="p-1 bg-white/10 text-green-600 rounded-[18px]">
                          Active
                        </Card>
                      ) : (
                        <Card className="p-1 bg-white/10 text-red-700 rounded-[18px] ">
                          Deactive
                        </Card>
                      )}
                    </LiquidGlass>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center ">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="cursor-pointer">
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-[180px] flex flex-col "
                      >
                        <Link href={`/dashboard/admin/combo/${item?.id}`}>
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Pencil className="w-4 h-4 mr-2" />
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          //   onClick={() => {
                          //     setDeleteProductId(product.id);
                          //     setDeleteDialogOpen(true);
                          //   }}
                          className="cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-destructive mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default TableView;
