"use client";
import { siteConfig } from '@/data/site-config';

export default function WhatsAppFloat() {
  const whatsappLink = siteConfig.general.whatsappLink;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 99999 }}
      className="group flex items-center justify-center transition-transform duration-300 hover:scale-105"
      aria-label="Join WhatsApp Group"
    >
      
      {/* TOOLTIP (Slides out on Desktop) */}
      <div className="absolute right-24 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
        <div className="bg-black/90 backdrop-blur-md text-white px-5 py-2.5 rounded-lg shadow-2xl text-sm font-bold whitespace-nowrap border border-white/10 flex items-center gap-2">
           
           <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-black/90 transform rotate-45 border-r border-t border-white/10"></div>
        </div>
      </div>

      {/* THE BUTTON: Square + Black Transparent */}
      <div className="relative flex items-center justify-center px-4 py-4 w-20 h-20 md:w-20 md:h-20 bg-black backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* SVG Icon with Gradient */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="30" 
          height="30" 
          viewBox="0 0 24 24" 
          className="relative z-10 w-9 h-9 md:w-10 md:h-10 drop-shadow-md"
        >
          {/* DEFINING THE WHITE-PINK GRADIENT */}
          <defs>
            <linearGradient id="wpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} /> {/* Pink-500 */}
            </linearGradient>
          </defs>
          
          {/* Path using the gradient */}
          <path 
            fill="url(#wpGradient)" 
            d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </div>
    </a>
  );
}