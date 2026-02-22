import { Card } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Switcher from "./Switcher";

type TNotificationData = {
  title: string;
  description: string;
  emailNotification: boolean;
  smsNotification: boolean;
  pushNotification: boolean;
  template: boolean;
};

const notificationData: TNotificationData[] = [
  {
    title: "New Lead Created",
    description: "When a new lead is added to the system",
    emailNotification: true,
    smsNotification: false,
    pushNotification: true,
    template: true,
  },

  {
    title: "Lead Assigned",
    description: "When a lead is assigned to an agent",
    emailNotification: true,
    smsNotification: true,
    pushNotification: true,
    template: true,
  },
  {
    title: "Order Placed",
    description: "When a customer places an order",
    emailNotification: true,
    smsNotification: true,
    pushNotification: false,
    template: true,
  },
  {
    title: "Payment Received",
    description: "When payment is successfully received",
    emailNotification: true,
    smsNotification: false,
    pushNotification: true,
    template: true,
  },
  {
    title: "Order Shipped",
    description: "When order is shipped by courier",
    emailNotification: true,
    smsNotification: true,
    pushNotification: true,
    template: true,
  },
  {
    title: "Order Delivered",
    description: "When order is successfully delivered",
    emailNotification: true,
    smsNotification: true,
    pushNotification: false,
    template: true,
  },
  {
    title: "Lead Status Changed",
    description: "When lead status is updated",
    emailNotification: false,
    smsNotification: false,
    pushNotification: true,
    template: true,
  },
  {
    title: "Daily Summary",
    description: "Daily performance summary report",
    emailNotification: true,
    smsNotification: false,
    pushNotification: false,
    template: true,
  },
];

const NotificationTrigger = () => {
  const headers = ["Trigger", "Email", "SMS", "Push", "Template"];

  const handleChange = async (checked: boolean) => {
    console.log(checked);
  };

  return (
    <Card className=" w-full rounded-2xl effect">
      <div className="space-y-6">
        {/* header */}
        <div>
          <h1 className="text-[#FDFDFD] text-xl">Notification Triggers</h1>
          <p className="text-text-secondary ">
            Configure when and how to send notifications
          </p>
        </div>

        {/* table section */}
        <Table className="">
          {/* Header */}
          <TableHeader className="border-none">
            <TableRow className="border-b border-white/5">
              {headers.map((item, i) => (
                <TableHead key={i} secondClass="bg-transparent border-none ">
                  <h1 className="flex items-center justify-start"> {item}</h1>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}

          <TableBody className="border-none">
            {notificationData.map((item) => (
              <TableRow
                key={item.title}
                className="border-none hover:bg-transparent"
              >
                {/* Trigger */}
                <TableCell className="py-4 border-none">
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="py-4 px-4 text-text-secondary border-none">
                  <Switcher
                    title="email"
                    data={item.emailNotification}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell className="py-4 px-4 text-text-secondary border-none">
                  <Switcher
                    title="sms"
                    data={item.smsNotification}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell className="py-4 px-4 text-text-secondary border-none">
                  <Switcher
                    title="push"
                    data={item.pushNotification}
                    onChange={handleChange}
                  />
                </TableCell>

                {/* Template */}
                <TableCell className="py-4 pr-12 text-text-secondary border-none ">
                  <div className="h-8 w-full rounded-full bg-[rgba(44,44,44,0.20)] border border-[#404040]" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default NotificationTrigger;
