'use client';

import Bienvenida from './components/Bienvenida'; 
import Main from './components/Main';
import Footer from './components/Footer';


export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Bienvenida />
    </main>
  );
}
