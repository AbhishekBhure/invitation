"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

interface FinalRevealProps {
  onNext: () => void;
}

export function FinalReveal({ onNext }: FinalRevealProps) {
  // 0: Emotional summary sequence
  // 1: Photo reveal transition ("And after everything... there's one thing left.")
  // 2: The actual final photograph
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [summaryStep, setSummaryStep] = useState(0);
  const [imgSrc, setImgSrc] = useState("/memories/dharwar/final-photo.jpg");

  useEffect(() => {
    if (stage === 0) {
      if (summaryStep < 4) {
        const timer = setTimeout(() => {
          setSummaryStep((prev) => prev + 1);
        }, 900);
        return () => clearTimeout(timer);
      }
    }
  }, [stage, summaryStep]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 16 & 17 • The Climax
      </span>

      {/* Main Container */}
      <div className="w-full max-w-sm rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        {/* Ambient subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
        </div>

        <AnimatePresence mode="wait">
          {stage === 0 && (
            /* STAGE 0: EMOTIONAL SUMMARY */
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 space-y-5 flex flex-col items-center"
            >
              <div className="space-y-2 text-sm font-mono text-slate-400">
                {summaryStep >= 1 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="line-through decoration-rose-500/70"
                  >
                    After Goa...
                  </motion.p>
                )}
                {summaryStep >= 2 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="line-through decoration-rose-500/70"
                  >
                    After Bangalore...
                  </motion.p>
                )}
                {summaryStep >= 3 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="line-through decoration-rose-500/70"
                  >
                    After all those cancelled plans...
                  </motion.p>
                )}
              </div>

              {summaryStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 pt-3"
                >
                  <h3 className="text-2xl sm:text-3xl font-black text-rose-300">
                    Dharwar finally happened. ❤️
                  </h3>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 space-y-1 leading-relaxed">
                    <p>Not postponed.</p>
                    <p>Not rescheduled.</p>
                    <p>Not &ldquo;sometime soon.&rdquo;</p>
                    <p className="text-rose-400 font-bold pt-1">
                      It actually happened.
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {stage === 1 && (
            /* STAGE 1: TRANSITION BEFORE THE PHOTO */
            <motion.div
              key="anticipation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="py-12 space-y-4 flex flex-col items-center"
            >
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                And after everything...
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif italic text-rose-200">
                there&apos;s one thing left.
              </h3>
              <p className="text-xs font-mono tracking-wider text-rose-400 pt-2">
                The proof. ✨
              </p>
            </motion.div>
          )}

          {stage === 2 && (
            /* STAGE 2: THE FINAL REAL PHOTOGRAPH */
            <motion.div
              key="final-photo"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex flex-col items-center space-y-4 py-2"
            >
              <div className="w-full max-w-xs rounded-2xl overflow-hidden border-2 border-rose-500/40 shadow-[0_0_35px_rgba(244,63,94,0.25)] relative bg-slate-900 aspect-square">
                <Image
                  src={imgSrc}
                  alt="Dharwar final memory"
                  fill
                  className="object-cover"
                  priority
                  onError={() => {
                    if (!imgSrc.endsWith(".jpeg")) {
                      setImgSrc("/memories/dharwar/final-photo.jpeg");
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 inset-x-0 text-center">
                  <span className="text-[11px] font-mono tracking-widest text-white/90 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                    Dharwar • 2026
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-center">
                <h3 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                  <span>We finally made it.</span>
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500 animate-pulse" />
                </h3>
                <p className="text-xs font-mono text-rose-300/80">
                  A promise kept. A story etched forever.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button Controls */}
      {stage === 0 && summaryStep >= 4 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStage(1)}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>See the proof ✨</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}

      {stage === 1 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStage(2)}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>Reveal photograph 📸</span>
          <Sparkles className="w-4 h-4 text-rose-300" />
        </motion.button>
      )}

      {stage === 2 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>The journey continues</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
