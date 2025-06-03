
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

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      
      <motion.main 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Projects />
        <Contact />
      </motion.main>
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
