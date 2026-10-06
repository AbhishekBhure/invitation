"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bus, MessageSquare, Send, Zap } from "lucide-react";

interface BusChaseMomentProps {
  onNext: () => void;
}

export function BusChaseMoment({ onNext }: BusChaseMomentProps) {
  // phase: 0 = chat, 1 = chase mini-game
  const [phase, setPhase] = useState<0 | 1>(0);

  // Chat stage
  const [chatStep, setChatStep] = useState(0);

  // Chase mini-game stage (0 to 4 taps)
  const [chaseProgress, setChaseProgress] = useState(0);

  // Automatic chat sequencing
  useEffect(() => {
    if (phase === 0) {
      if (chatStep === 0) {
        const timer = setTimeout(() => setChatStep(1), 600);
        return () => clearTimeout(timer);
      } else if (chatStep === 1) {
        const timer = setTimeout(() => setChatStep(2), 1200);
        return () => clearTimeout(timer);
      } else if (chatStep === 2) {
        const timer = setTimeout(() => setChatStep(3), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, chatStep]);

  const handleChaseTap = () => {
    if (chaseProgress < 3) {
      setChaseProgress((prev) => prev + 1);
    }
  };

  const isChaseCompleted = chaseProgress >= 3;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
        Scene 12 & 13 • The Message & The Chase
      </span>

      {/* Main Container */}
      <div className="w-full max-w-sm rounded-3xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === 0 ? (
            /* PHASE 0: CHAT INTERFACE */
            <motion.div
              key="chat-phase"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col space-y-4"
            >
              {/* Chat Top Bar */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  C
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-bold text-white leading-tight">
                    Chinna ❤️
                  </p>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    online
                  </p>
                </div>
                <MessageSquare className="w-4 h-4 text-slate-400" />
              </div>

              {/* Message bubbles */}
              <div className="space-y-2.5 py-2 min-h-[160px] flex flex-col justify-end">
                {/* You: Get down at next stop */}
                {chatStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="self-end max-w-[80%] rounded-2xl rounded-tr-xs bg-rose-600 text-white p-3 text-xs shadow-md"
                  >
                    Get down at the next stop. 🛑
                  </motion.div>
                )}

                {/* Her: ...what? */}
                {chatStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="self-start max-w-[80%] rounded-2xl rounded-tl-xs bg-slate-800 text-slate-200 border border-slate-700 p-3 text-xs shadow-md"
                  >
                    ...what? 😂
                  </motion.div>
                )}

                {/* You: Just get down */}
                {chatStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="self-end max-w-[80%] rounded-2xl rounded-tr-xs bg-rose-600 text-white p-3 text-xs shadow-md"
                  >
                    Just get down! 🏃‍♂️💨
                  </motion.div>
                )}
              </div>

              {/* Mission alert */}
              {chatStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center"
                >
                  <p className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    🎯 MISSION: DELIVER CHOCOLATE 🍫
                  </p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* PHASE 1: CHASE MINI-GAME */
            <motion.div
              key="chase-phase"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center space-y-4"
            >
              <div className="text-center space-y-1">
                <p className="text-xs font-mono uppercase tracking-widest text-rose-300">
                  So naturally...
                </p>
                <h3 className="text-xl font-black text-white">
                  You caught another bus! 🚌💨
                </h3>
              </div>

              {/* Road Chase Stage */}
              <div className="w-full h-32 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex flex-col justify-center px-4">
                {/* Road marking lines */}
                <div className="absolute inset-x-0 h-0.5 border-t border-dashed border-slate-700 top-1/2 -translate-y-1/2" />

                {/* Bus 1 (Her Bus) */}
                <motion.div
                  className="absolute top-3 flex items-center gap-1.5"
                  animate={{
                    left: `${Math.min(75, 45 + chaseProgress * 5)}%`,
                  }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <div className="px-2 py-1 rounded-lg bg-pink-700 border border-pink-400 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                    <Bus className="w-3.5 h-3.5" />
                    <span>HER BUS #1</span>
                  </div>
                </motion.div>

                {/* Bus 2 (Your Bus) */}
                <motion.div
                  className="absolute bottom-3 flex items-center gap-1.5"
                  animate={{
                    left: `${Math.min(70, 10 + chaseProgress * 20)}%`,
                  }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <div className="px-2 py-1 rounded-lg bg-rose-600 border border-rose-300 text-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-md">
                    <Bus className="w-3.5 h-3.5" />
                    <span>YOUR BUS #2</span>
                    <Zap className="w-3 h-3 text-yellow-300 animate-bounce" />
                  </div>
                </motion.div>
              </div>

              <div className="text-center">
                <p className="text-xs font-mono text-slate-300">
                  {isChaseCompleted
                    ? "Both buses reached the next stop! 🎉"
                    : "Tap 'Accelerate' to catch up to the next stop!"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button Controls */}
      {phase === 0 ? (
        chatStep >= 3 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPhase(1)}
            className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Catch the next bus! 🚌</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )
      ) : !isChaseCompleted ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleChaseTap}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Zap className="w-4 h-4 text-yellow-300" />
          <span>Accelerate bus ({chaseProgress}/3) 💨</span>
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
          <span>At the next stop...</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
