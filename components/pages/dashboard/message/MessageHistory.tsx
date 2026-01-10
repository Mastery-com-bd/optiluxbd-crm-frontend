"use client";
import CustomPagination from "@/components/ui/CustomPagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Mail,
  MessageCircle,
  MessageSquare,
  MessageSquareText,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type TSmsProps = {
  date: string;
  recipient: string;
  channel: "WhatsApp" | "SMS" | "Email";
  template: string;
  status: "Delivered" | "Faild";
};

const messageHistoryData: TSmsProps[] = [
  {
    date: "12/16/24",
    recipient: "Aminul Islam",
    channel: "SMS",
    template: "Order Confirmation",
    status: "Delivered",
  },
  {
    date: "12/16/24",
    recipient: "Rahim Uddin",
    channel: "WhatsApp",
    template: "Payment Reminder",
    status: "Delivered",
  },
  {
    date: "12/15/24",
    recipient: "Karim Ahmed",
    channel: "Email",
    template: "Welcome Message",
    status: "Delivered",
  },
  {
    date: "12/15/24",
    recipient: "Nusrat Jahan",
    channel: "SMS",
    template: "OTP Verification",
    status: "Faild",
  },
  {
    date: "12/14/24",
    recipient: "Shakib Hasan",
    channel: "WhatsApp",
    template: "Order Shipped",
    status: "Delivered",
  },
  {
    date: "12/14/24",
    recipient: "Farzana Akter",
    channel: "Email",
    template: "Password Reset",
    status: "Delivered",
  },
  {
    date: "12/13/24",
    recipient: "Imran Hossain",
    channel: "SMS",
    template: "Payment Failed",
    status: "Faild",
  },
  {
    date: "12/13/24",
    recipient: "Tahmina Begum",
    channel: "WhatsApp",
    template: "Delivery Update",
    status: "Delivered",
  },
  {
    date: "12/12/24",
    recipient: "Mahmudul Hasan",
    channel: "Email",
    template: "Invoice Generated",
    status: "Delivered",
  },
  {
    date: "12/12/24",
    recipient: "Sabbir Rahman",
    channel: "SMS",
    template: "Subscription Expiry",
    status: "Faild",
  },
];

const MessageHistory = () => {
  const [show, setShow] = useState("10");
  const [filters, setFilters] = useState({
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });

  const headers = [
    "Date & Time",
    "Recipient",
    "Channel",
    "Template",
    "Status",
    "Action",
  ];

  const getChannelStyle = (channel: TSmsProps["channel"]) => {
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
    <div className="space-y-6">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {headers.map((label, ind) => (
              <TableHead
                first={ind === 0}
                last={ind === headers.length - 1}
                key={label}
                className="text-left text-xs font-semibold uppercase text-muted-foreground">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {messageHistoryData.map((item, i) => (
            <TableRow key={i} className="group">
              <TableCell>
                <div className="text-sm flex items-center justify-center w-full px-8">
                  {item?.date}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.recipient}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <p
                    className={`text-sm flex items-center px-4 gap-2 py-1 rounded-full ${
                      getChannelStyle(item.channel).badgeBg
                    } ${getChannelStyle(item.channel).badgeText}`}>
                    {item.channel === "Email" && <Mail size={14} />}
                    {item.channel === "SMS" && <MessageSquare size={14} />}
                    {item.channel === "WhatsApp" && <MessageCircle size={14} />}
                    <span>{item?.channel}</span>
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {item?.template}
                </div>
              </TableCell>
              <TableCell>
                <p
                  className={`bg-white/10 py-1 px-3 rounded-lg text-center max-w-20 mx-auto ${
                    item?.status === "Delivered"
                      ? "text-success"
                      : "text-red-700"
                  }`}>
                  {item?.status}
                </p>
              </TableCell>

              <TableCell className="px-4 py-3 text-center ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer">
                    <MoreVertical className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-[180px] flex flex-col ">
                    <Link href={`/dashboard/customers/${2}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="w-4 h-4 mr-2" />
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      //   onClick={() => {
                      //     setDeleteProductId(product.id);
                      //     setDeleteDialogOpen(true);
                      //   }}
                      className="cursor-pointer">
                      <Trash2 className="w-4 h-4 text-destructive mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination
        currentPage={1}
        totalPages={10}
        onPageChange={(page) => setFilters({ ...filters, page })}
        show={show}
        setShow={setShow}
        setFilters={setFilters}
      />
    </div>
  );
};

export default MessageHistory;
