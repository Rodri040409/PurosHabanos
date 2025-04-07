'use client';

import { useEffect } from 'react';

export default function Nav() {
  useEffect(() => {
    const carousel = document.querySelector('.nav-carousel') as HTMLDivElement | null;
    if (!carousel) return;

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;
    let velocity = 0;
    let rafID: number;
    let lastX: number;
    let lastTime = 0;
    let threshold = 2;
    let isScrollingY = false;

    const stopInertia = () => {
      cancelAnimationFrame(rafID);
      velocity = 0;
    };

    const smoothScroll = () => {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (Math.abs(velocity) > 0.1) {
        carousel.scrollLeft += velocity;
        velocity *= 0.93;
        if (carousel.scrollLeft <= 0 || carousel.scrollLeft >= maxScroll) {
          stopInertia();
        } else {
          rafID = requestAnimationFrame(smoothScroll);
        }
      } else {
        stopInertia();
      }
    };

    // 🖱️ Mouse
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

    // 📱 Touch
    carousel.addEventListener('touchstart', (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      scrollLeft = carousel.scrollLeft;
      velocity = 0;
      lastTime = Date.now();
      lastX = startX;
      isScrollingY = false;
      stopInertia();
    }, { passive: true });

    carousel.addEventListener('touchmove', (e: TouchEvent) => {
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
      carousel.scrollLeft = scrollLeft - walk;
    }, { passive: false });

    carousel.addEventListener('touchend', () => {
      if (!isScrollingY && Math.abs(velocity) > threshold) {
        requestAnimationFrame(smoothScroll);
      }
    });

    // 🔧 Reset scroll behavior
    carousel.style.scrollBehavior = 'auto';

    return () => stopInertia();
  }, []);

  return (
    <div className="bg-[#0C0F14] text-white px-4 pt-4">
      <div className="overflow-x-auto nav-carousel whitespace-nowrap flex gap-3 no-scrollbar">
        {['Popular', 'Nuevo', 'Recomendado', 'Edición Limitada', 'Clásicos', 'Premium'].map((tab, index) => (
          <button
            key={index}
            className={`rounded-full px-4 py-2 border text-sm whitespace-nowrap transition-colors
              ${index === 0
                ? 'bg-[#C89B3C] text-black border-[#C89B3C]'
                : 'bg-transparent border-[#444] text-white hover:bg-[#222]'}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
