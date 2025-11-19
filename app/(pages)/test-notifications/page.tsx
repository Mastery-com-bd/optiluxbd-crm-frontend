"use client";

import { useNotifications } from "@/hooks/useNotifications";
import { config } from "@/config";
import { useEffect, useState } from "react";

export default function TestNotificationsPage() {
  const { notifications, unreadCount, isConnected, isLoading, markAsRead, deleteNotification } = useNotifications();
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    // Intercept console logs
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      originalLog(...args);
      addLog(`LOG: ${args.join(" ")}`);
    };

    console.error = (...args) => {
      originalError(...args);
      addLog(`ERROR: ${args.join(" ")}`);
    };

    console.warn = (...args) => {
      originalWarn(...args);
      addLog(`WARN: ${args.join(" ")}`);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  const testBackendConnection = async () => {
    addLog("Testing backend connection...");
    try {
      const response = await fetch(`${config.next_public_base_api}/notifications`, {
        credentials: "include",
      });
      const data = await response.json();
      addLog(`✅ Backend response: ${response.status} - ${JSON.stringify(data).substring(0, 100)}`);
    } catch (error) {
      addLog(`❌ Backend connection failed: ${error}`);
    }
  };

  const testBrowserNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        addLog(`Notification permission: ${permission}`);
        if (permission === "granted") {
          new Notification("Test Notification", { 
            body: "This is a test notification",
            icon: "/icon-192x192.png"
          });
          addLog("✅ Test notification sent");
        }
      });
    } else {
      addLog("❌ Notifications not supported");
    }
  };

  const getCookies = () => {
    const cookies = document.cookie.split("; ");
    addLog(`Cookies found: ${cookies.length}`);
    cookies.forEach(cookie => {
      const [name] = cookie.split("=");
      addLog(`  - ${name}`);
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔧 Notification System Debug</h1>
        
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isConnected ? "bg-green-100" : "bg-red-100"}`}>
            <h3 className="font-bold text-sm mb-1">WebSocket</h3>
            <p className="text-2xl">{isConnected ? "✅" : "❌"}</p>
            <p className="text-xs">{isConnected ? "Connected" : "Disconnected"}</p>
          </div>
          
          <div className={`p-4 rounded-lg ${isLoading ? "bg-yellow-100" : "bg-green-100"}`}>
            <h3 className="font-bold text-sm mb-1">Loading</h3>
            <p className="text-2xl">{isLoading ? "⏳" : "✅"}</p>
            <p className="text-xs">{isLoading ? "Loading..." : "Ready"}</p>
          </div>
          
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold text-sm mb-1">Unread</h3>
            <p className="text-2xl">{unreadCount}</p>
            <p className="text-xs">notifications</p>
          </div>
          
          <div className="p-4 bg-purple-100 rounded-lg">
            <h3 className="font-bold text-sm mb-1">Total</h3>
            <p className="text-2xl">{notifications.length}</p>
            <p className="text-xs">notifications</p>
          </div>
        </div>

        {/* Configuration Info */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="font-bold mb-3">⚙️ Configuration</h2>
          <div className="space-y-1 text-sm font-mono">
            <p><strong>API URL:</strong> {config.next_public_base_api}</p>
            <p><strong>WebSocket URL:</strong> {config.next_public_base_api?.replace("/api", "")}</p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="font-bold mb-3">🧪 Tests</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={testBackendConnection}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Backend API
            </button>
            
            <button
              onClick={testBrowserNotification}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Browser Notification
            </button>
            
            <button
              onClick={getCookies}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Check Cookies
            </button>
            
            <button
              onClick={() => setLogs([])}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Logs
            </button>
          </div>
        </div>

        {/* Console Logs */}
        <div className="bg-black text-green-400 p-4 rounded-lg shadow mb-6 h-64 overflow-y-auto font-mono text-xs">
          <h2 className="font-bold mb-2 text-white">📋 Console Logs</h2>
          {logs.length === 0 ? (
            <p className="text-gray-500">No logs yet... Check browser console (F12)</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="mb-1">{log}</div>
            ))
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-3">📬 Notifications ({notifications.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-3 border rounded flex justify-between items-start ${
                    !n.isRead ? "bg-blue-50 border-blue-200" : "bg-white"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium">{n.title}</p>
                      {!n.isRead && (
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-2">
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(n.id)}
                      className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
