"use client";

import {
  Copy,
  Edit2,
  LucideIcon,
  Mail,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  Trash2,
} from "lucide-react";
import CreateTemplete from "./createTemplete";

export interface MessageData {
  id: string;
  heading: string;
  channel: "WhatsApp" | "SMS" | "Email";
  channelIcon: LucideIcon
  content: string;
  usedCount: number;
  lastUsed: string;
}

// Mock Data
const mockMessages: MessageData[] = [
  {
    id: "1",
    heading: "Welcome New Lead",
    channel: "WhatsApp",
    channelIcon: MessageCircle,
    content:
      "Hello {LeadName}! 👋 Welcome to OptiluxBD. We have amazing products for you. Our agent will contact you soon!",
    usedCount: 245,
    lastUsed: "12/15/2024",
  },
  {
    id: "2",
    heading: "Order Confirmation",
    channel: "SMS",
    channelIcon: MessageSquare,
    content:
      "Dear {CustomerName}, your order #{OrderID} for ৳{Amount} has been confirmed. Expected delivery: {Date}. Track: optiluxbd.com/",
    usedCount: 1842,
    lastUsed: "12/16/2024",
  },
  {
    id: "3",
    heading: "Payment Reminder",
    channel: "SMS",
    channelIcon: MessageSquare,
    content:
      "Hi {CustomerName}, your payment of ৳{Amount} for Order #{OrderID} is pending. Please pay to avoid cancellation.",
    usedCount: 567,
    lastUsed: "12/14/2024",
  },
  {
    id: "4",
    heading: "Product Promotion",
    channel: "Email",
    channelIcon: Mail,
    content:
      "Dear {CustomerName}, We have a special offer on {Product}! Get it now at a discounted price of ৳{Amount}. Offer valid till {Date}. Shop now: optiluxbd.com",
    usedCount: 423,
    lastUsed: "12/12/2024",
  },
  {
    id: "4",
    heading: "Delivery Update",
    channel: "WhatsApp",
    channelIcon: MessageCircle,
    content:
      "Hello {CustomerName}! 📦 Your order #{OrderID} is out for delivery today. Our courier will reach you soon. Amount to pay: ৳{Amount}",
    usedCount: 423,
    lastUsed: "12/12/2024",
  },
  {
    id: "4",
    heading: "Follow-up Call",
    channel: "SMS",
    channelIcon: MessageSquare,
    content:
      "Hi {LeadName}, thanks for your interest in {Product}. Our agent tried to reach you. Please call back at 09678-123456.",
    usedCount: 789,
    lastUsed: "12/12/2024",
  },
  {
    id: "4",
    heading: "Shipping Delay Notice",
    channel: "Email",
    channelIcon: Mail,
    content:
      "Dear {CustomerName}, We have a special offer on {Product}! Get it now at a discounted price of ৳{Amount}. Offer valid till {Date}. Shop now: optiluxbd.com",
    usedCount: 156,
    lastUsed: "12/12/2024",
  },
  {
    id: "4",
    heading: "Thank You Message",
    channel: "WhatsApp",
    channelIcon: MessageCircle,
    content:
      "Dear {CustomerName}, We have a special offer on {Product}! Get it now at a discounted price of ৳{Amount}. Offer valid till {Date}. Shop now: optiluxbd.com",
    usedCount: 2103,
    lastUsed: "12/12/2024",
  },
];

const Templates = () => {
  const getChannelStyle = (channel: MessageData["channel"]) => {
    switch (channel) {
      case "WhatsApp":
        return {
          badgeBg: "bg-[#00C95033]",
          badgeText: "text-[#25D366]",
          icon: <MessageCircle size={16} className="mr-1" />,
        };
      case "SMS":
        return {
          badgeBg: "bg-[#2B7FFF33]",
          badgeText: "text-[#3B82F6]",
          icon: <MessageSquareText size={16} className="mr-1" />,
        };
      case "Email":
        return {
          badgeBg: "bg-[#AD46FF33]",
          badgeText: "text-[#A855F7]",
          icon: <Mail size={16} className="mr-1" />,
        };
      default:
        return {
          badgeBg: "bg-[#00C95033]",
          badgeText: "text-gray-600",
          icon: <MessageCircle size={16} className="mr-1" />,
        };
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <CreateTemplete />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockMessages.map((msg, i) => (
          <div
            key={i}
            className="bg-black/5 rounded-4xl p-6 shadow-sm  border border-white/15 relative min-h-[220px] flex flex-col justify-between">
            {/* Header with Badge */}
            <h2 className="text-white text-lg font-semibold mb-2">
              {msg.heading}
            </h2>
            <div className="flex justify-start mb-4">
              <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                  getChannelStyle(msg.channel).badgeBg
                } ${getChannelStyle(msg.channel).badgeText}`}>
               <msg.channelIcon size={16}/> {msg.channel}
              </span>
            </div>

            {/* Content */}
            <p className="text-[#B4B4B8] text-sm leading-relaxed mb-4 border border-[#FFFFFF1A] rounded-3xl p-3">
              {msg.content}
            </p>

            {/* Footer Stats */}
            <div className="flex items-center justify-between text-xs text-[#B4B4B8] font-light mt-auto">
              <span>Used {msg.usedCount} times</span>
              <div className="flex items-center gap-4">
                <span>Last: {msg.lastUsed}</span>
              </div>
            </div>

            {/* Action Buttons - Edit, Copy, Delete */}
            <div className="flex items-center gap-2 mt-4">
              {/* Edit Button */}
              <button className="h-8 w-full bg-white/10 rounded-full border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Edit2 size={14} />
                <span>Edit</span>
              </button>

              {/* Copy Button */}
              <button className="h-8 w-full bg-white/10 rounded-full border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Copy size={14} />
                Duplicate
              </button>

              {/* Delete Button */}
              <button className="h-8 w-[100px] bg-[rgba(251,44,54,0.20)] rounded-full border border-white/10 flex items-center justify-center text-[#FF4545] transition-colors cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
