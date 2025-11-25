import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TTeam } from "@/types/teamleader.types";
import { Check } from "lucide-react";
import TeamMemberRow from "./leaderAssignment/TeamMemberRow";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Leadercard = ({
  team,
  isSelected,
  handleCardClick,
}: {
  team: TTeam;
  isSelected: boolean;
  handleCardClick: (team: TTeam) => void;
}) => {
  return (
    <Card
      className={`shadow-sm border rounded-xl cursor-pointer transition-all relative ${
        isSelected
          ? "border-blue-500 ring-2 ring-blue-400"
          : "hover:ring-1 hover:ring-blue-300"
      }`}
      onClick={() => handleCardClick(team)}
    >
      {isSelected && (
        <Check className="absolute top-2 right-2 w-5 h-5 text-blue-500" />
      )}

      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">
              {team?.leader?.name}
            </CardTitle>
            <p className="text-sm text-gray-400">{team?.leader?.email}</p>
            <p className="text-sm text-gray-400">{team?.leader?.userId}</p>
          </div>

          {/* View Details Link */}
          <Link
            href={`/dashboard/leads/admin/all-teams/${team?.leader?.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button className="cursor-pointer" variant="ghost">
              View Details
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="text-sm space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">Team Size:</span>
          <span>{team?.teamSize}</span>
          <span className="font-medium">Members:</span>
          <span>{team?.members.length}</span>
        </div>

        {/* Members List */}
        <div className="border rounded-md p-2 max-h-44 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {team?.members.length === 0 ? (
            <p className="text-gray-500 text-xs">No members assigned</p>
          ) : (
            <ul className="space-y-1">
              {team?.members.map((member) => (
                <TeamMemberRow key={member.id} member={member} />
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leadercard;
