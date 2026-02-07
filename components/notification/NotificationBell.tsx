/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { config } from "@/config";
import { urlBase64ToUint8Array } from "@/lib/utils";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationSvgComponent from "../svgIcon/NotificationSvgComponent";

export function NotificationBell() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isPushSupported, setIsPushSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [pushLoading, setPushLoading] = useState(false);
  // Check support and existing subscription on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const supported = "serviceWorker" in navigator && "PushManager" in window;
    setIsPushSupported(supported);

    if (!supported) return;

    // Check existing subscription
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => {
        setIsSubscribed(Boolean(sub));
      })
      .catch((err) => {
        console.error("push subscription check failed:", err);
      });
  }, []);

  // Subscribe to push: fetch VAPID key, call subscribe on service worker and POST to backend
  async function subscribeToPush() {
    if (!isPushSupported) return;
    setPushLoading(true);
    try {
      // Ensure service worker is ready
      const registration = await navigator.serviceWorker.ready;

      // Get VAPID public key from backend
      const res = await fetch(
        `${config.next_public_base_api}/notifications/push/vapid-key`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) throw new Error(`Failed to get VAPID key: ${res.status}`);
      const { data } = await res.json();
      const vapidKey = data?.publicKey || data?.vapidKey || data;
      if (!vapidKey) throw new Error("No VAPID key returned from server");

      const convertedKey = urlBase64ToUint8Array(vapidKey);

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });

      // Send subscription to backend
      const subRes = await fetch(
        `${config.next_public_base_api}/notifications/push/subscribe`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscription }),
        },
      );
      if (!subRes.ok) {
        const txt = await subRes.text();
        throw new Error(`Subscribe failed: ${subRes.status} ${txt}`);
      }

      setIsSubscribed(true);
    } catch (err) {
      // keep UI responsive
      setIsSubscribed(false);
    } finally {
      setPushLoading(false);
    }
  }

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild className="bg-transparent">
          <button className="relative bg-transparent border-none justify-center flex items-center w-10 h-9 gap-4 text-sm font-medium text-foreground/80 transition-all duration-200 cursor-pointer p-2 rounded-lg">
            {/* Glow SVG */}
            <NotificationSvgComponent />
            {/* Top-left border */}
            <div className="absolute top-0 left-px inset-1.5 border-l border-t border-white/20 rounded-tl-lg pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-1.5 border-r border-b border-white/20 rounded-br-lg pointer-events-none" />

            {/* Bottom gradient line */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-1.1rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>

            {/* Link text */}
            <Bell size={18} />
            {/* {unreadCount > 0 && (
            )} */}
            <span
              className="absolute top-2 right-2 bg-red-600 rounded-full h-2 w-2 border-white"
              style={{ borderWidth: "2px" }}
            />

            <span
              className={`absolute -top-1.5 -right-1.5 flex items-center justify-center text-[10px] font-bold text-white bg-red-600 rounded-full h-5 min-w-5 px-1 `}
            >
              99+
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-96 p-2 bg-white/5 backdrop-blur-2xl max-h-128 overflow-hidden"
          align="end"
        >
          <div>
            {/* Header */}
            <div className="p-2 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold ">Notifications</h3>

                {/* Connection indicator */}
              </div>
              <div className="flex flex-row-reverse justify-between items-center">
                {/* Mark all as read */}

                {/* Push subscribe UI */}
                {isPushSupported && (
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (isSubscribed) return;
                      await subscribeToPush();
                    }}
                    disabled={pushLoading || isSubscribed}
                    className="px-3 py-1 rounded bg-blue-600 text-white text-xs hover:opacity-90 disabled:opacity-60"
                  >
                    {pushLoading
                      ? "..."
                      : isSubscribed
                        ? "Push Enabled"
                        : "Enable Push"}
                  </button>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-700">
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No notifications yet
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
