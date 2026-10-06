"use client";

import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";

interface MemorySceneProps {
  currentScene: number;
  totalScenes: number;
  onBackToCaseHistory: () => void;
  children: ReactNode;
  sceneTitle?: string;
  className?: string;
}

export function MemoryScene({
  currentScene,
  totalScenes,
  onBackToCaseHistory,
  children,
  sceneTitle,
  className = "",
}: MemorySceneProps) {
  const shouldReduceMotion = useReducedMotion();

  const progressPercent = Math.min(
    100,
    Math.round(((currentScene + 1) / totalScenes) * 100)
  );

  return (
    <div className="min-h-screen w-full flex flex-col justify-between relative overflow-hidden bg-slate-950 text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-rose-600/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-pink-600/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose-900/10 blur-[120px]" />
      </div>

      {/* Top Navigation & Progress Bar */}
      <header className="relative z-20 w-full max-w-xl mx-auto px-4 pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBackToCaseHistory}
            className="flex items-center gap-1.5 text-xs text-rose-300/80 hover:text-rose-200 transition-colors py-1.5 px-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm cursor-pointer"
            aria-label="Back to Case History"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Case History</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-wider text-rose-300/70 uppercase">
              {sceneTitle || "Dharwar Memory"}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Sparkles className="w-3 h-3 text-rose-400" />
              <span>
                {currentScene + 1}/{totalScenes}
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar line */}
        <div
          className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300 rounded-full"
            initial={shouldReduceMotion ? false : { width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </header>

      {/* Main Scene Body */}
      <main
        className={`relative z-10 w-full max-w-lg mx-auto flex-1 flex flex-col justify-center px-4 py-6 ${className}`}
      >
        <motion.div
          key={currentScene}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -16, scale: 0.98 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Gentle Footer */}
      <footer className="relative z-10 text-center py-4 text-[11px] text-slate-500 font-mono">
        Dharwar • A story that actually happened
      </footer>
    </div>
  );
}
