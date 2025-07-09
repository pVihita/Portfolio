import { useState, useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationUtils } from '@/utils/gsap';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const Navigation = () => {
  const navRef = useRef<HTMLNavElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: href,
      ease: "power3.inOut"
    });
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Initial navigation entrance
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });

      // Logo animation
      gsap.from(logoRef.current, {
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.8
      });

      // Menu items stagger animation
      const menuItems = menuRef.current?.querySelectorAll('.nav-item');
      gsap.from(menuItems, {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 1
      });

      // Add magnetic effect to logo
      if (logoRef.current) {
        animationUtils.magneticButton(logoRef.current);
      }

      // Add magnetic effect to nav items
      menuItems?.forEach(item => {
        animationUtils.magneticButton(item as HTMLElement);
      });

      // Scroll-triggered background change
      ScrollTrigger.create({
        trigger: "body",
        start: "50px top",
        end: "bottom bottom",
        onToggle: (self) => {
          gsap.to(navRef.current, {
            backgroundColor: self.isActive ? "rgba(0, 0, 0, 0.8)" : "transparent",
            backdropFilter: self.isActive ? "blur(10px)" : "none",
            duration: 0.3
          });
        }
      });

    }, navRef);

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        height: 'auto',
        duration: 0.4,
        ease: "power2.out"
      });

      const mobileItems = mobileMenuRef.current?.querySelectorAll('.mobile-nav-item');
      gsap.from(mobileItems, {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
        delay: 0.2
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div
            ref={logoRef}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
          >
            Romil Patel
          </div>

          {/* Desktop Navigation */}
          <div ref={menuRef} className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="nav-item text-gray-300 hover:text-purple-400 transition-colors relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-purple-400 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-300 hover:text-purple-400"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-purple-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className="md:hidden mt-4 bg-black/90 backdrop-blur-md rounded-lg border border-purple-500/20 overflow-hidden"
          style={{ opacity: 0, height: 0 }}
        >
          <div className="py-4 px-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="mobile-nav-item block w-full text-left text-gray-300 hover:text-purple-400 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;