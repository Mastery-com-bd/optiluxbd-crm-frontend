"use client";

import React from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const profileFields = [
  { label: "Marital Status", value: "Married" },
  { label: "Number of Children", value: "2" },
  { label: "Customer Birthday", value: "15 Aug 1990" },
  { label: "Spouse Birthday", value: "12 Feb 1992" },
  { label: "Anniversary Date", value: "20 Dec 2018" },
  { label: "Gender", value: "Male" },
  { label: "Preferred Language", value: "English" },
  { label: "Preferred Contact Time", value: "Evening" },
  { label: "Preferred Contact Method", value: "Email" },
  { label: "Income Range", value: "$50,000 - $80,000" },
  { label: "Occupation", value: "Software Engineer" },
  { label: "Education Level", value: "Bachelor's Degree" },
  { label: "Family Size", value: "4" },
  { label: "Home Ownership", value: "Owner" },
  { label: "Vehicle Ownership", value: "Car" },
  { label: "Pet Owner", value: "Yes (Dog)" },
  { label: "Hobbies/Interests", value: "Photography, Traveling" },
  { label: "Favorite Product Category", value: "Electronics" },
  { label: "Shopping Frequency", value: "Monthly" },
  { label: "Price Sensitivity", value: "Medium" },
  { label: "Loyalty Program Member", value: "Gold Tier" },
  { label: "Gift Buyer", value: "Yes" },
  { label: "Seasonal Buyer", value: "No" },
  { label: "Device Preference", value: "Mobile" },
  { label: "Payment Preference", value: "Credit Card" },
  { label: "Delivery Preference", value: "Home Delivery" },
  { label: "Eco-Conscious", value: "High" },
  { label: "Health Conscious", value: "Moderate" },
  { label: "Fashion Style", value: "Casual" },
];

const AdvanceProfile = () => {
  return (
    <div className="min-h-screen w-full text-white ">
      <Card className="bg-transparent border-none shadow-none  p-0">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div>
              <h1 className="text-[24px] font-bold text-white">
                Personal Information
              </h1>
              <p className="text-[16px] font-normal text-[#B4B4B8]">Detailed customer profile and preferences</p>
            </div>
            <Button className="bg-[#15151a] hover:bg-[#1c1a26] text-green-500 border border-white/10 hover:border-green-500/30 gap-2 rounded-xl px-6 h-10 transition-all duration-300">
              <Edit className="w-4 h-4" />
              Edit Info
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profileFields.map((field, index) => (
              <div key={index} className="min-w-[216px] space-y-3 p-[17px] border border-white/10 rounded-4xl bg-white/2">
                <label className="text-[#B4B4B8] text-sm md:text-[15px] font-light mb-1">
                  {field.label}
                </label>
                <div className="text-white font-normal text-base">
                  {field.value}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvanceProfile;

