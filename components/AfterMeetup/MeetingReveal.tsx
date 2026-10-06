"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, User } from "lucide-react";

interface MeetingRevealProps {
  onNext: () => void;
}

const CLOCK_SEQUENCE = ["6:57 PM", "6:58 PM", "6:59 PM", "7:00 PM"];

export function MeetingReveal({ onNext }: MeetingRevealProps) {
  const [clockIndex, setClockIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (clockIndex < CLOCK_SEQUENCE.length - 1) {
      const timer = setTimeout(() => {
        setClockIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsRevealed(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [clockIndex]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 3 • Meeting Reveal
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Glow ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-2xl" />
        </div>

        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="clock"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-12 flex flex-col items-center space-y-4"
            >
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                Holding your breath...
              </span>
              <motion.div
                key={CLOCK_SEQUENCE[clockIndex]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-4xl sm:text-5xl font-black font-mono tracking-wider text-rose-300 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]"
              >
                {CLOCK_SEQUENCE[clockIndex]}
              </motion.div>
              <div className="flex gap-1.5 pt-2">
                {CLOCK_SEQUENCE.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === clockIndex
                        ? "w-6 bg-rose-500"
                        : idx < clockIndex
                        ? "w-2 bg-rose-300/40"
                        : "w-2 bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="py-6 flex flex-col items-center space-y-5"
            >
              {/* Silhouette / avatar meeting visual */}
              <div className="relative flex items-center justify-center gap-6 py-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-14 h-14 rounded-full bg-slate-800 border-2 border-rose-400/50 flex items-center justify-center text-slate-200 shadow-lg"
                >
                  <User className="w-7 h-7 text-slate-300" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-14 h-14 rounded-full bg-rose-950/80 border-2 border-rose-400 flex items-center justify-center text-rose-200 shadow-lg shadow-rose-900/30"
                >
                  <User className="w-7 h-7 text-rose-300" />
                </motion.div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-widest text-rose-300/80">
                  And then...
                </p>
                <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2">
                  <span>There you were.</span>
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </h3>
              </div>

              <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
                After all the months of waiting, missed chances, and screens...
                you were standing right in front of me.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button */}
      {isRevealed && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Take a walk</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
