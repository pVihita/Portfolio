import { useEffect, useState } from 'react';
import { ThemeProvider } from 'next-themes';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimations } from '@/utils/gsap';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Achievements from '@/components/portfolio/Achievements';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';

const Portfolio = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize scroll animations
    scrollAnimations.parallaxElements();
    scrollAnimations.revealOnScroll();

    // Smooth scroll setup
    gsap.registerPlugin(ScrollTrigger);
    
    // Page load animation
    const pageLoadTl = gsap.timeline();
    
    // Initial page setup
    gsap.set("body", { overflow: "hidden" });
    
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #0f172a, #581c87, #0f172a);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const loadingText = document.createElement('div');
    loadingText.textContent = 'ROMIL PATEL';
    loadingText.style.cssText = `
      font-size: 3rem;
      font-weight: bold;
      background: linear-gradient(45deg, #8B5CF6, #EC4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      opacity: 0;
    `;
    
    loadingScreen.appendChild(loadingText);
    document.body.appendChild(loadingScreen);

    // Loading animation
    pageLoadTl
      .to(loadingText, {
        opacity: 1,
        scale: 1.2,
        duration: 1,
        ease: "power2.out"
      })
      .to(loadingText, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      })
      .to(loadingScreen, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.removeChild(loadingScreen);
          gsap.set("body", { overflow: "auto" });
        }
      });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black text-white">
      <Navigation />
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