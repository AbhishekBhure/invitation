"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, Clock, Sparkles, MessageCircle, CheckCircle2 } from "lucide-react";
import { ALLOWED_ACTIVITIES } from "@/lib/validation";

interface SuccessScreenProps {
  name?: string;
  date: string;
  time?: string;
  activity?: string;
  activities?: string[];
  notes?: string;
  onReset: () => void;
}

export function SuccessScreen({
  name = "Chinna",
  date,
  time = "TBD",
  activity,
  activities = [],
  notes,
  onReset,
}: SuccessScreenProps) {
  // Aggregate activities list
  const activeIds = activities.length > 0 ? activities : (activity ? [activity] : ["coffee"]);
  const chosenActivities = ALLOWED_ACTIVITIES.filter((a) => activeIds.includes(a.id));
  const activityTitleList = chosenActivities.map((a) => `${a.emoji} ${a.title}`).join(", ") || "Our Hangout";

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : date;

  // Trigger heart and star confetti on mount
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#fb7185", "#fda4af", "#ffd166", "#ec4899"],
    });

    const timer = setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#f43f5e", "#ffb703", "#e0aaff"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#f43f5e", "#ffb703", "#e0aaff"],
      });
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  // WhatsApp share link
  const getWhatsAppShareUrl = () => {
    const text = encodeURIComponent(
      `Hey! 👀 Just locked our plan in on the site: ${formattedDate} for ${activityTitleList}! Can't wait! ❤️`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md mx-auto px-4 py-4 flex flex-col items-center"
    >
      <div className="glass-card w-full rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden">
        {/* Celebration icon badge */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 15 }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white mx-auto flex items-center justify-center mb-4 shadow-lg shadow-rose-500/30"
        >
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </motion.div>

        <h2 className="text-3xl font-black text-gray-900 mb-1">
          IT&apos;S OFFICIAL! 🎉
        </h2>
        <p className="text-sm font-semibold text-rose-600 mb-6">
          Marked on the calendar. No more rescheduling! 😉
        </p>

        {/* Confirmation Details Card */}
        <div className="bg-white/90 rounded-2xl border border-rose-200/80 p-5 shadow-sm text-left space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">Date</div>
              <div className="text-sm font-bold text-gray-800">{formattedDate}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">Time</div>
              <div className="text-sm font-bold text-gray-800">
                {time && time !== "TBD" ? time : "I'll coordinate the exact time with you! 😊"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-gray-400 font-bold uppercase">The Plan</div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {chosenActivities.map((act) => (
                  <span
                    key={act.id}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200"
                  >
                    <span>{act.emoji}</span>
                    <span>{act.title}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {notes && (
            <div className="pt-2 border-t border-rose-100 text-xs text-gray-600">
              <span className="font-semibold text-rose-500">Wish:</span> {notes}
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-2.5 mb-6">
          <a
            href={getWhatsAppShareUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send a WhatsApp Ping</span>
          </a>
        </div>

        {/* Footer sweet note */}
        <p className="text-lg text-gray-500 flex items-center justify-center gap-1">
          <span>See you then, {name}!</span>
          <Sparkles className="w-4 h-4 text-rose-500" />
        </p>

        <div className="mt-4 pt-3 border-t border-rose-100/60">
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] text-gray-400 hover:text-gray-600 hover:underline cursor-pointer"
          >
            Want to start over or pick another date?
          </button>
        </div>
      </div>
    </motion.section>
  );
}
