import { useState, useEffect } from 'react';
import BlurText from '../../components/text/BlurText';

export default function Bienvenida() {
  const [showText, setShowText] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Retraso antes de que el texto "Bienvenido" aparezca
    const timer = setTimeout(() => {
      setShowText(true); // Aparecerá después de 3 segundos
    }, 3000); // Retraso de 3 segundos para la aparición del texto

    // El texto desaparece después de 7 segundos
    const timerRemoveText = setTimeout(() => {
      setShowText(false);
    }, 11000); // El texto se mantendrá visible durante 7 segundos (3000ms + 7000ms)

    return () => {
      clearTimeout(timer);
      clearTimeout(timerRemoveText);
    };
  }, []); // Esto solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="bg-[#0C0F14] text-white grid place-items-center h-screen overflow-x-hidden">
      <div className="text-center relative">
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
              text="BIENVENIDO"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => setAnimationComplete(true)} // Al finalizar la animación
              className="text-4xl text-white mb-8 animate-fade-out font-switzerBlackItalic" // Aplica la animación fade-out y la fuente Switzer-Bold
            />
          </div>
        )}
      </div>
    </div>
  );
}
