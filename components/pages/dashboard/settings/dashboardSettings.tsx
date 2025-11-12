"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Save, Trash2 } from "lucide-react";
import React from "react";
import {
  Path,
  Resolver,
  useForm
} from "react-hook-form";
import { z } from "zod";

// Zod schema for validation
const settingsSchema = z.object({
  site_name: z.string().min(2, "Site name must be at least 2 characters"),
  site_logo_url: z.string(),
  site_logo_public_id: z.string().min(1, "Logo public id is required"),
  site_favicon_url: z.string(),
  contact_email: z.string().email("Provide a valid email"),
  contact_phone: z
    .string()
    .min(7, "Phone seems too short")
    .max(20, "Phone seems too long")
    .regex(
      /^\+?[0-9\s\-()]+$/,
      "Only digits, spaces, dashes, parentheses, and optional +"
    ),
  address: z.string().min(4, "Address must be at least 4 characters"),
  facebook_url: z.array(z.string()).default([]),
  twitter_url: z.array(z.string()).default([]),
  instagram_url: z.array(z.string()).default([]),
  linkedin_url: z.array(z.string()).default([]),
  maintenance_mode: z.boolean().default(false),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

// Mock data that will be stored in state
const mockData: SettingsFormValues = {
  site_name: "OptiluxBD CRM",
  site_logo_url:
    "https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png",
  site_logo_public_id: "optiluxbd/logo_001",
  site_favicon_url: "https://cdn.optiluxbd.com/assets/favicon.ico",
  contact_email: "optilux.com.bd@gmail.com",
  contact_phone: "+88019699137006",
  address: "Mujib Sorok, Jessore-7400, Bangladesh.",
  facebook_url: [
    "https://www.facebook.com/optilux.com.bd",
    "https://facebook.com/groups/optiluxbd",
  ],
  twitter_url: ["https://twitter.com/optiluxbd"],
  instagram_url: ["https://instagram.com/optiluxbd"],
  linkedin_url: ["https://linkedin.com/company/optiluxbd"],
  maintenance_mode: false,
};

export default function DashboardSettings() {
  // Store mock data in state
  const [settings, setSettings] = React.useState<SettingsFormValues>(mockData);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema) as Resolver<SettingsFormValues>,
    defaultValues: settings,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
    watch,
  } = form;

  const [savedAt, setSavedAt] = React.useState<Date | null>(null);

  const onSubmit = async (values: SettingsFormValues) => {
    // Update the mock data in state
    setSettings(values);
    // Simulate persistence layer; wire to API as needed.
    await new Promise((r) => setTimeout(r, 500));
    setSavedAt(new Date());
    // You can replace this with actual API integration using your Redux RTK Query baseApi.
    // Example: await dispatch(updateSettings(values)).unwrap();
  };

  const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({
    title,
    subtitle,
  }) => (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        {savedAt && (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Last saved {savedAt.toLocaleTimeString()}
          </Badge>
        )}
      </div>
      {subtitle ? (
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      ) : null}
    </CardHeader>
  );

  type EditableFieldProps<K extends Path<SettingsFormValues>> = {
    label: string;
    name: K;
    type?: "text" | "textarea" | "url" | "email";
    placeholder?: string;
  };
  function EditableField<K extends Path<SettingsFormValues>>({
    label,
    name,
    type = "text",
    placeholder,
  }: EditableFieldProps<K>) {
    const [editing, setEditing] = React.useState(true);
    return (
      <FormField<SettingsFormValues>
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>{label}</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setEditing((v) => !v)}
                aria-label="Toggle edit"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            <FormControl>
              {editing ? (
                type === "textarea" ? (
                  <Textarea
                    placeholder={placeholder}
                    value={String(field.value ?? "")}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                ) : (
                  <Input
                    placeholder={placeholder}
                    value={String(field.value ?? "")}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                )
              ) : (
                <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground bg-muted/30">
                  {String(field.value ?? "") || "—"}
                </div>
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Dashboard Settings
        </h1>
        {savedAt && (
          <Badge variant="secondary" className="sm:hidden">
            Saved {savedAt.toLocaleTimeString()}
          </Badge>
        )}
      </div>
      <Separator className="mb-6" />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Branding */}
          <Card className="shadow-sm">
            <SectionHeader
              title="Branding"
              subtitle="Update site identity and assets."
            />
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <EditableField
                label="Site Name"
                name="site_name"
                placeholder="OptiluxBD CRM"
              />
              <EditableField
                label="Logo URL"
                name="site_logo_url"
                type="url"
                placeholder="https://..."
              />
              <EditableField
                label="Logo Public ID"
                name="site_logo_public_id"
                placeholder="optiluxbd/logo_001"
              />
              <EditableField
                label="Favicon URL"
                name="site_favicon_url"
                type="url"
                placeholder="https://.../favicon.ico"
              />
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-sm">
            <SectionHeader
              title="Contact"
              subtitle="Company contact details."
            />
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <EditableField
                label="Email"
                name="contact_email"
                type="email"
                placeholder="name@company.com"
              />
              <EditableField
                label="Phone"
                name="contact_phone"
                type="text"
                placeholder="+8801..."
              />
              <div className="sm:col-span-2">
                <EditableField
                  label="Address"
                  name="address"
                  type="textarea"
                  placeholder="Street, City, Postal"
                />
              </div>
            </CardContent>
          </Card>

          {/* Socials Links */}
          <Card className="shadow-lg border-0 rounded-2xl">
            <SectionHeader
              title="Social Links"
              subtitle="Manage social profiles and groups."
            />
            <CardContent className="space-y-6 p-6">
              {/* Facebook */}
              <div className="group relative p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    
                    <FormLabel className="font-semibold">
                      Facebook URLs
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className=""
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className=""
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {watch("facebook_url")?.map((_, idx) => (
                    <FormField
                      key={`facebook_url.${idx}`}
                      control={control}
                      name={`facebook_url.${idx}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl className="flex-1">
                              <Input
                                placeholder="https://facebook.com/page"
                                className=""
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="hover:bg-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Twitter */}
              <div className="group relative p-4 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                   
                    <FormLabel className="font-semibold">
                      Twitter URLs
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-sky-200 text-sky-600 hover:bg-sky-100"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-sky-500 hover:bg-sky-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {watch("twitter_url")?.map((_, idx) => (
                    <FormField
                      key={`twitter_url.${idx}`}
                      control={control}
                      name={`twitter_url.${idx}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl className="flex-1">
                              <Input
                                placeholder="https://twitter.com/handle"
                                className="border-sky-200 focus:ring-sky-400"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="hover:bg-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Instagram */}
              <div className="group relative p-4 rounded-xl bg-linear-to-r from-pink-50 to-rose-50 border border-pink-100 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow">
                      <span className="text-white text-xs font-bold">ig</span>
                    </div>
                    <FormLabel className="text-pink-700 font-semibold">
                      Instagram URLs
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-pink-200 text-pink-600 hover:bg-pink-100"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-pink-500 hover:bg-pink-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {watch("instagram_url")?.map((_, idx) => (
                    <FormField
                      key={`instagram_url.${idx}`}
                      control={control}
                      name={`instagram_url.${idx}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl className="flex-1">
                              <Input
                                placeholder="https://instagram.com/user"
                                className="border-pink-200 focus:ring-pink-400"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="hover:bg-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="group relative p-4 rounded-xl bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-100 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shadow">
                      <span className="text-white text-xs font-bold">in</span>
                    </div>
                    <FormLabel className="text-indigo-700 font-semibold">
                      LinkedIn URLs
                    </FormLabel>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-indigo-200 text-indigo-600 hover:bg-indigo-100"
                    >
                      <Plus className="mr-1 h-4 w-4" /> Add
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-indigo-500 hover:bg-indigo-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {watch("linkedin_url")?.map((_, idx) => (
                    <FormField
                      key={`linkedin_url.${idx}`}
                      control={control}
                      name={`linkedin_url.${idx}`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center gap-2">
                            <FormControl className="flex-1">
                              <Input
                                placeholder="https://linkedin.com/company/page"
                                className="border-indigo-200 focus:ring-indigo-400"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="hover:bg-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System */}
          <Card className="shadow-sm">
            <SectionHeader
              title="System"
              subtitle="Platform switches and status."
            />
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={control}
                name="maintenance_mode"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0 rounded-md border p-3">
                    <FormLabel className="text-base">
                      Maintenance Mode
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-end gap-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
              {!isValid && (
                <Badge variant="destructive">Fix validation errors</Badge>
              )}
              {isDirty && isValid && !isSubmitting && (
                <Badge variant="outline">Unsaved changes</Badge>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
