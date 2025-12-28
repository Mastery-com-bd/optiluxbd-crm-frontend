'use client';

import FaqSVG from '@/components/svgIcon/FaqSVG';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQ() {
    const faqData = [
        {
            id: "item-1",
            q: "What is your flagship product?",
            ans: "Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability."
        },
        {
            id: "item-2",
            q: "How secure are the transactions?",
            ans: "We use top-tier encryption and secure payment gateways to ensure that every transaction is 100% safe and protected from unauthorized access."
        },
        {
            id: "item-3",
            q: "Can I customize my dashboard?",
            ans: "Yes! Our platform offers a highly customizable dashboard where you can drag and drop widgets to fit your specific business requirements."
        },
        {
            id: "item-4",
            q: "What kind of support do you provide?",
            ans: "We provide 24/7 priority email and chat support for our Gold and Platinum users, along with a dedicated account manager for enterprise plans."
        },
        {
            id: "item-5",
            q: "Is there a free trial available?",
            ans: "Absolutely. You can start with a 7-day free trial on our Popular Plan to explore all the features before making a commitment."
        }
    ];
    return (
        <section
            className="w-full "
            style={{ background: "linear-gradient(24deg,rgba(187, 51, 255, 0.02) 47%, rgba(29, 4, 41, 0.02) 55%, rgba(187, 51, 255, 0.04) 67%)" }}
        >
            {/* <FaqSVG /> */}
            <div className='w-full backdrop-blur-3xl px-6 md:px-12 lg:px-20 py-20'>
                <div className='max-w-[850px] mx-auto '>
                    <h4 className='text-center text-[56px] bg-linear-to-r from-[#635371] via-[#EDEDF2] to-[#635371] bg-clip-text text-transparent w-[800px] font-semibold mx-auto'
                    >
                        Frequently Asked Questions
                    </h4>
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full mb-5"
                        defaultValue="item-1"
                    >
                        {faqData.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className='p-2  rounded-xl border-none my-4'
                                style={{ background: "linear-gradient(331deg, rgba(238, 235, 255, 0.04) -7.38%, rgba(238, 235, 255, 0.02) -7.37%, rgba(238, 235, 255, 0.08) 107.38%)" }}
                            >
                                <AccordionTrigger className='text-[18px] md:text-[20px] font-medium text-[#C3C0D8] hover:no-underline text-left px-4'>
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="text-[16px] text-[#C3C0D8]/80 px-4 pt-2 leading-[160%]">
                                    {item.ans}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}