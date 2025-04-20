'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

import Bienvenida from './components/Bienvenida';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Productos from './components/Productos';
import ProductoDetalle from './components/ProductoDetalle';
import ProductOverlayHandler from './components/ProductOverlayHandler'; // Nuevo componente

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [activeTab, setActiveTab] = useState('Nuevo');
  const [productoActivo, setProductoActivo] = useState<string | null>(null);
  const router = useRouter();

  // 🔙 Soporte para botón "atrás"
  useEffect(() => {
    const onPopState = () => {
      const url = new URL(window.location.href);
      const newId = url.searchParams.get('producto');
      setProductoActivo(newId);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const cerrarCard = () => {
    setProductoActivo(null);
    router.push('/', { scroll: false });
  };

  return (
    <main className='min-h-screen flex flex-col bg-[#0C0F14] overflow-hidden relative'>
      <AnimatePresence mode='wait'>
        {!showMainContent ? (
          <motion.div
            key='bienvenida'
            className='min-h-screen'
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Bienvenida onAnimationComplete={() => setShowMainContent(true)} />
          </motion.div>
        ) : (
          <motion.div
            key='main'
            className='min-h-screen'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Hero />
            <Nav activeTab={activeTab} setActiveTab={setActiveTab} />
            <Productos
              categoria={activeTab}
              onProductoClick={(id) => {
                setProductoActivo(id);
                window.history.pushState({}, '', `/producto/${id}`);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Solo toma el producto desde la URL si no hay uno ya activo */}
      <Suspense fallback={null}>
        <ProductOverlayHandler
          setProductoActivo={setProductoActivo}
          productoActivo={productoActivo}
          showMainContent={showMainContent}
        />
      </Suspense>

      {/* ✅ Vista detalle del producto */}
      <AnimatePresence>
        {productoActivo && (
          <ProductoDetalle id={productoActivo} onClose={cerrarCard} />
        )}
      </AnimatePresence>
    </main>
  );
}
