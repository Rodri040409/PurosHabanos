'use client';

import Hero from './components/Hero'; 
import Main from './components/Main';
import Footer from './components/Footer';


export default function HomePage() {
  return (
    <main className='min-h-screen flex flex-col'>
      <Hero />
    </main>
  );
}
