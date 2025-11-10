'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const cards = [
    {
        title: 'Real-Time Analytics',
        description: 'Stay on top of your performance with informed decisions and faster.',
        image: '/images/analytics.jpg',
    },
    {
        title: 'Automated Workflow',
        description: 'Save time and reduce errors by allowing your team to focus on selling.',
        image: '/images/workflow.jpg',
    },
    {
        title: 'Opportunity Tracking',
        description: 'Easily manage leads and track opportunities from first contact to closing.',
        image: '/images/opportunity.jpg',
    },
    {
        title: 'Team Collaboration',
        description: 'Enable your sales team to collaborate on deals, share notes, and keep everyone aligned.',
        image: '/images/collaboration.jpg',
    },
    {
        title: 'Customizable Dashboards',
        description: 'Tailor your dashboard to display the metrics that matter most to you.',
        image: '/images/dashboard.jpg',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full px-6 md:px-12 lg:px-20 py-20 bg-white">
            <div className='max-w-[1444px] mx-auto'>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <span className="text-xs font-bold text-yellow-800 bg-yellow-200 inline-block px-4 py-1 rounded-full">
                        WHY CHOOSE US
                    </span>
                    <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                        Optimize Your Sales, Maximize Your Profits
                    </h2>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            viewport={{ once: true }}
                            className="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col"
                        >
                            <h3 className="font-semibold text-lg mb-2 text-gray-800">{card.title}</h3>
                            <p className="text-sm text-gray-600 mb-4 flex-grow">{card.description}</p>

                            <div className="relative w-full h-52">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-contain rounded-md"
                                    loading={index < 2 ? "eager" : "lazy"}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}