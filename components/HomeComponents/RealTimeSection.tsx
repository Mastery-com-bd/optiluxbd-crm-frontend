'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    BarChart,
    CircleDollarSign,
    Filter,
    DatabaseZap,
} from 'lucide-react';
import { Button } from '../ui/button';

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
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
                {/* Left — Image */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center lg:justify-end"
                >
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[480px]">
                        <Image
                            src="/images/analytics-dashboard-with-person.jpg"
                            alt="Analytics dashboard with a person"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                            className="object-cover rounded-md"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Right — Content */}
                <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
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
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
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
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
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