'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TABS = [
  'Nuevo',
  'Puros',
  'Porta Puros',
  'Cortadores de guillotina',
  'Encendedor de soplete',
  'Ceniceros',
];

export default function SmoothCarousel({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='mt-8 md:mt-12 px-4 text-white'>
      <div className='max-w-screen-sm md:max-w-screen-md mx-auto'>
        {isMobile && (
          <p className="text-center text-xs text-gray-400 mb-2">
            Desliza a la izquierda para ver más
          </p>
        )}

        <div className='relative'>
          {isMobile && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 z-10 bg-gradient-to-l from-black/60 to-transparent" />
          )}

          <div
            ref={wrapperRef}
            className={`w-full relative ${isMobile ? 'overflow-x-auto no-scrollbar' : 'overflow-hidden md:overflow-x-auto'}`}
            style={{
              WebkitOverflowScrolling: isMobile ? 'touch' : undefined,
              touchAction: isMobile ? 'auto' : 'none',
            }}
          >
            <motion.div
              ref={containerRef}
              className='flex gap-3 whitespace-nowrap px-2 py-2'
              drag={isMobile ? false : 'x'}
              dragConstraints={wrapperRef}
              dragElastic={0}
              dragMomentum={false}
              transition={{ type: 'tween', duration: 0.2, ease: 'linear' }}
            >
              {TABS.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-10 py-4 border text-sm transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-[#C89B3C] text-black border-[#C89B3C]'
                      : 'bg-transparent border-[#444] text-white hover:bg-[#222]'
                  } ${index === 0 ? 'ml-1' : ''}`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
