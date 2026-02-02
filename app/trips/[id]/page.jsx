"use client";
import { trips } from '@/data/db'; // ✅ DIRECT IMPORT (Reliable)
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, PlayCircle, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import React from 'react';

export default function TripDetail({ params }) {

  const {id} = React.use(params);
  // 1. FIND THE TRIP INSTANTLY
  // decodeURIComponent fixes issues if URL has spaces (e.g., "Sikkim%20Trip")
  const trip = trips.find((t) => t.id === decodeURIComponent(id));

  // 2. ERROR STATE (If ID is wrong)
  if (!trip) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="bg-red-50 p-6 rounded-full mb-6 animate-pulse">
            <AlertTriangle className="text-red-500" size={64} />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-2">Trip Not Found</h1>
        <p className="text-gray-500 max-w-md mb-8">
            We checked the records but could not find ID: <span className="font-mono text-red-500 bg-red-50 px-2 py-1 rounded">{params.id}</span>
        </p>
        <Link href="/">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition-all flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl hover:-translate-y-1">
                <ArrowLeft size={18} /> Back to Home
            </button>
        </Link>
      </div>
    );
  }

  // 3. SUCCESS STATE (Render Page)
  return (
    <main className="bg-white min-h-screen pb-20">
      
      {/* --- HERO COVER --- */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <motion.div 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 1.5 }}
           className="absolute inset-0"
        >
            <Image 
              src={trip.coverImage || trip.thumbnail} 
              alt={trip.title}
              fill
              className="object-cover"
              priority // Loads instantly
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40" />
        </motion.div>

        {/* Back Button */}
        <Link href="/" className="absolute top-24 left-6 z-20">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/20 backdrop-blur-md border border-white/40 text-white p-3 rounded-full hover:bg-white hover:text-black transition-all shadow-lg"
          >
            <ArrowLeft size={24} />
          </motion.button>
        </Link>

        {/* Title Block */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="max-w-5xl mx-auto"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-2 drop-shadow-sm">
                   {trip.title}
                </h1>
                
                <div className="flex flex-wrap gap-3 mt-4">
                    <span className="px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border border-white/50">
                        <Calendar size={14} className="text-purple-600"/> {trip.date}
                    </span>
                    <span className="px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2 border border-white/50">
                        <MapPin size={14} className="text-pink-600"/> {trip.location}
                    </span>
                </div>
            </motion.div>
        </div>
      </div>

      {/* --- STORY SECTION --- */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-6">
            <div className="hidden md:block w-1 h-24 bg-gradient-to-b from-purple-500 to-transparent rounded-full" />
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">The Experience</h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
                    {trip.description}
                </p>
            </div>
        </div>
      </div>

      {/* --- CINEMA MODE (Multiple Videos) --- */}
      {trip.videos && trip.videos.length > 0 && (
        <section className="bg-gray-900 py-20 my-10 text-white relative overflow-hidden">
             {/* Background glow */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="max-w-7xl mx-auto px-6 relative z-10">
                 <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-6">
                     <div className="p-3 bg-red-500/20 rounded-full text-red-500">
                        <PlayCircle size={32} />
                     </div>
                     <div>
                        <h2 className="text-3xl font-bold">Cinema Mode</h2>
                        <p className="text-gray-400 text-sm">Watch the highlights</p>
                     </div>
                 </div>

                 {/* Video Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {trip.videos.map((videoUrl, index) => (
                     <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-700 hover:border-red-500/50 transition-colors group"
                     >
                         <iframe 
                           src={videoUrl} 
                           title={`Trip Video ${index + 1}`}
                           className="absolute inset-0 w-full h-full"
                           allowFullScreen
                         ></iframe>
                     </motion.div>
                   ))}
                 </div>
             </div>
        </section>
      )}

      {/* --- GALLERY MASONRY --- */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-12 justify-center">
            <ImageIcon className="text-purple-600" size={24} />
            <h2 className="text-3xl font-bold text-gray-900">Captured Moments</h2>
        </div>

        {trip.gallery && trip.gallery.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {trip.gallery.map((item, index) => {
                    const url = typeof item === 'string' ? item : item.url;
                    return (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-gray-100"
                    >
                        <Image 
                            src={url} 
                            alt={`Gallery ${index}`}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                    );
                })}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400">No photos added to the gallery yet.</p>
            </div>
        )}
      </section>

    </main>
  );
}