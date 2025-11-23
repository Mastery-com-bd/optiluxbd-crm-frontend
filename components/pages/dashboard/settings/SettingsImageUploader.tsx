"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import UploadImage from "../../../ui/UploadImage";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

interface TSettingsImageUploaderProps {
  label: string;
  imageUrl?: string;
  onUpload: (imageFile: File) => Promise<void>;
}
const SettingsImageUploader = ({
  label,
  imageUrl,
  onUpload,
}: TSettingsImageUploaderProps) => {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col items-start space-y-2">
      <label className="font-semibold text-sm">{label}</label>
      <div
        className="relative w-32 h-32 rounded-full overflow-hidden group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={
            imageUrl ??
            "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
          }
          alt={label}
          fill
          sizes="128px"
          className="object-cover rounded-full shadow-md"
        />
        <UploadImage fileInputRef={fileInputRef} handleChange={onUpload} />
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-yellow-400 transition rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SettingsImageUploader;
