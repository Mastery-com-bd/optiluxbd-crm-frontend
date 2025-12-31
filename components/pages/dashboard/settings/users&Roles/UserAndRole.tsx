"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import { Shield, SquarePen, Trash2, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TUserData = {
  name: string;
  image?: string;
  email: string;
  role: "Admin" | "Team Leader" | "Agent" | "Group Leader" | "Super Admin";
  status: "Active" | "Inactive";
  active: string;
};

const userData: TUserData[] = [
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

const UserAndRole = () => {
  const key = ["Name", "Email", "Role", "Status", "Action"];
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-semibold leading-8">Users & Roles</h1>
          <p className="text-[#A1A1A1] leading-5">
            Manage user accounts and role permissions
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <ButtonComponent buttonName="Add New User" varient="full yellow" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        {/* left side */}
        <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
          {/* top and bottom border */}
          <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

          <div className="space-y-6">
            {/* header */}
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)]`}
              >
                {/* top and borrom border */}
                <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                <Users className="text-[#FF6B00]" />
              </div>
              <div>
                <h1 className="text-[#FDFDFD] text-lg">All Users</h1>
                <p className="text-[#B1B1B1] text-sm">5 total users</p>
              </div>
            </div>

            {/* content table */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    {key.map((item, i) => (
                      <TableHead key={i}>{item}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {userData.map((user, index) => (
                    <TableRow key={index}>
                      {/* User */}
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={
                                user.image ||
                                "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                              }
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h1 className="flex flex-col gap-1">
                            <span className="text-[#FDFDFD] ">
                              {user?.name}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {user?.active}
                            </span>
                          </h1>
                        </div>
                      </TableCell>

                      {/* Email */}
                      <TableCell className="text-text-secondary text-center">
                        {user.email}
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <div className="bg-[rgba(64,64,64,0.20)] rounded-4xl px-3 py-2 flex items-center justify-center relative">
                          <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
                          <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />
                          {user.role}
                        </div>
                      </TableCell>

                      {/* Status */}
                      <TableCell>
                        <div
                          className={`px-3 py-2 rounded-4xl relative ${
                            user.status === "Active"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
                          <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />
                          <div className="flex items-center justify-center gap-1">
                            <span
                              className={`block h-1 w-1 rounded-full ${
                                user.status === "Active"
                                  ? "bg-success"
                                  : "bg-red-600"
                              }`}
                            />
                            <span className="text-xs ">{user.status}</span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Active */}
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-text-secondary cursor-pointer">
                            <SquarePen size={16} />
                          </button>

                          <button className="text-red-600 cursor-pointer">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </Card>
        {/* right side  */}
        <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
          {/* top and bottom border */}
          <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl relative bg-[rgba(127,95,255,0.20)]`}
              >
                {/* top and borrom border */}
                <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                <Shield className="text-[#7F5FFF]" />
              </div>
              <div>
                <h1 className="text-[#FDFDFD] text-lg">Role Permissions</h1>
                <p className="text-[#B1B1B1] text-sm">Configure access</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div />
    </div>
  );
};

export default UserAndRole;
