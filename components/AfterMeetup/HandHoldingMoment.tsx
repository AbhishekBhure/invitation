"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

interface HandHoldingMomentProps {
  onNext: () => void;
}

export function HandHoldingMoment({ onNext }: HandHoldingMomentProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (isCompleted) return;
    setIsHolding(true);

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds

    holdIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        setIsCompleted(true);
        setIsHolding(false);
        try {
          if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(50);
          }
        } catch {
          // ignore if vibration unsupported
        }
      }
    }, 20);
  };

  const endHold = () => {
    if (isCompleted) return;
    setIsHolding(false);
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    // smooth drain
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 8 • Hand in Hand
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl" />
        </div>

        <div className="space-y-1 my-2">
          <p className="text-xs font-mono uppercase tracking-widest text-rose-300">
            Somewhere on the way back...
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            You held her hand. ❤️
          </h2>
        </div>

        {/* Interactive Press-and-Hold Button */}
        <div className="py-8 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* SVG circular progress ring */}
            <svg className="w-36 h-36 -rotate-90 pointer-events-none">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-white/10"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-rose-500"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 64}
                strokeDashoffset={
                  2 * Math.PI * 64 * (1 - progress / 100)
                }
                strokeLinecap="round"
                style={{
                  transition: isHolding ? "stroke-dashoffset 20ms linear" : "stroke-dashoffset 300ms ease-out",
                }}
              />
            </svg>

            {/* Central touch/click button */}
            <button
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              onTouchCancel={endHold}
              disabled={isCompleted}
              aria-label="Press and hold to hold hand"
              className={`absolute w-28 h-28 rounded-full flex flex-col items-center justify-center select-none cursor-pointer transition-all ${
                isCompleted
                  ? "bg-rose-600 shadow-xl shadow-rose-900/50 scale-105"
                  : isHolding
                  ? "bg-rose-500/80 scale-95 shadow-inner"
                  : "bg-white/10 hover:bg-white/15 border border-white/20 active:scale-95"
              }`}
            >
              <Heart
                className={`w-9 h-9 transition-transform ${
                  isCompleted
                    ? "fill-white text-white scale-110"
                    : isHolding
                    ? "fill-rose-300 text-rose-300 scale-125 animate-pulse"
                    : "text-rose-400"
                }`}
              />
              <span className="text-[11px] font-bold font-mono uppercase mt-1 tracking-wider text-white">
                {isCompleted ? "Held ❤️" : isHolding ? "Holding..." : "Hold"}
              </span>
            </button>
          </div>

          <p className="text-xs font-mono text-slate-400 mt-4 tracking-wider">
            {!isCompleted ? "Press and hold ❤️" : "Connection made ✨"}
          </p>
        </div>

        {/* Revealed message */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center space-y-1.5 w-full"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-rose-300">
                For a little while...
              </p>
              <p className="text-base font-bold text-white flex items-center justify-center gap-1.5">
                <span>everything else disappeared.</span>
                <Sparkles className="w-4 h-4 text-rose-400" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button */}
      {isCompleted && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>To the bus stop</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
