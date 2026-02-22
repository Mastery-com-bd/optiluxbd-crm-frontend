"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import CornerGlowSvg from "@/components/svgIcon/CornerGlowSvg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ButtonComponent from "@/components/ui/ButtonComponent";

// Validation Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(11, "Valid phone number is required"),
  lead_status: z.string().min(1, "Status is required"),
  lead_source: z.string().min(1, "Source is required"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  customFields: z.object({
    interest: z.string().min(1, "Interest is required"),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddLeadsModal = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      lead_status: "",
      lead_source: "",
      email: "",
      gender: "",
      customFields: {
        interest: "",
      },
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted Data:", data);
    // form.reset(); // Submit hobar por form clear korte chaile
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
          <p className="flex items-center gap-2">
            <Plus size={18} />
            <span className="text-sm text-white">Add Leads</span>
          </p>
          <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
          <CornerGlowSvg />
        </button>
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-[40vw] max-w-[600px] gap-2 bg-[#1A1129] border-white/10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                Add New Lead
              </DialogTitle>
              <ButtonComponent
                icon={Plus}
                type="submit"
                varient="yellow"
                buttonName="add"
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
                </div>

                {/* Right Side */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Gender
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-none text-xs h-10 rounded-lg text-white">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2A1B40] text-white border-white/10">
                            {["MALE", "FEMALE", "OTHER", "NOT_SPECIFIED"].map(
                              (item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lead_source"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Lead Source
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-none text-xs h-10 rounded-lg text-white">
                              <SelectValue placeholder="Select Source" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2A1B40] text-white border-white/10">
                            {[
                              "FACEBOOK",
                              "WEBSITE",
                              "MANUAL",
                              "API",
                              "REFERRAL",
                              "OTHER",
                            ].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lead_status"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          Lead Status
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
                            {[
                              "NEW",
                              "CONTACTED",
                              "QUALIFIED",
                              "CONVERTED",
                              "LOST",
                            ].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Interest Section */}
              <FormField
                control={form.control}
                name="customFields.interest"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-normal text-white">
                      Interest (Custom Field)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Premium Package"
                        className="bg-white/10 border-none rounded-lg text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadsModal;
