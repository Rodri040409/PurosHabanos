import { useState, useEffect } from 'react';
import BlurText from '../../components/text/BlurText';

export default function Hero() {
  const [showText, setShowText] = useState(false);

  // Controlamos la aparición del texto "Bienvenido"
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);  // Mostrar "Bienvenido"
    }, 2000); // Mostrar "Bienvenido" cuando el logo llega al centro

    const timerRemoveText = setTimeout(() => {
      setShowText(false);  // Eliminar el texto después de 1s
    }, 4000); // El texto permanece durante 2 segundos mientras el logo se detiene en el centro

    return () => {
      clearTimeout(timer);
      clearTimeout(timerRemoveText);
    };
  }, []);

  return (
    <div className="bg-[#0C0F14] text-white grid place-items-center h-screen overflow-x-hidden">
      <div className="text-center relative">
        {/* Contenedor del logo con tamaño fijo */}
        <div className="w-[200px] md:w-[250px] lg:w-[300px]">
          <picture className="w-full h-auto">
            <source srcSet="images/logo.avif" type="image/avif" />
            <source srcSet="images/logo.webp" type="image/webp" />
            <img
              loading="lazy"
              src="images/logo.png"
              alt="Logo de puros habanos"
              className="animate-rotateLogo object-contain"
            />
          </picture>
        </div>

        {/* Usamos el componente BlurText para mostrar el texto "Bienvenido" */}
        {showText && (
          <div className="absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]">
            <BlurText
              text="Bienvenido"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl text-white mb-8"
            />
          </div>
        )}
      </div>
    </div>
  );
}
