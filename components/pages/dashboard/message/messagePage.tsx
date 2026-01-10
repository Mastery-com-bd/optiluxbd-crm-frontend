import {
  Copy,
  Edit2,
  Mail,
  MessageCircle,
  MessageSquareText,
  Trash2
} from "lucide-react";
import CreateTemplete from "./createTemplete";

// Interface for Message Data
export interface MessageData {
  id: string;
  heading: string;
  channel: "WhatsApp" | "SMS" | "Email";
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
    content:
      "Hello {LeadName}! 👋 Welcome to OptiluxBD. We have amazing products for you. Our agent will contact you soon!",
    usedCount: 245,
    lastUsed: "12/15/2024",
  },
  {
    id: "2",
    heading: "Order Confirmation",
    channel: "SMS",
    content:
      "Dear {CustomerName}, your order #{OrderID} for ৳{Amount} has been confirmed. Expected delivery: {Date}. Track: optiluxbd.com/",
    usedCount: 1842,
    lastUsed: "12/16/2024",
  },
  {
    id: "3",
    heading: "Payment Reminder",
    channel: "SMS",
    content:
      "Hi {CustomerName}, your payment of ৳{Amount} for Order #{OrderID} is pending. Please pay to avoid cancellation.",
    usedCount: 567,
    lastUsed: "12/14/2024",
  },
  {
    id: "4",
    heading: "Product Promotion",
    channel: "Email",
    content:
      "Dear {CustomerName}, We have a special offer on {Product}! Get it now at a discounted price of ৳{Amount}. Offer valid till {Date}. Shop now: optiluxbd.com",
    usedCount: 423,
    lastUsed: "12/12/2024",
  },
];

const MessagePage = () => {
  return (
    <div>
      <div className="flex justify-end items-center">
        {/* <LiquidGlass glowIntensity="none" borderRadius="10px" className="w-fit">
          <Button
            style={{
              backgroundImage: "url('/svg/button-background.svg')",
              backgroundSize: "cover",
            }}
            className="rounded-xl bg-transparent border-none"
          >
            <Plus className="w-4 h-4 mr-2" />
           Create New Template
          </Button>
          <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFB13F] to-transparent h-[1.5px]" />
        </LiquidGlass> */}
        <CreateTemplete />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {mockMessages.map((msg) => (
          <MessageCard key={msg.id} data={msg} />
        ))}
      </div>
    </div>
  );
};

// Sub-component for individual card
const MessageCard = ({ data }: { data: MessageData }) => {
  // Helper to get channel specific styles and icon
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

  const { badgeBg, badgeText, icon } = getChannelStyle(data.channel);

  return (
    <div className="bg-black/5 rounded-4xl p-6 shadow-sm  border border-white/15 relative min-h-[220px] flex flex-col justify-between">
      {/* Header with Badge */}
      <h2 className="text-white text-lg font-semibold mb-2">{data.heading}</h2>
      <div className="flex justify-start mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badgeBg} ${badgeText}`}
        >
          {icon}
          {data.channel}
        </span>
      </div>

      {/* Content */}
      <p className="text-[#B4B4B8] text-sm leading-relaxed mb-4 border border-[#FFFFFF1A] rounded-3xl p-3">
        {data.content}
      </p>

      {/* Footer Stats */}
      <div className="flex items-center justify-between text-xs text-[#B4B4B8] font-light mt-auto">
        <span>Used {data.usedCount} times</span>
        <div className="flex items-center gap-4">
          <span>Last: {data.lastUsed}</span>
        </div>
      </div>

      {/* Action Buttons - Edit, Copy, Delete */}
      <div className="flex items-center gap-2 mt-4">
        {/* Edit Button */}
        <button className="h-8 w-full bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-[#25D366] transition-colors">
          <Edit2 size={14} />
        </button>

        {/* Copy Button */}
        <button className="h-8 w-full bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-[#3B82F6] transition-colors">
          <Copy size={14} />
        </button>

        {/* Delete Button */}
        <button className="h-8 w-[100px] bg-white/10 rounded-full border border-white/10 flex items-center justify-center text-[#FF4545] transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
