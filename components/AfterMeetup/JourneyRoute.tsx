"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ArrowRight, Heart, Compass } from "lucide-react";

interface JourneyRouteProps {
  onNext: () => void;
}

export function JourneyRoute({ onNext }: JourneyRouteProps) {
  const [traveled, setTraveled] = useState(false);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          Scene 1 • The Journey
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
          Gadag to Hubli 📍
        </h2>
        <p className="text-sm text-slate-400">
          The road that made everything real.
        </p>
      </div>

      {/* Interactive Map card */}
      <div className="w-full max-w-sm rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 shadow-xl relative overflow-hidden">
        {/* Route visualization */}
        <div className="relative py-2 flex flex-col items-center">
          {/* Gadag Point */}
          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-300 font-bold text-xs shadow-md">
                GAD
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Origin</p>
                <p className="text-sm font-bold text-slate-200">Gadag</p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500">0 km</span>
          </div>

          {/* Road Route Path */}
          <div className="relative w-full my-6 flex justify-center">
            {/* Dashed highway road */}
            <div className="w-1.5 h-36 bg-gradient-to-b from-slate-700 via-rose-500/40 to-rose-500 rounded-full relative overflow-hidden">
              <motion.div
                className="w-full bg-rose-500 rounded-full"
                initial={{ height: "0%" }}
                animate={{ height: traveled ? "100%" : "25%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>

            {/* Traveling Vehicle / Dot */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-rose-600 border-2 border-white shadow-lg flex items-center justify-center text-white"
              initial={{ top: "0%" }}
              animate={{ top: traveled ? "88%" : "20%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Navigation className="w-4 h-4 rotate-180" />
            </motion.div>

            {/* Pulsing rings around car */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-right">
              <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 border border-rose-500/30 px-2 py-1 rounded-md inline-block">
                {traveled ? "58 km • Arrived" : "On the road..."}
              </span>
            </div>
          </div>

          {/* Hubli Point */}
          <div className="w-full flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-400 font-bold text-xs shadow-md">
                <MapPin className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <p className="text-xs text-rose-400 font-mono">Destination</p>
                <p className="text-sm font-bold text-white flex items-center gap-1">
                  <span>Hubli</span>
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-rose-400">58 km</span>
          </div>
        </div>

        {/* Narrative text */}
        <div className="mt-6 pt-4 border-t border-white/10 space-y-2 text-center">
          <p className="text-xs font-mono text-slate-400">
            Mission: <span className="text-rose-300 font-semibold">Finally meet her. ❤️</span>
          </p>
          {traveled ? (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-amber-300 font-medium italic"
            >
              And then... things got complicated. 🫣
            </motion.p>
          ) : (
            <p className="text-xs text-slate-500 italic">
              Tap below to complete the drive to Hubli.
            </p>
          )}
        </div>
      </div>

      {/* Button controls */}
      {!traveled ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setTraveled(true)}
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Compass className="w-4 h-4 text-rose-400 animate-spin" />
          <span>Drive to Hubli 🚗</span>
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
          <span>What happened?</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
