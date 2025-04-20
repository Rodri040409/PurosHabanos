'use client';

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

export default function ProductoCard({
  producto,
  onClick,
}: {
  producto: Producto;
  onClick?: () => void;
}) {
  const { nombre, descripcion, precio, imagen } = producto;

  const descripcionCorta =
    descripcion.length > 50 ? descripcion.slice(0, 47) + "..." : descripcion;

  const precioFormateado = precio
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const baseImage = imagen.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  return (
    <motion.div
      onClick={onClick}
      className="flex items-center bg-[#2c2b2f] rounded-xl shadow-md w-full max-w-4xl mx-auto px-4 lg:px-6 py-4 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Imagen con formatos múltiples */}
      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-[#e3b88b]">
        <picture>
          <source srcSet={`${baseImage}.avif`} type="image/avif" />
          <source srcSet={`${baseImage}.webp`} type="image/webp" />
          <img
            loading="lazy"
            src={imagen}
            alt={nombre}
            className="object-cover w-full h-full"
          />
        </picture>
      </div>

      {/* Información */}
      <div className="flex flex-col justify-center ml-4 flex-1 overflow-hidden">
        <h3 className="text-white text-base lg:text-lg font-semibold truncate">
          {nombre}
        </h3>
        <p className="text-gray-400 text-sm lg:text-base leading-tight truncate">
          {descripcionCorta}
        </p>
        <p className="text-[#C89B3C] font-bold text-base mt-1">
          ${precioFormateado}
        </p>
      </div>

      {/* Icono flecha */}
      <div className="ml-2 text-[#C89B3C]">
        <ChevronRight size={20} />
      </div>
    </motion.div>
  );
}
