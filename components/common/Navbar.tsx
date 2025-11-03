"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LogIn,
    LogOut,
    LayoutDashboard,
    Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const user = {
    isLoggedIn: true,
    role: "admin", 
    name: "John Doe",
};

export default function Navbar() {
    const pathname = usePathname();

    const dashboardRoute =
        user.role === "admin"
            ? "/dashboard/admin/landing"
            : user.role === "agent"
                ? "/dashboard/agent"
                : "/dashboard/user";

    if (pathname.startsWith("/dashboard")) return null;

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed max-w-full w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10",
                "text-white"
            )}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-20">
                <div className="flex items-center justify-between h-16">
                    {/* 🔰 Logo */}
                    <Link
                        href="/"
                        className="text-yellow-400 font-bold text-xl flex items-center gap-2"
                    >
                        <Image
                            src={"/images/OptiluxBD.png"}
                            alt="optiluxBD"
                            width={100}
                            height={100}
                            className="w-auto h-8"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <li>
                            <Link
                                href="/products"
                                className={cn(
                                    "hover:text-yellow-400 transition",
                                    pathname === "/products" && "text-yellow-400"
                                )}
                            >
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link href="/solutions" className="hover:text-yellow-400">
                                Solutions
                            </Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:text-yellow-400">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/resources" className="hover:text-yellow-400">
                                Resources
                            </Link>
                        </li>
                        {user.isLoggedIn && (
                            <li>
                                <Link href={dashboardRoute} className="hover:text-orange-400">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-yellow-400">
                                    <Menu size={24} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-black/80 text-white border border-gray-700 space-y-1">
                                <DropdownMenuItem>
                                    <Link href="/products" className="w-full block">
                                        Products
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/solutions" className="w-full block">
                                        Solutions
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/pricing" className="w-full block">
                                        Pricing
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/resources" className="w-full block">
                                        Resources
                                    </Link>
                                </DropdownMenuItem>
                                {user.isLoggedIn && (
                                    <DropdownMenuItem>
                                        <Link href={dashboardRoute} className="w-full block text-orange-400">
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                                {user.isLoggedIn ? (
                                    <DropdownMenuItem className="text-red-400">
                                        <LogOut size={16} className="mr-2" />
                                        Logout
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem>
                                        <Link href="/login" className="w-full text-yellow-300 flex items-center">
                                            <LogIn size={16} className="mr-2" />
                                            Login
                                        </Link>
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* 👤 Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user.isLoggedIn ? (
                            <>
                                <Link href={dashboardRoute}>
                                    <Button
                                        className="bg-orange-500 hover:bg-orange-600 text-white flex gap-2"
                                        size="sm"
                                        variant="default"
                                    >
                                        <LayoutDashboard size={16} />
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    className="text-red-400 hover:text-white p-2"
                                >
                                    <LogOut size={18} />
                                </Button>
                            </>
                        ) : (
                            <Link href="/login">
                                <Button
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                                    size="sm"
                                >
                                    <LogIn size={16} className="mr-2" /> Login
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}