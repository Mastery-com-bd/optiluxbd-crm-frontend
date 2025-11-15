"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Props = {
  role: "manager" | "team_leader" | "agents";
};


export default function UserCards({ role }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 10 }).map((_, index) => {
        const u = {
          id: `user-${index}`,
          name: `User ${index}`,
          email: `user${index}@example.com`,
          teamLevel: role === 'team_leader' ? 'level_1' : undefined,
          teamId: role === 'agents' ? `team-${index}` : undefined,
        };
        const selected = selectedIds.includes(u.id);
        return (
          <Card
            key={u.id}
            onClick={() => setSelectedIds(prev => selected ? prev.filter(id => id !== u.id) : [...prev, u.id])}
            className={`cursor-pointer transition-colors ${selected ? "border-primary" : "hover:bg-muted"}`}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-base flex items-center gap-2">
                {u.name}
                {u.teamLevel && <Badge variant="outline" className="capitalize">{u.teamLevel}</Badge>}
                {u.teamId && role !== 'manager' && (
                  <Badge variant="secondary">Team {u.teamId.slice(0, 4)}</Badge>
                )}
                {selected && <Badge variant="default">Selected</Badge>}
              </CardTitle>
              <CardDescription className="text-xs">{u.email}</CardDescription>
              <span className="text-xs text-zinc-600">{selectedIds.filter(id => id === u.id).length} leads</span>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}