"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { crmRoutes } from "@/constants/CRM_Navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  interface NavRoute {
    title: string;
    path?: string;
    icon?: React.ElementType;
    children?: NavRoute[];
  }

  const NavLink = ({ item }: { item: NavRoute }) => {
    const isActive =
      item.path === pathname || pathname.startsWith(item.path + "/");
    const Icon = item.icon;
    return (
      <Link
        href={item.path!}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
          isActive
            ? "bg-gray-100 text-foreground"
            : "text-muted-foreground hover:bg-gray-50"
        )}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {item.title}
      </Link>
    );
  };

  const NavDropdown = ({ item }: { item: NavRoute }) => {
    const isActive =
      item.path === pathname || pathname.startsWith(item.path + "/");
    const Icon = item.icon;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
              isActive
                ? "bg-gray-100 text-foreground"
                : "text-muted-foreground hover:bg-gray-50"
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {item.title}
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {item.children?.map((child) => {
            const Icon = child.icon;
            return (
              <DropdownMenuItem key={child.path} asChild>
                <Link
                  href={child.path!}
                  className={cn(
                    "w-full",
                    pathname === child.path
                      ? "bg-gray-100 text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {child.title}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center h-16 gap-8 overflow-x-auto">
          <div className="flex items-center gap-1">
            {crmRoutes.map((item) =>
              item.children ? (
                <NavDropdown key={item.path} item={item} />
              ) : (
                <NavLink key={item.path} item={item} />
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
