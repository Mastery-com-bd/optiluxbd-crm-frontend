'use client';

import { motion } from 'framer-motion';
import {
    BarChart,
    CircleDollarSign,
    Filter,
    DatabaseZap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';

export default function RealTimeSection() {
    const features = [
        { icon: BarChart, title: 'Open Opportunities by Product' },
        { icon: Filter, title: 'Leads by Source' },
        { icon: CircleDollarSign, title: 'Total Revenue vs. Target' },
        { icon: DatabaseZap, title: 'Sales Funnel Analysis' },
    ];

    return (
        <section className="w-full py-20 px-6 md:px-12 lg:px-20">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1 }}
                className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                {/* Left — Image */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="flex justify-center lg:justify-end "
                >
                    <div className="relative">
                        <Lottie animationData={animationData2} />
                    </div>
                </motion.div>

                {/* Right — Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <p className="text-xs font-bold text-yellow-800 bg-yellow-200 px-4 py-1 rounded-full mb-4 inline-block">
                        REAL-TIME INSIGHTS
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                        Make Data-Driven Decisions <br /> with Real-Time Insights
                    </h2>
                    <p className="mt-4 text-sm text-gray-600 max-w-lg">
                        Our platform provides you with the clarity and confidence to make strategic decisions and drive sales success.
                    </p>

                    {/* Feature List */}
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1,
                                },
                            },
                        }}
                    >
                        {features.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    variants={{
                                        hidden: { opacity: 0 },
                                        visible: { opacity: 1 },
                                    }}
                                    className="flex items-center gap-3 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    <Icon size={16} />
                                    <span>{item.title}</span>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold w-full sm:w-auto mt-3.5">
                            Get started
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}