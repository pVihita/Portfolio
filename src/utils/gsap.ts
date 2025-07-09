import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin, DrawSVGPlugin, SplitText);

// Global GSAP configuration for award-winning animations
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

// Custom eases for premium feel
gsap.registerEase("customBounce", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.414,0.7 0.455,0.676 0.51,0.639 0.573,0.818 0.604,0.818 0.636,0.818 0.672,0.639 0.727,0.676 0.768,0.7 0.812,0.985 0.82,1 0.828,0.963 0.869,0.728 0.91,0.561 0.94,0.438 1.042,0 1.042,0 1.042,0 1,0 1,0");

// Master timeline for page load
export const masterTimeline = gsap.timeline({ paused: true });

// Utility functions for complex animations
export const animationUtils = {
  // Magnetic button effect
  magneticButton: (element: HTMLElement) => {
    const button = element;
    const buttonBounds = button.getBoundingClientRect();
    
    button.addEventListener('mousemove', (e) => {
      const relX = e.clientX - buttonBounds.left;
      const relY = e.clientY - buttonBounds.top;
      
      gsap.to(button, {
        x: (relX - buttonBounds.width / 2) * 0.3,
        y: (relY - buttonBounds.height / 2) * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  },

  // Liquid morphing effect
  liquidMorph: (element: string) => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(element, {
      morphSVG: "M0,0 Q50,100 100,0 Q150,100 200,0 L200,200 L0,200 Z",
      duration: 3,
      ease: "sine.inOut"
    });
    return tl;
  },

  // Particle explosion
  particleExplosion: (container: HTMLElement, count: number = 50) => {
    const particles: HTMLElement[] = [];
    
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #8B5CF6, #EC4899);
        border-radius: 50%;
        pointer-events: none;
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    const tl = gsap.timeline();
    particles.forEach((particle, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = gsap.utils.random(100, 300);
      
      tl.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: gsap.utils.random(0.5, 2),
        duration: gsap.utils.random(1, 2),
        ease: "power2.out"
      }, 0);
    });

    return tl;
  },

  // Text reveal with split
  textReveal: (element: string, options: any = {}) => {
    const split = new SplitText(element, { type: "chars,words,lines" });
    const tl = gsap.timeline();
    
    tl.from(split.chars, {
      opacity: 0,
      y: 100,
      rotationX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)",
      ...options
    });

    return tl;
  },

  // 3D card flip
  cardFlip3D: (element: HTMLElement) => {
    gsap.set(element, { transformStyle: "preserve-3d" });
    
    const tl = gsap.timeline({ paused: true });
    tl.to(element, {
      rotationY: 180,
      duration: 0.6,
      ease: "power2.inOut"
    });

    return tl;
  },

  // Smooth scroll with momentum
  smoothScroll: () => {
    let currentY = 0;
    let targetY = 0;
    let ease = 0.1;

    const updateScroll = () => {
      targetY = window.scrollY;
      currentY += (targetY - currentY) * ease;
      
      document.body.style.transform = `translateY(${-currentY}px)`;
      requestAnimationFrame(updateScroll);
    };

    updateScroll();
  }
};

// Page transition effects
export const pageTransitions = {
  curtainReveal: () => {
    const tl = gsap.timeline();
    tl.to('.curtain-left', {
      x: '-100%',
      duration: 1.5,
      ease: "power4.inOut"
    })
    .to('.curtain-right', {
      x: '100%',
      duration: 1.5,
      ease: "power4.inOut"
    }, 0);
    
    return tl;
  },

  liquidTransition: () => {
    const tl = gsap.timeline();
    tl.to('.liquid-overlay', {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 1.2,
      ease: "power4.inOut"
    });
    
    return tl;
  }
};

// Scroll-triggered animations
export const scrollAnimations = {
  parallaxElements: () => {
    gsap.utils.toArray('.parallax').forEach((element: any) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  },

  revealOnScroll: () => {
    gsap.utils.toArray('.reveal').forEach((element: any) => {
      gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  }
};

export default gsap;