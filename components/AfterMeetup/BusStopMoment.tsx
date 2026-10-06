"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bus } from "lucide-react";

interface BusStopMomentProps {
  onNext: () => void;
}

export function BusStopMoment({ onNext }: BusStopMomentProps) {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [busArrived, setBusArrived] = useState(false);

  const startBusSequence = () => {
    setCountdown(3);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : 0));
      }, 700);
      return () => clearTimeout(timer);
    } else if (countdown === 1) {
      const timer = setTimeout(() => {
        setCountdown(0);
        setBusArrived(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
        Scene 9 • Bus Stop
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="space-y-1 mb-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Dharwar Bus Stand
          </p>
          <h2 className="text-2xl font-black text-white">
            Then we reached the bus stop.
          </h2>
        </div>

        {/* Bus stop stage */}
        <div className="w-full py-8 flex flex-col items-center justify-center relative min-h-[160px]">
          <AnimatePresence mode="wait">
            {countdown === null && (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-2xl shadow-lg">
                  🚏
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Waiting together under the street lamps...
                </p>
              </motion.div>
            )}

            {countdown !== null && countdown > 0 && (
              <motion.div
                key={countdown}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="flex flex-col items-center space-y-2"
              >
                <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">
                  Bus Arriving In...
                </span>
                <span className="text-5xl font-black font-mono text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                  {countdown}
                </span>
              </motion.div>
            )}

            {busArrived && (
              <motion.div
                key="arrived"
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="flex flex-col items-center space-y-3"
              >
                <div className="relative">
                  {/* Bus visual */}
                  <div className="w-40 h-20 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 border-2 border-amber-300 shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <Bus className="w-10 h-10 text-white" />
                    <div className="absolute top-2 left-3 w-6 h-4 bg-cyan-200/40 rounded-sm" />
                    <div className="absolute top-2 right-3 w-6 h-4 bg-cyan-200/40 rounded-sm" />
                    <div className="absolute bottom-1 left-4 w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-700" />
                    <div className="absolute bottom-1 right-4 w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-700" />
                  </div>
                  {/* Headlights beam */}
                  <div className="absolute -left-12 top-6 w-16 h-8 bg-amber-400/20 blur-md rounded-full pointer-events-none" />
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-mono uppercase tracking-widest text-amber-300">
                    Screech! 🚌
                  </p>
                  <p className="text-sm font-semibold text-rose-300">
                    And of course... the bus came way too quickly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button Controls */}
      {countdown === null ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={startBusSequence}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Wait for the bus 🚏</span>
        </motion.button>
      ) : busArrived ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Say goodbye</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      ) : null}
    </div>
  );
}
