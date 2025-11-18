"use client"; // Remove this line if using Pages Router

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

  // Get auth token from cookies
  const getAuthToken = () => {
    if (typeof document === "undefined") return null;
    
    const cookies = document.cookie.split("; ");
    console.log(cookies)
    const accessTokenCookie = cookies.find((c) => c.startsWith("accessToken="));
    
    if (accessTokenCookie) {
      return accessTokenCookie.split("=")[1];
    }
    
    return null;
  };

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    const token = getAuthToken();
    console.log(token)
    // if (!token) return;

    try {
      const response = await fetch(
        `${config.next_public_base_api}/notifications?limit=50`,
        {
          credentials: "include",
        },
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

  // Mark notification as read
  const markAsRead = useCallback(async (id: number) => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(
        `${config.next_public_base_api}/notifications/${id}/read`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await fetch(
        `${config.next_public_base_api}/notifications/read-all`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // Delete notification
  const deleteNotification = useCallback(
    async (id: number) => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const response = await fetch(
          `${config.next_public_base_api}/notifications/${id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${token}`,
            },
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

  // Setup WebSocket connection
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Initial fetch
    fetchNotifications();

    // Connect WebSocket - Use the base API URL without /api suffix for WebSocket
    const wsUrl = config.next_public_base_api?.replace("/api", "") || "http://localhost:5000";
    
    const socket = io(wsUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    });

    socket.on("notification", (notification: Notification) => {
      console.log("📬 New notification:", notification);
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // Show browser notification if permitted
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/icon-192x192.png",
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    });

    socketRef.current = socket;

    // Cleanup
    return () => {
      socket.disconnect();
    };
  }, [fetchNotifications]);

  // Request notification permission
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
