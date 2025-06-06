
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Achievements from '@/components/portfolio/Achievements';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';
import ParticleBackground from '@/components/portfolio/ParticleBackground';
import CursorFollower from '@/components/portfolio/CursorFollower';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black text-white">
      <ParticleBackground />
      <CursorFollower />
      <ParticleBackground isDark={isDark} />
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Portfolio />
    </ThemeProvider>
  );
};

export default Index;
