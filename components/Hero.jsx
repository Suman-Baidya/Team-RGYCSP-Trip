"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Image as ImageIcon, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export default function Hero() {
  const { hero } = siteConfig;
  const [currentImage, setCurrentImage] = useState(0);
  
  // --- 3D TILT SETUP ---
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

  function handleMouseMove(e) {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXVal = e.clientX - rect.left;
      const mouseYVal = e.clientY - rect.top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % hero.backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hero.backgroundImages.length]);

  // --- TYPING CONFIG ---
  const fullFormText = "Real Group of Young Colleagues Supporting Positivity";
  const letterDelay = 0.05;

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white" // Light Mode BG
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      
      {/* 1. BACKGROUND (Light Mode Style) */}
      {hero.backgroundImages.map((img, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: index === currentImage ? 1 : 0,
            scale: index === currentImage ? 1 : 1.1 
          }}
          transition={{ duration: 2.0 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={img} 
            alt="Hero Background" 
            fill
            priority={index === 0}
            className="object-cover object-center"
            quality={90}
          />
          {/* LIGHT MODE OVERLAY: White Frosted Glass instead of Black */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          {/* Gradient at bottom to blend with white page content */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-gradient-to-t from-white via-white/80 to-transparent" />
        </motion.div>
      ))}

      {/* 2. CONTENT */}
      <div className="relative z-20 px-4 w-full max-w-6xl mx-auto perspective-1000">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="text-center"
        >
          
          {/* BADGE */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 mb-8 shadow-sm"
          >
            <Sparkles size={16} className="text-pink-600" />
            <span className="text-xs font-bold text-gray-800 tracking-[0.2em] uppercase">
              Official Memory Archive
            </span>
          </motion.div>

          {/* TITLE (Darker Gradient for Light Mode) */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter"
          >
            <span className="bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-800 to-pink-600 drop-shadow-sm">
              {hero.title}
            </span>
          </motion.h1>

          {/* --- 🔥 TYPING EFFECT (Monospace Font + Glass Box) --- */}
          <div className="min-h-12 mb-8 flex items-center justify-center">
            <div className=" px-6 py-2 rounded-xl shadow-sm inline-block">
                <p className="text-xs md:text-sm font-mono font-bold text-indigo-900 uppercase tracking-[0.15em]">
                {fullFormText.split("").map((char, index) => (
                    <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                        duration: 0.1, 
                        delay: 0.5 + (index * letterDelay)
                    }}
                    >
                    {char}
                    </motion.span>
                ))}
                {/* Blinking Cursor (Dark Color) */}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-0.5 h-4 bg-indigo-900 ml-1 align-middle"
                />
                </p>
            </div>
          </div>

          {/* DESCRIPTION (Dark Gray) */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0 }} 
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            &quot;{hero.tagline}&quot;
          </motion.p>
          
          {/* BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Gradient Button */}
            <Link href="/#trips" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all"
              >
                Explore Trips <ArrowRight size={20} />
              </motion.button>
            </Link>

            {/* White/Glass Button */}
            <Link href="/gallery" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/60 backdrop-blur-xl border border-white/60 text-gray-900 px-10 py-5 rounded-full font-bold text-lg hover:border-purple-300 transition-all shadow-lg"
              >
                View Gallery <ImageIcon size={20} />
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>
      </div>

      {/* SCROLL HINT */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <div className="w-0.5 h-12 bg-linear-gradient-to-b from-gray-800 to-transparent mx-auto mb-2" />
        <span className="text-[10px] uppercase tracking-widest text-gray-800 font-bold">Scroll</span>
      </motion.div>

    </section>
  );
}