'use client';

import ProductoCard from "@/components/Cards/ProductHorizontal";
import productosData from "@/data/productos.json";

type Producto = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  fechaPublicacion?: string;
};

const CANTIDAD_MAS_RECIENTES = 5;

export default function Productos({ categoria }: { categoria: string }) {
  const dataCategoria = productosData[categoria as keyof typeof productosData];

  if (!dataCategoria) return null;

  const capitalizar = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  // 🔍 Buscar productos con fecha en TODO el JSON
  const recolectarGlobalConFecha = (obj: any): Producto[] => {
    const productos: Producto[] = [];

    const recorrer = (entrada: any) => {
      if (Array.isArray(entrada)) {
        entrada.forEach((item) => {
          if (item.fechaPublicacion) productos.push(item);
        });
      } else if (typeof entrada === "object" && entrada !== null) {
        Object.values(entrada).forEach(recorrer);
      }
    };

    recorrer(obj);
    return productos;
  };

  const productosRecientes = recolectarGlobalConFecha(productosData)
    .sort(
      (a, b) =>
        new Date(b.fechaPublicacion!).getTime() -
        new Date(a.fechaPublicacion!).getTime()
    )
    .slice(0, CANTIDAD_MAS_RECIENTES);

  const esArrayDirecto = Array.isArray(dataCategoria);

  return (
    <div className="px-4 py-4 space-y-6">
      {/* ✅ Mostrar sección más recientes solo si estamos en "Nuevo" */}
      {categoria === "Nuevo" && productosRecientes.length > 0 && (
        <div>
          <h3 className="text-[#C89B3C] text-sm mb-2 font-medium">Más recientes</h3>
          <div className="space-y-2">
            {productosRecientes.map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      )}

      {/* ✅ Si la categoría es un array de productos (no tiene subcategorías) */}
      {esArrayDirecto &&
        (dataCategoria as Producto[]).map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}

      {/* ✅ Si tiene subcategorías */}
      {!esArrayDirecto &&
        Object.entries(dataCategoria).map(([subcat, items]: [string, any]) => {
          if (Array.isArray(items) && items.length > 0) {
            return (
              <div key={subcat}>
                <h3 className="text-[#C89B3C] text-sm mb-2 font-medium">
                  {capitalizar(subcat)}
                </h3>
                <div className="space-y-2">
                  {items.map((producto: Producto) => (
                    <ProductoCard key={producto.id} producto={producto} />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}
