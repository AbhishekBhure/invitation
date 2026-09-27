"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react";

interface TimePickerProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PRESET_TIMES = [
  { label: "5:00 PM", subtitle: "Late afternoon chill" },
  { label: "6:00 PM", subtitle: "Golden hour glow" },
  { label: "6:30 PM", subtitle: "Evening vibes" },
  { label: "7:00 PM", subtitle: "Dinner & unwinding" },
  { label: "7:30 PM", subtitle: "Relaxed twilight" },
];

export function TimePicker({
  selectedTime,
  onSelectTime,
  onNext,
  onBack,
}: TimePickerProps) {
  const isCustomTime =
    Boolean(selectedTime) && !PRESET_TIMES.some((t) => t.label === selectedTime);

  const [showCustomInput, setShowCustomInput] = useState(isCustomTime);
  const [customValue, setCustomValue] = useState(isCustomTime ? selectedTime : "");

  const handleCustomSubmit = (val: string) => {
    setCustomValue(val);
    if (val) {
      onSelectTime(val);
    }
  };

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
            And what time works for you? ⏰
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Pick a comfortable hour, or pick your own custom time.
          </p>
        </div>

        {/* Preset Time Slots */}
        <div className="space-y-2.5 mb-4">
          {PRESET_TIMES.map((slot) => {
            const isSelected = selectedTime === slot.label && !showCustomInput;

            return (
              <button
                key={slot.label}
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  onSelectTime(slot.label);
                }}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/25 scale-[1.01]"
                    : "bg-white/70 hover:bg-rose-50/70 border-rose-100 text-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-white/20 text-white" : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-base">{slot.label}</div>
                    <div
                      className={`text-xs ${
                        isSelected ? "text-rose-100" : "text-gray-400"
                      }`}
                    >
                      {slot.subtitle}
                    </div>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white stroke-[2.5]" />
                  </div>
                )}
              </button>
            );
          })}

          {/* "Something else" Option */}
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(true);
              if (customValue) onSelectTime(customValue);
            }}
            className={`w-full p-3.5 rounded-2xl flex items-center justify-between border text-left transition-all cursor-pointer ${
              showCustomInput
                ? "bg-rose-50 border-rose-400 text-rose-800 shadow-sm"
                : "bg-white/50 hover:bg-rose-50/50 border-dashed border-rose-200 text-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="font-medium text-sm">Something else...</div>
            </div>
            <span className="text-xs text-rose-500 font-semibold">Custom</span>
          </button>

          {/* Expandable Custom Time selector */}
          {showCustomInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 bg-white/90 rounded-2xl border border-rose-200 shadow-inner"
            >
              <label
                htmlFor="custom-time-input"
                className="block text-xs font-semibold text-gray-700 mb-1.5"
              >
                Type or choose your exact time:
              </label>
              <input
                id="custom-time-input"
                type="text"
                placeholder="e.g. 4:15 PM, 8:00 PM, or lunchtime"
                value={customValue}
                onChange={(e) => handleCustomSubmit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
              />
            </motion.div>
          )}
        </div>

        {/* Selected preview */}
        <div className="min-h-[30px] flex items-center justify-center mb-5">
          {selectedTime ? (
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
              Selected: {selectedTime}
            </span>
          ) : (
            <span className="text-xs text-gray-400 italic">
              Please choose a time above
            </span>
          )}
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
            disabled={!selectedTime}
            onClick={onNext}
            id="time-next-button"
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedTime
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Continue to Activity</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
