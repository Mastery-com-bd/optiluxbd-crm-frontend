"use client";

import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  templateName: z.string().min(1, "Template name is required"),
  channel: z.string().min(1, "Channel is required"),
  messageContent: z.string().min(1, "Message content is required"),
});

const CreateTemplete = () => {

      const [isOpen, setIsOpen] = useState(false);
        
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateName: "",
      channel: "WhatsApp",
      messageContent: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const messageContent = form.watch("messageContent");

  const variables = [
    "{LeadName}",
    "{CustomerName}",
    "{OrderID}",
    "{Amount}",
    "{Product}",
    "{Date}",
  ];

  const handleVariableClick = (variable: string) => {
    const currentContent = form.getValues("messageContent");
    form.setValue("messageContent", currentContent + variable, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsOpen(false);
    console.log(values);
    // Add your submission logic here
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative inline-block group cursor-pointer">
            <LiquidGlass
              glowIntensity="none"
              borderRadius="10px"
              className="w-fit"
            >
              <Button
                style={{
                  backgroundImage: "url('/svg/button-background.svg')",
                  backgroundSize: "cover",
                }}
                className="rounded-xl bg-transparent border-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Template
              </Button>
            </LiquidGlass>
            <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#FFB13F] to-transparent h-[1.5px]" />
          </div>
        </DialogTrigger>
        <DialogContent className="w-[770px] bg-white/5 backdrop-blur-xl border border-white/10 p-0 overflow-hidden rounded-3xl gap-0 shadow-2xl">
          {/* Header */}
          <DialogHeader className="p-6 pb-2 flex flex-row items-center justify-between border-b border-white/5">
            <DialogTitle className="text-xl font-semibold text-white">
              Create New Template
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Template Name */}
                  <FormField
                    control={form.control}
                    name="templateName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-200">
                          Template Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Order Confirmation"
                            className=" text-white placeholder:text-gray-500 h-12 bg-transparent shadow-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Channel */}
                  <FormField
                    control={form.control}
                    name="channel"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-200">Channel</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-1 focus:ring-white/20">
                              <SelectValue placeholder="Select Channel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#2D2A3D] border-white/10 text-white">
                            <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                            <SelectItem value="SMS">SMS</SelectItem>
                            <SelectItem value="Email">Email</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message Content */}
                  <FormField
                    control={form.control}
                    name="messageContent"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-gray-200">
                          Message Content
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your message template..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl min-h-[180px] resize-none focus-visible:ring-1 focus-visible:ring-white/20 p-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Right Column - Live Preview */}
                <div className="space-y-2 flex flex-col">
                  <Label className="text-gray-200">Live Preview</Label>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 font-light leading-relaxed">
                    {messageContent ||
                      "Your message preview will appear here..."}
                  </div>
                </div>
              </div>

              {/* Variables Section */}
              <div className="px-8 pb-2">
                <Label className="text-gray-200 mb-3 block">Variables</Label>
                <div className="flex flex-wrap gap-3">
                  {variables.map((variable) => (
                    <button
                      key={variable}
                      type="button"
                      onClick={() => handleVariableClick(variable)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 transition-colors"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-8 pt-6 flex items-center justify-between gap-4">
                {/* Send Now Button with Custom Gradient */}
                <Button
                  type="submit"
                  className="flex-1 h-12 rounded-xl text-white font-medium text-lg relative overflow-hidden border-0"
                  
                >
                  
                  <span className="relative z-10">Send Now</span>
                 
                </Button>

                {/* Cancel Button */}
                <Button
                  type="button"
                  variant="outline"
                  className="w-32 h-12 rounded-xl bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTemplete;
