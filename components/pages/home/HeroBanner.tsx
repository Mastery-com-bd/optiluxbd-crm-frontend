'use client'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Layers,
    SquareAsterisk,
    Circle,
    Hourglass,
    RefreshCw,
} from "lucide-react";
import Image from "next/image";

export default function HeroBanner() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative bg-cover bg-center bg-no-repeat min-h-screen w-full px-6 md:px-12 lg:px-20 py-16 text-white overflow-hidden flex flex-col items-center justify-center"
            style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-max gap-10">

                {/* Left text content */}
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="lg:max-w-[50%] text-center lg:text-left z-10"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                    >
                        Optimize Your<span className="block"> Sales, Maximize</span>
                        <span className="block">Your Profits</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="text-neutral-200 text-sm sm:text-base mt-4"
                    >
                        Transform the way you manage sales with our all-in-one platform.
                        Empower your team to close deals faster with real-time insights,
                        automated processes, and intuitive dashboards.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="mt-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-2"
                    >
                        <Input
                            placeholder="What's your work email?"
                            className="bg-white text-black rounded-md w-full sm:w-[250px]"
                        />
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full sm:w-auto">
                            Get started
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Right image + cards */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:max-w-[50%] relative w-full flex justify-center items-center z-10"
                >
                    <div
                        className="relative bg-cover bg-center bg-no-repeat h-[400px] w-full flex justify-center"
                        style={{ backgroundImage: "url('/images/person-bg.png')" }}
                    >
                        <Image
                            src="/images/person.png"
                            fill
                            alt="Person Image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain rounded-full"
                            priority
                        />
                    </div>

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        viewport={{ once: true }}
                        className="absolute left-[70%] top-[20%] sm:right-0 bg-white shadow-lg rounded-xl px-3 py-2 sm:px-4 sm:py-3 w-[130px] sm:w-[170px] text-black text-xs sm:text-sm flex flex-col items-start"
                    >
                        <p className="font-medium sm:font-semibold">Target Attainment</p>
                        <div className="flex items-center gap-2 mt-1 sm:mt-2">
                            <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-yellow-500" />
                            <span className="text-base sm:text-lg font-bold text-yellow-600">
                                89%
                            </span>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 }}
                        viewport={{ once: true }}
                        className="absolute top-[40%] left-[-20px] sm:left-[-20px] bg-white shadow-md rounded-xl px-3 py-2 sm:px-4 sm:py-3 w-[100px] sm:w-[170px] text-black text-xs sm:text-sm"
                    >
                        <p className="font-medium sm:font-semibold">Win Rate ($)</p>
                        <div className="mt-1 sm:mt-2 flex justify-between items-center text-yellow-600 font-medium">
                            <span className="text-xs sm:text-sm">42%</span>
                            <span className="text-[10px] sm:text-xs text-gray-600">↑10%</span>
                        </div>
                        <div className="w-full h-1 bg-yellow-200 rounded mt-1">
                            <div className="h-1 bg-yellow-600 rounded w-[42%]" />
                        </div>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        viewport={{ once: true }}
                        className="absolute bottom-0 sm:right-0 bg-white shadow-md rounded-xl px-3 py-2 sm:px-4 sm:py-3 w-[140px] sm:w-[180px] text-black text-xs sm:text-sm"
                    >
                        <p className="font-medium sm:font-semibold">Activity Tracker</p>
                        <div className="mt-1 sm:mt-2 text-yellow-700 font-semibold text-xs sm:text-sm">
                            15<span className="text-neutral-600">/20</span>
                        </div>
                        <div className="w-full h-1 bg-yellow-200 rounded mt-1">
                            <div className="h-1 bg-yellow-500 rounded w-[75%]" />
                        </div>
                    </motion.div>
                </motion.div>
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
        </motion.div>
    );
}