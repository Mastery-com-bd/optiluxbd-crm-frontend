"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";

type TCustomPaginationProps = {
  totalPage?: number;
  currentPage: number;
  show: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setShow: Dispatch<SetStateAction<string>>;
  handleChange: (name: string, value: string) => void;
};

const CustomPagination = ({
  totalPage = 10,
  currentPage,
  setCurrentPage,
  show,
  setShow,
  handleChange,
}: TCustomPaginationProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathName}?page=${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathName}?page=${currentPage + 1}`);
    }
  };

  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(1);
              router.push(`${pathName}?page=${1}`);
            }}
            href="#"
            className={`${
              currentPage === 1 && "bg-[rgba(248,248,248,0.10)] rounded-xl"
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );
      if (start > 2) {
        pages.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
              router.push(`${pathName}?page=${i}`);
            }}
            href={`/dashboard/customers/${i}`}
            className={`${
              currentPage === i && "bg-[rgba(248,248,248,0.10)] rounded-xl"
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (end < totalPage) {
      if (end < totalPage - 1) {
        pages.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      pages.push(
        <PaginationItem key={totalPage}>
          <PaginationLink
            isActive={currentPage === totalPage}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(totalPage);
              router.push(`${pathName}?page=${totalPage}`);
            }}
            href="#"
            className={`${
              currentPage === totalPage &&
              "bg-[rgba(248,248,248,0.10)] rounded-xl"
            }`}
          >
            {totalPage}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between">
      <Pagination>
        <PaginationContent>
          <div className=" flex items-center justify-center gap-6">
            {/* pagination previous */}
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePrev();
                }}
                href="#"
                className={` border border-[#8A8A8A] rounded-xl ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>
            <div className="flex items-center justify-center gap-1">
              {renderPages()}
            </div>

            {/* pagination next */}
            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPage) handleNext();
                }}
                href="#"
                className={` border border-[#8A8A8A] rounded-xl ${
                  currentPage === totalPage
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
            </PaginationItem>
          </div>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-6">
        <p className="text-sm text-[#7E7E7E]">Showing 1 to 10 of 10 entries</p>
        {/* status drodpown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              className="flex items-center text-[14px] font-normal border border-white/10 px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
            >
              <p className="flex items-center gap-2">
                <span className="text-[14px]">Show {show}</span>
                <ChevronDown size={18} />
              </p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white/5 backdrop-blur-2xl"
          >
            {["10", "20", "30", "40", "50"].map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => {
                  setShow(item);
                  handleChange("limit", item);
                }}
                className={`cursor-pointer ${
                  item === show ? "font-medium" : ""
                }`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default CustomPagination;
