"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { ProgressIndicator } from "./ProgressIndicator";
import { Hero } from "./Hero";
import { MeetUpStory } from "./MeetUpStory";
import { DatePicker } from "./DatePicker";
import { ActivityPicker } from "./ActivityPicker";
import { BookingSummary } from "./BookingSummary";
import { SuccessScreen } from "./SuccessScreen";

interface MeetupAppProps {
  initialName?: string;
}

export function MeetupApp({ initialName = "Chinna" }: MeetupAppProps) {
  const [step, setStep] = useState<number>(0);
  const [name] = useState<string>(initialName);
  const [date, setDate] = useState<string>("");
  const [activities, setActivities] = useState<string[]>(["coffee"]);
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleActivity = (id: string) => {
    setActivities((prev) => {
      if (prev.includes(id)) {
        // Allow removing, but user can reselect
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          date,
          time: "TBD",
          activities,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok && !data.isDuplicate) {
        throw new Error(data.error || "Failed to confirm meet-up.");
      }

      // Move directly to Success Screen!
      setStep(5);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setStep(0);
    setDate("");
    setActivities(["coffee"]);
    setNotes("");
    setErrorMessage(null);
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between py-6 px-3 sm:px-6">
      <BackgroundDecorations />

      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col justify-center relative z-10">
        {/* Step Progress Bar (shown during steps 1 to 4) */}
        {step >= 1 && step <= 4 && (
          <ProgressIndicator
            currentStep={step}
            totalSteps={4}
            onStepClick={(targetStep) => setStep(targetStep)}
          />
        )}

        {/* Dynamic Story Stage Transitions */}
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Hero key="hero" name={name} onStart={() => setStep(1)} />
          )}

          {step === 1 && (
            <MeetUpStory key="story" onContinue={() => setStep(2)} />
          )}

          {step === 2 && (
            <DatePicker
              key="datepicker"
              selectedDate={date}
              onSelectDate={(newDate) => setDate(newDate)}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <ActivityPicker
              key="activitypicker"
              selectedActivities={activities}
              notes={notes}
              onToggleActivity={toggleActivity}
              onChangeNotes={(newNotes) => setNotes(newNotes)}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <BookingSummary
              key="summary"
              name={name}
              date={date}
              activities={activities}
              notes={notes}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              onConfirm={handleConfirmBooking}
              onChangeDate={() => setStep(2)}
              onChangeActivity={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <SuccessScreen
              key="success"
              name={name}
              date={date}
              activities={activities}
              notes={notes}
              onReset={resetAll}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Gentle Footer */}
      <footer className="text-center text-[11px] text-gray-400 py-3 relative z-10">
        Made with ❤️ specifically for {name}
      </footer>
    </main>
  );
}
