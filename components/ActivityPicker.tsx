"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { ALLOWED_ACTIVITIES } from "@/lib/validation";

interface ActivityPickerProps {
  selectedActivities: string[];
  notes: string;
  onToggleActivity: (id: string) => void;
  onChangeNotes: (notes: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ActivityPicker({
  selectedActivities,
  notes,
  onToggleActivity,
  onChangeNotes,
  onNext,
  onBack,
}: ActivityPickerProps) {
  const hasSelection = selectedActivities.length > 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-4 py-3 flex flex-col items-center"
    >
      <div className="glass-card w-full rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="text-center mb-5">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Step 2 of 3
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
            What&apos;s our plan? ✨
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Pick as many as you like! We can do multiple things.
          </p>
        </div>

        {/* Activity list with multi-selection */}
        <div className="space-y-2.5 mb-5">
          {ALLOWED_ACTIVITIES.map((act) => {
            const isSelected = selectedActivities.includes(act.id);

            return (
              <button
                key={act.id}
                type="button"
                onClick={() => onToggleActivity(act.id)}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25 scale-[1.01]"
                    : "bg-white/70 hover:bg-rose-50/70 border-rose-100 text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl select-none">{act.emoji}</span>
                  <div>
                    <div className="font-bold text-sm sm:text-base">{act.title}</div>
                    <div
                      className={`text-xs ${
                        isSelected ? "text-rose-100" : "text-gray-400"
                      }`}
                    >
                      {act.tagline}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-white/25 text-white ring-2 ring-white/50"
                      : "border border-gray-300 bg-white/50"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected count badge */}
        <div className="text-center mb-4">
          <span className="text-xs text-rose-600 font-medium bg-rose-50/80 px-3 py-1 rounded-full border border-rose-100">
            {selectedActivities.length === 0
              ? "Select at least 1 plan"
              : `${selectedActivities.length} vibe${selectedActivities.length > 1 ? "s" : ""} selected ❤️`}
          </span>
        </div>

        {/* Optional notes */}
        <div className="mb-6">
          <label
            htmlFor="optional-notes"
            className="block text-xs font-semibold text-gray-600 mb-1.5 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Any food cravings or favorite spots? (Optional)</span>
          </label>
          <input
            id="optional-notes"
            type="text"
            placeholder="e.g. That boba place, sushi, or good cold brew..."
            value={notes}
            onChange={(e) => onChangeNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white/80"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="py-3 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            disabled={!hasSelection}
            onClick={onNext}
            id="activity-next-button"
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hasSelection
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Review & Confirm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
