import { Card } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

type TNotificationData= {
    title: string,
    description: string,
    emailNotification: boolean,
    smsNotification: boolean,
    pushNotification: boolean,
    template: boolean
}

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

  return (
    <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
      {/* top and bottom border */}
      <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

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
            <TableHeader>
              <TableRow className="">
                {headers.map((header, i) => (
                  <TableHead key={i} className="text-left">{header}</TableHead>
                ))}
               
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {notificationData.map((item) => (
                <TableRow key={item.title} className="border-none">
                  {/* Trigger */}
                  <TableCell className="align-top">
                    <div className="space-y-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-center">
                    <Switch checked={item.emailNotification} />
                  </TableCell>

                  {/* SMS */}
                  <TableCell className="text-center">
                    <Switch checked={item.smsNotification} />
                  </TableCell>

                  {/* Push */}
                  <TableCell className="text-center">
                    <Switch checked={item.pushNotification} />
                  </TableCell>

                  {/* Template */}
                  <TableCell className="text-center">
                    <Switch checked={item.template} />
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
