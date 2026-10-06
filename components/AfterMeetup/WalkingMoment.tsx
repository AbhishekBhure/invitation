"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Footprints } from "lucide-react";

interface WalkingMomentProps {
  onNext: () => void;
}

export function WalkingMoment({ onNext }: WalkingMomentProps) {
  const [stepsCount, setStepsCount] = useState(0);

  const handleStep = () => {
    setStepsCount((prev) => prev + 1);
  };

  const isWalkingFinished = stepsCount >= 3;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 4 • The Walk
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center">
        {/* Animated stars and ambient lanterns */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute top-12 right-10 w-1.5 h-1.5 bg-rose-200 rounded-full" />
          <div className="absolute bottom-16 left-12 w-1 h-1 bg-pink-300 rounded-full" />
        </div>

        {/* Dynamic walking scenery */}
        <div className="w-full py-6 flex flex-col items-center relative">
          {/* Subtle floating hearts */}
          <div className="h-28 w-full flex items-center justify-center relative overflow-hidden rounded-2xl bg-slate-900/60 border border-white/5">
            {/* Street lamps / soft bokeh */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent" />

            {/* Walking couple avatars */}
            <motion.div
              animate={{
                y: [0, -5, 0],
                x: stepsCount * 12,
              }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="flex items-center gap-3 relative z-10"
            >
              <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-sm shadow-md">
                👟
              </div>
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </motion.div>
              <div className="w-10 h-10 rounded-full bg-rose-900/70 border-2 border-rose-400 flex items-center justify-center text-sm shadow-md">
                👠
              </div>
            </motion.div>

            {/* Moving footsteps trace */}
            <div className="absolute bottom-2 left-6 right-6 flex justify-around opacity-40">
              {[...Array(6)].map((_, i) => (
                <Footprints
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i <= stepsCount * 2 ? "text-rose-400" : "text-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text lines */}
        <div className="space-y-3 text-center my-2">
          <p className="text-xl font-bold text-white">
            We walked for a while.
          </p>

          <div className="space-y-1 text-xs sm:text-sm font-mono text-slate-400">
            <p className="text-rose-300/80">No rescheduling.</p>
            <p className="text-rose-300/80">No &ldquo;some other day.&rdquo;</p>
          </div>

          <p className="text-base font-semibold text-rose-400 pt-1">
            Just us. Finally.
          </p>
        </div>
      </div>

      {/* Button Controls */}
      {!isWalkingFinished ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStep}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
        >
          <Footprints className="w-4 h-4 text-rose-400" />
          <span>Walk together ({stepsCount}/3) 👣</span>
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
          <span>Where next?</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
