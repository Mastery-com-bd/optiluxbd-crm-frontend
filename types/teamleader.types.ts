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
//Team leader types(dev:- RJannat..)

export type Address = {
  id: number;
  user_id: number | null;
  customer_id: number;
  city: string;
  zone_id: number | null;
  geo_lat: number;
  geo_lng: number;
  created_at: string;
  updated_at: string;
  division: string;
  post: string;
  street: string;
  thana: string;
};

export type Customer = {
  id: number;
  customerId: string;
  name: string;
  phone: string;
  email: string | null;
  customerType: string;
  addresses: Address[];
  assignedAt: string;
  lastContactAt?: string | null;
};

export type AgentInfo = {
  id: number;
  userId: string;
  name: string;
  email: string;
  phone: string;
  is_active: boolean;
};

export type AssignedBy = {
  id: number;
  userId: string;
  name: string;
  email: string;
};

export type CurrentBatch = {
  batchId: number;
  assignedCustomers: Customer[];
  pendingCustomers: Customer[];
  assignedCount: number;
  pendingCount: number;
  totalCustomers: number;
};

export type Member = {
  id: number;
  agent: AgentInfo;
  assignedAt: string;
  assignedBy: AssignedBy;
  currentBatch: CurrentBatch;
};
// Props type for Leader data table.
export type MemberProps = {
  members: Member[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedWorkers: React.Dispatch<React.SetStateAction<number | null>>;
};