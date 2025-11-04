"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type CustomNotificationType = "Payment" | "Transaction" | "Email Verification" | "OTP" | "Activity" | "Account";
type ChannelType = "push" | "sms" | "email";

const initialCustomSettings: Record<CustomNotificationType, Record<ChannelType, boolean>> = {
    Payment: { push: true, sms: true, email: true },
    Transaction: { push: true, sms: true, email: true },
    "Email Verification": { push: true, sms: false, email: true },
    OTP: { push: true, sms: true, email: false },
    Activity: { push: true, sms: false, email: true },
    Account: { push: true, sms: false, email: false },
};

export function NotificationSettings() {
    const [generalSettings, setGeneralSettings] = useState({
        mobile: true,
        desktop: true,
        email: true,
        sms: true,
    });

    const [customSettings, setCustomSettings] = useState(initialCustomSettings);

    const toggleGeneral = (type: keyof typeof generalSettings) => {
        setGeneralSettings((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const toggleCustom = (
        notifyType: CustomNotificationType,
        channel: ChannelType
    ) => {
        setCustomSettings((prev) => ({
            ...prev,
            [notifyType]: {
                ...prev[notifyType],
                [channel]: !prev[notifyType][channel],
            },
        }));
    };

    return (
        <section className="space-y-6">
            {/* === Title === */}
            <h2 className="text-lg font-semibold">Notification Settings</h2>
            <hr />

            {/* === General Notifications === */}
            <div>
                <h3 className="text-md font-semibold">General Notifications</h3>
                <p className="text-sm text-muted-foreground">
                    Select notifications
                </p>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between border rounded px-4 py-3">
                        <span>Mobile Push Notifications</span>
                        <Switch
                            checked={generalSettings.mobile}
                            onCheckedChange={() => toggleGeneral("mobile")}
                        />
                    </div>

                    <div className="flex items-center justify-between border rounded px-4 py-3">
                        <span>Desktop Notifications</span>
                        <Switch
                            checked={generalSettings.desktop}
                            onCheckedChange={() => toggleGeneral("desktop")}
                        />
                    </div>

                    <div className="flex items-center justify-between border rounded px-4 py-3">
                        <span>Email Notifications</span>
                        <Switch
                            checked={generalSettings.email}
                            onCheckedChange={() => toggleGeneral("email")}
                        />
                    </div>

                    <div className="flex items-center justify-between border rounded px-4 py-3">
                        <span>SMS Notifications</span>
                        <Switch
                            checked={generalSettings.sms}
                            onCheckedChange={() => toggleGeneral("sms")}
                        />
                    </div>
                </div>
            </div>

            {/* === Custom Notifications === */}
            <div>
                <h3 className="text-md font-semibold mt-6">Custom Notifications</h3>
                <p className="text-sm text-muted-foreground mb-3">
                    Select when you will be notified when the following changes occur
                </p>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-muted text-xs text-muted-foreground uppercase">
                            <tr>
                                <th className="p-3 font-medium">Notification</th>
                                <th className="p-3 font-medium text-center">Push</th>
                                <th className="p-3 font-medium text-center">SMS</th>
                                <th className="p-3 font-medium text-center">Email</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {Object.keys(customSettings).map((key) => {
                                const notifyKey = key as CustomNotificationType;
                                return (
                                    <tr key={notifyKey} className="hover:bg-muted/30">
                                        <td className="p-3">{notifyKey}</td>
                                        <td className="p-3 text-center">
                                            <Switch
                                                checked={customSettings[notifyKey].push}
                                                onCheckedChange={() => toggleCustom(notifyKey, "push")}
                                            />
                                        </td>
                                        <td className="p-3 text-center">
                                            <Switch
                                                checked={customSettings[notifyKey].sms}
                                                onCheckedChange={() => toggleCustom(notifyKey, "sms")}
                                            />
                                        </td>
                                        <td className="p-3 text-center">
                                            <Switch
                                                checked={customSettings[notifyKey].email}
                                                onCheckedChange={() => toggleCustom(notifyKey, "email")}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default NotificationSettings;