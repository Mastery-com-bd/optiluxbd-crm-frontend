import { Card } from "@/components/ui/card";
import {
  Bell,
  Building2,
  Database,
  Link2,
  LucideIcon,
  Mail,
  MoveRight,
  Users,
} from "lucide-react";
import Link from "next/link";

type TSettingsCard = {
  icon: LucideIcon;
  background: string;
  textColor: string;
  title: string;
  description: string;
  path: string;
  tags: string[];
};

const settingsCardData: TSettingsCard[] = [
  {
    icon: Building2,
    background: "bg-[rgba(255,107,0,0.13)]",
    textColor: "text-[#FF6B00]",
    title: "General Settings",
    description:
      "Company profile, currency, timezone, and regional preferences",
    path: "/dashboard/settings/general",
    tags: ["Company Name", "Logo Upload", "Currency", "Timezone"],
  },
  {
    icon: Users,
    background: "bg-[rgba(42,133,255,0.10)]",
    textColor: "text-[#2A85FF]",
    title: "Users & Roles",
    description: "Manage user accounts, roles, and permission settings",
    path: "/dashboard/settings/users&Roles",
    tags: ["User Management", "Role Permission", "Access Control"],
  },
  {
    icon: Mail,
    background: "bg-[rgba(0,166,86,0.13)]",
    textColor: "text-success",
    title: "Email & SMS Settings",
    description: "Configure SMTP, SMS gateway, and notification templates",
    path: "/dashboard/settings/email&sms",
    tags: ["SMTP Setup", "SMS Gateway", "Email Templates"],
  },
  {
    icon: Bell,
    background: "bg-[rgba(127,95,255,0.13)]",
    textColor: "text-[#7F5FFF]",
    title: "Notification Settings",
    description: "Manage notification triggers and delivery channels",
    path: "/dashboard/settings/notification",
    tags: ["Email Alerts", "SMS Alert", "Push Notification"],
  },
  {
    icon: Database,
    background: "bg-[rgba(255,157,52,0.13)]",
    textColor: "text-brand",
    title: "Backup & Restore",
    description: "Database backups, scheduling, and restoration options",
    path: "/dashboard/settings/backup&restore",
    tags: ["Auto Backup", "Manual backup", "Restore Points"],
  },
  {
    icon: Link2,
    background: "bg-[rgba(42,133,255,0.13)]",
    textColor: "text-[#2A85FF]",
    title: "API & Integrations",
    description: "Third-party APIs, courier services, and payment gateways",
    path: "/dashboard/settings/api-Integration",
    tags: ["Courier APIs", "Payment Gateways", "Webhooks"],
  },
];

const SettingsCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-6">
      {settingsCardData.map((settingCard, i) => (
        <Card key={i} className="w-full relative bg-white/5 rounded-3xl">
          {/* top and borrom border */}
          <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />

          {/* main content */}
          <div className="space-y-3">
            {/* upper sectionj */}
            <div className="flex justify-between items-center">
              <div
                className={`p-3 rounded-2xl relative ${settingCard.background}`}
              >
                {/* top and borrom border */}
                <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                <settingCard.icon className={` ${settingCard.textColor}`} />
              </div>
              <Link
                href={settingCard.path}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-3xl relative bg-[rgba(64,64,64,0.10)] text-[#B1B1B1] text-xs"
              >
                <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/15 rounded-tl-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/15 rounded-br-3xl pointer-events-none" />
                Configure <MoveRight size={18} />
              </Link>
            </div>
            {/* title and description */}
            <div className="space-y-2">
              <h3 className="text-[#FDFDFD] ">{settingCard.title}</h3>
              <p className="text-[#B1B1B1] text-sm">
                {settingCard.description}
              </p>
            </div>

            {/* tag section */}
            <div className="flex items-center gap-2">
              {settingCard.tags.map((tag, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-3xl relative bg-[rgba(64,64,64,0.10)] text-[#FDFDFD] text-xs"
                >
                  <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/15 rounded-tl-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/15 rounded-br-3xl pointer-events-none" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SettingsCards;
