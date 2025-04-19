import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

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
  const x = useMotionValue(0);

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const container = containerRef.current;
    if (!container) return;

    const wrapperWidth = container.offsetWidth;
    const scrollWidth = container.scrollWidth;
    const maxScroll = scrollWidth - wrapperWidth;

    let finalX = -x.get() + info.offset.x;

    // Limita dentro de bounds
    if (finalX < 0) finalX = 0;
    if (finalX > maxScroll) finalX = maxScroll;

    animate(x, -finalX, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    });
  };

  return (
    <div className='mt-8 md:mt-12 px-4 text-white'>
      <div className='max-w-screen-sm md:max-w-screen-md mx-auto overflow-hidden'>
        <motion.div
          ref={containerRef}
          className='flex gap-3 whitespace-nowrap cursor-grab active:cursor-grabbing'
          drag='x'
          dragConstraints={{ left: -1000, right: 0 }} // provisional
          style={{ x }}
          onDragEnd={handleDragEnd}
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
  );
}
