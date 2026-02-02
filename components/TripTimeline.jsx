"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { trips } from '@/data/db'; // Your trip data
import { Calendar, MapPin, ArrowRight, ArrowUpDown } from 'lucide-react';

export default function TripTimeline() {
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

  // 1. SORTING LOGIC
  const sortedTrips = [...trips].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="trips" className="py-24 bg-white relative">
      
      {/* Background Line (Desktop Center / Mobile Left) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-purple-200 to-transparent md:-translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* 2. HEADER & SORT BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 pl-12 md:pl-0">
          <div className="text-left md:text-center w-full">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Journey</span>
            </h2>
            <p className="text-gray-500 mb-6">From 2024 to Forever.</p>
            
            {/* The Sort Button */}
            <button 
              onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-purple-400 transition-all text-sm font-bold text-gray-700"
            >
              <ArrowUpDown size={16} />
              Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </button>
          </div>
        </div>

        {/* 3. THE TIMELINE ITEMS */}
        <div className="space-y-12 relative">
          <AnimatePresence mode='wait'>
            {sortedTrips.map((trip, index) => {
              // Determine Layout: Left or Right side (Desktop only)
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={trip.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* SIDE A: The Content Card */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0">
                    <Link href={`/trips/${trip.id}`}>
                      <div className={`group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isEven ? "md:text-left" : "md:text-right"
                      }`}>
                        
                        {/* Hover Gradient Border */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-100 transition-colors pointer-events-none" />

                        {/* Image Thumbnail */}
                        <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                          <Image 
                            src={trip.thumbnail || trip.coverImage} 
                            alt={trip.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>

                        {/* Text Content */}
                        <div className="relative">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full mb-2">
                             <Calendar size={10} className="inline mr-1"/> {trip.date}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                            {trip.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                            {trip.description}
                          </p>
                          
                          <div className={`flex items-center gap-1 text-sm font-bold text-gray-900 ${
                             isEven ? "md:justify-start" : "md:justify-end"
                          }`}>
                            See Memories <ArrowRight size={16} className="text-purple-500 group-hover:translate-x-1 transition-transform"/>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>

                  {/* CENTER: The Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 bg-white border-4 border-purple-500 rounded-full shadow-[0_0_0_4px_rgba(168,85,247,0.2)] z-10" />
                  </div>

                  {/* SIDE B: Empty Space (for balance on desktop) */}
                  <div className="hidden md:block w-1/2" />

                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}