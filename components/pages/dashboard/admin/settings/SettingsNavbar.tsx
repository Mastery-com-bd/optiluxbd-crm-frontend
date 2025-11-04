"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Settings,
    Globe,
    AppWindow,
    Monitor,
    User,
    Shuffle
} from "lucide-react";

const navItems = [
    {
        label: "General Settings",
        href: "/dashboard/admin/settings/general-settings/profile",
        icon: Settings,
    },
    {
        label: "Website Settings",
        href: "/dashboard/admin/settings/website-settings/company-settings",
        icon: Globe,
    },
    {
        label: "App Settings",
        href: "/dashboard/admin/settings/app-settings/main",
        icon: AppWindow,
    },
    {
        label: "System Settings",
        href: "/dashboard/admin/settings/system-settings/configuration",
        icon: Monitor,
    },
    {
        label: "Financial Settings",
        href: "/dashboard/admin/settings/financial-settings/payment",
        icon: User,
    },
    {
        label: "Other Settings",
        href: "/dashboard/admin/settings/other-settings/misc",
        icon: Shuffle,
    },
];

export const SettingsNavbar = () => {
    const pathname = usePathname();

    return (
        <nav className="border-b bg-white hidden lg:block">
            <ul className="flex space-x-6 px-6 py-2 items-center">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-1 pb-2 border-b-2 transition-colors",
                                    isActive
                                        ? "text-orange-500 border-orange-500 font-semibold"
                                        : "text-gray-600 hover:text-black border-transparent"
                                )}
                            >
                                <Icon size={16} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default SettingsNavbar;