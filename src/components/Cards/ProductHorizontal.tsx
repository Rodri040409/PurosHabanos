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

export default function ProductoCard({ producto }: { producto: Producto }) {
  const { nombre, descripcion, precio, imagen } = producto;

  const descripcionCorta =
    descripcion.length > 50 ? descripcion.slice(0, 47) + "..." : descripcion;

  const precioFormateado = precio
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Base para .webp y .avif
  const baseImage = imagen.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  return (
    <motion.div
      className="flex items-center bg-[#2c2b2f] rounded-xl shadow-md w-full max-w-sm px-4 py-3"
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
        <h3 className="text-white text-sm font-semibold truncate">{nombre}</h3>
        <p className="text-gray-400 text-xs leading-tight truncate">
          {descripcionCorta}
        </p>
        <p className="text-[#C89B3C] font-bold text-sm mt-1">
          ${precioFormateado}
        </p>
      </div>

      {/* Icono flecha */}
      <div className="ml-2 text-[#C89B3C]">
        <ChevronRight size={18} />
      </div>
    </motion.div>
  );
}
