"use client";

import React from "react";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const STEP_LABELS = ["The Story", "Date", "The Vibe", "Confirm"];

export function ProgressIndicator({
  currentStep,
  totalSteps,
  onStepClick,
}: ProgressIndicatorProps) {
  if (currentStep === 0 || currentStep > totalSteps) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4 py-3 mb-6">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-rose-200/60 rounded-full z-0" />
        {/* Active track line */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full z-0 transition-all duration-500 ease-out"
          style={{
            width: `${((Math.min(currentStep, totalSteps) - 1) / (totalSteps - 1)) * 90}%`,
          }}
        />

        {STEP_LABELS.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={label}
              className="flex flex-col items-center relative z-10"
              onClick={() => {
                if (isCompleted && onStepClick) {
                  onStepClick(stepNum);
                }
              }}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? "bg-rose-500 text-white cursor-pointer hover:bg-rose-600 scale-95"
                    : isCurrent
                    ? "bg-white text-rose-600 border-2 border-rose-500 shadow-md scale-110"
                    : "bg-rose-100 text-rose-300 border border-rose-200"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : stepNum}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium transition-colors ${
                  isCurrent
                    ? "text-rose-600 font-bold"
                    : isCompleted
                    ? "text-rose-400"
                    : "text-rose-300/80"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
