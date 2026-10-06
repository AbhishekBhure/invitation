"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

interface JourneyIntroProps {
  onNext: () => void;
}

export function JourneyIntro({ onNext }: JourneyIntroProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono tracking-widest uppercase"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Chapter 2 • The Reality</span>
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-br from-white via-rose-100 to-rose-400 bg-clip-text text-transparent">
          DHARWAR
        </h1>
        <p className="text-rose-400 font-medium text-base sm:text-lg flex items-center justify-center gap-1.5">
          <span>A day that actually happened.</span>
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
        </p>
      </motion.div>

      {/* Emotional story cards */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 space-y-4 shadow-xl text-slate-300"
      >
        <div className="space-y-2 text-sm text-slate-400 font-mono">
          <p className="line-through decoration-rose-500/60 opacity-70">
            After Goa...
          </p>
          <p className="line-through decoration-rose-500/60 opacity-70">
            After Bangalore...
          </p>
          <p className="line-through decoration-rose-500/60 opacity-70">
            After all those plans...
          </p>
        </div>

        <div className="pt-2 border-t border-white/10 space-y-2">
          <p className="text-base font-semibold text-rose-200">
            There was Dharwar.
          </p>
          <p className="text-sm text-slate-300 italic">
            And somehow...
            <br />
            <span className="text-rose-400 font-semibold not-italic">
              we finally met.
            </span>
          </p>
        </div>
      </motion.div>

      {/* Action CTA */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 transition-all cursor-pointer group"
      >
        <span>Relive that day</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </div>
  );
}
