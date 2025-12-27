'use client';

import * as React from "react";
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

const groupTestimonials = (data: any[]) => {
    const groups = [];
    let i = 0;
    while (i < data.length) {

        if (data[i]) {
            groups.push({ type: 'single', items: [data[i]] });
            i++;
        }
        if (i < data.length) {
            const pair = [data[i]];
            if (data[i + 1]) pair.push(data[i + 1]);
            groups.push({ type: 'stacked', items: pair });
            i += 2;
        }
        if (i < data.length) {
            groups.push({ type: 'single', items: [data[i]] });
            i++;
        }
    }
    return groups;
};

const testimonials = [
    { name: 'Andy Wirth', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "Working with Thevent was a game-changer for our annual conference. Their attention to detail, professionalism, and creativity exceeded our expectations.", date: '01:06 PM · Apr 11, 2024' },
    { name: 'Elsa Verina', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "Working with Thevent was a game-changer for our annual conference.", date: '01:06 PM · May 11, 2024' },
    { name: 'Kumto Warming', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "Working with Thevent was a game-changer for our annual conference.", date: '01:06 PM · Jun 17, 2024' },
    { name: 'Diyas Kardinal', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "Working with Thevent was a game-changer for our annual conference. Their attention to detail and creativity exceeded our expectations.", date: '01:06 PM · Jun 13, 2024' },
    { name: 'Akash Hossain', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "The interface is amazing and the support is even better!", date: '02:30 PM · July 20, 2024' },
    { name: 'Fatima Rahman', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "Easy to use, effective, and stunningly designed.", date: '10:00 AM · Aug 05, 2024' },
    { name: 'Jamal Uddin', image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png', quote: "Best CRM platform we have used so far. Highly recommended.", date: '05:45 PM · Sept 12, 2024' },
];

export default function TestimonialsSection() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const groupedData = React.useMemo(() => groupTestimonials(testimonials), []);

    const onSelect = React.useCallback((api: CarouselApi) => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
    }, []);

    React.useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());
        api.on("select", onSelect);
        api.on("reInit", onSelect);
        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect]);

    return (
        <section className="bg-[#050114] text-white py-24 px-6 md:px-12 lg:px-20 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-10 right-[-10%] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-10 left-[-10%] w-[300px] h-[300px] bg-indigo-700/10 blur-[100px] rounded-full" />

            <div className='max-w-[1400px] mx-auto relative z-10'>
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-6xl font-serif text-white opacity-90 leading-tight">
                        What our client say about us
                    </h2>
                </div>

                <Carousel setApi={setApi} opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-4">
                        {groupedData.map((group, idx) => (
                            <CarouselItem key={idx} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                                {group.type === 'single' ? (
                                    <TestimonialCard data={group.items[0]} height="h-[500px]" />
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <TestimonialCard data={group.items[0]} height="h-[242px]" />
                                        {group.items[1] && (
                                            <TestimonialCard data={group.items[1]} height="h-[242px]" />
                                        )}
                                    </div>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Dotted Indicators */}
                    <div className="flex justify-center items-center gap-3 mt-12">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => api?.scrollTo(i)}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${current === i
                                    ? "w-12 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </Carousel>
            </div>
        </section>
    );
}

function TestimonialCard({ data, height }: { data: any, height: string }) {
    if (!data) return null;
    return (
        <div className={`${height} bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] p-8 flex flex-col justify-between hover:bg-white/[0.07] transition-all duration-500 group`}>
            <div>
                {/* User Profile */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-purple-500 via-indigo-500 to-blue-500 shadow-lg shadow-purple-500/20">
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#050114]">
                            <Image
                                src={data.image}
                                alt={data.name}
                                width={56}
                                height={56}
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold text-white tracking-tight">{data.name}</h4>
                        <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-gray-300 text-lg leading-relaxed italic line-clamp-6">
                    &quot;{data.quote}&quot;
                </p>
            </div>

            {/* Date/Time Stamp */}
            <div className="text-gray-500 text-sm font-medium mt-4">
                {data.date}
            </div>
        </div>
    );
}