"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { members } from '@/data/db'; // Make sure this path is correct
import { Star, Heart, Sparkles } from 'lucide-react';

export default function Team() {
  
  // Stagger animation for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  // Card Animation: Float up + Fade In
  const cardVariants = {
    hidden: { y: 100, opacity: 0, rotate: -5 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 80, damping: 20 } 
    }
  };

  return (
    <section id="team" className="py-20 md:py-32 bg-white relative overflow-hidden">
      
      {/* 1. MOVING BACKGROUND BLOBS (Animated) */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-125 h-125 bg-purple-100/60 rounded-full blur-[100px] -z-10" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-125 h-125 bg-pink-100/60 rounded-full blur-[100px] -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 2. HEADER */}
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6"
          >
            <Sparkles size={14} className="text-yellow-500" />
            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">
              The Dream Team
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-4">
            Meet The <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-500">Squad</span>
          </h2>
        </div>

        {/* 3. ORGANIC GRID (The "Random" Look) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6"
        >
          {members.map((member, index) => {
            
            // LOGIC: Create fallback image if none provided
            const imageSrc = member.image 
              ? member.image 
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=200`;

            // DESIGN: Creating the "Wave" Effect
            // We push every 2nd card down on desktop to look organic
            const isEven = index % 2 === 0;
            const marginTopClass = isEven ? "lg:mt-0" : "lg:mt-16"; 

            return (
              <motion.div 
                key={member.id}
                variants={cardVariants}
                className={`relative group ${marginTopClass}`} // Applies the wave effect
              >
                
                {/* THE CARD */}
                <div className="relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-4xl p-6 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500">
                  
                  {/* Floating Avatar */}
                  <div className="relative w-28 h-28 mx-auto -mt-12 mb-6">
                    {/* Glow behind head */}
                    <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
                    
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg"
                    >
                      <Image 
                        src={imageSrc} 
                        alt={member.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Heart Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-pink-500 rotate-12 group-hover:rotate-0 transition-transform">
                      <Heart size={14} fill="currentColor" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-4">
                      {member.role}
                    </p>
                    
                    {/* Divider */}
                    <div className="w-8 h-1 bg-linear-to-r from-gray-200 to-transparent mx-auto rounded-full mb-4" />

                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4 min-h-15">
                      {member.bio}
                    </p>
                    
                    {/* Specialty Pill */}
                    <span className="inline-block bg-white border border-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-400 shadow-sm group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                      <Star size={10} className="inline mr-1 -mt-0.5" />
                      {member.specialty}
                    </span>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}