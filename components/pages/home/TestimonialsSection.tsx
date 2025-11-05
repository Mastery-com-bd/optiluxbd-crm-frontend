'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'David Gilroy',
        image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png',
        quote: "Nowadays, it isn't great uncommon to see lenders rapidly adopting.",
    },
    {
        name: 'Kyla Showalter',
        image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png',
        quote: 'This platform truly simplified how we handle feedback and success.',
    },
    {
        name: 'Akash Hossain',
        image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png',
        quote: 'Amazing interface and clean approach to managing testimonials!',
    },
    {
        name: 'Fatima Rahman',
        image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png',
        quote: 'Easy to use, effective, and stunningly designed feature.',
    },
    {
        name: 'Jamal Uddin',
        image: 'https://i.ibb.co.com/Xfx69qYG/icon-256x256.png',
        quote: 'Customer service is excellent: fast, responsive, and helpful!',
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-black text-white py-20 px-6 md:px-12 lg:px-20">
            {/* Section Heading */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-yellow-400">TESTIMONIALS</h2>
                <div className="mt-2 w-24 h-1 bg-orange-500 mx-auto mb-2 rounded"></div>
                <p className="text-sm text-neutral-300">
                    What our happy customers are saying about us!
                </p>
            </div>

            {/* Swiper Carousel  */}
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop
                spaceBetween={24}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-10"
            >
                {testimonials.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="bg-white text-black rounded-xl shadow-md p-6 flex flex-col items-center gap-4 hover:shadow-lg transition">
                            <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-yellow-400">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                />
                            </div>
                            <h4 className="font-semibold text-base text-orange-600">{item.name}</h4>
                            <p className="text-center text-sm text-gray-600">{item.quote}</p>
                            <div className="flex items-center gap-1 pt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}