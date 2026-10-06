"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PackageSearch, Sparkles } from "lucide-react";

interface ChocolateMomentProps {
  onNext: () => void;
}

export function ChocolateMoment({ onNext }: ChocolateMomentProps) {
  const [pocketChecked, setPocketChecked] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
        Scene 11 • The Realization
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="space-y-1 mb-2">
          <p className="text-sm font-black font-mono tracking-widest text-red-400 animate-pulse uppercase">
            WAIT. 🛑
          </p>
          <h2 className="text-2xl font-black text-white">
            Something is missing...
          </h2>
        </div>

        <div className="w-full py-6 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!pocketChecked ? (
              <motion.div
                key="bag"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-6 flex flex-col items-center space-y-3"
              >
                <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-3xl shadow-inner">
                  🎒
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  You reach into your pocket/bag...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="item"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-full p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 shadow-xl space-y-3"
              >
                {/* Inventory Badge */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <PackageSearch className="w-3.5 h-3.5" />
                    INVENTORY
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold">
                    ITEM REMAINING
                  </span>
                </div>

                <div className="text-5xl py-2 animate-bounce">
                  🍫
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black font-mono tracking-wide text-white">
                    CHOCOLATE BAR
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-md bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs font-bold">
                    Status: STILL WITH YOU 🤦‍♂️
                  </div>
                </div>

                <p className="text-xs text-slate-300 pt-1">
                  You spent the entire evening carrying it... and forgot to give it to her!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {pocketChecked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-rose-300 font-semibold italic"
          >
            Mission failed? Not on our watch. 🏃‍♂️💨
          </motion.p>
        )}
      </div>

      {/* Button Controls */}
      {!pocketChecked ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setPocketChecked(true)}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Check your pocket 🔍</span>
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
          <span>What now?! 🏃‍♂️</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
