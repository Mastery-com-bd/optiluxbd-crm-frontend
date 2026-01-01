import { SquarePen, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TUserData } from "../SettingsHome/const/settings.const";

const UserTable = ({ userData }: { userData: TUserData[] }) => {
  const key = ["Name", "Email", "Role", "Status", "Action"];
  return (
    <div className="rounded-xl overflow-hidden">
      <Table className="border-none">
        <TableHeader className="border-none">
          <TableRow className="border-b border-white/5">
            {key.map((item, i) => (
              <TableHead key={i} secondClass="bg-transparent border-none ">
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="border-none">
          {userData.map((user, index) => (
            <TableRow key={index} className="border-none hover:bg-transparent">
              {/* User */}
              <TableCell className="py-4 border-none">
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

                  <div className="flex flex-col gap-1">
                    <span className="text-[#FDFDFD]">{user.name}</span>
                    <span className="text-xs text-text-secondary">
                      {user.active}
                    </span>
                  </div>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell className="py-4 text-center text-text-secondary border-none">
                {user.email}
              </TableCell>

              {/* Role */}
              <TableCell className="py-4 text-center border-none">
                <div className="bg-[rgba(64,64,64,0.20)] rounded-4xl px-3 py-2 relative inline-flex items-center justify-center">
                  <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />
                  {user.role}
                </div>
              </TableCell>

              {/* Status */}
              <TableCell className="py-4 text-center border-none">
                <div
                  className={`px-4 py-2 rounded-4xl relative inline-flex ${
                    user.status === "Active"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-4xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-4xl pointer-events-none" />

                  <div className="flex items-center gap-1">
                    <span
                      className={`h-1 w-1 rounded-full ${
                        user.status === "Active" ? "bg-success" : "bg-red-600"
                      }`}
                    />
                    <span className="text-xs">{user.status}</span>
                  </div>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="py-4 border-none">
                <div className="flex items-center justify-center gap-3 w-full">
                  <button className="text-text-secondary">
                    <SquarePen size={16} />
                  </button>
                  <button className="text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
