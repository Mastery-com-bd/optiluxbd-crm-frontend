'use client';
import Section2CornerSVG from '@/components/svgIcon/Section2CornerSVG';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Marquee from "react-fast-marquee";

export default function SecondSection() {
    const partner = [
        {
            company: "Mastary.com",
            logo: "/logo/Logos-1.png"
        },
        {
            company: "Mastary.com",
            logo: "/logo/Logos-2.png"
        },
        {
            company: "Mastary.com",
            logo: "/logo/Logos-3.png"
        },
        {
            company: "Mastary.com",
            logo: "/logo/Logos-4.png"
        },
        {
            company: "Mastary.com",
            logo: "/logo/Logos-5.png"
        },
        {
            company: "Mastary.com",
            logo: "/images/OptiluxBD.png"
        }
    ]
    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-10 bg-cover bg-center bg-no-repeat relative overflow-hidden">
            <div className='max-w-[1440px] mx-auto '>
                <motion.div
                    className=" "
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
                    <Image
                        src={"/images/2nd-section-imge-min.png"}
                        alt='2nd-section-image'
                        width={1305}
                        height={991}
                        className='mx-auto z-20'
                    />
                </motion.div>
                <Section2CornerSVG />
                <div>
                    <h4 className='text-center text-2xl mt-6 bg-linear-to-r from-[#635371] via-[#EDEDF2] to-[#635371] bg-clip-text text-transparent w-[400px] mx-auto'>Trusted by 200+ Companies</h4>

                    <div className='max-w-[1290px] mx-auto w-full'>
                        <Marquee
                            autoFill
                            pauseOnHover
                            className='cursor-pointer'
                            direction='left'
                            speed={40}
                            gradientWidth={600}
                        >
                            {
                                partner.map((company, ind) =>
                                    <Image
                                        key={ind}
                                        className='mx-6'
                                        src={company.logo}
                                        alt={company.company}
                                        height={200}
                                        width={200}
                                    />
                                )
                            }
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    );
}