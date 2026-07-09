'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Store, Zap } from 'lucide-react';

export default function ProblemSolutionSection() {
  const cardVariants: Variants = {
    hidden: (isLeft: boolean) => ({ 
      opacity: 0, 
      x: isLeft ? -50 : 50 
    }),
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Bridge the Digital Divide in Travel
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            A significant portion of the tours and activities market remains offline, creating a massive opportunity for growth. We provide the tools to bring your business into the digital age.
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Column 1: The Problem */}
          <motion.div
            className="bg-gray-900/80 rounded-2xl border border-white/10 p-8 h-full flex flex-col"
            custom={true}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex-shrink-0 flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center border border-red-500/20">
                <Store className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">The Offline Hurdle</h3>
            </div>
            <div className="flex-grow space-y-4 text-slate-300">
              <p>
                Globally, over <strong className="font-semibold text-red-400">80% of tour and activity bookings are still made offline</strong>, leaving immense potential untapped.
              </p>
              <p>
                In local markets, up to <strong className="font-semibold text-red-400">90% of businesses don&apos;t sell online</strong>, often because they lack the necessary tools or expertise to build a successful digital presence.
              </p>
            </div>
          </motion.div>

          {/* Column 2: The Solution */}
          <motion.div
            className="bg-gradient-to-br from-blue-600/20 to-purple-600/10 rounded-2xl border border-blue-500/30 p-8 h-full flex flex-col"
            custom={false}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div className="flex-shrink-0 flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20">
                <Zap className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white">The Digital Transformation</h3>
            </div>
            <div className="flex-grow space-y-4 text-slate-300">
              <p>
                Our mission is to <strong className="font-semibold text-blue-300">revolutionize the travel industry by digitizing offline businesses</strong> with the latest AI-powered technology.
              </p>
              <p>
                By creating <strong className="font-semibold text-blue-300">integrated sales and booking workflows</strong>, we help you unlock your full potential, streamline operations, and significantly increase reservations.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}