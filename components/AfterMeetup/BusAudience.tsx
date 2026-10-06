"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Film } from "lucide-react";

interface BusAudienceProps {
  onNext: () => void;
}

const PASSENGERS = [
  { seat: "Window Seat 4A", eyes: "👀", note: "Staring intensely" },
  { seat: "Aisle Seat 4B", eyes: "👀", note: "Forgot to check phone" },
  { seat: "Back Seat", eyes: "👀", note: "Full panoramic view" },
  { seat: "Conductor Uncle", eyes: "👀", note: "Waiting with whistle" },
];

export function BusAudience({ onNext }: BusAudienceProps) {
  const [revealedAll, setRevealedAll] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
        Scene 15 • The Audience
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="space-y-1 mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Meanwhile...
          </p>
          <h2 className="text-2xl font-black text-white">
            Everyone else on the bus:
          </h2>
        </div>

        {/* Audience Grid */}
        <div className="w-full grid grid-cols-2 gap-2.5 py-4">
          {PASSENGERS.map((p, idx) => (
            <motion.div
              key={p.seat}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * idx, duration: 0.4 }}
              className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col items-center justify-center space-y-1 shadow-md"
            >
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.6, delay: 0.3 * idx }}
                className="text-3xl select-none"
              >
                {p.eyes}
              </motion.span>
              <span className="text-[10px] font-mono text-slate-400">
                {p.seat}
              </span>
              <span className="text-[9px] text-amber-300 font-mono">
                {p.note}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Comedic Payoff text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2 w-full"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-amber-400 font-bold">
            <Film className="w-3.5 h-3.5" />
            <span>LIVE CINEMA 🍿</span>
          </div>
          <p className="text-sm font-semibold text-slate-200">
            Apparently... the entire bus had front-row seats to our romantic movie scene. 😂
          </p>
        </motion.div>
      </div>

      {/* Button Controls */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <span>Looking back... ❤️</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
