"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, Flame, Utensils } from "lucide-react";

interface GufaExperienceProps {
  onNext: () => void;
}

export function GufaExperience({ onNext }: GufaExperienceProps) {
  const [enteredCave, setEnteredCave] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
        Scene 5 • Gufha
      </span>

      {/* Main Cave Card */}
      <div className="w-full max-w-sm rounded-3xl bg-amber-950/20 border border-amber-500/20 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Cave Rock Aesthetic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-stone-900 via-amber-950/40 to-transparent" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          {!enteredCave ? (
            <motion.div
              key="outside"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-4 space-y-5 flex flex-col items-center"
            >
              <div className="space-y-1">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Then she smiled and said...
                </p>
                <p className="text-lg font-serif italic text-amber-200">
                  &ldquo;I booked a place.&rdquo;
                </p>
              </div>

              {/* Cave Entrance Arch */}
              <div className="w-48 h-36 rounded-t-full bg-gradient-to-b from-stone-800 to-stone-950 border-4 border-stone-700/80 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black tracking-[0.35em] text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)]">
                  GUFHA
                </h3>
                <span className="text-[10px] font-mono tracking-widest text-stone-400 mt-1 uppercase">
                  Cave Dining
                </span>
                <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-white">
                  A cave-themed restaurant.
                </p>
                <p className="text-xs text-rose-400 flex items-center justify-center gap-1 font-medium">
                  <span>She picked the place.</span>
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inside"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-6 space-y-5 flex flex-col items-center"
            >
              {/* Inside Cave Visual */}
              <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center relative shadow-inner">
                <Utensils className="w-9 h-9 text-amber-400" />
                <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">
                  Inside the Cave 🕯️
                </h3>
                <p className="text-xs uppercase font-mono tracking-widest text-amber-300">
                  Warm torches & quiet laughter
                </p>
              </div>

              <div className="space-y-2 text-sm text-slate-300 bg-black/30 p-4 rounded-xl border border-white/5 w-full">
                <p className="font-semibold text-rose-200">Good food.</p>
                <p className="font-semibold text-rose-300">Good company.</p>
                <p className="font-bold text-white pt-1">
                  One very happy evening. ❤️
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button */}
      {!enteredCave ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setEnteredCave(true)}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-950 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>Enter the cave 🕯️</span>
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Capture the moment 📸</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
