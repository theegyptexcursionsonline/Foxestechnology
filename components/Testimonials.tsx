'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const testimonialsData = [
    {
        quote: "Switching to Foxes Technology was a game-changer. Our direct bookings have skyrocketed, and managing our inventory across multiple channels has never been easier. Their support is top-notch.",
        name: "Ahmed Mansour",
        title: "CEO, Cairo City Tours",
        image: "/images/testimonials/client-01.jpg",
        rating: 5,
    },
    {
        quote: "The all-in-one platform is incredibly powerful. We deployed their handheld POS terminals and a self-service kiosk, which streamlined our on-site sales and completely eliminated queues.",
        name: "Fatima Al-Jamil",
        title: "Operations Manager, Red Sea Adventures",
        image: "/images/testimonials/client-02.jpg",
        rating: 5,
    },
    {
        quote: "The results speak for themselves. Their system is intuitive, but the growth we've seen is the most impressive part. We've seen a massive increase in revenue since partnering with them.",
        name: "Youssef El-Masry",
        title: "Founder, Luxor Balloon Rides",
        image: "/images/testimonials/client-03.jpg",
        rating: 5,
        highlight: {
            value: "247%",
            label: "Revenue Growth"
        }
    },
];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-0.5">
        {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-foxes-orange text-foxes-orange" />
        ))}
    </div>
);

export default function Testimonials() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center"
                >
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foxes-orange">
                        Testimonials
                    </h2>
                    <p className="mt-4 font-goldplay text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Don&apos;t Just Take Our Word For It
                    </p>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-dark-grey">
                        Hear directly from tour operators and attraction managers who have transformed their business with Foxes Technology.
                    </p>
                </motion.div>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50/50"
                        >
                            <div className="relative flex-1 p-8">
                                <Quote className="absolute top-6 left-6 h-10 w-10 text-gray-200" />
                                <p className="relative mt-8 text-lg text-gray-700">
                                    {testimonial.quote}
                                </p>
                            </div>

                            <div className={`border-t border-gray-200 p-8 ${testimonial.highlight ? 'bg-orange-50' : 'bg-gray-100'}`}>
                                {testimonial.highlight ? (
                                     <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-foxes-orange">{testimonial.highlight.label}</p>
                                        <p className="font-goldplay text-5xl font-bold text-gray-900">{testimonial.highlight.value}</p>
                                    </div>
                                ) : (
                                    <StarRating rating={testimonial.rating} />
                                )}
                               
                                <div className="mt-6 flex items-center gap-4">
                                    <Image
                                        src={testimonial.image}
                                        alt={`Photo of ${testimonial.name}`}
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-goldplay text-base font-bold text-gray-900">{testimonial.name}</p>
                                        <p className="text-sm text-gray-600">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}