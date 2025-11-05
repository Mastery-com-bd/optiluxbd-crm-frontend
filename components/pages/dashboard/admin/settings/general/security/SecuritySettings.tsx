"use client";

import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, ShieldAlert } from "lucide-react";
import { useState } from "react";

const SecuritySettings = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [authenticator, setAuthenticator] = useState(true);

    return (
        <section className="space-y-6">
            <h2 className="text-lg font-semibold">Security Settings</h2>
            <hr />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Password */}
                <Card>
                    <CardHeader className="pb-2 font-medium">Password</CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Last Changed 03 Jan 2025, 09:00 AM
                        </p>
                        <Button variant="outline">Change Password</Button>
                    </CardContent>
                </Card>

                {/* 2FA */}
                <Card>
                    <CardHeader className="pb-2 font-medium flex items-center justify-between">
                        Two Factor
                        <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Receive codes via SMS or email every time you login
                        </p>
                        <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                            {twoFactorEnabled ? "Enabled" : "Disabled"}
                        </span>
                    </CardContent>
                </Card>

                {/* Google Authenticator */}
                <Card>
                    <CardHeader className="pb-2 font-medium flex items-center justify-between">
                        Google Authenticator
                        <Switch checked={authenticator} onCheckedChange={setAuthenticator} />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Google Authenticator adds an extra layer of security
                        </p>
                        <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                            {authenticator ? "Connected" : "Not Connected"}
                        </span>
                    </CardContent>
                </Card>

                {/* Phone Number Verification */}
                <Card>
                    <CardHeader className="pb-2 font-medium flex items-center gap-2">
                        Phone Number Verification
                        <BadgeCheck className="text-green-600 w-4 h-4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm font-medium text-green-700">
                            Verified Mobile Number: +99264710583
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Change</Button>
                            <Button variant="link" size="sm" className="text-red-600">Remove</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Email Verification */}
                <Card>
                    <CardHeader className="pb-2 font-medium flex items-center gap-2">
                        Email Verification
                        <BadgeCheck className="text-green-600 w-4 h-4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm font-medium text-green-700">
                            Verified Email: info@example.com
                        </p>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Change</Button>
                            <Button variant="link" size="sm" className="text-red-600">Remove</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Device Management */}
                <Card>
                    <CardHeader className="pb-2 font-medium">Device Management</CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Last Changed 15 Jan 2025, 12:00 AM
                        </p>
                        <Button variant="outline">Manage</Button>
                    </CardContent>
                </Card>

                {/* Account Activity */}
                <Card>
                    <CardHeader className="pb-2 font-medium">Account Activity</CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Last Changed 20 Jan 2025, 11:30 AM
                        </p>
                        <Button variant="outline">View</Button>
                    </CardContent>
                </Card>

                {/* Deactivate Account */}
                <Card>
                    <CardHeader className="pb-2 font-medium">Deactivate Account</CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Last Changed 04 Mar 2023, 08:40 AM
                        </p>
                        <Button variant="destructive">Deactivate</Button>
                    </CardContent>
                </Card>

                {/* Delete Account */}
                <Card>
                    <CardHeader className="pb-2 font-medium">Delete Account</CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Last Changed 13 Mar 2023, 02:40 PM
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default SecuritySettings;