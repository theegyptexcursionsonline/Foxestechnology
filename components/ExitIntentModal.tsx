'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Bell } from 'lucide-react';
import { joinPriorityList, PRIORITY_LIST_MESSAGES, type EmailSignupResult } from '@/lib/priority-list';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called after the email has been recorded. */
  onEmailSubmit?: (email: string) => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ExitIntentModal({ isOpen, onClose, onEmailSubmit }: ExitIntentModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const isSubmitted = status === 'success';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Confirm only once the lead endpoint has recorded the email.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting' || status === 'success') return;
    setStatus('submitting');
    const result: EmailSignupResult = await joinPriorityList(
      email,
      typeof window !== 'undefined' ? window.location.pathname : undefined,
    );
    if (result !== 'ok') {
      setStatus('error');
      setMessage(PRIORITY_LIST_MESSAGES[result]);
      return;
    }
    setStatus('success');
    setMessage(PRIORITY_LIST_MESSAGES.success);
    onEmailSubmit?.(email);
    setTimeout(() => {
      onClose();
      setEmail('');
      setStatus('idle');
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-red-500/30 shadow-2xl"
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-30">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68 / 0.3) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                  }}
                />
              </div>

              {/* Animated Glow Effects */}
              <motion.div
                className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-red-600/30 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-orange-600/20 blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:rotate-90 hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="relative p-8 md:p-10 text-center">
                {/* Icon with pulse effect */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-orange-600 shadow-lg relative"
                >
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-red-500"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <Bell className="h-10 w-10 text-white relative z-10" />
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-3 text-3xl md:text-4xl font-black text-white"
                >
                  Before you go
                </motion.h2>

                {/* Subheading */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <p className="text-lg font-semibold text-yellow-400">
                    Join the priority list
                  </p>
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 text-base md:text-lg leading-relaxed text-slate-300"
                >
                  Be among the first to try Foxes. Leave your email and our team will let you know
                  as soon as <span className="text-red-400 font-bold">access opens</span>.
                </motion.p>

                {/* Email Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-600/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      disabled={isSubmitted || status === 'submitting'}
                      className="relative w-full rounded-xl border-2 border-white/20 bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-xl transition-all focus:border-red-500 focus:bg-white/15 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitted || status === 'submitting'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-6 py-4 font-bold text-white shadow-lg shadow-red-600/50 transition-all hover:shadow-xl hover:shadow-red-600/60 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10">
                      {isSubmitted ? '✓ Done' : status === 'submitting' ? 'Sending…' : 'Notify me'}
                    </span>
                  </motion.button>
                </motion.form>

                {status === 'error' && (
                  <p role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-300">
                    {message}
                  </p>
                )}

                {/* Success Message */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 backdrop-blur-xl"
                    >
                      <p className="text-green-400 font-medium flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 space-y-3 text-left"
                >
                  {[
                    'Your email goes straight to our team',
                    'We let you know as soon as access opens',
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/20 border border-red-500/50">
                        <svg className="h-3.5 w-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm md:text-base">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 text-xs text-slate-500"
                >
                  We only use your email to tell you about access to Foxes.
                </motion.p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
