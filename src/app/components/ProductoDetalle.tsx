'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import productosData from '@/data/productos.json';

const WHATSAPP_NUMERO = '2285052080';

export default function ProductoDetalle({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.history.pushState({}, '', `/producto/${id}`);
    return () => {
      document.body.style.overflow = 'auto';
      window.history.pushState({}, '', '/');
    };
  }, [id]);

  let producto: any = null;

  const buscar = (entrada: any) => {
    if (Array.isArray(entrada)) {
      for (const item of entrada) {
        if (item.id === id) producto = item;
      }
    } else if (typeof entrada === 'object') {
      Object.values(entrada).forEach(buscar);
    }
  };

  buscar(productosData);

  if (!producto) return null;

  const { nombre, descripcion, precio, imagen, whatsappMensaje } = producto;
  const baseImage = imagen.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');
  const precioFormateado = precio.toFixed(2).replace('.', ',');

  const mensaje = encodeURIComponent(
    whatsappMensaje || `Hola, me interesa el producto: ${nombre}`
  );
  const enlaceWhatsapp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensaje}`;

  return (
    <motion.div
      key={id}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', stiffness: 90, damping: 18 }}
      className="fixed inset-0 z-50 bg-[#0C0F14] text-white"
    >
      <div className="h-full flex flex-col md:flex-row overflow-hidden">
        {/* Imagen */}
        <div className="relative bg-[#E5BA8D] h-[35vh] md:h-auto md:w-1/2 flex items-start">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-black flex items-center gap-2 text-lg font-medium z-10"
          >
            <ChevronLeft size={24} />
            Volver
          </button>

          <picture className="w-full h-full">
            <source srcSet={`${baseImage}.avif`} type="image/avif" />
            <source srcSet={`${baseImage}.webp`} type="image/webp" />
            <img
              src={imagen}
              alt={nombre}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </picture>
        </div>

        {/* Contenido */}
        <div className="bg-[#0C0F14] md:w-1/2 px-6 py-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <h1 className="text-xl md:text-3xl font-semibold">{nombre}</h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {descripcion}
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xl md:text-2xl font-bold text-[#C89B3C]">
              ${precioFormateado}
            </p>

            <a
              href={enlaceWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E5BA8D] text-black font-semibold px-6 py-3 rounded-full text-center text-lg hover:brightness-95 transition w-full sm:w-auto"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
