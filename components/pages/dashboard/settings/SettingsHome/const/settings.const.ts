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

// user role and permission
export type TUserData = {
  name: string;
  image?: string;
  email: string;
  role: "Admin" | "Team Leader" | "Agent" | "Group Leader" | "Super Admin";
  status: "Active" | "Inactive";
  active: string;
};

export const userData: TUserData[] = [
  {
    name: "Ahmed Hasan",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "ahmed@optiluxbd.com",
    role: "Admin",
    status: "Active",
    active: "5 hours ago",
  },
  {
    name: "Rafiq Ahmed",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "rafiq@optiluxbd.com",
    role: "Team Leader",
    status: "Active",
    active: "10 minutes ago",
  },
  {
    name: "Nusrat Jahan",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "nusrat@optiluxbd.com",
    role: "Agent",
    status: "Inactive",
    active: "2 days ago",
  },
  {
    name: "Tanvir Hossain",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "tanvir@optiluxbd.com",
    role: "Group Leader",
    status: "Active",
    active: "1 hour ago",
  },
  {
    name: "Sadia Rahman",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "sadia@optiluxbd.com",
    role: "Agent",
    status: "Active",
    active: "30 minutes ago",
  },
  {
    name: "Imran Khan",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "imran@optiluxbd.com",
    role: "Team Leader",
    status: "Inactive",
    active: "3 days ago",
  },
  {
    name: "Farhana Akter",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "farhana@optiluxbd.com",
    role: "Agent",
    status: "Active",
    active: "15 minutes ago",
  },
  {
    name: "Mahmudul Hasan",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "mahmudul@optiluxbd.com",
    role: "Group Leader",
    status: "Active",
    active: "4 hours ago",
  },
  {
    name: "Jannatul Ferdous",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "jannatul@optiluxbd.com",
    role: "Agent",
    status: "Inactive",
    active: "1 week ago",
  },
  {
    name: "Shakil Ahmed",
    image:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    email: "shakil@optiluxbd.com",
    role: "Super Admin",
    status: "Active",
    active: "Just now",
  },
];
