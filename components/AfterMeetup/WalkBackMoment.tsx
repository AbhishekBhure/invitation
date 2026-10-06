"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Stars, Heart } from "lucide-react";

interface WalkBackMomentProps {
  onNext: () => void;
}

export function WalkBackMoment({ onNext }: WalkBackMomentProps) {
  const [breezeFelt, setBreezeFelt] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
        Scene 7 • Walking Back
      </span>

      {/* Card */}
      <div className="w-full max-w-sm rounded-3xl bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Night sky ambient */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-amber-200/40 blur-[1px]" />
          <div className="absolute top-12 left-10 w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="absolute bottom-10 right-14 w-1 h-1 rounded-full bg-rose-200/70" />
        </div>

        {/* Quiet scenery */}
        <div className="py-6 flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-indigo-950/60 border border-indigo-400/30 flex items-center justify-center relative shadow-lg">
            <Moon className="w-9 h-9 text-indigo-300" />
            <Stars className="w-4 h-4 text-amber-200 absolute -top-1 -right-1 animate-pulse" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-indigo-300/80">
              After Gufha...
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              And then it was time to head back.
            </h3>
          </div>

          <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
            The night had grown cooler, but nobody wanted to hurry. Every step
            felt like trying to slow down the clock.
          </p>

          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="flex items-center gap-2 text-xs text-rose-300/90 font-mono pt-2"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>Walking slowly under the Dharwar night</span>
          </motion.div>
        </div>
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <span>Continue</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
