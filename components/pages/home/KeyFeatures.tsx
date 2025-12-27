'use client';
import FeaturedSection2ndSVG from '@/components/svgIcon/FeaturedSection2ndSVG';
import FeaturedSectionLightSVG from '@/components/svgIcon/FeaturedSectionLightSVG';
import ButtonComponent from '@/components/ui/ButtonComponent';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { Zap, Repeat, BarChart, ChevronRight, ChevronLeft } from 'lucide-react';
import Image from 'next/image';

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
                <FeaturedSection2ndSVG />
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

                {/* Main Carousel Area */}
                <div className="relative px-12">
                    <Carousel className="w-full ">
                        <CarouselContent>
                            {featureCards.map((card, index) => (
                                <CarouselItem key={index} className=' flex justify-between max-h-[394px]'>
                                    {/* Left Side: Image Content */}
                                    <div className=" w-1/2">
                                        <Image
                                            src={card.Image}
                                            alt={card.title}
                                            width={600}
                                            height={400}
                                            className="mx-auto"
                                        />
                                    </div>

                                    {/* Right Side: Text Content */}
                                    <div className="w-1/2 text-left space-y-6">
                                        <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                            {card.title}
                                        </h3>
                                        <p className="text-[#9A98B9] text-lg leading-relaxed max-w-md">
                                            {card.description}
                                        </p>

                                        <ButtonComponent buttonName='Make your first purchase' varient='purple' />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="flex justify-center gap-4 mt-12">
                            <CarouselPrevious className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white/10"  />

                            <CarouselNext className="static translate-y-0 bg-transparent border-white/20 text-white hover:bg-white/10" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}