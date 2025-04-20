'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductOverlayHandler({
  setProductoActivo,
  showMainContent,
  productoActivo,
}: {
  setProductoActivo: (id: string | null) => void;
  productoActivo: string | null;
  showMainContent: boolean;
}) {
  const params = useSearchParams();

  useEffect(() => {
    if (!showMainContent || productoActivo) return;

    const id = params.get('producto');
    if (id) {
      setProductoActivo(id);
    }
  }, [params, showMainContent, productoActivo, setProductoActivo]);

  return null;
}
