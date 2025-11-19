/**
 * BROWSER CONSOLE TESTING SNIPPETS
 * 
 * Copy and paste these into your browser console (F12)
 * while on any page of your application to test notifications
 */

// ===== TEST 1: Check if token exists in cookies =====
(() => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((c) => c.startsWith("accessToken="));
  
  if (accessTokenCookie) {
    const token = accessTokenCookie.split("=")[1];
    console.log("✅ Token found:", token.substring(0, 30) + "...");
    return true;
  } else {
    console.error("❌ No accessToken cookie found. Please log in first.");
    return false;
  }
})();

// ===== TEST 2: Manually fetch notifications =====
(async () => {
  const cookies = document.cookie.split("; ");
  const accessTokenCookie = cookies.find((c) => c.startsWith("accessToken="));
  
  if (!accessTokenCookie) {
    console.error("❌ No token found. Please log in first.");
    return;
  }
  
  const token = accessTokenCookie.split("=")[1];
  const apiUrl = "https://optiluxbd-crm-backend-prisma.onrender.com/api/v1";
  
  try {
    const response = await fetch(`${apiUrl}/notifications?limit=50`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ Notifications fetched:", data);
      console.log("Total notifications:", data.data.notifications.length);
      console.log("Unread count:", data.data.notifications.filter(n => !n.isRead).length);
    } else {
      console.error("❌ Failed to fetch notifications:", response.status, response.statusText);
      const error = await response.text();
      console.error("Error details:", error);
    }
  } catch (error) {
    console.error("❌ Network error:", error);
  }
})();

// ===== TEST 3: Check all cookies =====
(() => {
  console.log("🍪 All cookies:");
  const cookies = document.cookie.split("; ");
  cookies.forEach(cookie => {
    const [name, value] = cookie.split("=");
    console.log(`  ${name}:`, value.substring(0, 50) + (value.length > 50 ? "..." : ""));
  });
})();

// ===== TEST 4: Monitor WebSocket events =====
// Note: This needs to be run BEFORE the WebSocket connects
// So run it, then refresh the page
(() => {
  const originalIo = window.io;
  if (!originalIo) {
    console.warn("⚠️ Socket.io not loaded yet. Load the page first, then try again.");
    return;
  }
  
  console.log("🔍 WebSocket monitoring enabled. Events will be logged below:");
})();

// ===== TEST 5: Simulate notification (requires backend access) =====
// This is a template - adjust the userId and API endpoint as needed
(async () => {
  console.log("⚠️ This requires admin access to send notifications.");
  console.log("Use this as a reference for testing from backend or Postman:");
  
  const exampleRequest = {
    method: "POST",
    url: "https://optiluxbd-crm-backend-prisma.onrender.com/api/v1/notifications",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_ADMIN_TOKEN_HERE"
    },
    body: {
      userId: 1, // Replace with your user ID
      title: "Test Notification",
      message: "This is a test notification",
      type: "info"
    }
  };
  
  console.log("cURL command:");
  console.log(`
curl -X POST '${exampleRequest.url}' \\
  -H 'Content-Type: application/json' \\
  -H 'Authorization: Bearer YOUR_ADMIN_TOKEN' \\
  -d '${JSON.stringify(exampleRequest.body, null, 2)}'
  `);
})();

// ===== TEST 6: Check if browser notifications are enabled =====
(() => {
  if (!("Notification" in window)) {
    console.log("❌ This browser doesn't support notifications");
  } else if (Notification.permission === "granted") {
    console.log("✅ Browser notifications are enabled");
    // Test browser notification
    new Notification("Test Notification", {
      body: "If you see this, browser notifications work!",
      icon: "/favicon.ico"
    });
  } else if (Notification.permission === "denied") {
    console.log("❌ Browser notifications are blocked");
  } else {
    console.log("⚠️ Browser notification permission not granted");
    console.log("Click to request permission:");
    Notification.requestPermission().then(permission => {
      console.log("Permission result:", permission);
    });
  }
})();

// ===== TEST 7: Check environment variables =====
(() => {
  console.log("🔧 Environment configuration:");
  console.log("  API URL:", process.env.NEXT_PUBLIC_BASE_API || "Not found in client");
  // Note: In Next.js, env vars are only available if prefixed with NEXT_PUBLIC_
})();
