"use client";
import { debounce } from "@/utills/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function useFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [show, setShow] = useState("10");
    const [currentPage, setCurrentPage] = useState(1);

    const handleChange = (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "all" || value === "") {
            params.delete(name);
        } else {
            if (name == "search") {
                debounce(() => params.set(name, value), 1000)
            }
            else
                params.set(name, value);
            setCurrentPage(1);
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const getParam = (name: string): string | null => {
        return searchParams.get(name);
    };

    const getAllParams = (): Record<string, string> => {
        const params: Record<string, string> = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    };

    // Reset function - sob URL params clear kore
    const handleReset = ({ setLimit, setCurrPage }: { setLimit: (value: string) => void, setCurrPage: (value: number) => void }) => {
        router.push(`${pathname}`, { scroll: false });
        setLimit("10");
        setCurrPage(1);
    };

    return {
        handleChange,
        getParam,
        getAllParams,
        searchParams,
        handleReset,
        show,
        setShow,
        currentPage,
        setCurrentPage,
    };
}