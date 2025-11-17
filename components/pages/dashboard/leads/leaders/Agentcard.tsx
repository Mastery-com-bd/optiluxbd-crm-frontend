"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Member = {
  id: number;
  agent: {
    id: number;
    email: string;
    is_active: boolean;
    name: string;
    phone: string;
    userId: string;
  };
};

type TAgentcardProps = {
  onToggle: (id: number) => void;
  selectedIds: number | null;
  allMembers?: Member[];
};

const Agentcard = ({ onToggle, selectedIds, allMembers }: TAgentcardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {allMembers?.map((member, i) => {
        const selected = selectedIds === member?.agent?.id;
        return (
          <Card
            key={i}
            onClick={() => onToggle(member?.agent?.id)}
            className={`cursor-pointer transition-colors ${
              selected ? "border-primary" : "hover:bg-muted"
            }`}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-base flex items-center gap-2">
                {member?.agent?.name}
                {selected && <Badge variant="default">Selected</Badge>}
              </CardTitle>
              <CardDescription className="text-xs">
                {member?.agent?.email}
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};

export default Agentcard;
