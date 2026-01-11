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
  fullName: z.string().min(2, "Full name is required"),
  interestedProduct: z.string().min(1, "Product SKU is required"),
  leadSource: z.string().min(1, "Please select a source"),
  leadPriority: z.string().min(1, "Please select a priority"),
  phoneNumber: z.string().min(11, "Valid phone number is required"),
  initialNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddLeadsModal = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      interestedProduct: "",
      leadSource: "",
      leadPriority: "",
      phoneNumber: "",
      initialNotes: "",
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
              {/* <LiquidGlass glowIntensity="xs" shadowIntensity="xs" borderRadius="16px">
                <Button
                  type="submit"
                  variant="yellow"
                  className="p-3 flex rounded-2xl border-none cursor-pointer h-10"
                >
                  Add Lead
                </Button>
              </LiquidGlass> */}
              <ButtonComponent icon={Plus} type="submit" varient="yellow" buttonName="add" className="h-10 px-6 rounded-2xl"/>
            </DialogHeader>
            <div className="space-y-4">
              {/* Upper Section (Grid Layout) */}
              <div className="grid grid-cols-2 gap-4">
                {/* Left Side */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">Full Name</FormLabel>
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
                    name="interestedProduct"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">Interested Product</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Write product SKU"
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
                  <div className="flex items-start gap-2">
                    <FormField
                      control={form.control}
                      name="leadSource"
                      render={({ field }) => (
                        <FormItem className="space-y-1 flex-1">
                          <FormLabel className="text-xs font-normal text-white">Source</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-none text-xs h-10 rounded-lg text-white">
                                <SelectValue placeholder="Source" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#2A1B40] text-white border-white/10">
                              {["Referral", "Organic", "Facebook", "LinkedIn", "Cold Call"].map((item) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="leadPriority"
                      render={({ field }) => (
                        <FormItem className="space-y-1 flex-1">
                          <FormLabel className="text-xs font-normal text-white">Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-none text-xs h-10 rounded-lg text-white">
                                <SelectValue placeholder="Priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-[#2A1B40] text-white border-white/10">
                              {["High", "Medium", "Low"].map((item) => (
                                <SelectItem key={item} value={item}>{item}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+8801754******"
                            className="bg-white/10 border-none rounded-lg text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Textarea Section */}
              <FormField
                control={form.control}
                name="initialNotes"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-xs font-normal text-white">Initial Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Optional notes about the leads"
                        className="bg-white/10 border-none resize-none rounded-xl px-4 py-3 placeholder:text-[#B1B1B1] text-white h-[100px]"
                        {...field}
                      />
                    </FormControl>
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