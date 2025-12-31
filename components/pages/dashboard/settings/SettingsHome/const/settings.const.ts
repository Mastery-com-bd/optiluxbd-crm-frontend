// system status stype and const
export type TStatus =
  | "Connected"
  | "Disconnected"
  | "Active"
  | "Inactive"
  | "Online"
  | "Offline";

export type TSystemStatus = {
  name: string;
  status: TStatus;
};

export const systemStatus: TSystemStatus[] = [
  { name: "Database", status: "Connected" },
  { name: "Cash", status: "Active" },
  { name: "Email Server", status: "Online" },
  { name: "SMS Gateway", status: "Active" },
];

// storage usage types and const
export type TStorageData = {
  memory: "Database" | "Backups" | "Media";
  usage: number;
  color: string;
  total: number;
};

export const storageData: TStorageData[] = [
  { memory: "Database", usage: 2.3, color: "#2A85FF", total: 10 },
  { memory: "Backups", usage: 4.8, color: "#FF6B00", total: 10 },
  { memory: "Media", usage: 1.2, color: "#00A656", total: 10 },
];

export const getPercentage = (usage: number, total: number) => {
  return Math.min((usage / total) * 100, 100);
};

// current settings configuration const and type
export type TCurrentConfiguration = {
  name: string;
  value: string;
};

export const currentConfiguration: TCurrentConfiguration[] = [
  { name: "Company", value: "OptiluxBD" },
  { name: "Currency", value: "BDT" },
  { name: "Timezone", value: "Asia/Dhaka" },
  { name: "Date Format", value: "DD/MM/YYYY" },
  { name: "Language", value: "English US" },
];

// system information const and type
export type TSystemInformation = {
  name: string;
  value: string;
};
export const systemInformation: TSystemInformation[] = [
  { name: "Version", value: "v2.5.1" },
  { name: "Last Update", value: "15 Dec, 2024" },
  { name: "Database", value: "Connected" },
  { name: "Cache", value: "Active" },
];
