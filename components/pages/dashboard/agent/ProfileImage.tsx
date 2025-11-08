/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UploadImage from "./UploadImage";
import { useUserImageUploadMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { userImageUpload } from "@/service/user/imageUpload";

const ProfileImage = ({
  profileImage,
  id,
}: {
  profileImage: string | null;
  id: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUpload] = useUserImageUploadMutation();

  const handleChange = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("avatar", imageFile as File);
    try {
      // const res = await userImageUpload(id, imageFile);
      const res = await imageUpload({ id, formData }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <div
      className="relative rounded-full border border-red-600"
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
        className="rounded-full h-56 w-56 object-cover border-2 border-yellow-400 shadow-md"
      />
      <UploadImage fileInputRef={fileInputRef} handleChange={handleChange} />
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
