export interface TTeamMember {
  id: number;
  name: string;
  email: string;
  userId: string;
}

export interface TTeamLeader {
  id: number;
  name: string;
  email: string;
  userId: string;
}

export interface TTeam {
  leader: TTeamLeader;
  members: TTeamMember[];
  teamSize: number;
}
