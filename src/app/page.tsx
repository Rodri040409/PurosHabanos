'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Bienvenida from './components/Bienvenida';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Productos from './components/Productos';
import ProductoDetalle from './components/ProductoDetalle';

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [activeTab, setActiveTab] = useState('Nuevo');
  const [productoActivo, setProductoActivo] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // 🧠 Almacena el ID si venía uno desde la URL
  const initialProductId = useRef<string | null>(searchParams.get('producto'));

  // ✅ Mostrar card después de bienvenida
  useEffect(() => {
    if (showMainContent && initialProductId.current) {
      setProductoActivo(initialProductId.current);
    }
  }, [showMainContent]);

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
            <Productos categoria={activeTab} onProductoClick={setProductoActivo} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {productoActivo && (
          <ProductoDetalle
            id={productoActivo}
            onClose={cerrarCard}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
