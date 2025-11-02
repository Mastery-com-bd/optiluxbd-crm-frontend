"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentuserInfo,
  resetProfile,
  setProfileImage,
} from "@/redux/features/agent/agentProfileSlice";

const ProfileImage = ({ profileImage }: { profileImage: string | null }) => {
  const [hovered, setHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const currentInfo = useAppSelector(currentuserInfo);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageFile = e.target.files[0];
      const previewUrl = URL.createObjectURL(imageFile);
      setSelectedFile(imageFile);
      dispatch(setProfileImage(previewUrl));
    }
  };

  const handleSave = () => {
    if (currentInfo) {
      setShowUploadModal(false);
      setSelectedFile(null);
      console.log(currentInfo);
    }
  };

  const handleDelete = async () => {
    console.log("clicked");
  };
  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowMenu(false);
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
      <AnimatePresence>
        {hovered && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-yellow-400 transition"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Camera className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden z-50"
          >
            <button
              className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-yellow-100 text-yellow-700 cursor-pointer"
              onClick={() => {
                setShowUploadModal(true);
                setShowMenu(false);
              }}
            >
              Change Image
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm font-medium hover:bg-red-100 text-red-600 cursor-pointer"
              onClick={() => {
                handleDelete();
                setShowMenu(false);
              }}
            >
              Delete Image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 w-[420px] text-center"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  Change Profile Image
                </h3>
              </div>

              {selectedFile && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    width={500}
                    height={500}
                    className="rounded-full h-40 w-40 object-cover border-2 border-yellow-400 shadow-md"
                  />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer p-2 mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFile(null);
                    dispatch(resetProfile());
                  }}
                  className="px-4 py-2 text-sm rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!selectedFile}
                  className={`px-4 py-2 text-sm rounded-lg font-medium  ${
                    selectedFile
                      ? "bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Save Image
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileImage;
