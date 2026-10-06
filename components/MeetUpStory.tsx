"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Heart, ArrowRight } from "lucide-react";

interface MeetUpStoryProps {
  onContinue: () => void;
  onReliveDharwar?: () => void;
}

const ATTEMPTS = [
  {
    number: "Attempt #1 - GOA",
    status: "Coming Soon 😭",
    bgColor: "bg-red-50 text-red-600 border-red-200",
    dotColor: "bg-red-400",
    isDharwar: false,
  },
  {
    number: "Attempt #2 - Blr Meet up",
    status: "Rescheduled 🫠",
    bgColor: "bg-amber-50 text-amber-600 border-amber-200",
    dotColor: "bg-amber-400",
    isDharwar: false,
  },
  {
    number: "Attempt #3 - Dharwar",
    status: "WE ACTUALLY DID IT ❤️",
    bgColor: "bg-rose-50 text-rose-600 border-rose-300 font-bold shadow-sm",
    dotColor: "bg-rose-500 animate-ping",
    isDharwar: true,
  },
  // {
  //   number: "Attempt #4",
  //   status: "The Masterpiece? ✨",
  //   bgColor: "bg-rose-50 text-rose-600 border-rose-300 font-bold shadow-sm",
  //   dotColor: "bg-rose-500 animate-ping",
  // },
];

export function MeetUpStory({ onContinue, onReliveDharwar }: MeetUpStoryProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto px-4 py-4 flex flex-col items-center"
    >
      <div className="glass-card w-full rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Case History #2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            Our Track Record 📜
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 space-y-4 my-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
          {ATTEMPTS.map((attempt, idx) => (
            <motion.div
              key={attempt.number}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 * idx, duration: 0.4 }}
              className={`relative flex flex-col p-3.5 rounded-xl border bg-white/70 shadow-xs ${
                attempt.isDharwar
                  ? "border-rose-300 ring-1 ring-rose-200/60 bg-gradient-to-br from-white to-rose-50/40"
                  : ""
              }`}
            >
              {/* Timeline marker */}
              <div
                className={`absolute -left-[27px] ${
                  attempt.isDharwar ? "top-5" : "top-1/2 -translate-y-1/2"
                } w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${attempt.dotColor}`}
              />

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-sm">
                    {attempt.number}
                  </span>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full border font-medium ${attempt.bgColor}`}
                >
                  {attempt.status}
                </span>
              </div>

              {attempt.isDharwar && onReliveDharwar && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onReliveDharwar();
                  }}
                  id="relive-dharwar-btn"
                  className="mt-3 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
                >
                  <span>Relive this day</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Emotional core message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 }}
          className="bg-gradient-to-br from-rose-50 to-pink-50/70 p-5 rounded-2xl border border-rose-200/80 text-center mb-6 relative overflow-hidden"
        >
          <p className="text-lg font-bold text-gray-900 mb-2 flex items-center justify-center gap-1.5">
            <span>I still want to meet you.</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
          </p>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            So instead of saying &ldquo;sometime soon&rdquo; again,
            <br />
            let&apos;s actually pick a day.
          </p>
          <p className="text-xs font-semibold text-rose-600 tracking-wide">
            No pressure — you choose when. ❤️
          </p>
          <p className="text-xs font-semibold text-rose-800 tracking-wide mt-2">
            Let's break the Curse.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          id="story-continue-button"
          className="w-full py-3.5 px-6 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>Pick a date</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.section>
  );
}
