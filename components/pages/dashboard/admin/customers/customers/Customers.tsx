"use client";

import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import CustomPagination from "@/components/ui/CustomPagination";
import { Input } from "@/components/ui/input";
import { Download, Funnel, Search } from "lucide-react";
import { useState } from "react";
import CreateCustomerModal from "./CreateCustomerModal";
import PageHeader from "../../../shared/pageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Customers = () => {
  const [show, setShow] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Apparel" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Books" },
    { id: 5, name: "Sports" },
  ];

  const handleChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(name);
    } else {
      params.set(name, value.toString());
    }
    router.push(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleReset = () => {
    router.push(`${pathName}`);
    setShow("10");
    setCurrentPage(1);
    setStatus("all");
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-6 w-full px-4">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <PageHeader
            title="All Customers"
            description="Operational overview and quick actions"
          />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <CreateCustomerModal />
        </div>
      </div>

      {/* filter section */}
      <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
        <div className="flex  gap-3 items-center">
          <Input
            className="w-64 text-sm bg-transparent"
            value={inputValue}
            icon={<Search />}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            placeholder="Search product by name"
          />
          <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
            <Funnel size={16} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
            }}
          >
            <SelectTrigger className="w-40" aria-label="Category Filter">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category: { id: number; name: string }) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
            }}
          >
            <SelectTrigger className="w-36" aria-label="Status Filter">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <ButtonComponent
            icon={Download}
            buttonName="Export"
            varient="yellow"
          />
        </div>
      </div>

      {/* Pagination */}
      <CustomPagination
        show={show}
        currentPage={currentPage}
        setShow={setShow}
        setCurrentPage={setCurrentPage}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Customers;
