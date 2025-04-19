import { useEffect, useRef, useState } from 'react';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let velocity = 0;
    let rafID: number;
    let lastTime = 0;
    let lastX = 0;

    const stopInertia = () => {
      cancelAnimationFrame(rafID);
      velocity = 0;
    };

    const smoothScroll = () => {
      const containerWidth = container.scrollWidth;
      const wrapperWidth = wrapper.clientWidth;
      const maxTranslate = containerWidth - wrapperWidth;
    
      let translateX =
        -parseFloat(container.style.transform.replace(/[^-0-9.]/g, '')) || 0;
    
      translateX -= velocity;
    
      // 💡 Protección extra contra rebote visual al final o inicio
      const margin = 2; // px para margen de seguridad
    
      if ((velocity < 0 && translateX <= 0 + margin) || (velocity > 0 && translateX >= maxTranslate - margin)) {
        translateX = Math.max(0, Math.min(translateX, maxTranslate));
        container.style.transform = `translateX(-${translateX}px)`;
        stopInertia();
        return;
      }
    
      container.style.transform = `translateX(-${translateX}px)`;
    
      velocity *= 0.93;
    
      if (Math.abs(velocity) < 0.1) {
        stopInertia();
        return;
      }
    
      rafID = requestAnimationFrame(smoothScroll);
    };    

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX;
      currentX = startX;
      stopInertia();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const delta = e.pageX - currentX;
      currentX = e.pageX;
      velocity = -delta;
      const currentTranslate = -parseFloat(container.style.transform.replace(/[^-0-9.]/g, '')) || 0;
      container.style.transform = `translateX(-${Math.max(0, currentTranslate + delta)}px)`;
    };

    const onMouseUp = () => {
      isDragging = false;
      if (Math.abs(velocity) > 0.5) {
        rafID = requestAnimationFrame(smoothScroll);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      stopInertia();
    };

    const onTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientX - currentX;
      currentX = e.touches[0].clientX;
      velocity = -delta;
      const currentTranslate = -parseFloat(container.style.transform.replace(/[^-0-9.]/g, '')) || 0;
      container.style.transform = `translateX(-${Math.max(0, currentTranslate + delta)}px)`;
    };

    const onTouchEnd = () => {
      if (Math.abs(velocity) > 0.5) {
        rafID = requestAnimationFrame(smoothScroll);
      }
    };

    wrapper.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: false });
    wrapper.addEventListener('touchend', onTouchEnd);

    return () => {
      stopInertia();
      wrapper.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      wrapper.removeEventListener('touchstart', onTouchStart);
      wrapper.removeEventListener('touchmove', onTouchMove);
      wrapper.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className='mt-8 md:mt-12 px-4 text-white'>
      <div className='max-w-screen-sm md:max-w-screen-md mx-auto'>
        <div
          ref={wrapperRef}
          className='overflow-hidden touch-pan-y relative'
        >
          <div
            ref={containerRef}
            className='flex gap-3 whitespace-nowrap will-change-transform'
            style={{ transform: 'translateX(0px)' }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
