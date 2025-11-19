/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"; // Remove this if using Pages Router

import { useEffect, useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { config } from "@/config";
import { urlBase64ToUint8Array } from "@/lib/utils";

export function NotificationBell() {
  const {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
    isConnected,
    isLoading,
    handleDeleteNotification,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
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
        }
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
        }
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
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
        aria-label="Notifications"
      >
        {/* Bell Icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-128 overflow-hidden">
            {/* Header */}
            <div className="p-2 space-y-3">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Notifications {unreadCount > 0 && `(${unreadCount})`}
                </h3>

                {/* Connection indicator */}
                <span
                  title={
                    isConnected
                      ? "Connected"
                      : isLoading
                      ? "Loading..."
                      : "Disconnected"
                  }
                  className={`w-3 h-3 rounded-full inline-block ${
                    isConnected
                      ? "bg-green-500"
                      : isLoading
                      ? "bg-yellow-400"
                      : "bg-gray-300 dark:bg-gray-500"
                  }`}
                ></span>
              </div>
              <div className="flex flex-row-reverse justify-between items-center">
                {/* Mark all as read */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMarkAllAsRead();
                  }}
                  disabled={unreadCount === 0}
                  className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Mark all read
                </button>

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
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No notifications yet
                </div>
              ) : (
                <div className="space-y-2 py-2">
                  {notifications.map((notification: any) => (
                    <div
                      key={notification.id}
                      className={`px-2 py-1 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        !notification.isRead
                          ? "bg-gray-200 dark:bg-gray-800"
                          : ""
                      }`}
                      onClick={() => {
                        handleMarkAsRead(notification.id);
                        if (notification.actionUrl) {
                          window.location.href = notification.actionUrl;
                          setIsOpen(false);
                        }
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteNotification(notification.id);
                          }}
                          className="text-gray-400 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 ml-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
