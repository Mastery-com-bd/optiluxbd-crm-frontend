'use client';

import { motion, type Variants } from 'framer-motion';
import { Check, CheckCircle } from 'lucide-react';
import Background from "@/components/svgIcon/Background.svg";
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
interface PricingPlan {
    name: string;
    price: string;
    highlighted: boolean;
    features: string[];
}

const pricingPlans = [
    {
        name: 'Basic Plan',
        priceMonthly: 49,
        priceYearly: 39,
        highlighted: false,
        description: "Perfect for marketers / scale up business",
        features: ['Unlimited monthly emails', '1 seats', 'Custom user permission', 'Unlimited audience', 'One website', 'Email support first 30 days'],
    },
    {
        name: 'Popular Plan',
        priceMonthly: 124,
        priceYearly: 99,
        highlighted: true,
        description: "Perfect for marketers / scale up business",
        features: ['Unlimited monthly emails', '3 seats', 'Custom user permission', 'Unlimited audience', 'Unlimited website', 'Email support 24/7 priority'],
    },
    {
        name: 'Pro Plan',
        priceMonthly: 299,
        priceYearly: 249,
        highlighted: false,
        description: "Perfect for marketers / scale up business",
        features: ['Unlimited monthly emails', 'Unlimited seats', 'Custom user permission', 'Unlimited audience', 'Unlimited website', 'Email support 24/7 priority'],
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
};

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    return (
        <section className=" bg-[#030115] text-white relative ">
            <Image src={Background} alt='light-bg' className='absolute bottom-0 left-52' />
            <div className='max-w-[1240px] mx-auto py-40'>
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h4 className='text-center text-[56px] mt-6 bg-linear-to-r from-[#635371] via-[#EDEDF2] to-[#635371] bg-clip-text text-transparent w-[800px] font-semibold mx-auto'
                    >
                        Select The Plan That Fits Your Requirements
                    </h4>
                </div>
                {/* Monthly/Yearly Toggle */}
                <div className="flex items-center justify-center gap-4 mb-16">
                    <Label htmlFor="billing" className={`text-lg ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-500'}`}>Monthly</Label>
                    <Switch
                        id="billing"
                        checked={billingCycle === 'yearly'}
                        onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                        className="data-[state=checked]:bg-purple-600 scale-150 cursor-pointer data-[state=unchecked]:bg-[#675390]!"
                    />
                    <Label htmlFor="billing" className={`text-lg ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-500'}`}>Yearly</Label>
                </div>
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative group rounded-4xl p-8 transition-all duration-500 border ${plan.highlighted
                                ? 'bg-white/5 border-[#AB28FA] shadow-[0_0_40px_rgba(168,85,247,0.15)]'
                                : 'bg-white/2 border-white/30'
                                } backdrop-blur-sm hover:bg-white/8`}
                        >
                            <div className={`${plan.highlighted ? '' : ''} space-y-4`}>

                                {
                                    plan.highlighted ?
                                        <div
                                            className='w-[152px]  border border-[#A25ACD] px-3 py-1   flex justify-center items-center overflow-hidden rounded-xl'
                                            style={{ background: "linear-gradient(180deg,rgba(86, 20, 125, 0.54) 40%, rgba(86, 20, 125, 0.91) 100%)" }}
                                        >
                                            <h4 className='text-[16px] bg-linear-to-r from-[#635371] via-[#EDEDF2] to-[#635371] bg-clip-text text-[#AB28FA] font-bold'
                                            >
                                                {plan.name}
                                            </h4>
                                        </div>
                                        :
                                        <div
                                            className='w-[122px]  px-3 py-1 flex justify-center items-center overflow-hidden rounded-xl'
                                            style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.00) 100%)" }}
                                        >
                                            <h4 className='text-[16px] bg-linear-to-r from-[#635371] via-[#EDEDF2] to-[#635371] bg-clip-text text-transparent font-bold'
                                            >
                                                {plan.name}
                                            </h4>
                                        </div>
                                }
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-bold text-white">
                                        ${billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}/month
                                    </span>
                                </div>
                                <p className="text-sm text-[#9A98B9]">{plan.description}</p>
                            </div>

                            <div className="my-8 space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center ${plan.highlighted ? 'border-[#AB28FA]' : 'border-white/20'}`}>
                                            <Check className={`w-3 h-3 ${plan.highlighted ? 'text-[#AB28FA]' : 'text-gray-400'}`} />
                                        </div>
                                        <span className="text-sm text-[#9A98B9] text-[16px]">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-4xl font-semibold transition-all duration-300 backdrop-blur-xl bg-white/5 ${plan.highlighted
                                ? 'text-white hover:opacity-90 shadow-lg shadow-purple-500/20 border-[1.5px] border-[#D028FA]'
                                : ' border-[1.5px] border-white/40 text-white hover:bg-white/10'
                                }`}
                                style={{
                                    backgroundImage: `${plan.highlighted ?
                                        "linear-gradient(0deg,rgba(208, 40, 250, 0.55) 20%, rgba(208, 40, 250, 0.12) 99%)" :
                                        "linear-gradient(180deg,rgba(34, 2, 48, 0.42) 82%, rgba(115, 51, 138, 0.5) 100%)"}`
                                }}
                            >
                                Start {plan.highlighted && '7-days'} Free Trial
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}