"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { siteConfig } from '@/data/site-config';

export default function Navbar() {
  const { general, navigation } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Switch to "Active Mode" shadow when scrolling
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20 && !scrolled) setScrolled(true);
    if (latest <= 20 && scrolled) setScrolled(false);
  });

  // Animation Variants
  const menuVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
    open: { 
      x: "0%", 
      transition: { type: "spring", stiffness: 200, damping: 30, staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled || isOpen 
            ? "bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm py-2" // Scrolled: Glass White
            : "bg-transparent py-4" // Top: Transparent
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* --- LOGO SECTION --- */}
            <Link href="/" className="relative z-50 flex items-center gap-3 group max-w-[75%]">
              {/* Icon */}
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="bg-linear-to-br from-pink-500 to-rose-600 p-2 rounded-xl text-white shadow-lg shadow-pink-500/30"
              >
                <Heart className="fill-white" size={24} />
              </motion.div>
              
              {/* Text Stack */}
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-purple-800 to-pink-600">
                  TEAM RGYCSP
                </span>
                <span className="text-[9px] md:text-[10px] font-semibold text-gray-500 tracking-wider mt-1 leading-tight group-hover:text-pink-600 transition-colors">
                  Real Group of Young Colleagues Supporting Positivity
                </span>
              </div>
            </Link>
            
            {/* --- DESKTOP MENU --- */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <Link key={index} href={item.path} className="relative group text-sm font-bold text-gray-600 hover:text-black transition-colors">
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-purple-500 to-pink-500 transition-all group-hover:w-full duration-300" />
                </Link>
              ))}
              <Link href="/fun-moments">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
              >
                Fun Moments
              </motion.button>
              </Link>
            </div>

            {/* --- MOBILE HAMBURGER BUTTON --- */}
            <div className="md:hidden relative z-50">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-800 focus:outline-none bg-white/50 rounded-lg">
                 <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
                   {isOpen ? <X size={28} /> : <Menu size={28} />}
                 </motion.div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN MENU (WHITE THEME) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl md:hidden flex flex-col justify-center px-8"
          >
            {/* Background Blobs for Atmosphere */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-pink-300/30 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/30 rounded-full blur-[80px] -z-10" />

            <div className="flex flex-col space-y-6">
              {navigation.map((item, index) => (
                <motion.div key={index} variants={linkVariants}>
                  <Link 
                    href={item.path}
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center justify-between text-2xl font-bold text-gray-800 hover:text-purple-600 transition-colors"
                  >
                    {item.title}
                    <ChevronRight size={20} className="text-gray-300" />
                  </Link>
                  <div className="h-1px w-full bg-gray-100 mt-4" />
                </motion.div>
              ))}
            </div>

            <motion.div variants={linkVariants} className="mt-10">
              <Link 
                href="/fun-moments"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-linear-to-r from-blue-600 to-purple-600 text-white  font-bold py-4 rounded-xl shadow-lg shadow-green-400/30 active:scale-95 transition-transform"
              >
                Fun Moments
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="mt-10">
              <a 
                href={general.whatsappLink}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-400/30 active:scale-95 transition-transform"
              >
                Open WhatsApp Group
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}