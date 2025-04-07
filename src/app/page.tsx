'use client';

import { useState } from 'react';
import Bienvenida from './components/Bienvenida';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Productos from './components/Productos';

import { AnimatePresence, motion } from 'framer-motion';

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false);

  return (
    // ⬇️ Fondo oscuro aquí directamente
    <main className="min-h-screen flex flex-col bg-[#0C0F14] overflow-hidden">
      <AnimatePresence mode="wait">
        {!showMainContent ? (
          <motion.div
            key="bienvenida"
            className="min-h-screen"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Bienvenida onAnimationComplete={() => setShowMainContent(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="main"
            className="min-h-screen"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <Hero />
            <Nav />
            {/* <Productos /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
