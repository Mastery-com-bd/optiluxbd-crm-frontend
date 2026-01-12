"use client";
import PageHeader from "../../../shared/pageHeader";
import CreateTeam from "./CreateTeam";
import TeamCard from "./TeamCard";

export type TTeamdata = {
  teamName: string;
  leader: string;
  description: string;
  members: string;
  Leads: string;
  conversionRate: string;
  target: string;
  endDate: string;
};

const AllTeams = () => {
  const teamData: TTeamdata[] = [
    {
      teamName: "Sales Team Alpha",
      leader: "Ruhul Khan",
      description: "Primary sales team focused on high-value leads",
      members: "8",
      Leads: "150",
      conversionRate: "32.5%",
      target: "50",
      endDate: "Jan 15, 2024",
    },
    {
      teamName: "Sales Team Beta",
      leader: "Nusrat Jahan",
      description: "Inbound sales handling mid-tier prospects",
      members: "6",
      Leads: "120",
      conversionRate: "28.4%",
      target: "40",
      endDate: "Feb 10, 2024",
    },
    {
      teamName: "Growth Squad",
      leader: "Tanvir Ahmed",
      description: "Focused on accelerating user and revenue growth",
      members: "10",
      Leads: "200",
      conversionRate: "35.1%",
      target: "70",
      endDate: "Mar 05, 2024",
    },
    {
      teamName: "Enterprise Sales",
      leader: "Farhana Islam",
      description: "Handles enterprise-level client acquisitions",
      members: "7",
      Leads: "90",
      conversionRate: "41.8%",
      target: "60",
      endDate: "Jan 30, 2024",
    },
    {
      teamName: "Regional Sales North",
      leader: "Imran Hossain",
      description: "Sales operations for northern region accounts",
      members: "5",
      Leads: "85",
      conversionRate: "26.9%",
      target: "30",
      endDate: "Feb 18, 2024",
    },
    {
      teamName: "Regional Sales South",
      leader: "Sadia Akter",
      description: "Sales operations for southern region accounts",
      members: "6",
      Leads: "110",
      conversionRate: "29.7%",
      target: "45",
      endDate: "Mar 12, 2024",
    },
    {
      teamName: "SMB Outreach Team",
      leader: "Rakib Hasan",
      description: "Small and medium business outreach specialists",
      members: "9",
      Leads: "175",
      conversionRate: "31.2%",
      target: "55",
      endDate: "Feb 25, 2024",
    },
    {
      teamName: "Digital Sales Unit",
      leader: "Mehedi Hasan",
      description: "Online and digital channel sales initiatives",
      members: "4",
      Leads: "60",
      conversionRate: "38.6%",
      target: "25",
      endDate: "Jan 20, 2024",
    },
    {
      teamName: "Strategic Partnerships",
      leader: "Ayesha Rahman",
      description: "Manages strategic sales partnerships and alliances",
      members: "5",
      Leads: "70",
      conversionRate: "44.3%",
      target: "35",
      endDate: "Mar 01, 2024",
    },
    {
      teamName: "Inside Sales Team",
      leader: "Hasan Mahmud",
      description: "Handles phone and email-based sales conversions",
      members: "8",
      Leads: "140",
      conversionRate: "27.8%",
      target: "48",
      endDate: "Feb 05, 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground space-y-4 w-full">
      {/* headers */}
      <div className="flex items-center justify-between">
        <div>
          <PageHeader title="All Teams" description="Operational overview and quick actions." />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <CreateTeam />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 justify-items-center ">
        {teamData.map((data, i) => {
          return <TeamCard key={i} data={data} />;
        })}
      </div>
    </div>
  );
};

export default AllTeams;
