"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShieldCheck, Bell, Grid, User, Globe } from "lucide-react";


export type SettingsNavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
    category: "general" | "website";
};

export const settingsNavLinks: SettingsNavItem[] = [
    {
        label: "Profile",
        href: "/dashboard/admin/settings/general-settings/profile",
        icon: User,
        category: "general",
    },
    {
        label: "Security",
        href: "/dashboard/admin/settings/general-settings/security",
        icon: ShieldCheck,
        category: "general",
    },
    {
        label: "Notifications",
        href: "/dashboard/admin/settings/general-settings/notifications",
        icon: Bell,
        category: "general",
    },
    {
        label: "Connected Apps",
        href: "/dashboard/admin/settings/general-settings/connected-apps",
        icon: Grid,
        category: "general",
    },
    {
        label: "Company Settings",
        href: "/dashboard/admin/settings/website-settings/company-settings",
        icon: Globe,
        category: "website",
    },
];
const SettingsSidebar = () => {
    const pathname = usePathname();

    const currentGroup = pathname.includes("general-settings")
        ? "general"
        : pathname.includes("website-settings")
            ? "website"
            : null;

    const filteredLinks = settingsNavLinks.filter(
        (link) => link.category === currentGroup
    );

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <h3 className="text-lg font-semibold capitalize">
                    {currentGroup === "general"
                        ? "General Settings"
                        : currentGroup === "website"
                            ? "Website Settings"
                            : ""}
                </h3>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {filteredLinks.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                                        isActive
                                            ? "bg-orange-500 text-yellow-100 font-medium"
                                            : "hover:bg-muted text-gray-700"
                                    )}
                                >
                                    <Icon size={16} />
                                    <span>{label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
};

export default SettingsSidebar;