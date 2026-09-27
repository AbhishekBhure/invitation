"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart, Loader2, Sparkles, Edit3 } from "lucide-react";
import { ALLOWED_ACTIVITIES } from "@/lib/validation";

interface BookingSummaryProps {
  name?: string;
  date: string;
  activities: string[];
  notes?: string;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onConfirm: () => void;
  onChangeDate: () => void;
  onChangeActivity: () => void;
}

export function BookingSummary({
  name = "Chinna",
  date,
  activities,
  notes,
  isSubmitting,
  errorMessage,
  onConfirm,
  onChangeDate,
  onChangeActivity,
}: BookingSummaryProps) {
  const chosenActivities = ALLOWED_ACTIVITIES.filter((a) =>
    activities.includes(a.id)
  );

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date selected";

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-4 py-3 flex flex-col items-center"
    >
      <div className="glass-card w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Playful Header */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3 shadow-inner"
          >
            <Heart className="w-6 h-6 fill-rose-500 text-rose-500 animate-pulse" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
            So... this is happening? <span className="inline-block">👀</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1.5">
            Double check the details before we lock it into the calendar.
          </p>
        </div>

        {/* Ticket Summary Card */}
        <div className="bg-gradient-to-b from-white to-rose-50/50 rounded-2xl border border-rose-200/80 p-5 shadow-sm space-y-4 mb-6 relative">
          {/* Decorative ticket cutouts */}
          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-rose-50 border-r border-rose-200/80" />
          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-rose-50 border-l border-rose-200/80" />

          {/* Date Row */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-100/80 text-rose-600 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                  Date
                </div>
                <div className="font-bold text-gray-800 text-sm sm:text-base">
                  {formattedDate}
                </div>
              </div>
            </div>
            <button
              onClick={onChangeDate}
              aria-label="Change date"
              className="text-xs text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="border-t border-dashed border-rose-200" />

          {/* Time Notice Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-pink-100/80 text-pink-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                  Time
                </div>
                <div className="font-bold text-gray-800 text-sm sm:text-base">
                  I&apos;ll coordinate with you!
                </div>
                <div className="text-[11px] text-gray-400">
                  Exact hour will be finalized shortly
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-rose-200" />

          {/* Activity Multi-Row */}
          <div className="flex items-start justify-between group">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                  The Plan ({chosenActivities.length})
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {chosenActivities.map((act) => (
                    <span
                      key={act.id}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gray-800 bg-white px-2.5 py-1 rounded-lg border border-rose-200/70 shadow-2xs"
                    >
                      <span>{act.emoji}</span>
                      <span>{act.title}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onChangeActivity}
              aria-label="Change activities"
              className="text-xs text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {notes && (
            <>
              <div className="border-t border-dashed border-rose-200" />
              <div className="text-xs text-gray-600 bg-white/60 p-2.5 rounded-xl border border-rose-100">
                <span className="font-semibold text-rose-600">Wish / Note: </span>
                {notes}
              </div>
            </>
          )}
        </div>

        {/* Error message if any */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-center font-medium">
            {errorMessage}
          </div>
        )}

        {/* Final CTA Statement */}
        <p className="text-center text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-1.5">
          <span>Ready to make this one real, {name}?</span>
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
        </p>

        {/* Big YES Button */}
        <motion.button
          whileHover={isSubmitting ? {} : { scale: 1.02 }}
          whileTap={isSubmitting ? {} : { scale: 0.98 }}
          disabled={isSubmitting}
          onClick={onConfirm}
          id="confirm-booking-button"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-rose-600 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-rose-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-75 disabled:cursor-wait"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Locking it in... ✨</span>
            </>
          ) : (
            <>
              <span>YES — LET&apos;S DO IT ❤️</span>
            </>
          )}
        </motion.button>

        {/* Change something button */}
        <div className="text-center mt-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onChangeDate}
            className="text-xs text-gray-500 hover:text-rose-600 font-medium py-1 px-3 rounded-lg hover:underline transition-all cursor-pointer"
          >
            Change date or activities
          </button>
        </div>
      </div>
    </motion.section>
  );
}
