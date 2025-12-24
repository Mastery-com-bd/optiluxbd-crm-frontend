'use client'
import React from 'react';
import { Mail, MessageSquare, Bell, BarChart3, Save, SaveAll } from 'lucide-react';
import { Switch } from "@/components/ui/switch"; // Shadcn Switch use korle
import { Button } from "@/components/ui/button";
import ButtonComponent from '@/components/ui/ButtonComponent';

const settingsData = [
    {
        id: 1,
        title: "Email Notifications",
        description: "Receive email alerts for important updates",
        icon: <Mail className="w-5 h-5 text-orange-500" />,
        iconBg: "bg-orange-500/10",
        borderCol: "border-orange-500/20",
        type: "Email"
    },
    {
        id: 2,
        title: "SMS Notifications",
        description: "Get text messages for urgent matters",
        icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
        iconBg: "bg-blue-500/10",
        borderCol: "border-blue-500/20",
        type: "SMS"
    },
    {
        id: 3,
        title: "Lead Assignment Alerts",
        description: "Notify when new leads are assigned",
        icon: <Bell className="w-5 h-5 text-green-500" />,
        iconBg: "bg-green-500/10",
        borderCol: "border-green-500/20",
        type: "Lead"
    },
    {
        id: 4,
        title: "Team Performance Reports",
        description: "Weekly performance summaries",
        icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
        iconBg: "bg-purple-500/10",
        borderCol: "border-purple-500/20",
        type: "Reports"
    }
];

const NotificationSettings = () => {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white-10 p-8 rounded-3xl  max-w-6xl mx-auto shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-8">Notifications</h2>

            <div className="flex flex-col gap-x-12 gap-y-6">
                {settingsData.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center justify-between p-4 rounded-2xl border ${item.borderCol} bg-white/5 hover:bg-white/10 transition-all duration-300`}
                    >
                        <div className="flex items-center gap-4">
                            {/* Icon Container */}
                            <div className={`p-3 rounded-full ${item.iconBg} flex items-center justify-center`}>
                                {item.icon}
                            </div>

                            {/* Text Content */}
                            <div>
                                <h4 className="text-white font-medium text-sm md:text-base">{item.title}</h4>
                                <p className="text-gray-400 text-xs md:text-sm">{item.description}</p>
                            </div>
                        </div>

                        {/* Switch Logic */}
                        <div className="flex items-center gap-4">
                            {/* Static text for SMS/Code if needed like the image */}
                            {item.type === "SMS" && (
                                <span className="text-xs text-gray-500 hidden lg:block">{">2A85IFF"}</span>
                            )}
                            <Switch
                                defaultChecked
                                className="data-[state=checked]:bg-orange-500"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Save Button Section */}
            <div className="mt-12 flex justify-end">
                <ButtonComponent
                    varient='yellow'
                    icon={Save}
                    buttonName='Save Settings'
                    clasName='py-3'
                />
            </div>
        </div>
    );
};

export default NotificationSettings;