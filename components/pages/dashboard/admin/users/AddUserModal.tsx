"use client";
import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Switch } from "@/components/ui/switch";
import {
  TCreateUserData,
  createNewUser,
  updateOrganizationUserById,
} from "@/service/user";
import {
  RolesResponse,
  UserResponse
} from "@/types/user/organizationUsers.types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Validation Schema
const getFormSchema = (isEditMode: boolean) =>
  z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    roleId: z.number().min(1, "Role is required"),
    phone: z.string().min(11, "Valid phone number is required"),
    password: isEditMode
      ? z.string().optional()
      : z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain uppercase, lowercase, number and special character",
          ),
    status: z.enum(["ACTIVE", "INACTIVE", "SUSPENDED", "DISABLED", "REJECTED"]),
    is_approved: z.boolean(),
    email_verified: z.boolean(),
    is_active: z.boolean(),
  });

type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

interface AddUserModalProps {
  rolesData: RolesResponse;
  userData?: UserResponse["data"];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddUserModal = ({
  rolesData,
  userData,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: AddUserModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isControlled = typeof controlledOpen !== "undefined";
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? controlledOnOpenChange : setInternalOpen;
  const isEditMode = !!userData;

  const formSchema = getFormSchema(isEditMode);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      roleId: 2,
      phone: "",
      password: "",
      status: "ACTIVE",
      is_approved: false,
      email_verified: false,
      is_active: true,
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        roleId:
          userData.roles && userData.roles.length > 0
            ? userData.roles[0].roleId
            : 2,
        phone: userData.phone || "",
        password: "", // Password usually not pre-filled
        status: userData.status || "ACTIVE", // userData might not have status in UserResponse, defaulting
        is_approved: userData.is_approved ?? true, // Assuming approved if existing? Or default false
        email_verified: userData.email_verified ?? false, // Default or map if available
        is_active: userData.is_active ?? true,
      });
      // If there are fields mapping from userData that I missed or inferred
    } else {
      form.reset({
        name: "",
        email: "",
        roleId: 2,
        phone: "",
        password: "",
        status: "ACTIVE",
        is_approved: false,
        email_verified: false,
        is_active: true,
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: FormValues) => {
    if (isEditMode) {

      console.log("Updated Data", data)
      setIsLoading(true);
      toast.loading("Updating user...");
      const res = await updateOrganizationUserById(
        userData?.id?.toString() || "",
        data,
      );

      if (res.success) {
        toast.dismiss();
        toast.success(res.message || "User updated successfully");
      } else {
        toast.dismiss();
        toast.error(res.message || "Failed to update user");
      }

      if (setOpen) setOpen(false);
      return;
    }

    setIsLoading(true);
    toast.loading("Creating new user...");

    const result = await createNewUser(data as TCreateUserData); // Cast as TCreateUserData

    console.log("Add User Submit Response :", result);

    if (result.success) {
      toast.dismiss();

      toast.success(result.message || "User created successfully");

      setIsLoading(false);
    } else {
      toast.dismiss();
      if (setOpen) setOpen(false);
      toast.error(result.message || "Failed to create user");
      setIsLoading(false);
    }
    form.reset();
    if (setOpen) setOpen(false);
    setShow(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <button className="relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm text-white">Add User</span>
            </p>
            <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <CornerGlowSvg />
          </button>
        </DialogTrigger>
      )}

      <DialogContent className="px-6 py-4 w-[40vw] max-w-[600px] gap-2 bg-[#1A1129] border-white/10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                {isEditMode ? "Edit User" : "Add New User"}
              </DialogTitle>
              <ButtonComponent
                disabled={isLoading}
                type="submit"
                varient="yellow"
                buttonName={isEditMode ? "Update" : "Save"}
                className="h-10 px-6 rounded-2xl"
              />
            </DialogHeader>
            <div className="space-y-4">
              {/* Upper Section (Grid Layout) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Side */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter full name"
                            className="bg-white/10 border-none rounded-lg text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter email address"
                            className="bg-white/10 border-none rounded-lg text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            className="bg-white/10 border-none rounded-lg text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                {!userData && <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={show ? "text" : "password"}
                              placeholder="Enter password"
                              className="bg-white/10 border-none rounded-lg text-white pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShow((s) => !s)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-xs"
                            >
                              {show ? (
                                <EyeOffIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    );
                  }}
                />}
                </div>

                {/* Right Side */}
                <div className="space-y-4">
                  {/* <FormField
                    control={form.control}
                    name="roleId"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Role
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-none text-xs h-10 rounded-lg text-white">
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2A1B40] text-white border-white/10">
                            {rolesData?.data?.map((role) => (
                              <SelectItem
                                key={role.id}
                                value={role.id.toString()}
                              >
                                {role.name} ({role.id})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  /> */}

                  {/* <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Status
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-none text-xs h-10 rounded-lg text-white">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2A1B40] text-white border-white/10">
                            <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                            <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                            <SelectItem value="SUSPENDED">SUSPENDED</SelectItem>
                            <SelectItem value="DISABLED">DISABLED</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  /> */}

                  {/* Boolean Switches */}
                  <div className="space-y-3 pt-2">
                    <FormField
                      control={form.control}
                      name="is_active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className="text-xs font-normal text-white">
                              Active
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email_verified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className="text-xs font-normal text-white">
                              Email Verified
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="is_approved"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className="text-xs font-normal text-white">
                              Approved
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    /> */}

                    <FormField
                      control={form.control}
                      name="is_approved"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className="text-xs font-normal text-white">
                              Approved
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
