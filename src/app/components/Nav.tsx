'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useIsPresent } from 'framer-motion';

const TABS = [
  'Nuevo',
  'Puros',
  'Porta Puros',
  'Cortadores de guillotina',
  'Encendedor de soplete',
  'Ceniceros',
];

export default function SmoothCarousel() {
  const [activeTab, setActiveTab] = useState('Nuevo');
  const [isMobile, setIsMobile] = useState(false);

  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const isTouch = window.innerWidth <= 768;
    setIsMobile(isTouch);
  }, []);

  return (
    <div className='mt-8 md:mt-12 px-4 text-white'>
      <div className='max-w-screen-sm md:max-w-screen-md mx-auto'>
        <div
          ref={wrapperRef}
          className={`carousel-wrapper ${isMobile ? 'overflow-x-auto' : 'overflow-hidden'} relative`}
          style={{
            WebkitOverflowScrolling: isMobile ? 'touch' : undefined,
            touchAction: isMobile ? 'auto' : 'none',
          }}
        >
          <motion.div
            ref={containerRef}
            className='carousel-container flex gap-3 whitespace-nowrap px-2 py-2'
            style={{
              transform: 'translateX(0px)',
            }}
            drag={isMobile ? false : 'x'}
            dragConstraints={wrapperRef}
            dragElastic={0}
            dragMomentum={false}
            transition={{ type: 'tween', duration: 0.2, ease: 'linear' }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-8 py-4 border text-sm transition-all duration-300 whitespace-nowrap
                  ${
                    activeTab === tab
                      ? 'bg-[#C89B3C] text-black border-[#C89B3C]'
                      : 'bg-transparent border-[#444] text-white hover:bg-[#222]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
