"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Bus } from "lucide-react";

interface GoodbyeMomentProps {
  onNext: () => void;
}

export function GoodbyeMoment({ onNext }: GoodbyeMomentProps) {
  const [busDeparted, setBusDeparted] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
        Scene 10 • Goodbye
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-slate-950/80 border border-slate-800 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Animated Bus Departing Stage */}
        <div className="w-full py-8 flex flex-col items-center justify-center relative min-h-[140px] overflow-hidden">
          <motion.div
            initial={{ x: 0, opacity: 1 }}
            animate={
              busDeparted
                ? { x: -350, opacity: 0, transition: { duration: 1.6, ease: "easeIn" } }
                : { x: 0, opacity: 1 }
            }
            className="flex flex-col items-center space-y-2"
          >
            <div className="w-36 h-18 rounded-2xl bg-amber-700/80 border-2 border-amber-500/50 flex items-center justify-center shadow-lg relative">
              <Bus className="w-8 h-8 text-amber-200" />
              {/* Red taillights */}
              <div className="absolute right-2 top-3 w-3 h-2 rounded-sm bg-red-500 animate-pulse" />
              <div className="absolute right-2 bottom-3 w-3 h-2 rounded-sm bg-red-500 animate-pulse" />
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              She boards the bus...
            </span>
          </motion.div>

          {/* After departure lonely road */}
          {busDeparted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 text-lg mb-2">
                🍂
              </div>
              <p className="text-sm font-mono text-slate-500">
                The road goes quiet...
              </p>
            </motion.div>
          )}
        </div>

        {/* Story Text */}
        <div className="space-y-3 mt-2">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Neither of us really wanted the evening to end.
          </p>

          <p className="text-xs font-mono text-slate-400">
            But the bus had other plans.
          </p>

          {busDeparted && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-lg font-bold text-rose-400 pt-2 flex items-center justify-center gap-1.5"
            >
              <span>Goodbye.</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </motion.p>
          )}
        </div>
      </div>

      {/* Button Controls */}
      {!busDeparted ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setBusDeparted(true)}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Watch the bus leave 🚌</span>
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Wait... 🤔</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
