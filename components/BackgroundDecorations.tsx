"use client";

import React from "react";

export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Warm Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl" />

      {/* Floating subtle icons */}
      <div className="absolute top-20 right-[15%] text-2xl opacity-20 animate-float">
        ✨
      </div>
      <div className="absolute top-[45%] left-[10%] text-xl opacity-20 animate-float-delayed">
        🌸
      </div>
      <div className="absolute bottom-[20%] right-[12%] text-2xl opacity-20 animate-float">
        💌
      </div>
      <div className="absolute top-[75%] left-[15%] text-xl opacity-20 animate-float-delayed">
        💫
      </div>
    </div>
  );
}
