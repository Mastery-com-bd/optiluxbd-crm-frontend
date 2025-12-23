import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock } from "lucide-react";

// Mock Data for Leads
const leads = [
  {
    id: 1,
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1712-444444",
    product: "RB3025",
    source: "Facebook Ad",
    status: "New",
    lastContact: "Never",
    nextAction: "Call",
  },
  {
    id: 2,
    name: "Tanvir Hossain",
    email: "tanvir.hossain@example.com",
    phone: "+880 1712-555555",
    product: "RB3025",
    source: "Website",
    status: "Contacted",
    lastContact: "11/14/2024",
    nextAction: "Follow Up",
  },
  {
    id: 3,
    name: "Mehedi Hassan",
    email: "mehedi.hassan@example.com",
    phone: "+880 1712-666666",
    product: "RB3025",
    source: "Referral",
    status: "Qualified",
    lastContact: "11/13/2024",
    nextAction: "Close Deal",
  },
  {
    id: 4,
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    phone: "+880 1712-777777",
    product: "Wayfarer",
    source: "Instagram",
    status: "Converted",
    lastContact: "11/15/2024",
    nextAction: "Ship Order",
  },
  {
    id: 5,
    name: "Rahim Uddin",
    email: "rahim.uddin@example.com",
    phone: "+880 1712-888888",
    product: "Clubmaster",
    source: "Google",
    status: "Lost",
    lastContact: "11/10/2024",
    nextAction: "None",
  },
  {
    id: 6,
    name: "Ayesha Siddiqua",
    email: "ayesha.s@example.com",
    phone: "+880 1712-999999",
    product: "Aviator",
    source: "Facebook Ad",
    status: "New",
    lastContact: "Never",
    nextAction: "Call",
  },
];

const LeadQueueCard = () => {
  return (
    <LiquidGlass className="w-full max-w-[745px]">
      {/* Lead Queue */}
      <Card className="rounded-4xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-[32px] font-medium text-[#FDFDFD]">
              Lead Queue
            </CardTitle>
            <p className="text-[#B1B1B1] text-[16px] font-medium">4 leads assigned to you</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-orange-500/50 text-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
            >
              Pending
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Accept All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-4">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60">Lead</TableHead>
                <TableHead className="text-white/60">
                  Interested Product
                </TableHead>
                <TableHead className="text-white/60">Status</TableHead>
                <TableHead className="text-white/60">Last Contact</TableHead>
                <TableHead className="text-white/60 text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.slice(0, 3).map((lead, i) => (
                <TableRow
                  key={i}
                  className={`border-white/10 hover:bg-white/20 ${
                    i === 2 ? "border-b-0" : ""
                  }`}
                >
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-white/50">{lead.phone}</div>
                  </TableCell>
                  <TableCell>{lead.product}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${
                        lead.status === "New"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          : lead.status === "Contacted"
                          ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                          : "bg-green-500/10 border-green-500/20 text-green-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-white/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {lead.lastContact}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-white hover:bg-white/5"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </LiquidGlass>
  );
};

export default LeadQueueCard;
