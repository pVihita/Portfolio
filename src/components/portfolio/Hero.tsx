import { useEffect, useRef, useState } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { animationUtils } from '@/utils/gsap';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const roles = [
    "Computer Science Student",
    "Aspiring Developer", 
    "React Enthusiast",
    "Problem Solver"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    const ctx = gsap.context(() => {
      // Initial setup - hide all elements
      gsap.set([titleRef.current, subtitleRef.current, descriptionRef.current, buttonsRef.current], {
        opacity: 0,
        y: 100
      });

      // Create master timeline for hero entrance
      const masterTl = gsap.timeline();

      // Animated background particles
      createParticleSystem();

      // Hero entrance animation
      masterTl
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            // Add magnetic effect to title
            if (titleRef.current) {
              animationUtils.magneticButton(titleRef.current);
            }
          }
        })
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.6")
        .to(buttonsRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)"
        }, "-=0.4");

      // Typing animation for roles
      const roleTimeline = gsap.timeline({ repeat: -1 });
      roles.forEach((role, index) => {
        roleTimeline
          .to(subtitleRef.current, {
            text: role,
            duration: 1,
            ease: "none",
            onComplete: () => setCurrentRoleIndex(index)
          })
          .to({}, { duration: 2 }); // Pause between roles
      });

      // Scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 15,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Parallax effect on scroll
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Add magnetic effect to buttons
      const buttons = buttonsRef.current?.querySelectorAll('button');
      buttons?.forEach(button => {
        animationUtils.magneticButton(button as HTMLElement);
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const createParticleSystem = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 260}, 70%, 60%)`
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  const scrollToAbout = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: "#about",
      ease: "power3.inOut"
    });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 z-10" />

      <div className="container mx-auto px-6 text-center relative z-20">
        <div className="space-y-8">
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl lg:text-8xl font-bold cursor-pointer"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Romil Patel
            </span>
          </h1>
          
          <div
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 h-16 flex items-center justify-center font-medium font-mono"
          >
            {roles[currentRoleIndex]}
          </div>

          <p
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about web development and modern technologies. 
            Currently studying Computer Science at ASU while building exceptional digital experiences 
            with React, TypeScript, and cutting-edge design principles.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
            >
              Explore My Work
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('mailto:romilpatel2007@gmail.com')}
              className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToAbout}
        >
          <ChevronDown className="h-8 w-8 text-purple-400 hover:text-purple-300 transition-colors" />
        </div>
      </div>
    </section>
  );
};

export default Hero;