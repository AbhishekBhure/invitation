"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MemoryScene } from "./MemoryScene";
import { JourneyIntro } from "./JourneyIntro";
import { JourneyRoute } from "./JourneyRoute";
import { PlotTwists } from "./PlotTwists";
import { MeetingReveal } from "./MeetingReveal";
import { WalkingMoment } from "./WalkingMoment";
import { GufaExperience } from "./GufaExperience";
import { SelfieMoment } from "./SelfieMoment";
import { WalkBackMoment } from "./WalkBackMoment";
import { HandHoldingMoment } from "./HandHoldingMoment";
import { BusStopMoment } from "./BusStopMoment";
import { GoodbyeMoment } from "./GoodbyeMoment";
import { ChocolateMoment } from "./ChocolateMoment";
import { BusChaseMoment } from "./BusChaseMoment";
import { ChocolateHandoff } from "./ChocolateHandoff";
import { BusAudience } from "./BusAudience";
import { FinalReveal } from "./FinalReveal";
import { NextAdventure } from "./NextAdventure";

interface DharwarMemoryProps {
  onExit: () => void;
  onPlanNext: () => void;
}

const SCENE_TITLES = [
  "Prologue", // 0
  "The Journey", // 1
  "Plot Twists", // 2
  "The Meeting", // 3
  "The Walk", // 4
  "Gufha", // 5
  "The Selfie", // 6
  "Walking Back", // 7
  "Hand in Hand", // 8
  "The Bus Stop", // 9
  "Goodbye", // 10
  "Wait! Chocolate", // 11
  "The Chase", // 12
  "The Handoff", // 13
  "The Audience", // 14
  "The Proof", // 15
  "Full Circle", // 16
];

export function DharwarMemory({ onExit, onPlanNext }: DharwarMemoryProps) {
  const [scene, setScene] = useState<number>(0);
  const totalScenes = SCENE_TITLES.length;

  const handleNext = () => {
    setScene((prev) => Math.min(totalScenes - 1, prev + 1));
  };

  return (
    <MemoryScene
      currentScene={scene}
      totalScenes={totalScenes}
      sceneTitle={SCENE_TITLES[scene]}
      onBackToCaseHistory={onExit}
    >
      <AnimatePresence mode="wait">
        {scene === 0 && <JourneyIntro key="scene-0" onNext={handleNext} />}
        {scene === 1 && <JourneyRoute key="scene-1" onNext={handleNext} />}
        {scene === 2 && <PlotTwists key="scene-2" onNext={handleNext} />}
        {scene === 3 && <MeetingReveal key="scene-3" onNext={handleNext} />}
        {scene === 4 && <WalkingMoment key="scene-4" onNext={handleNext} />}
        {scene === 5 && <GufaExperience key="scene-5" onNext={handleNext} />}
        {scene === 6 && <SelfieMoment key="scene-6" onNext={handleNext} />}
        {scene === 7 && <WalkBackMoment key="scene-7" onNext={handleNext} />}
        {scene === 8 && <HandHoldingMoment key="scene-8" onNext={handleNext} />}
        {scene === 9 && <BusStopMoment key="scene-9" onNext={handleNext} />}
        {scene === 10 && <GoodbyeMoment key="scene-10" onNext={handleNext} />}
        {scene === 11 && <ChocolateMoment key="scene-11" onNext={handleNext} />}
        {scene === 12 && <BusChaseMoment key="scene-12" onNext={handleNext} />}
        {scene === 13 && <ChocolateHandoff key="scene-13" onNext={handleNext} />}
        {scene === 14 && <BusAudience key="scene-14" onNext={handleNext} />}
        {scene === 15 && <FinalReveal key="scene-15" onNext={handleNext} />}
        {scene === 16 && (
          <NextAdventure
            key="scene-16"
            onBackToCaseHistory={onExit}
            onPlanNext={onPlanNext}
          />
        )}
      </AnimatePresence>
    </MemoryScene>
  );
}
