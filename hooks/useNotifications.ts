"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import type { Notification } from "@/types/notifications";
import { config } from "@/config";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);

  const getAuthToken = () => {
    if (typeof document === "undefined") return null;
    const cookies = document.cookie.split("; ");
    console.log(document.cookie);
    // Try common names; handle '=' inside value by splitting at first '='
    const names = ["accessToken", "access_token", "token"];
    for (const name of names) {
      const cookie = cookies.find((c) => c.startsWith(name + "="));
      if (cookie) {
        const idx = cookie.indexOf("=");
        return decodeURIComponent(cookie.substring(idx + 1));
      }
    }
    return null;
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(
        `${config.next_public_base_api}/notifications?limit=50`,
        { credentials: "include" },
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data.notifications);
        setUnreadCount(
          data.data.notifications.filter((n: Notification) => !n.isRead).length,
        );
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: number) => {
    // server authenticates via cookie; no JS token required
    try {
      const response = await fetch(
        `${config.next_public_base_api}/notifications/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    // server authenticates via cookie; no JS token required
    try {
      const response = await fetch(
        `${config.next_public_base_api}/notifications/read-all`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  }, []);

  const deleteNotification = useCallback(
    async (id: number) => {
      // server authenticates via cookie; no JS token required
      try {
        const response = await fetch(
          `${config.next_public_base_api}/notifications/${id}`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );

        if (response.ok) {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
          const deleted = notifications.find((n) => n.id === id);
          if (deleted && !deleted.isRead) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        }
      } catch (error) {
        console.error("Failed to delete notification:", error);
      }
    },
    [notifications],
  );

  // ============ SOCKET.IO SETUP ==============
  useEffect(() => {
    const token = getAuthToken();

    console.log("🔄 Initializing notifications...");
    // Always try to fetch notifications; server auth via cookie (credentials: include)
    fetchNotifications();

    // Construct WebSocket URL properly
    const wsUrl = config.next_public_ws_url || "http://localhost:5000";

    console.log("🔌 Connecting to WebSocket:", wsUrl);
    if (token)
      console.log(
        "🔑 Using token (js-visible):",
        token.substring(0, 20) + "...",
      );

    const socket = io(wsUrl, {
      // If a JS-visible token exists pass it; otherwise rely on cookie-based auth via polling
      auth: token ? { token } : undefined,
      // Use polling first so browser sends cookies on handshake (polling uses XHR)
      transports: ["polling", "websocket"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 10000,
      path: "/socket.io",
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ WebSocket connected - Socket ID:", socket.id);
      setIsConnected(true);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ WebSocket connection error:", error.message);
      console.error("Error details:", error);
      setIsConnected(false);
    });

    socket.on("error", (error) => {
      console.error("❌ WebSocket error:", error);
    });

    // NEW NOTIFICATION
    socket.on("notification:new", (notification: Notification) => {
      console.log("📬 New notification received:", notification);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Show browser notification if permission granted
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/icon-192x192.png",
          tag: `notification-${notification.id}`,
        });
      }
    });

    // UNREAD COUNT
    socket.on("notification:unreadCount", ({ count }: { count: number }) => {
      console.log("📊 Unread count updated:", count);
      setUnreadCount(count);
    });

    // DELETED
    socket.on(
      "notification:deleted",
      ({ notificationId }: { notificationId: number }) => {
        console.log("🗑️ Notification deleted:", notificationId);
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      },
    );

    socket.on("disconnect", (reason) => {
      console.log("⚠️ WebSocket disconnected:", reason);
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      console.log("🔌 Cleaning up WebSocket connection");
      socket.disconnect();
    };
  }, [fetchNotifications]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return {
    notifications,
    unreadCount,
    isConnected,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch: fetchNotifications,
  };
}
