"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { trips } from "@/data/db";
import { motion, AnimatePresence } from "framer-motion";

export default function SimpleGallery() {
  const [filter, setFilter] = useState("All");

  /* ---------- DATA PROCESSING ---------- */
  const allImages = useMemo(() => {
    return trips.flatMap((trip) =>
      trip.gallery.map((img, idx) => ({
        id: `${trip.id}-${idx}`,
        url: typeof img === "string" ? img : img.url,
        category: trip.title, 
        shortTitle: trip.title.split(" ")[0], 
      }))
    );
  }, []);

  const categories = useMemo(() => ["All", ...new Set(trips.map((t) => t.title.split(" ")[0]))], []);

  const filteredImages = useMemo(() => {
    return filter === "All" ? allImages : allImages.filter((img) => img.shortTitle === filter);
  }, [filter, allImages]);

  return (
    <div className="min-h-screen bg-white">
      
      

      {/* 2. HEADER & PREVIOUS TYPE FILTERS */}
      <header className="max-w-7xl mx-auto mb-12 px-4 text-center">
        <div className='h-28 w-full'></div>

      {/* --- Page Header --- */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
          Our Photos
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-2">
          Explore the best moments from our trips.
        </p>
      </div>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
                filter === cat
                  ? "bg-black text-white border-black shadow-md"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 3. SMART MASONRY GRID */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                // mb-6 ensures there is vertical space between images in the same column
                className="relative break-inside-avoid mb-6 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm group"
              >
                {/* Image with Hover Effect */}
                <div className="overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.category}
                    width={700}
                    height={900}
                    className="w-full h-auto block object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Hover Overlay: Darkens slightly on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

                {/* Subtle Tag (Visible on hover) */}
                <div className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-[9px] font-black uppercase tracking-tighter text-white">
                    {img.shortTitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-32 text-slate-400 font-medium">
            No items in this collection.
          </div>
        )}
      </main>
    </div>
  );
}