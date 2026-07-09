'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';

export default function PartnershipBanner() {
  return (
    <section className="bg-gray-900/50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border border-white/10 p-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-center sm:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/10">
              <Building className="w-8 h-8 text-blue-300" />
            </div>
          </div>
          
          {/* Text Content */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              An Official Partner You Can Trust
            </h2>
            <p className="mt-1 text-slate-300 max-w-xl">
              [cite_start]Foxes Technology is proud to be an official partner of the **Ministry of Tourism and Antiquities**, driving digital transformation in Egypt&apos;s travel sector[cite: 14].
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}