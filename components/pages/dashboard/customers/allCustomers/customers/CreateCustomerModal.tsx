"use client";
import { Button } from "@/components/ui/button";
import { Plus, Image as ImageIcon, X, RefreshCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/ui/ButtonComponent";

const CreateCustomerModal = () => {
  const [image, setImage] = useState<File | null>(null);
  const [enabled, setEnabled] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonComponent
          buttonName="Create Customer"
          icon={Plus}
          varient="dark yellow"
        />
        {/* <button
          className={`relative cursor-pointer bg-white/5 rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden`}
        >
          <p className="flex items-center gap-2">
            <Plus size={18} />
            <span className="text-sm">Create Customer</span>
          </p>

          <div className="absolute top-0 left-px inset-3 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-px inset-3 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
          <CornerGlowSvg />
        </button> */}
      </DialogTrigger>
      <DialogContent className="p-6 w-[50vw]">
        <DialogHeader className="flex flex-row items-center justify-between mt-4 ">
          <DialogTitle className="text-xl font-semibold text-white">
            Add New Customer
          </DialogTitle>
          <LiquidGlass
            glowIntensity="xs"
            shadowIntensity="xs"
            borderRadius="16px"
          >
            <ButtonComponent buttonName="Add Customer" varient="yellow" />
          </LiquidGlass>
        </DialogHeader>

        <div className="flex items-center justify-between gap-8 ">
          {/* left side */}
          <div className="flex flex-col h-full justify-between gap-4 w-full ">
            {/* profile Image */}
            <div className="flex flex-col justify-between gap-2 h-full">
              <label className="text-white">Profile Photo</label>
              <div
                className={` flex flex-col items-center justify-center border border-dashed border-white rounded-2xl w-full h-full py-6 bg-white/20 text-center cursor-pointer hover:bg-white/25 transition-colors`}
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/png, image/jpeg";
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      setImage(file);
                    }
                  };
                  input.click();
                }}
              >
                {image ? (
                  <div className="relative ">
                    <button
                      className="absolute top-0 right-0 border border-white rounded-full bg-rose-500 cursor-pointer z-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                      }}
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                    <Image
                      src={URL.createObjectURL(image)}
                      height={400}
                      width={400}
                      alt="customer image"
                      className="w-72 h-72 object-cover rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center ">
                    <div className="size-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <ImageIcon className="size-5 text-white/70" />
                    </div>
                    <p className="text-sm text-white/90">
                      Upload Customer image.
                    </p>
                    <p className="text-[10px] text-white/40">
                      Only PNG, JPG format allowed.
                    </p>
                    <p className="text-[10px] text-white/40">
                      500x500 pixels are recommended.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* customer Name */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-white">
                Full Name
              </Label>
              <Input
                placeholder="Enter full name"
                className="w-full py-2 rounded-lg text-sm bg-transparent"
              />
            </div>
          </div>

          {/* right side */}
          <div className="flex flex-col h-full justify-between gap-4 w-full">
            {/* Phone */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-white">
                Phone Number
              </Label>
              <Input
                type="number"
                placeholder="01714******"
                className="w-full py-2 rounded-lg text-sm bg-transparent"
              />
            </div>

            {/* email */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-white">Email</Label>
              <Input
                placeholder="example@something.com"
                className="w-full py-2 rounded-lg text-sm bg-transparent"
              />
            </div>

            {/* status switcher */}
            <div className=" space-y-2">
              <Label className="text-sm font-normal  text-white">Status</Label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setEnabled(!enabled)}
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
                    enabled ? "bg-blue-600" : "bg-gray-400"
                  } `}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      enabled ? "translate-x-9" : "translate-x-1"
                    } `}
                  />
                </button>
                <Label className="text-sm font-normal text-white">
                  Inactive
                </Label>
              </div>
            </div>

            {/* address */}
            <div className="space-y-2">
              <Label className="text-sm font-normal text-white">Address</Label>
              <Input
                placeholder="address"
                className="w-full py-2 rounded-lg text-sm bg-transparent"
              />
            </div>

            {/* customer user name or custoemr id */}
            <div className="flex items-end gap-2">
              <div className="space-y-2 w-full">
                <Label className="text-sm font-normal text-white">
                  Customer ID / Username
                </Label>
                <Input
                  placeholder="OPT3093"
                  className="w-full py-2 rounded-lg text-sm bg-transparent"
                />
              </div>
              <LiquidGlass
                glowIntensity="xs"
                shadowIntensity="xs"
                borderRadius="12px"
              >
                <Button className=" w-10 h-10 p-3 rounded-[12px] bg-transparent cursor-pointer">
                  <RefreshCcw size={16} />
                </Button>
              </LiquidGlass>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCustomerModal;
