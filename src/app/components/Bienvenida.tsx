import { useEffect, useState } from 'react';

import BlurText from '../../components/text/BlurText';

export default function Bienvenida({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) {
  const [showText, setShowText] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false); // <- nuevo estado

  useEffect(() => {
    // ⏳ Forzar render del logo antes de animar
    const startLogo = setTimeout(() => setLogoVisible(true), 50);

    // Mostrar texto "BIENVENIDO" después de 3s
    const timerShow = setTimeout(() => setShowText(true), 3000);

    // Ocultar texto y finalizar animación después de 11s
    const timerEnd = setTimeout(() => {
      setShowText(false);
      onAnimationComplete();
    }, 7000);

    return () => {
      clearTimeout(startLogo);
      clearTimeout(timerShow);
      clearTimeout(timerEnd);
    };
  }, [onAnimationComplete]);

  return (
    <div className='bg-[#0C0F14] text-white grid place-items-center h-screen overflow-x-hidden'>
      <div className='text-center relative'>
        <div className='w-[200px] md:w-[250px] lg:w-[300px]'>
          <picture className='w-full h-auto'>
            <source srcSet='images/logo.avif' type='image/avif' />
            <source srcSet='images/logo.webp' type='image/webp' />
            <img
              loading='lazy'
              src='images/logo.png'
              alt='Logo de puros habanos'
              className={`object-contain transition-opacity duration-200 ease-in ${
                logoVisible
                  ? 'animate-rotateLogo opacity-100'
                  : 'opacity-0 pointer-events-none'
              }`}
            />
          </picture>
        </div>

        {showText && (
          <div className='absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]'>
            <BlurText
              text='BIENVENIDO'
              delay={150}
              animateBy='words'
              direction='top'
              onAnimationComplete={onAnimationComplete}
              className='text-4xl text-white mb-8 animate-fade-out font-switzerBlackItalic'
            />
          </div>
        )}
      </div>
    </div>
  );
}
