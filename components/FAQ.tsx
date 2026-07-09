'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "How long does it take to get started with Foxes Technology?",
        answer: "Our onboarding process is designed to be fast and seamless. For most operators, we can get your online booking system live and your team trained on the POS hardware within just a few business days."
    },
    {
        question: "Is this platform suitable for a single, independent tour guide?",
        answer: "Absolutely. Our platform is fully scalable. It's powerful enough for large attractions but simple and affordable enough for solo tour guides who want to digitize their bookings and accept professional payments."
    },
    {
        question: "Do I have to use your POS hardware?",
        answer: "While our handheld terminals and kiosks offer the most integrated experience, our core online booking system can work independently. You can use our 'Book Now' widget on your existing website and manage everything from our web and mobile apps."
    },
    {
        question: "What kind of support do you offer?",
        answer: "We provide comprehensive 24/7 support for all our partners. Our team, based in Egypt, is deeply familiar with the local tourism industry and can offer expert assistance via phone, email, and live chat."
    },
    {
        question: "Are there any hidden fees or long-term contracts?",
        answer: "We believe in transparent pricing. Our plans are straightforward with no hidden setup fees. We offer flexible monthly and annual plans, so you can choose what works best for your business without being locked into a long-term commitment."
    },
    {
        question: "Do you offer full support for the Arabic language?",
        answer: "Yes. Our entire platform, from the booking engine to the backend dashboard and customer support, is available in both English and Arabic to fully serve operators and travelers across Egypt and the GCC."
    }
];

const AccordionItem = ({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <motion.header
                initial={false}
                onClick={onClick}
                className="flex cursor-pointer items-center justify-between gap-4"
            >
                <h3 className="text-base font-semibold text-gray-800">{question}</h3>
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
                        <Plus className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
                    </motion.div>
                </div>
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto', marginTop: '16px' },
                            collapsed: { opacity: 0, height: 0, marginTop: '0px' },
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <p className="text-base leading-relaxed text-dark-grey">
                            {answer}
                        </p>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};


export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-3xl"
                >
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foxes-orange">
                        Have Questions?
                    </h2>
                    <p className="mt-4 font-goldplay text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-4 text-lg text-dark-grey">
                        Can&apos;t find the answer you&apos;re looking for? Reach out to our friendly team.
                    </p>
                </motion.div>

                <div className="mt-12">
                     <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
                        <div>
                            {faqData.slice(0, 3).map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index}
                                    onClick={() => handleClick(index)}
                                />
                            ))}
                        </div>
                         <div>
                             {faqData.slice(3, 6).map((faq, index) => (
                                <AccordionItem
                                    key={index + 3}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openIndex === index + 3}
                                    onClick={() => handleClick(index + 3)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}