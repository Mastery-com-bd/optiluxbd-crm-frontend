/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import PageHeader from "../shared/pageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createSettings } from "@/service/userSettings";
import SocialField from "./SocialFields";
import { backupFrequencies, backupStorage } from "./SystemInfoSettings";

const socialLinksSchema = z
  .array(z.string().url("Enter a valid URL"))
  .min(1, "At least one link is required")
  .max(5, "Maximum 5 links allowed");

export const settingsSchema = z.object({
  site_name: z
    .string({ message: "site name is required" })
    .min(1, "site name should be at least one character"),
  address: z.string().optional(),
  currency: z.string().optional(),
  timezone: z.string().optional(),
  contact_email: z.string().email("type a valid email address"),
  contact_phone: z.string().optional(),
  pusher_app_id: z.string().optional(),
  pusher_app_key: z.string().optional(),
  pusher_app_secret: z.string().optional(),
  pusher_app_cluster: z.string().optional(),
  local_backup_path: z.string().optional(),
  backup_storage_type: z.enum(["LOCAL", "CLOUD", "S3", "FTP"]),
  backup_frequency: z.enum(["MANUAL", "DAILY", "WEEKLY", "MONTHLY"]),
  backup_enabled: z.boolean(),
  maintenance_mode: z.boolean(),
  facebook_url: socialLinksSchema,
  twitter_url: socialLinksSchema,
  instagram_url: socialLinksSchema,
  linkedin_url: socialLinksSchema,
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

const CreateSettings = () => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      site_name: "",
      address: "",
      currency: "BDT",
      timezone: "Asia/Dhaka",
      contact_email: "",
      contact_phone: "",
      pusher_app_id: "",
      pusher_app_key: "",
      pusher_app_secret: "",
      pusher_app_cluster: "",
      local_backup_path: "",
      backup_storage_type: "LOCAL",
      backup_frequency: "MANUAL",
      backup_enabled: false,
      maintenance_mode: false,
      facebook_url: [""],
      twitter_url: [""],
      instagram_url: [""],
      linkedin_url: [""],
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    const toastId = toast.loading("creating settings...", { duration: 3000 });
    try {
      const result = await createSettings(data);
      console.log(result);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        form.reset();
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <PageHeader
        title="Create Settings"
        description="Here you can create the setting for your organization"
      />

      <div className="space-y-8 ">
        {/* General Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact & System Info (Optional)</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Site Name */}
                  <FormField
                    control={form.control}
                    name="site_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Site Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Currency */}
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="currency" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Timezone */}
                  <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Timezone (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="time zone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="email" type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="contact_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="phone number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Backup Storage Type */}
                  <FormField
                    control={form.control}
                    name="backup_storage_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backup Storage Type (Optional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select storage type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {backupStorage.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Backup Frequency */}
                  <FormField
                    control={form.control}
                    name="backup_frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Backup Frequency (Optional)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {backupFrequencies.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pusher_app_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pusher App Id (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="pusher app id" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pusher_app_key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pusher App Key (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="pusher app key" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pusher_app_secret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pusher App Secret (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="pusher app secret" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pusher_app_cluster"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pusher App Cluster (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="pusher app cluster" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="local_backup_path"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Local App Path (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="local app path" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between px-6">
                    <FormField
                      control={form.control}
                      name="maintenance_mode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <FormLabel>Maintenance Mode</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[rgba(0,166,86,0.20)] [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="backup_enabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center">
                          <FormLabel>Backup Enabled</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[rgba(0,166,86,0.20)] [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <SocialField
                    label="Facebook Links"
                    name="facebook_url"
                    control={form.control}
                    setValue={form.setValue}
                  />

                  <SocialField
                    label="Twitter Links"
                    name="twitter_url"
                    control={form.control}
                    setValue={form.setValue}
                  />
                  <SocialField
                    label="Instagram Links"
                    name="instagram_url"
                    control={form.control}
                    setValue={form.setValue}
                  />
                  <SocialField
                    label="LinkedIn Links"
                    name="linkedin_url"
                    control={form.control}
                    setValue={form.setValue}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <ButtonComponent
                    buttonName="Save Changes"
                    varient="yellow"
                    type="submit"
                    className="h-10 px-6 rounded-2xl"
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateSettings;
