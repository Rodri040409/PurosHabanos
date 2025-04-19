import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className=' bg-[#0C0F14] text-white px-4 pt-2 font-sans space-y-5'>
      {/* Logo */}
      <div className='flex justify-center'>
        <picture>
          <source srcSet='/images/logo.avif' type='image/avif' />
          <source srcSet='/images/logo.webp' type='image/webp' />
          <img
            src='/images/logo.png'
            alt='Logo'
            className={`h-[120px] mt-[8px] mb-[-8px] ${fadeIn ? 'animate-heroLogoEnter' : ''}`}
            loading='lazy'
          />
        </picture>
      </div>

      {/* Hero */}
      <div
        className={`relative w-full max-w-screen-sm md:max-w-screen-md mx-auto bg-[#F5D7A1] rounded-2xl overflow-hidden px-4 py-6 grid grid-cols-3 items-start md:items-center gap-[10px] md:gap-[5px] transition-opacity duration-700 ease-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Fondo */}
        <picture className='absolute inset-0 z-0'>
          <source srcSet='/images/banner--background.avif' type='image/avif' />
          <source srcSet='/images/banner--background.webp' type='image/webp' />
          <img
            src='/images/banner--background.jpg'
            alt='Fondo'
            className='w-full h-full object-cover'
            loading='lazy'
          />
        </picture>

        {/* Texto (ocupa 2 columnas) */}
        <div className='relative z-10 text-black col-span-2 space-y-3 pl-2 md:pl-8'>
          <h2 className='font-bold leading-tight text-[clamp(1.3rem,3.5vw,2rem)]'>
            EMPIEZA TU
            <br />
            DÍA CON <span className='text-[#8B4A2C]'>PUROS</span>
          </h2>
          <p className='text-[clamp(0.85rem,2.5vw,1.1rem)] leading-snug'>
            Explora nuestra nueva línea de puros artesanales, seleccionados con
            la mejor calidad.
          </p>
          <button className='bg-[#0C0F14] text-white text-[clamp(0.75rem,1.8vw,1rem)] px-4 py-2 rounded-lg mt-2'>
            Ver Productos
          </button>
        </div>

        {/* Imagen (1 columna) */}
        <div className='relative z-10 flex justify-center'>
          <div className='w-full aspect-[3/4] max-w-[100px] md:max-w-[200px] scale-[1.5] md:scale-100 translate-y-[15px] md:translate-y-0 md:translate-x-[-50px] transition-all duration-300 ease-in-out'>
            <picture>
              <source srcSet='/images/banner--puros.avif' type='image/avif' />
              <source srcSet='/images/banner--puros.webp' type='image/webp' />
              <img
                src='/images/banner--puros.png'
                alt='Puros'
                className='w-full h-full object-contain'
                loading='lazy'
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  );
}
