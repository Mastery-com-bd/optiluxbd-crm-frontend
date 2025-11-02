"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { setProfileImage } from "@/redux/features/agent/agentProfileSlice";

const ProfileImage = ({ profileImage }: { profileImage: string | null }) => {
  const [hovered, setHovered] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const previewUrl = URL.createObjectURL(imageFile);
      dispatch(setProfileImage(previewUrl));
    }
  };

  return (
    <div
      className="relative rounded-full"
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
        className="rounded-full h-56 w-56 object-cover border-4 border-yellow-400 shadow-md"
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
      />
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-yellow-400 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileImage;
