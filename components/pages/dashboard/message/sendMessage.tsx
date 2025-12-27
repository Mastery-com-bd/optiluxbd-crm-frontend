"use client";

import { Button } from "@/components/ui/button";
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
import { MessageSquare, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  channel: z.string().min(1, "Channel is required"),
  template: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

const SendMessage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "",
      channel: "WhatsApp",
      template: "",
      message: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const messageContent = form.watch("message");
  const selectedChannel = form.watch("channel");

  const variables = [
    "{LeadName}",
    "{CustomerName}",
    "{OrderID}",
    "{LeadName}",
    "{Product}",
    "{Date}",
  ];

  const handleVariableClick = (variable: string) => {
    const currentMessage = form.getValues("message");
    form.setValue("message", currentMessage + variable, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleTemplateChange = (value: string) => {
    form.setValue("template", value);
    // Mock template content filling
    if (value === "order_confirmation") {
      form.setValue(
        "message",
        "Hi {CustomerName}, your order {OrderID} has been confirmed. Thanks for shopping with us!"
      );
    } else if (value === "shipping_update") {
      form.setValue(
        "message",
        "Hello {CustomerName}, your order {OrderID} containing {Product} has been shipped."
      );
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-[#1E1B2E] rounded-3xl p-8 shadow-2xl w-full mx-auto border border-white/5">
      <h2 className="text-2xl font-semibold text-white mb-8">Send Message</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Recipient Search */}
              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Recipient</FormLabel>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <FormControl>
                        <Input
                          placeholder="Search lead or customer"
                          className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-1 focus-visible:ring-purple-500"
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Channel Selection */}
              <FormField
                control={form.control}
                name="channel"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Channel</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-purple-500">
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

              {/* Template Selection */}
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Template</FormLabel>
                    <Select
                      onValueChange={handleTemplateChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl focus:ring-1 focus:ring-purple-500">
                          <SelectValue placeholder="Select Your Template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#2D2A3D] border-white/10 text-white">
                        <SelectItem value="order_confirmation">
                          Order Confirmation
                        </SelectItem>
                        <SelectItem value="shipping_update">
                          Shipping Update
                        </SelectItem>
                        <SelectItem value="promo">Promotional Offer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Textarea */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-gray-300">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here"
                        className="min-h-[180px] bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl resize-none p-4 focus-visible:ring-1 focus-visible:ring-purple-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Variables */}
              <div className="space-y-3">
                <Label className="text-gray-300">Insert Variables</Label>
                <div className="flex flex-wrap gap-3">
                  {variables.map((variable, index) => (
                    <button
                      key={`${variable}-${index}`}
                      type="button"
                      onClick={() => handleVariableClick(variable)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-sm rounded-full transition-colors"
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Live Preview */}
            <div className="space-y-2">
              <Label className="text-gray-300">Live Preview</Label>
              <div className="relative h-[400px] w-full rounded-3xl overflow-hidden p-px">
                {/* Gradient Border */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-white/20 to-white/5 pointer-events-none" />

                {/* Glass Card Content */}
                <div className="h-full w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 flex flex-col">
                  {/* Preview Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                      <MessageSquare className="h-6 w-6 text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">
                        {selectedChannel || "Channel"}
                      </h3>
                      <p className="text-gray-400 text-sm">Preview</p>
                    </div>
                  </div>

                  {/* Preview Body */}
                  <div className="flex-1 text-gray-300 font-light leading-relaxed whitespace-pre-wrap">
                    {messageContent || "Your message will appear here"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-10 flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto min-w-[200px] h-12 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border-0"
              style={{
                background: "linear-gradient(90deg, #634c48 0%, #8e6a52 100%)",
              }}
            >
              {/* Gradient overlay for the glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Send Message</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SendMessage;
