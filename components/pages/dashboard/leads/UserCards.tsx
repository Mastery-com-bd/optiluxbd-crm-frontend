"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AssignedBy = {
  id: string;
  name: string;
  email: string;
  userId: string;
}

type Agent = {
  id: string;
  email: string;
  is_active: boolean;
  name: string;
  phone: string;
  userId: string;
};

type Member = {
  id: string;
  agent: Agent;
  assignedBy: AssignedBy;
  createdAt?: string;
};

type Props = {
  onToggle: (id: string) => void;
  selectedIds: string[];
  allMembers?: Member[];
};

export default function UserCards({
  onToggle,
  selectedIds,
  allMembers,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {allMembers?.map((member) => {
        const u = {
          id: member.agent.id,
          name: member.agent.name,
          email: member.agent.email,
        };
        const selected = selectedIds.includes(u.id);
        return (
          <Card
            key={u.id}
            onClick={() => onToggle(u.id)}
            className={`cursor-pointer transition-colors ${
              selected ? "border-primary" : "hover:bg-muted"
            }`}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-base flex items-center gap-2">
                {u.name}
                
                
                {selected && <Badge variant="default">Selected</Badge>}
              </CardTitle>
              <CardDescription className="text-xs">{u.email}</CardDescription>
              <span className="text-xs text-zinc-600">
                {selectedIds.filter((id) => id === u.id).length} leads
              </span>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}
