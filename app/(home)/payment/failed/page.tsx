
"use client";

import { XCircle, ArrowLeft, RefreshCw, Mail, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Failed() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="max-w-2xl w-full shadow-2xl border-none">
        <CardContent className="p-8 md:p-12 text-center space-y-6">
          {/* Failed Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <XCircle className="w-24 h-24 text-red-500 relative animate-shake" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-red-900">
              Payment Failed
            </h1>
            <p className="text-lg text-muted-foreground">
              Unfortunately, we couldn&apos;t process your payment
            </p>
          </div>

          {/* Error Details */}
          <Card className=" effect">
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold">
                  <XCircle className="w-3 h-3" />
                  Failed
                </span>
              </div>
              <div className="pt-2 border-t border-red-300">
                <div className="flex items-start gap-2 text-left">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Error Reason</p>
                    <p className="text-xs text-red-700 mt-1">
                      Payment was declined by your bank. Please check your card details or try a different payment method.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Reasons */}
          <div className="effect  rounded-lg p-4 text-left">
            <h3 className="text-sm font-semibold text-yellow-900 mb-2">
              Common reasons for payment failure:
            </h3>
            <ul className="text-xs text-yellow-800 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Insufficient funds in your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Incorrect card details or expired card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Payment limit exceeded</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 mt-0.5">•</span>
                <span>Network or connectivity issues</span>
              </li>
            </ul>
          </div>

          {/* Information Box */}
          <div className="effect rounded-lg p-4 text-left">
            <div className="flex gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-900">
                  No charges applied
                </p>
                <p className="text-xs text-blue-700">
                  Don&apos;t worry! Your account has not been charged. You can try again with a different payment method.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1 h-12" size="lg">
              <Link href="/dashboard/organizations/create-organizations">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 h-12" size="lg">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
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

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
