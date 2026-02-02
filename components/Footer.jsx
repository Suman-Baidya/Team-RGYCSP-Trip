"use client";
import Link from 'next/link';
import { Heart, ArrowUp, Instagram, Facebook, Youtube, MapPin, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export default function Footer() {
  const { general, navigation } = siteConfig;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 bg-black text-white py-12 border-t border-pink-900/30">
      
      {/* --- ROYAL BACKGROUND GRADIENT --- */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-red-950 to-pink-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- MAIN 3-COLUMN LAYOUT --- */}
        <div className="flex flex-col justify-between md:flex-row mb-12">
          
          {/* COLUMN 1: LEFT (Brand) */}
          <div className="flex flex-col items-start text-left mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="p-2 bg-pink-900/20 border border-pink-500/30 rounded-lg group-hover:bg-pink-600 transition-colors duration-300">
                 <Heart className="text-pink-500 fill-pink-500 group-hover:text-white group-hover:fill-white" size={20} />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                {general.appName}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              &quot;Real Group of Young Colleagues Supporting Positivity&quot; <br/>
              The official digital archive for Team RGYCSP. Creating memories that last forever.
            </p>
          </div>

          {/* COLUMN 2: CENTER (Navigation) */}
          <div className="flex flex-col items-start text-start mb-8 md:mb-0">
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500 mb-6">
               Quick Links
             </h3>
             <ul className="space-y-3">
               {navigation.map((item, index) => (
                 <li key={index}>
                   <Link 
                     href={item.path} 
                     className="text-gray-300 hover:text-white hover:underline decoration-pink-500 underline-offset-4 transition-all"
                   >
                     {item.title}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>

          {/* COLUMN 3: RIGHT (Social & Connect) */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
             <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500 mb-6">
               Connect
             </h3>
             
             {/* Social Icons */}
             <div className="flex gap-3 mb-6">
                <a href="#" className="p-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-500 transition-colors">
                    <Instagram size={18} />
                </a>
                <a href="#" className="p-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-colors">
                    <Facebook size={18} />
                </a>
                <a href="#" className="p-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-500 transition-colors">
                    <Youtube size={18} />
                </a>
             </div>

             {/* Details */}
             <div className="space-y-2">
                <div className="flex items-center md:justify-start gap-2 text-sm text-gray-400">
                   
                   <MapPin size={14} className="text-pink-500" />
                   <span>West Bengal, India</span>
                </div>
                <div className="flex items-center md:justify-end gap-2 text-sm text-gray-400">
                   
                   <Mail size={14} className="text-pink-500" />
                   <span>contact@rgycsp.com</span>
                </div>
             </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          
          <div className="flex flex-col md:flex-row items-center gap-2 text-gray-500">
             <p>© {new Date().getFullYear()} TEAM RGYCSP. All rights reserved.</p>
             <span className="hidden md:inline text-gray-700">|</span>
             <p>
               Designed by <span className="text-pink-500 font-bold hover:text-white cursor-pointer transition-colors">Suman Baidya</span>
             </p>
          </div>
          
          {/* IMPROVED BACK TO TOP BUTTON */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-full text-sm font-bold text-gray-400 hover:text-white hover:bg-linear-to-r hover:from-pink-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 shadow-lg"
          >
            <span className="group-hover:-translate-y-0.5 transition-transform duration-300">Back to Top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>

        </div>

      </div>
    </footer>
  );
}