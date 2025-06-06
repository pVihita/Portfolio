

import { useState, useEffect } from 'react';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Achievements from '@/components/portfolio/Achievements';
import Contact from '@/components/portfolio/Contact';
import ParticleBackground from '@/components/portfolio/ParticleBackground';
import CursorFollower from '@/components/portfolio/CursorFollower';
import { DataProvider } from '@/contexts/DataContext';

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDark(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <DataProvider>
      <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
        <CursorFollower />
        <ParticleBackground />
        <Navigation isDark={isDark} setIsDark={setIsDark} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </div>
    </DataProvider>
  );
};

export default Index;

