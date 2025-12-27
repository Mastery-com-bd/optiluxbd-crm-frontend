'use client';
import FeaturedSectionLightSVG from '@/components/svgIcon/FeaturedSectionLightSVG';
import { motion } from 'framer-motion';
import { Zap, Repeat, BarChart } from 'lucide-react';

export default function OurFeatures() {
    const featureCards = [
        {
            title: "Real-time Agent Conversion Rate Tracking",
            Image: "/images/feature-carousel-img-1.png",
            description:
                "Importance of data processing includes better increased productivity and profits, target, right decisions, more accurate and reliable.",
        },
        {
            title: "Realtime Orders Status Ratio",
            Image: "/images/feature-carousel-img-2.png",
            description:
                "Importance of data processing includes better increased productivity and profits, target, right decisions, more accurate and reliable.",
        },
        {
            title: "Analytics & Reporting",
            Image: "/images/feature-carousel-img-3.png",
            description:
                "Gain valuable insights into your sales performance with real-time metrics and customizable reports.",
        },
        {
            title: "Analytics",
            Image: "/images/feature-carousel-img-3.png",
            description:
                "Gain valuable insights into your sales performance with real-time metrics and customizable reports.",
        },
    ];

    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-32 bg-[#030115] relative">
            <div className='max-w-[1440px] mx-auto '>
                <FeaturedSectionLightSVG />
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <h2 className="mt-4 text-[56px] md:text-4xl font-bold ">
                        Our Features
                    </h2>
                    <p className="mt-4 text-sm text-[#9A98B9]">
                        Manage leads, sales, teams, and operations — all in one smart CRM platform
                    </p>
                </motion.div>

                {/* Cards Animated */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.2,
                            },
                        },
                    }}
                >
                    {featureCards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="p-6 rounded-xl shadow-sm h-full cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg"
                        >

                        </motion.div>
                    ))}
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem>...</CarouselItem>
                            <CarouselItem>...</CarouselItem>
                            <CarouselItem>...</CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </motion.div>
            </div>
        </section>
    );
}