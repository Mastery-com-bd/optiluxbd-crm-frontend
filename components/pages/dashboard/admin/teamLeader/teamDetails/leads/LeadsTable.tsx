"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TDeadsdata = {
  taskId: string;
  leaderName: string;
  phone: string;
  assignedAgent: string;
  LastCall: string;
  next: string;
};

const LeadsTable = () => {
  const headers = [
    "Task ID",
    "Lead Name",
    "Phone",
    "Assigned Agent",
    "Last Call Date",
    "Next Action",
  ];

  const leadsData: TDeadsdata[] = [
    {
      taskId: "AG101",
      leaderName: "Ayaan Khan",
      phone: "01875458748",
      assignedAgent: "Rahul Khan",
      LastCall: "Dec 01, 2025",
      next: "Dec 05, 2025",
    },
    {
      taskId: "AG102",
      leaderName: "Nafisa Rahman",
      phone: "01723984567",
      assignedAgent: "Arif Hossain",
      LastCall: "Dec 02, 2025",
      next: "Dec 06, 2025",
    },
    {
      taskId: "AG103",
      leaderName: "Tanvir Ahmed",
      phone: "01987456321",
      assignedAgent: "Nusrat Jahan",
      LastCall: "Dec 03, 2025",
      next: "Dec 07, 2025",
    },
    {
      taskId: "AG104",
      leaderName: "Sadia Islam",
      phone: "01698541230",
      assignedAgent: "Tanvir Ahmed",
      LastCall: "Dec 04, 2025",
      next: "Dec 08, 2025",
    },
    {
      taskId: "AG105",
      leaderName: "Imran Hossain",
      phone: "01564783920",
      assignedAgent: "Rahul Khan",
      LastCall: "Dec 05, 2025",
      next: "Dec 09, 2025",
    },
    {
      taskId: "AG106",
      leaderName: "Farhan Ahmed",
      phone: "01892345671",
      assignedAgent: "Arif Hossain",
      LastCall: "Dec 06, 2025",
      next: "Dec 10, 2025",
    },
    {
      taskId: "AG107",
      leaderName: "Mahi Akter",
      phone: "01765439821",
      assignedAgent: "Sadia Rahman",
      LastCall: "Dec 07, 2025",
      next: "Dec 11, 2025",
    },
    {
      taskId: "AG108",
      leaderName: "Rifat Hasan",
      phone: "01923459876",
      assignedAgent: "Tanvir Ahmed",
      LastCall: "Dec 08, 2025",
      next: "Dec 12, 2025",
    },
    {
      taskId: "AG109",
      leaderName: "Jannatul Ferdous",
      phone: "01634567892",
      assignedAgent: "Nusrat Jahan",
      LastCall: "Dec 09, 2025",
      next: "Dec 13, 2025",
    },
    {
      taskId: "AG110",
      leaderName: "Shakib Al Hasan",
      phone: "01598763421",
      assignedAgent: "Rahul Khan",
      LastCall: "Dec 10, 2025",
      next: "Dec 14, 2025",
    },
  ];

  return (
    <div className="overflow-x-auto w-full ">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {headers.map((label, ind) => (
              <TableHead
                first={ind === 0}
                last={ind === headers.length - 1}
                key={label}
                className="text-left text-xs font-semibold uppercase text-muted-foreground"
              >
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {leadsData.map((lead, i) => (
            <TableRow key={i} className="group">
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.taskId}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.leaderName}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.phone}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.assignedAgent}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.LastCall}
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm flex items-center justify-center">
                  {lead?.next}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTable;
