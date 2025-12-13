"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadImage from "./UploadImage";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const ImageUploader = ({
  handleChange,
  profileImage,
  id,
  clasName = "h-56 w-56 rounded-full shadow-md",
}: {
  handleChange: (imageFile: File) => Promise<void>;
  profileImage?: string;
  id: number;
  clasName?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="relative rounded-full "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <Image
        src={
          profileImage ??
          "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
        }
        alt="Agent Avatar"
        width={500}
        height={500}
        className={cn(" object-cover ", clasName)}
      />
      <UploadImage fileInputRef={fileInputRef} handleChange={handleChange} />
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-yellow-400 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
