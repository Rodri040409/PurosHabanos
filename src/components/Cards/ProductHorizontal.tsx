'use client';

import { ChevronRight } from "lucide-react";

type Producto = {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
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

  return (
    <div className="flex items-center bg-[#2c2b2f] rounded-xl shadow-md w-full max-w-sm px-4 py-3">
      {/* Imagen */}
      <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-[#e3b88b]">
        <img
          src={imagen}
          alt={nombre}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center ml-4 flex-1 overflow-hidden">
        <h3 className="text-white text-sm font-semibold truncate">{nombre}</h3>
        <p className="text-gray-400 text-xs leading-tight truncate">
          {descripcionCorta}
        </p>
        <p className="text-[#C89B3C] font-bold text-sm mt-1">
          ${precioFormateado}
        </p>
      </div>

      {/* Flechita */}
      <div className="ml-2 text-[#C89B3C]">
        <ChevronRight size={18} />
      </div>
    </div>
  );
}
