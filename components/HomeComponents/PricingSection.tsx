'use client';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const pricingPlans = [
    {
        name: 'Basic',
        price: '$99',
        highlighted: false,
        features: [
            'User-Friendly Dashboard',
            'Secure Transactions',
            'Top-Tier Security',
            'Advanced Analytics',
        ],
    },
    {
        name: 'Gold',
        price: '$199',
        highlighted: true,
        features: [
            'User-Friendly Dashboard',
            'Secure Transactions',
            'Top-Tier Security',
            'Advanced Analytics',
            'Multi-Currency Support',
            'API Integration',
            'Customizable Dashboard',
            'Dedicated Account Manager',
        ],
    },
    {
        name: 'Platinum',
        price: '$399',
        highlighted: false,
        features: [
            'User-Friendly Dashboard',
            'Secure Transactions',
            'Top-Tier Security',
            'Advanced Analytics',
            'Multi-Currency Support',
            'API Integration',
            'Customizable Dashboard',
            'Dedicated Account Manager',
        ],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function PricingSection() {
    return (
        <section className="py-20 px-6 md:px-12 lg:px-20 bg-white text-black">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-bold bg-yellow-200 text-yellow-900 px-4 py-1 rounded-full inline-block mb-2">
                    PRICING
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                    Affordable pricing plans
                </h2>
                <p className="mt-4 text-sm text-gray-600">
                    Simple plans to power your business – choose what fits your needs.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {pricingPlans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        className={`flex flex-col h-full rounded-xl border p-6 text-center shadow-sm ${plan.highlighted
                                ? 'bg-yellow-50 border-orange-300'
                                : 'bg-white border-gray-200'
                            }`}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                    >
                        <h3 className="text-xl font-semibold text-black">{plan.name}</h3>
                        <p className="text-3xl font-bold mt-2 text-orange-600">
                            {plan.price}
                            <span className="text-sm font-normal text-gray-500">/month</span>
                        </p>

                        <div className="mt-5 text-left">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Features:</p>
                            <ul className="flex flex-col gap-2 text-sm text-gray-700">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-orange-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md mt-6 transition duration-200"
                        >
                            Get Started
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}