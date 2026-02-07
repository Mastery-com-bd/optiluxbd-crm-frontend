/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { CheckCircle, ArrowRight, Download, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Success() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Confetti animation
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full shadow-2xl border-none">
                <CardContent className="p-8 md:p-12 text-center space-y-6">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <CheckCircle className="w-24 h-24 text-green-500 relative animate-bounce" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            Payment Successful! <span className="">🎉</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Your organization has been created successfully
                        </p>
                    </div>

                    {/* Details */}
                    <Card className="effect ">
                        <CardContent className="p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-100">Transaction ID</span>
                                <span className="text-sm font-mono font-semibold text-gray-100">
                                    TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-100">Date & Time</span>
                                <span className="text-sm font-semibold text-gray-100">
                                    {new Date().toLocaleString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-100">Status</span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold">
                                    <CheckCircle className="w-3 h-3" />
                                    Completed
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Information Box */}
                    <div className="effect  rounded-lg p-4 text-left">
                        <div className="flex gap-3">
                            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-blue-900">
                                    Confirmation email sent
                                </p>
                                <p className="text-xs text-blue-700">
                                    We&apos;ve sent a confirmation email with your organization details and login credentials. Please check your inbox.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Button asChild className="flex-1 h-12" size="lg">
                            <Link href="/dashboard">
                                Go to Dashboard
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="flex-1 h-12" size="lg">
                            <Link href="#">
                                <Download className="w-4 h-4 mr-2" />
                                Download Receipt
                            </Link>
                        </Button>
                    </div>

                    {/* Footer Text */}
                    <p className="text-xs text-muted-foreground pt-4">
                        Need help? Contact our support team at{" "}
                        <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                            support@example.com
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
