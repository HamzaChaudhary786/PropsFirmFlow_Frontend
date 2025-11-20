"use client";


import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function DiamondRingAnimation() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  /* ---------- DIAMOND ---------- */
  const diamondY       = useTransform(smoothProgress, [0, 0.3, 0.7, 0.9], [-300, -300, -2, -2]);
  const diamondRotate  = useTransform(smoothProgress, [0, 0.5, 0.9], [0, 180, 720]);
  // final scale 0.75 → diamond fills the 6-prong setting (completes at 0.9, before fade starts)
  const diamondScale   = useTransform(smoothProgress, [0, 0.5, 0.8, 0.9], [1.2, 1.2, 0.75, 0.75]);
  // Keep diamond fully visible until it's fitted, then fade with everything else
  const diamondOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 0.92, 1], [0.6, 1, 1, 1, 0]);

  /* ---------- RING ---------- */
  const ringScale = useTransform(smoothProgress, [0, 0.3, 0.7, 0.9], [0.8, 0.9, 1.05, 1]);
  const ringGlow  = useTransform(smoothProgress, [0, 0.5, 0.85, 0.9], [0, 0, 0.8, 1]);
  
  /* ---------- FADE OUT AT END ---------- */
  // Wait for diamond to fully fit (completes at 0.9), then fade everything from 0.92-1.0
  const containerOpacity = useTransform(smoothProgress, [0.92, 1], [1, 0]);
  const bgOpacity = useTransform(smoothProgress, [0.92, 1], [1, 0]);
  const particlesOpacity = useTransform(smoothProgress, [0.92, 1], [1, 0]);

  /* ---------- PARTICLES ---------- */
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-black overflow-hidden pointer-events-none">

      {/* Gradient BG */}
      <motion.div 
        className="fixed inset-0 bg-linear-to-br from-slate-950 via-purple-950 to-slate-950"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      </motion.div>

      {/* Floating particles */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: particlesOpacity }}
      >
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size }}
            animate={{ y:[0,-30,0], opacity:[0.2,0.5,0.2], scale:[1,1.2,1] }}
            transition={{ duration:p.duration, repeat:Infinity, delay:p.delay, ease:"easeInOut" }}
          />
        ))}
      </motion.div>

      {/* Main animation */}
      <motion.div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{ opacity: containerOpacity }}
      >
        <div className="relative w-96 h-96">   {/* 384 px container – ring & diamond share the same size */}

          {/* ---------- RING ---------- */}
          <motion.div className="absolute inset-0 flex items-center justify-center" style={{ scale: ringScale }}>
            {/* glow */}
            <motion.div className="absolute inset-0 flex items-center justify-center" style={{ opacity: ringGlow }}>
              <div className="w-80 h-80 rounded-full bg-yellow-400/30 blur-3xl" />
            </motion.div>

            {/* ring SVG (384 px) */}
            <svg width="384" height="384" viewBox="0 0 400 400" className="relative z-10">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE17B" />
                  <stop offset="25%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#FFED4E" />
                  <stop offset="75%" stopColor="#FDB931" />
                  <stop offset="100%" stopColor="#FFE17B" />
                </linearGradient>
                <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="goldShine">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                </radialGradient>
                <filter id="ringGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <ellipse cx="200" cy="205" rx="72" ry="72" fill="black" opacity="0.3" filter="url(#ringGlow)" />
              <circle cx="200" cy="200" r="70" fill="none" stroke="url(#goldGradient)" strokeWidth="24" filter="url(#ringGlow)" />
              <circle cx="200" cy="200" r="70" fill="none" stroke="#B8860B" strokeWidth="2" opacity="0.4" />
              <circle cx="200" cy="200" r="81" fill="none" stroke="url(#goldHighlight)" strokeWidth="2" opacity="0.6" />
              <circle cx="160" cy="180" r="8" fill="url(#goldShine)" opacity="0.8" />
              <circle cx="240" cy="180" r="6" fill="url(#goldShine)" opacity="0.6" />

              {/* setting */}
              <g transform="translate(200,200)">
                <ellipse cx="0" cy="0" rx="35" ry="12" fill="url(#goldGradient)" filter="url(#ringGlow)" />
                <ellipse cx="0" cy="-2" rx="35" ry="10" fill="url(#goldHighlight)" opacity="0.4" />
              </g>

              {/* 6 prongs */}
              {[0,60,120,180,240,300].map((a,i)=>{
                const x = 200 + Math.cos((a-90)*Math.PI/180)*28;
                const y = 200 + Math.sin((a-90)*Math.PI/180)*28;
                return (
                  <g key={i} transform={`translate(${x},${y})`}>
                    <path d="M-3,0 L-2,-20 L0,-22 L2,-20 L3,0 Z"
                          fill="url(#goldGradient)" stroke="#DAA520" strokeWidth="0.5" filter="url(#ringGlow)" />
                    <path d="M-2,-2 L-1,-18 L1,-18 L2,-2 Z"
                          fill="url(#goldHighlight)" opacity="0.6" />
                  </g>
                );
              })}
            </svg>
          </motion.div>

          {/* ---------- DIAMOND ---------- */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              y: diamondY,
              rotate: diamondRotate,
              scale: diamondScale,
              opacity: diamondOpacity,
            }}
          >
            {/* 270 px → matches the inner diameter of the prong setting (≈ 0.75 × 384) */}
            <svg width="270" height="270" viewBox="0 0 180 180" className="relative z-20">
              <defs>
                <linearGradient id="diamondMain" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E8F5FF" />
                  <stop offset="25%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#C5E3FF" />
                  <stop offset="75%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#B8DBFF" />
                </linearGradient>

                <linearGradient id="diamondBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B3D9FF" />
                  <stop offset="50%" stopColor="#8EC5FC" />
                  <stop offset="100%" stopColor="#7AB8FF" />
                </linearGradient>

                <radialGradient id="diamondSparkle">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8EC5FC" stopOpacity="0.3" />
                </radialGradient>

                <filter id="diamondGlow">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Diamond glow */}
              <polygon points="90,30 50,75 90,75" fill="#FFFFFF" opacity="0.3" filter="url(#diamondGlow)" />

              {/* ---- ALL FACETS (copy-paste from your original) ---- */}
              <polygon points="90,30 70,60 90,60" fill="url(#diamondSparkle)" stroke="#B3E5FC" strokeWidth="0.5" opacity="0.95" />
              <polygon points="90,30 90,60 110,60" fill="url(#diamondMain)" stroke="#B3E5FC" strokeWidth="0.5" opacity="0.98" />
              <polygon points="90,30 60,60 70,60" fill="#D4EBFF" stroke="#90CAF9" strokeWidth="0.5" opacity="0.9" />
              <polygon points="90,30 110,60 120,60" fill="#E8F5FF" stroke="#90CAF9" strokeWidth="0.5" opacity="0.92" />
              <polygon points="90,30 50,60 60,60" fill="#C1E0FF" stroke="#90CAF9" strokeWidth="0.5" opacity="0.85" />
              <polygon points="90,30 120,60 130,60" fill="#B8D8FF" stroke="#90CAF9" strokeWidth="0.5" opacity="0.88" />

              {/* Upper girdle */}
              <polygon points="50,60 60,60 90,90" fill="#A3D5F7" stroke="#64B5F6" strokeWidth="0.5" opacity="0.9" />
              <polygon points="60,60 70,60 90,90" fill="url(#diamondBlue)" stroke="#64B5F6" strokeWidth="0.5" />
              <polygon points="70,60 90,60 90,90" fill="url(#diamondSparkle)" stroke="#64B5F6" strokeWidth="0.5" />
              <polygon points="90,60 110,60 90,90" fill="url(#diamondMain)" stroke="#64B5F6" strokeWidth="0.5" />
              <polygon points="110,60 120,60 90,90" fill="#C8E6FC" stroke="#64B5F6" strokeWidth="0.5" opacity="0.95" />
              <polygon points="120,60 130,60 90,90" fill="#9FCDEE" stroke="#64B5F6" strokeWidth="0.5" opacity="0.9" />

              {/* Lower girdle */}
              <polygon points="50,60 90,90 90,140" fill="#7EBDF5" stroke="#42A5F5" strokeWidth="0.5" opacity="0.85" />
              <polygon points="60,60 90,90 90,140" fill="#95CDFA" stroke="#42A5F5" strokeWidth="0.5" opacity="0.9" />
              <polygon points="70,60 90,90 90,140" fill="url(#diamondBlue)" stroke="#42A5F5" strokeWidth="0.5" />
              <polygon points="110,60 90,90 90,140" fill="#B3DAFF" stroke="#42A5F5" strokeWidth="0.5" opacity="0.92" />
              <polygon points="120,60 90,90 90,140" fill="#8BC4F7" stroke="#42A5F5" strokeWidth="0.5" opacity="0.88" />
              <polygon points="130,60 90,90 90,140" fill="#73B5E8" stroke="#42A5F5" strokeWidth="0.5" opacity="0.85" />

              {/* Pavilion */}
              <polygon points="90,90 70,60 90,140" fill="url(#diamondSparkle)" stroke="#42A5F5" strokeWidth="0.5" />
              <polygon points="90,90 110,60 90,140" fill="url(#diamondMain)" stroke="#42A5F5" strokeWidth="0.5" />

              {/* Sparkles */}
              <circle cx="80" cy="50" r="3" fill="#FFFFFF" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="45" r="2.5" fill="#FFFFFF" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="90" cy="75" r="2" fill="#FFFFFF" opacity="0.7">
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="65" r="1.5" fill="#FFFFFF" opacity="0.6">
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Light rays */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: useTransform(smoothProgress, [0.8, 1], [0, 1]) }}
            >
              {[0,45,90,135,180,225,270,315].map(a=>(
                <div
                  key={a}
                  className="absolute w-1 h-32 bg-linear-to-t from-transparent via-white/40 to-transparent"
                  style={{ transform:`rotate(${a}deg)`, transformOrigin:'center' }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- CONTENT SECTIONS ---------- */}
      <div className="relative z-20 pointer-events-none">
        {/* Section 1 */}
        <div className="h-screen flex items-center justify-center">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:0.5 }} className="text-center">
            <h1 className="text-5xl lg:text-6xl font-light tracking-wider mb-6 text-white">ELEGANCE</h1>
            <div className="h-px w-32 bg-linear-to-r from-transparent via-white/50 to-transparent mx-auto mb-6" />
            <p className="text-xl text-white/70 font-light tracking-wide">Scroll to reveal perfection</p>
          </motion.div>
        </div>

        {/* Section 2 */}
        <div className="h-screen flex items-center justify-center">
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:1.5 }} className="text-center">
            <h2 className="text-5xl lg:text-6xl font-light text-white/90 tracking-widest mb-4">TIMELESS</h2>
            <p className="text-lg text-white/60 font-light">The journey continues...</p>
          </motion.div>
        </div>

        {/* Section 3 */}
        <div className="h-screen flex items-center justify-center">
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ duration:1.5 }} className="text-center">
            <h2 className="text-5xl lg:text-6xl font-light text-white/90 tracking-widest mb-4">RADIANCE</h2>
            <p className="text-lg text-white/60 font-light">Almost there...</p>
          </motion.div>
        </div>

        {/* Section 4 */}
        <div className="h-screen flex items-center justify-center mt-20">
          <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:1.5 }} className="text-center">
            <h2 className="text-5xl lg:text-6xl font-light text-white tracking-widest mb-6">ETERNAL</h2>
            <div className="h-px w-48 bg-linear-to-r from-transparent via-yellow-400/50 to-transparent mx-auto mb-6" />
            <p className="text-xl text-white/70 font-light">A perfect union</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-30"
        style={{ opacity: useTransform(smoothProgress, [0,0.2], [1,0]) }}
      >
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity, ease:"easeInOut" }} className="flex flex-col items-center gap-2">
          <div className="text-white/40 text-sm font-light tracking-widest">SCROLL</div>
          <div className="w-px h-16 bg-linear-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white/10 pointer-events-none"
        style={{ opacity: containerOpacity }}
      >
        <motion.div
          className="h-full bg-linear-to-r from-purple-400 via-yellow-400 to-pink-400"
          style={{ scaleX: smoothProgress, transformOrigin:"0%" }}
        />
      </motion.div>
    </div>
  );
}