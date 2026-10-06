"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Camera, Heart, ArrowRight, Sparkles } from "lucide-react";

interface SelfieMomentProps {
  onNext: () => void;
}

export function SelfieMoment({ onNext }: SelfieMomentProps) {
  const [photoTaken, setPhotoTaken] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [imgSrc, setImgSrc] = useState("/memories/dharwar/selfie.jpg");

  const takePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setPhotoTaken(true);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Badge */}
      <span className="text-xs uppercase font-mono tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
        Scene 6 • The Selfie
      </span>

      {/* Screen flash effect */}
      {isFlashing && (
        <div className="fixed inset-0 bg-white z-50 pointer-events-none transition-opacity duration-300" />
      )}

      {/* Camera Viewfinder / Polaroid Frame */}
      <div className="w-full max-w-sm rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-5 shadow-2xl relative overflow-hidden flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!photoTaken ? (
            <motion.div
              key="viewfinder"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="w-full py-8 flex flex-col items-center space-y-6"
            >
              {/* Viewfinder frame */}
              <div className="w-64 h-64 rounded-2xl border-2 border-dashed border-rose-400/50 flex flex-col items-center justify-center relative bg-black/40 p-4">
                {/* Viewfinder corner brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rose-400" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-rose-400" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-rose-400" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rose-400" />

                <Camera className="w-12 h-12 text-rose-400/80 mb-2 animate-bounce" />
                <p className="text-sm font-mono text-slate-300 tracking-wider">
                  Say cheese... 📸
                </p>
                <p className="text-xs text-rose-300/70 mt-1">
                  Ready to capture the moment
                </p>
              </div>

              <p className="text-xs text-slate-400 italic">
                Tap the shutter button below to take the selfie.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="polaroid"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center space-y-4"
            >
              {/* Polaroid-style photo container */}
              <div className="w-full max-w-xs bg-white text-slate-900 rounded-2xl p-3 pb-5 shadow-2xl space-y-3 transform hover:rotate-1 transition-transform">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                  <Image
                    src={imgSrc}
                    alt="Dharwar selfie memory"
                    fill
                    className="object-cover"
                    priority
                    onError={() => {
                      // Fallback to .jpeg if .jpg didn't load
                      if (!imgSrc.endsWith(".jpeg")) {
                        setImgSrc("/memories/dharwar/selfie.jpeg");
                      }
                    }}
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-rose-400" />
                    <span>Dharwar</span>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <p className="font-serif font-bold text-sm text-slate-800 flex items-center justify-center gap-1.5">
                    <span>Proof that it actually happened.</span>
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                    Memories that will never fade
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Button controls */}
      {!photoTaken ? (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={takePhoto}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Camera className="w-5 h-5" />
          <span>Snap Selfie 📸</span>
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full max-w-sm py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>After dinner</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
