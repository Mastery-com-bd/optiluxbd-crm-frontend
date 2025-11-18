"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotifications } from "@/hooks/useNotifications";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2, XCircle, Wifi, WifiOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function TestNotificationsPage() {
  const {
    notifications,
    unreadCount,
    isConnected,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetch,
  } = useNotifications();

  const [testingApi, setTestingApi] = useState(false);

  // Test if token is accessible
  const testTokenAccess = () => {
    const cookies = document.cookie.split("; ");
    const accessTokenCookie = cookies.find((c) => c.startsWith("token="));
    if (accessTokenCookie) {
      const token = accessTokenCookie.split("=")[1];
      toast.success("✅ Token found in cookies!", {
        description: `Token: ${token.substring(0, 20)}...`,
      });
      return true;
    } else {
      toast.error("❌ No token found in cookies!", {
        description: "You might need to log in first.",
      });
      return false;
    }
  };

  // Test API connection
  const testApiConnection = async () => {
    setTestingApi(true);
    const hasToken = testTokenAccess();
    
    if (!hasToken) {
      setTestingApi(false);
      return;
    }

    try {
      await refetch();
      toast.success("✅ API connection successful!", {
        description: `Loaded ${notifications.length} notifications`,
      });
    } catch (error) {
      toast.error("❌ API connection failed!", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setTestingApi(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notification System Testing</h1>
        <p className="text-muted-foreground mt-2">
          Test your notification implementation end-to-end
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WebSocket Status</CardTitle>
            {isConnected ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isConnected ? "Connected" : "Disconnected"}
            </div>
            <Badge variant={isConnected ? "default" : "destructive"} className="mt-2">
              {isConnected ? "Live Updates Active" : "No Connection"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {unreadCount} unread
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loading Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "Loading..." : "Ready"}
            </div>
            <Badge variant={isLoading ? "secondary" : "default"} className="mt-2">
              {isLoading ? "Fetching Data" : "Data Loaded"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Test Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🧪 Test Actions</CardTitle>
          <CardDescription>
            Run these tests to verify your notification system is working
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Button onClick={testTokenAccess} variant="outline" className="w-full">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Test Cookie Token Access
            </Button>

            <Button
              onClick={testApiConnection}
              variant="outline"
              className="w-full"
              disabled={testingApi}
            >
              {testingApi ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wifi className="mr-2 h-4 w-4" />
              )}
              Test API Connection
            </Button>

            <Button
              onClick={() => refetch()}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              Refetch Notifications
            </Button>

            <Button
              onClick={() => {
                markAllAsRead();
                toast.success("Marked all as read");
              }}
              variant="outline"
              className="w-full"
              disabled={unreadCount === 0}
            >
              Mark All as Read ({unreadCount})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>📬 Current Notifications</CardTitle>
          <CardDescription>
            {notifications.length === 0
              ? "No notifications yet. Try triggering some from your backend!"
              : `Showing ${notifications.length} notifications`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Loading notifications...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No notifications found.</p>
              <p className="text-sm mt-2">
                Check that your backend is running and sending notifications.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between p-4 rounded-lg border ${
                    !notification.isRead ? "bg-blue-50 border-blue-200" : "bg-background"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{notification.title}</h4>
                      {!notification.isRead && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.isRead && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          markAsRead(notification.id);
                          toast.success("Marked as read");
                        }}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        deleteNotification(notification.id);
                        toast.success("Notification deleted");
                      }}
                    >
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Debug Information</CardTitle>
          <CardDescription>
            Technical details for troubleshooting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">API URL:</span>
              <span className="font-semibold">
                {process.env.NEXT_PUBLIC_BASE_API || "Not configured"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">WebSocket URL:</span>
              <span className="font-semibold">
                {process.env.NEXT_PUBLIC_BASE_API?.replace("/api/v1", "") || "Not configured"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Connection Status:</span>
              <span className={isConnected ? "text-green-600" : "text-red-600"}>
                {isConnected ? "✓ Connected" : "✗ Disconnected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Notifications Count:</span>
              <span className="font-semibold">{notifications.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unread Count:</span>
              <span className="font-semibold">{unreadCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
