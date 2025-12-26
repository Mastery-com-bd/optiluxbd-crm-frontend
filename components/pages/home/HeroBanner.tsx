'use client'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lottie from 'lottie-react';
import {
    Layers,
    SquareAsterisk,
    Circle,
    Hourglass,
    RefreshCw,
} from "lucide-react";
import animationData from '@/public/lottie/About Us Team.json';
import HeroSvg from "@/components/svgIcon/HeroSvg";
import HeroCircle from "@/components/svgIcon/HeroCircle";
import ButtonComponent from "@/components/ui/ButtonComponent";

export default function HeroBanner() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className=""
        >
            {/* <div className="absolute inset-0 bg-black/40 z-0" /> */}
            <div className="max-w-[1440px] relative bg-cover bg-center bg-no-repeat w-full px-6 md:px-12 lg:px-20 py-16 text-white overflow-hidden flex flex-col items-center justify-center mx-auto ">
                <HeroSvg />
                <HeroCircle />
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-max gap-10">

                    {/* Left text content */}
                    <motion.div
                        initial={{ x: -80, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className=" text-center  z-10 my-20"
                    >
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-7xl font-semibold leading-tight"
                        >
                            All-in-One CRM & Business Automation Platform
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-neutral-200 text-sm sm:text-base mt-4"
                        >
                            OptiluxBD CRM helps businesses track leads, automate orders, manage
                            <br />inventory, and boost sales performance with real-time insights.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-6 flex justify-center sm:flex-row items-center gap-3 sm:gap-2"
                        >

                            <ButtonComponent 
                            buttonName="Get Start" 
                            varient="purple"
                            clasName="px-8 py-3" 
                            />
                            <ButtonComponent 
                            buttonName="Buy Now" 
                            varient="yellow"
                            clasName="px-8 py-3" 
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right image + cards
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:max-w-[50%] relative w-full flex justify-center items-center z-10"
                    >
                        <div
                            className="relative bg-cover bg-center bg-no-repeat  w-full flex justify-center"
                            style={{ backgroundImage: "url('/images/person-bg.png')" }}
                        >
                            <Lottie animationData={animationData}></Lottie>
                        </div>

                    </motion.div> */}
                </div>

                {/* Icons section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    viewport={{ once: true }}
                    className="mt-20 w-full flex flex-col items-center"
                >
                    <p className="text-sm text-neutral-300 mb-4">
                        Trusted by teams around the world
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-white opacity-80">
                        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
                            <Layers size={20} />
                            <span>Layers</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
                            <SquareAsterisk size={20} />
                            <span>Quotient</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
                            <Circle size={20} />
                            <span>Circoole</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
                            <Hourglass size={20} />
                            <span>Hourglass</span>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-2">
                            <RefreshCw size={20} />
                            <span>Command+R</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}