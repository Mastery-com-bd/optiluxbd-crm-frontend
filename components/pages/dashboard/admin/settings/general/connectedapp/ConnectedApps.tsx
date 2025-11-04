"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

// Common logo for all apps
const sharedImage =
    "https://i.ibb.co.com/Xfx69qYG/icon-256x256.png";

type AppConnection = {
    id: string;
    name: string;
    connected: boolean;
};

const initialApps: AppConnection[] = [
    { id: "google-calendar", name: "Google Calendar", connected: true },
    { id: "dropbox", name: "Dropbox", connected: true },
    { id: "slack", name: "Slack", connected: false },
    { id: "gmail", name: "Gmail", connected: true },
    { id: "github", name: "Github", connected: false },
];

export default function ConnectedApps() {
    const [apps, setApps] = useState<AppConnection[]>(initialApps);

    const toggleConnection = (id: string) => {
        setApps((prev) =>
            prev.map((app) =>
                app.id === id ? { ...app, connected: !app.connected } : app
            )
        );
    };

    return (
        <section className="space-y-6">
            <h2 className="text-lg font-semibold">Connected Apps</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {apps.map((app) => (
                    <Card
                        key={app.id}
                        className="flex items-center justify-between px-4 py-3"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={sharedImage}
                                alt={app.name}
                                width={36}
                                height={36}
                                className="rounded"
                            />
                            <div className="space-y-1">
                                <p className="font-medium">{app.name}</p>
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${app.connected
                                            ? "bg-green-100 text-green-700 border border-green-500"
                                            : "bg-green-50 text-green-600 border border-green-400"
                                        }`}
                                >
                                    {app.connected ? "Connected" : "Connect"}
                                </span>
                            </div>
                        </div>
                        <div>
                            <Switch
                                checked={app.connected}
                                onCheckedChange={() => toggleConnection(app.id)}
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </section>
    );
}