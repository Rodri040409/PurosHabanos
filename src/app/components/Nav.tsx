'use client';

import { useEffect, useState } from 'react';

export default function Nav() {
  const [activeTab, setActiveTab] = useState('Nuevo');

  useEffect(() => {
    const carousel = document.querySelector(
      '.nav-carousel',
    ) as HTMLDivElement | null;
    if (!carousel) return;

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;
    let velocity = 0;
    let rafID: number;
    let lastX: number;
    let lastTime = 0;
    const threshold = 2;
    let isScrollingY = false;

    const stopInertia = () => {
      cancelAnimationFrame(rafID);
      velocity = 0;
    };

    const smoothScroll = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
      const thresholdPx = 4; // margen de seguridad antes del borde
      const velocityCutoff = 0.1; // mínima velocidad para continuar animando
      const nearStart = carousel.scrollLeft <= thresholdPx;
      const nearEnd = carousel.scrollLeft >= maxScroll - thresholdPx;
    
      // Si vamos hacia la izquierda y ya estamos casi al inicio
      if (velocity < 0 && nearStart) {
        carousel.scrollLeft = 0;
        stopInertia();
        return;
      }
    
      // Si vamos hacia la derecha y ya estamos casi al final
      if (velocity > 0 && nearEnd) {
        carousel.scrollLeft = maxScroll;
        stopInertia();
        return;
      }
    
      // Aplicamos desplazamiento
      carousel.scrollLeft += velocity;
    
      // Frenamos gradualmente
      velocity *= 0.93;
    
      // Si ya es una velocidad muy baja, detenemos
      if (Math.abs(velocity) < velocityCutoff) {
        stopInertia();
        return;
      }
    
      // Continuamos animación
      rafID = requestAnimationFrame(smoothScroll);
    };    

    carousel.addEventListener('mousedown', (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
      carousel.style.scrollBehavior = 'auto';
      stopInertia();
    });

    carousel.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2.5;
      carousel.scrollLeft = scrollLeft - walk;
      velocity = walk * 0.15;
    });

    carousel.addEventListener('mouseup', () => {
      isDragging = false;
      if (Math.abs(velocity) > threshold) {
        requestAnimationFrame(smoothScroll);
      }
    });

    carousel.addEventListener('mouseleave', () => {
      isDragging = false;
    });

    carousel.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        startX = e.touches[0].clientX;
        scrollLeft = carousel.scrollLeft;
        velocity = 0;
        lastTime = Date.now();
        lastX = startX;
        isScrollingY = false;
        stopInertia();
      },
      { passive: true },
    );

    carousel.addEventListener(
      'touchmove',
      (e: TouchEvent) => {
        if (isScrollingY) return;
    
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const deltaX = x - lastX;
        const deltaY = Math.abs(y - e.touches[0].pageY);
    
        if (deltaY > Math.abs(deltaX)) {
          isScrollingY = true;
          return;
        }
    
        e.preventDefault();
        const timeNow = Date.now();
        const deltaTime = timeNow - lastTime;
    
        velocity = (deltaX / deltaTime) * 25;
        lastX = x;
        lastTime = timeNow;
    
        const walk = (x - startX) * 2.2;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        let newScrollLeft = scrollLeft - walk;
        if (newScrollLeft < 0) newScrollLeft = 0;
        if (newScrollLeft > maxScroll) newScrollLeft = maxScroll;
        carousel.scrollLeft = newScrollLeft;
      },
      { passive: false },
    );    

    carousel.addEventListener('touchend', () => {
      if (!isScrollingY && Math.abs(velocity) > threshold) {
        requestAnimationFrame(smoothScroll);
      }
    });

    carousel.style.scrollBehavior = 'auto';

    return () => stopInertia();
  }, []);

  return (
    <div className='mt-8 md:mt-12 px-4 text-white'>
      <div className='max-w-screen-sm md:max-w-screen-md mx-auto'>
        <div
          className='nav-carousel overflow-x-auto overflow-y-hidden whitespace-nowrap flex gap-3 no-scrollbar md:scrollbar-thin md:scrollbar-thumb-[#444] md:scrollbar-track-transparent overscroll-contain touch-pan-y pointer-events-auto'
          style={{
            WebkitOverflowScrolling: 'auto',
            overscrollBehaviorX: 'contain',
            overscrollBehaviorY: 'none',
            touchAction: 'pan-y',
          }}
        >
          {[
            'Nuevo',
            'Puros',
            'Porta Puros',
            'Cortadores de guillotina',
            'Encendedor de soplete',
            'Ceniceros',
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 border text-sm whitespace-nowrap transition-all duration-300
                ${
                  activeTab === tab
                    ? 'bg-[#C89B3C] text-black border-[#C89B3C]'
                    : 'bg-transparent border-[#444] text-white hover:bg-[#222]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}  