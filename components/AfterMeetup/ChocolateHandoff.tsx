"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface ChocolateHandoffProps {
  onNext: () => void;
}

export function ChocolateHandoff({ onNext }: ChocolateHandoffProps) {
  const [isHandedOver, setIsHandedOver] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 14 • The Handoff
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="space-y-1 mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Next Stop Junction
          </p>
          <h2 className="text-2xl font-black text-white">
            There she was, waiting.
          </h2>
        </div>

        {/* Handoff Stage */}
        <div className="w-full py-8 flex flex-col items-center justify-center relative min-h-[160px]">
          <div className="flex items-center justify-between w-full px-6">
            {/* You */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-xl shadow-lg">
                🏃‍♂️
              </div>
              <span className="text-xs font-mono text-slate-300">You</span>
            </div>

            {/* Flying Chocolate Animation */}
            <div className="flex-1 flex justify-center relative px-2">
              <motion.div
                animate={
                  isHandedOver
                    ? { x: 50, scale: [1, 1.3, 1], rotate: [0, 15, 0] }
                    : { x: 0, scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-4xl select-none"
              >
                🍫
              </motion.div>
            </div>

            {/* Her */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-rose-950/80 border-2 border-rose-400 flex items-center justify-center text-xl shadow-lg">
                ✨
              </div>
              <span className="text-xs font-mono text-rose-300">Her</span>
            </div>
          </div>

          {/* Mission Complete notification */}
          <AnimatePresence>
            {isHandedOver && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1"
              >
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>MISSION COMPLETE ❤️</span>
                </div>
                <p className="text-xs text-slate-200">
                  Chocolate successfully delivered. She couldn&apos;t stop laughing.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button Controls */}
      {!isHandedOver ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsHandedOver(true)}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white font-bold text-base shadow-lg shadow-rose-950 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Give chocolate 🍫</span>
          <Sparkles className="w-4 h-4 text-amber-200" />
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
          <span>Look around... 👀</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
