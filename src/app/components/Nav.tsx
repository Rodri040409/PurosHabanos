// ✅ Nav.tsx usando framer-motion para evitar rebote y mejorar la experiencia de scroll

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

export default function SmoothCarousel() {
  const [activeTab, setActiveTab] = useState('Nuevo');
  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // ⚠️ Previene selección de texto durante drag en móviles
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.cancelable) e.preventDefault();
    };

    const container = containerRef.current;
    container?.addEventListener('touchmove', preventDefault, { passive: false });

    return () => {
      container?.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <div className="mt-8 md:mt-12 px-4 text-white">
      <div className="max-w-screen-sm md:max-w-screen-md mx-auto">
        <div
          ref={constraintsRef}
          className="overflow-hidden relative carousel-wrapper"
        >
          <motion.div
            ref={containerRef}
            className="flex gap-3 whitespace-nowrap cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.05} // ⚠️ Controla rebote
            whileTap={{ cursor: 'grabbing' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }} // Evita rebote con bounce: 0
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 border text-sm transition-all duration-300 whitespace-nowrap
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
