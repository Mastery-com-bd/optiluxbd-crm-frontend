'use client'
import { motion } from "framer-motion";
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
                </div>
            </div>
        </motion.div>
    );
}