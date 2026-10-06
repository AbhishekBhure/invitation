"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Calendar, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface NextAdventureProps {
  onBackToCaseHistory: () => void;
  onPlanNext: () => void;
}

export function NextAdventure({
  onBackToCaseHistory,
  onPlanNext,
}: NextAdventureProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 18 & 19 • Full Circle
      </span>

      {/* Main card */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Full Circle Case History Summary */}
        <div className="w-full space-y-3 pb-5 border-b border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
            Case History • Full Circle
          </span>

          <div className="space-y-2 text-left">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
              <span className="font-semibold text-slate-300">Attempt #1 - GOA</span>
              <span className="font-mono text-slate-500">Coming Soon 😭</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs">
              <span className="font-semibold text-slate-300">Attempt #2 - Blr Meet up</span>
              <span className="font-mono text-slate-500">Rescheduled 🫠</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-xs shadow-sm">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Attempt #3 - Dharwar</span>
              </span>
              <span className="font-mono font-bold text-rose-300">
                WE DID IT. ❤️
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 italic pt-1">
            All those attempts... and this one became a memory.
          </p>
        </div>

        {/* Playful Round 2 Proposition */}
        <div className="pt-5 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-rose-300">
            So...
          </p>
          <h3 className="text-2xl font-black text-white">
            Should we really stop at one? 👀
          </h3>
          <p className="text-xs font-mono tracking-widest text-amber-300 uppercase">
            ROUND 2? ✨
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dharwar was special. The story doesn&apos;t have to end here.
          </p>
        </div>
      </div>

      {/* Button Actions */}
      <div className="w-full max-w-sm space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPlanNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all group"
        >
          <Calendar className="w-4 h-4" />
          <span>Maybe we should meet again</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </motion.button>

        <button
          onClick={onBackToCaseHistory}
          className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Case History</span>
        </button>
      </div>
    </div>
  );
}
