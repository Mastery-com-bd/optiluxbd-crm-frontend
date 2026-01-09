"use client";

import { useGetAllComboPackageQuery } from "@/redux/features/combo/comboApi";
import { useState } from "react";
import { ChevronDown, Funnel, Logs, Plus, Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { debounce } from "@/utills/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TComboPackage } from "@/types/comboPackage";
import CombocardSkeleton from "./CombocardSkeleton";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import CardView from "./CardView";
import TableView from "./TableView";
import ComboOverView from "./ComboOverView";

import ButtonComponent from "@/components/ui/ButtonComponent";
import CustomPagination from "@/components/ui/CustomPagination";
import CreateComboModal from "./CreateComboModal";

const AllCombo = () => {
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const [show, setShow] = useState("10");
  // get all combo
  const { data, isLoading } = useGetAllComboPackageQuery(filters, {
    refetchOnMountOrArgChange: false,
  });
  // const comboPackages = data?.data?.packages as TComboPackage[];
  const comboPackages: TComboPackage[] = [
    {
      id: 1,
      name: "Starter Office Pack",
      description: "Essential office supplies bundle for daily work.",
      sku: "COP-START-001",
      discountPrice: 899,
      packagePrice: "999",
      savingsAmount: "100",
      savingsPercent: "10%",
      is_featured: true,
      is_active: true,
      tags: ["office", "starter"],
      created_at: "2025-01-05T10:30:00Z",
      image_url:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      image_public_id: "combo/starter-pack",
      items: [
        {
          productId: 101,
          quantity: 1,
          product: { id: 101, name: "Notebook" },
        },
        {
          productId: 102,
          quantity: 2,
          product: { id: 102, name: "Ball Pen" },
        },
      ],
    },
    {
      id: 2,
      name: "Student Essentials Pack",
      description: "Perfect bundle for students and exam preparation.",
      sku: "COP-STU-002",
      discountPrice: 749,
      packagePrice: "899",
      savingsAmount: "150",
      savingsPercent: "16.7%",
      is_featured: false,
      is_active: true,
      tags: ["student", "education"],
      created_at: "2025-01-08T09:15:00Z",
      image_url: null,
      image_public_id: null,
      items: [
        {
          productId: 103,
          quantity: 3,
          product: { id: 103, name: "Exercise Book" },
        },
        {
          productId: 104,
          quantity: 1,
          product: { id: 104, name: "Geometry Box" },
        },
      ],
    },
    {
      id: 3,
      name: "Home Cleaning Combo",
      description: "All-in-one cleaning solution for your home.",
      sku: "COP-HOME-003",
      discountPrice: 1299,
      packagePrice: "1499",
      savingsAmount: "200",
      savingsPercent: "13.3%",
      is_featured: true,
      is_active: true,
      tags: "cleaning",
      created_at: "2025-01-10T14:00:00Z",
      image_url:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      image_public_id: "combo/cleaning-pack",
      items: [
        {
          productId: 201,
          quantity: 1,
          product: { id: 201, name: "Floor Cleaner" },
        },
        {
          productId: 202,
          quantity: 2,
          product: { id: 202, name: "Dish Wash Liquid" },
        },
      ],
    },
    {
      id: 4,
      name: "Kitchen Basics Pack",
      description: "Daily kitchen essentials at a discounted price.",
      sku: "COP-KITCH-004",
      discountPrice: 1599,
      packagePrice: "1799",
      savingsAmount: "200",
      savingsPercent: "11.1%",
      is_featured: false,
      is_active: true,
      tags: ["kitchen", "home"],
      created_at: "2025-01-12T11:45:00Z",
      image_url: null,
      image_public_id: null,
      items: [
        {
          productId: 301,
          quantity: 1,
          product: { id: 301, name: "Cooking Oil 1L" },
        },
        {
          productId: 302,
          quantity: 2,
          product: { id: 302, name: "Spice Mix" },
        },
      ],
    },
    {
      id: 5,
      name: "Breakfast Combo",
      description: "Healthy breakfast combo for a fresh start.",
      sku: "COP-BREAK-005",
      discountPrice: 499,
      packagePrice: "599",
      savingsAmount: "100",
      savingsPercent: "16.7%",
      is_featured: true,
      is_active: true,
      tags: ["food", "breakfast"],
      created_at: "2025-01-15T08:00:00Z",
      image_url:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      image_public_id: "combo/breakfast-pack",
      items: [
        {
          productId: 401,
          quantity: 1,
          product: { id: 401, name: "Corn Flakes" },
        },
        {
          productId: 402,
          quantity: 1,
          product: { id: 402, name: "Milk Powder" },
        },
      ],
    },
    {
      id: 6,
      name: "Personal Care Pack",
      description: "Daily personal care essentials.",
      sku: "COP-CARE-006",
      discountPrice: 1099,
      packagePrice: "1299",
      savingsAmount: "200",
      savingsPercent: "15.4%",
      is_featured: false,
      is_active: true,
      tags: ["personal-care"],
      created_at: "2025-01-18T13:20:00Z",
      image_url: null,
      image_public_id: null,
      items: [
        {
          productId: 501,
          quantity: 1,
          product: { id: 501, name: "Shampoo" },
        },
        {
          productId: 502,
          quantity: 1,
          product: { id: 502, name: "Soap Bar" },
        },
      ],
    },
    {
      id: 7,
      name: "Electronics Starter Pack",
      description: "Basic electronic accessories combo.",
      sku: "COP-ELEC-007",
      discountPrice: 1899,
      packagePrice: "2199",
      savingsAmount: "300",
      savingsPercent: "13.6%",
      is_featured: true,
      is_active: true,
      tags: ["electronics"],
      created_at: "2025-01-20T16:10:00Z",
      image_url:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      image_public_id: "combo/electronics-pack",
      items: [
        {
          productId: 601,
          quantity: 1,
          product: { id: 601, name: "USB Cable" },
        },
        {
          productId: 602,
          quantity: 1,
          product: { id: 602, name: "Power Adapter" },
        },
      ],
    },
    {
      id: 8,
      name: "Baby Care Combo",
      description: "Gentle and safe baby care products.",
      sku: "COP-BABY-008",
      discountPrice: 1399,
      packagePrice: "1599",
      savingsAmount: "200",
      savingsPercent: "12.5%",
      is_featured: false,
      is_active: true,
      tags: ["baby", "care"],
      created_at: "2025-01-22T10:00:00Z",
      image_url: null,
      image_public_id: null,
      items: [
        {
          productId: 701,
          quantity: 1,
          product: { id: 701, name: "Baby Lotion" },
        },
        {
          productId: 702,
          quantity: 2,
          product: { id: 702, name: "Baby Wipes" },
        },
      ],
    },
    {
      id: 9,
      name: "Fitness Essentials Pack",
      description: "Workout essentials combo pack.",
      sku: "COP-FIT-009",
      discountPrice: 2099,
      packagePrice: "2499",
      savingsAmount: "400",
      savingsPercent: "16%",
      is_featured: true,
      is_active: true,
      tags: ["fitness", "health"],
      created_at: "2025-01-24T18:45:00Z",
      image_url:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      image_public_id: "combo/fitness-pack",
      items: [
        {
          productId: 801,
          quantity: 1,
          product: { id: 801, name: "Yoga Mat" },
        },
        {
          productId: 802,
          quantity: 1,
          product: { id: 802, name: "Resistance Band" },
        },
      ],
    },
    {
      id: 10,
      name: "Premium VIP Combo",
      description: "Exclusive premium combo for VIP customers.",
      sku: "COP-VIP-010",
      discountPrice: 4999,
      packagePrice: "5999",
      savingsAmount: "1000",
      savingsPercent: "16.7%",
      is_featured: true,
      is_active: true,
      tags: ["vip", "premium"],
      created_at: "2025-01-26T12:00:00Z",
      image_url:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      image_public_id: "combo/vip-pack",
      items: [
        {
          productId: 901,
          quantity: 1,
          product: { id: 901, name: "Premium Gift Box" },
        },
        {
          productId: 902,
          quantity: 1,
          product: { id: 902, name: "Luxury Item" },
        },
      ],
    },
  ];

  const pagination = data?.data?.pagination || {
    page: 1,
    totalPages: 1,
    total: 0,
  };

  const [inputValue, setInputValue] = useState("");
  const [is_active, setIs_active] = useState("All");
  const [is_featured, setIs_featured] = useState("All");
  const [view, setView] = useState<"Table View" | "Grid View">("Grid View");

  const handleSearch = async (val: string) => {
    setFilters({ ...filters, search: val });
  };

  const debouncedLog = debounce(handleSearch, 100, { leading: false });

  if (isLoading) {
    return <CombocardSkeleton />;
  }

  return (
    <section className="min-h-screen bg-transparent text-foreground space-y-4 w-full ">
      {/* header section */}
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-semibold leading-8">All Combo Pack</h1>
          <p className="text-[#A1A1A1] leading-5">
            Browse and manage All Combo Pack
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <ButtonComponent
            buttonName="Bulk Upload"
            icon={Upload}
            varient="default"
          />
          <CreateComboModal />
        </div>
      </div>

      {/* stats card section */}
      <div className="w-full ">
        <ComboOverView />
      </div>

      {/* filtyer section */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className="flex  gap-3">
          <Input
            className=" py-1.5 w-64 text-sm bg-transparent"
            value={inputValue}
            icon={<Search />}
            onChange={(e) => {
              debouncedLog(e.target.value);
              setInputValue(e.target.value);
            }}
            placeholder="Search product by name"
          />
          <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent cursor-pointer">
            <Funnel size={16} />
          </Button>
        </div>

        {/* dropdown */}
        <div className="flex items-center gap-7">
          {/* category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px">
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent">
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {is_featured === "All" ? "All Categories" : is_featured}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl">
              {["All", "Yes", "No"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setIs_featured(item);
                    setFilters((prev) => ({
                      ...prev,
                      is_featured: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === is_featured ? "font-medium" : ""}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* status drodpown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px">
                <Button
                  variant="default"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent">
                  <p className="flex items-center gap-2">
                    <span className="text-[14px]">
                      {" "}
                      {is_active === "All" ? "All Status" : is_active}
                    </span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </LiquidGlass>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white/5 backdrop-blur-2xl">
              {["All", "Yes", "No"].map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => {
                    setIs_active(item);
                    setFilters((prev) => ({
                      ...prev,
                      is_active: item === "All" ? undefined : item === "Yes",
                      page: 1,
                    }));
                  }}
                  className={item === is_active ? "font-medium" : ""}>
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* view button table or grid */}
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="48px">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-[48px] border-none cursor-pointer bg-transparent">
                  <Logs />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="center"
                className="rounded-xl bg-white/5 backdrop-blur-2xl">
                {["Table View", "Grid View"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => setView(item as "Table View" | "Grid View")}
                    className="cursor-pointer">
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </LiquidGlass>
        </div>
      </div>

      <div className="mx-auto ">
        {/* card section */}
        {view === "Grid View" && (
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-8">
              {comboPackages.map((item, i) => (
                <CardView key={i} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* table section */}
        {view === "Table View" && (
          <div className="flex justify-center">
            <TableView packages={comboPackages} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <CustomPagination
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => setFilters({ ...filters, page })}
        show={show}
        setShow={setShow}
        setFilters={setFilters}
      />
    </section>
  );
};

export default AllCombo;
