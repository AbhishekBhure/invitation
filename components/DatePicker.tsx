"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ArrowRight, ArrowLeft } from "lucide-react";

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DAYS_OF_WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function DatePicker({
  selectedDate,
  onSelectDate,
  onNext,
  onBack,
}: DatePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Hard limit: October 31, 2026
  const octoberEnd = new Date(2026, 9, 31, 23, 59, 59); // month index 9 is October

  const initialViewDate = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : today;
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(initialViewDate.getFullYear(), initialViewDate.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  // Compute calendar grid
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const totalDays = lastDayOfMonth.getDate();

  let startDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startDayOfWeek === -1) startDayOfWeek = 6;

  const calendarDays: Array<{
    dayNumber: number;
    isoDate: string;
    isPast: boolean;
    isFutureOut: boolean;
    isToday: boolean;
    isSelected: boolean;
  }> = [];

  for (let i = 1; i <= totalDays; i++) {
    const dayDate = new Date(year, month, i);
    dayDate.setHours(0, 0, 0, 0);
    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(i).padStart(2, "0");
    const isoDate = `${year}-${monthStr}-${dayStr}`;

    const isPast = dayDate < today;
    const isFutureOut = dayDate > octoberEnd; // strictly capped at October 31, 2026
    const isToday = dayDate.getTime() === today.getTime();
    const isSelected = selectedDate === isoDate;

    calendarDays.push({
      dayNumber: i,
      isoDate,
      isPast,
      isFutureOut,
      isToday,
      isSelected,
    });
  }

  // Can we navigate earlier or later?
  const canGoPrev = !(year === 2026 && month <= today.getMonth());
  const canGoNext = !(year === 2026 && month >= 9); // Month 9 is October

  const prevMonth = () => {
    if (canGoPrev) {
      setCurrentMonth(new Date(year, month - 1, 1));
    }
  };

  const nextMonth = () => {
    if (canGoNext) {
      setCurrentMonth(new Date(year, month + 1, 1));
    }
  };

  const formattedSelected = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : null;

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
            Step 1 of 3
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-2">
            Pick a date 📅
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Choose any day that works for you in October.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-2 mb-4 bg-white/70 py-2.5 rounded-2xl border border-rose-100 shadow-2xs">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            aria-label="Previous month"
            className={`p-1.5 rounded-xl transition-colors ${
              canGoPrev
                ? "hover:bg-rose-50 text-gray-600 hover:text-rose-600 cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-gray-800 text-base">
            {monthName} {year}
          </span>
          <button
            onClick={nextMonth}
            disabled={!canGoNext}
            aria-label="Next month"
            className={`p-1.5 rounded-xl transition-colors ${
              canGoNext
                ? "hover:bg-rose-50 text-gray-600 hover:text-rose-600 cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 mb-2">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center mb-6">
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`spacer-${i}`} className="h-9 sm:h-10" />
          ))}

          {calendarDays.map((day) => {
            const isDisabled = day.isPast || day.isFutureOut;

            return (
              <button
                key={day.isoDate}
                type="button"
                disabled={isDisabled}
                onClick={() => onSelectDate(day.isoDate)}
                className={`h-9 sm:h-10 rounded-xl text-sm font-semibold flex flex-col items-center justify-center relative transition-all duration-200 ${
                  day.isSelected
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105"
                    : isDisabled
                    ? "text-gray-300 bg-transparent cursor-not-allowed opacity-40"
                    : "text-gray-700 hover:bg-rose-100 hover:text-rose-700 bg-white/50 border border-gray-100/60 cursor-pointer"
                }`}
              >
                <span>{day.dayNumber}</span>
                {day.isToday && !day.isSelected && (
                  <span className="w-1 h-1 rounded-full bg-rose-500 absolute bottom-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selection feedback badge */}
        <div className="min-h-[44px] flex items-center justify-center mb-5">
          {formattedSelected ? (
            <div className="flex items-center gap-2 text-rose-700 bg-rose-50/80 px-4 py-2 rounded-xl border border-rose-200 text-sm font-semibold">
              <CalendarIcon className="w-4 h-4 text-rose-500" />
              <span>Selected: {formattedSelected}</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400 italic">
              Tap a date on the calendar above
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
            disabled={!selectedDate}
            onClick={onNext}
            id="date-next-button"
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              selectedDate
                ? "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-500/20"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <span>Continue to The Vibe</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
