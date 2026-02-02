"use client";
import { useState } from 'react';
import Image from 'next/image';
import { YouTubeEmbed } from '@next/third-parties/google';
import { funMoments } from '@/data/funMoments';

export default function FunMomentsPage() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? funMoments 
    : funMoments.filter(item => item.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pb-24 relative">
      
      <div className='h-28 w-full'></div>

      {/* --- Page Header --- */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600">
          Best & Fun Moments
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-2">
          The best shorts, videos, and pics from us.
        </p>
      </div>

      {/* --- Filter Tabs --- */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {['all', 'short', 'video', 'image'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm border border-gray-200
              ${filter === tab 
                ? 'bg-black text-white scale-105 border-black' 
                : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1) + 's'}
          </button>
        ))}
      </div>

      {/* --- MASONRY GRID --- */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mx-auto max-w-7xl">
        
        {filteredData.map((item) => (
          <div key={item.id} className="break-inside-avoid mb-6 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            
            {/* 1. YOUTUBE SHORTS (Forced Height Fix) */}
            {item.type === 'short' && (
              <div className="w-full relative bg-black">
                {/* FIX 3: "h-[600px]" 
                   This FORCES the video to be tall. No automatic calculations.
                   It will always be 600px high.
                */}
                <div className="w-full h-[500px] md:h-[600px]">
                  <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1&playsinline=1&controls=1`} 
                      title="YouTube Short"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                </div>
              </div>
            )}

            {/* 2. REGULAR VIDEO */}
            {item.type === 'video' && (
              <div className="w-full">
                <YouTubeEmbed videoid={item.youtubeId} params="rel=0" />
              </div>
            )}

            {/* 3. IMAGE */}
            {item.type === 'image' && (
              <div className="relative">
                <Image 
                  src={item.src} 
                  alt={item.caption} 
                  width={500} 
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Caption */}
            <div className="p-4 py-4">
              <p className="text-gray-700 font-medium text-sm text-center">
                {item.caption}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}