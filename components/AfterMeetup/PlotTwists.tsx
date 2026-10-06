"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, HelpCircle, ArrowRight, Clock, AlertTriangle } from "lucide-react";

interface PlotTwistsProps {
  onNext: () => void;
}

const TWISTS = [
  {
    plan: "PLAN A",
    status: "Cancelled",
    icon: XCircle,
    color: "text-red-400 border-red-500/30 bg-red-500/10",
    desc: "Timing misaligned. The universe tried to intervene.",
  },
  {
    plan: "PLAN B",
    status: "Complicated",
    icon: AlertTriangle,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    desc: "Route confusion, schedule chaos, and panic.",
  },
  {
    plan: "PLAN C",
    status: "Somehow still alive",
    icon: HelpCircle,
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    desc: "Against all odds, the meetup was still breathing.",
  },
];

export function PlotTwists({ onNext }: PlotTwistsProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleAdvance = () => {
    if (currentStep < TWISTS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const isFinalStage = currentStep === TWISTS.length;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          Scene 2 • The Plot Twists
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
          Chaos Before Sunset 🌀
        </h2>
        <p className="text-sm text-slate-400">
          Nothing went according to plan.
        </p>
      </div>

      {/* Twists Stack */}
      <div className="w-full max-w-sm space-y-3">
        {TWISTS.map((twist, index) => {
          const isRevealed = index < currentStep;
          const Icon = twist.icon;

          if (!isRevealed) {
            return null;
          }

          return (
            <motion.div
              key={twist.plan}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`p-4 rounded-2xl border backdrop-blur-md shadow-lg ${twist.color}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-mono font-bold tracking-wider text-sm">
                    {twist.plan}
                  </span>
                </div>
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10">
                  {twist.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans pl-7">
                {twist.desc}
              </p>
            </motion.div>
          );
        })}

        {/* Dramatic 7:00 PM Reveal */}
        <AnimatePresence>
          {isFinalStage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 rounded-2xl border border-rose-500/40 bg-gradient-to-br from-rose-950/60 to-purple-950/40 backdrop-blur-md shadow-2xl text-center space-y-3"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-rose-300">
                After all those twists...
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/40">
                <Clock className="w-5 h-5 text-rose-400 animate-pulse" />
                <span className="text-3xl font-black font-mono tracking-wider text-white">
                  7:00 PM
                </span>
              </div>
              <p className="text-xs text-slate-300 italic">
                The clock struck the exact hour.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAdvance}
        className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
      >
        <span>
          {currentStep === 0 && "What about Plan A? ❌"}
          {currentStep === 1 && "What about Plan B? ⚠️"}
          {currentStep === 2 && "Is Plan C alive? ❓"}
          {currentStep === 3 && "And then... ❤️"}
        </span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
