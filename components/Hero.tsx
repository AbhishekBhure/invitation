"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

interface HeroProps {
  name?: string;
  onStart: () => void;
}

export function Hero({ name = "Chinna", onStart }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center text-center"
    >
      {/* Little floating greeting pill */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold tracking-wide border border-rose-200 shadow-sm mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin" style={{ animationDuration: "6s" }} />
        <span>A very serious message for {name}</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
      </motion.div>

      {/* Main glass card */}
      <div className="glass-card w-full rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative heart watermark */}
        <div className="absolute -bottom-8 -right-8 text-rose-100/40 text-8xl font-black pointer-events-none select-none">
          ❤️
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-5"
        >
          {name}, we need to settle something.{" "}
          <span className="inline-block animate-bounce">👀</span>
        </motion.h1>

        {/* Playful narrative lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.15 }}
          className="space-y-3.5 text-gray-700 text-base sm:text-lg font-medium leading-relaxed mb-7 text-left bg-rose-50/50 p-4 rounded-2xl border border-rose-100"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>We&apos;ve tried to meet.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>We&apos;ve postponed.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span>We&apos;ve rescheduled.</span>
          </div>
          <div className="flex items-center gap-2.5 pt-1 text-gray-900 font-semibold">
            <span>And somehow we&apos;re still here. 😂</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-lg font-bold text-rose-600 mb-8"
        >
          Maybe it&apos;s finally time? ✨
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          id="hero-start-button"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-lg shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer"
        >
          <span>Let&apos;s finally meet</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </motion.button>
      </div>
    </motion.section>
  );
}
