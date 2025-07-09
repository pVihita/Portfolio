import { useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationUtils } from '@/utils/gsap';

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add DevIcons CDN to head if not already present
    if (!document.querySelector('link[href*="devicon"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
      document.head.appendChild(link);
    }
  }, []);

  const skills = [
    { name: 'HTML', icon: 'devicon-html5-plain colored' },
    { name: 'CSS', icon: 'devicon-css3-plain colored' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    { name: 'React', icon: 'devicon-react-original colored' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored' },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored' },
    { name: 'Git', icon: 'devicon-git-plain colored' },
    { name: 'Vercel', icon: 'devicon-vercel-original colored' },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title animation - ensure it's visible
      gsap.set(titleRef.current, { opacity: 1 });
      
      const titleChars = titleRef.current?.textContent?.split('') || [];
      if (titleRef.current) {
        titleRef.current.innerHTML = titleChars.map(char => 
          char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');
      }

      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.from(chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }

      // Skills grid entrance
      const skillCards = skillsGridRef.current?.querySelectorAll('.skill-card');
      
      skillCards?.forEach((card, index) => {
        const skillSphere = card.querySelector('.skill-sphere');
        const skillName = card.querySelector('.skill-name');
        const skillIcon = card.querySelector('.skill-icon');

        // Initial setup - ensure visibility
        gsap.set(skillSphere, {
          opacity: 0,
          scale: 0.5,
          rotationY: 180
        });

        gsap.set(skillName, {
          opacity: 0,
          y: 30
        });

        // Main animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        // Sphere entrance with 3D effect
        tl.to(skillSphere, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(1.5)",
          delay: index * 0.1
        })
        .to(skillName, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.4");

        // Hover animations
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(skillSphere, {
            scale: 1.1,
            rotationY: 15,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(skillIcon, {
            scale: 1.2,
            rotation: 10,
            duration: 0.3,
            ease: "back.out(1.7)"
          });

          // Subtle glow effect
          gsap.to(skillSphere, {
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
            duration: 0.3
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(skillSphere, {
            scale: 1,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
          });
          
          gsap.to(skillIcon, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });

          gsap.to(skillSphere, {
            boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
            duration: 0.3
          });
        });

        // Subtle breathing animation instead of floating
        gsap.to(skillSphere, {
          scale: 1.02,
          duration: 3 + Math.random(),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });
      });

      // Background grid animation
      createAnimatedGrid();

    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const createAnimatedGrid = () => {
    const container = skillsRef.current;
    if (!container) return;

    // Create SVG background
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 1200 800');
    svg.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0.1;
      pointer-events: none;
    `;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'skillsGridGradient');
    gradient.innerHTML = `
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    `;
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create animated grid pattern
    for (let i = 0; i < 10; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', (i * 80).toString());
      line.setAttribute('x2', '1200');
      line.setAttribute('y2', (i * 80).toString());
      line.setAttribute('stroke', 'url(#skillsGridGradient)');
      line.setAttribute('stroke-width', '1');
      svg.appendChild(line);

      gsap.to(line, {
        strokeDasharray: "10,5",
        strokeDashoffset: -15,
        duration: 2,
        ease: "none",
        repeat: -1,
        delay: i * 0.1
      });
    }

    container.appendChild(svg);
  };

  return (
    <section 
      ref={skillsRef} 
      id="skills" 
      className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Skills & Technologies
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies I work with to create amazing digital experiences
          </p>
        </div>

        <div 
          ref={skillsGridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto"
        >
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-card relative flex flex-col items-center group cursor-pointer"
            >
              {/* 3D Skill Sphere */}
              <div className="skill-sphere relative w-36 h-36 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-36 h-36 rounded-full border-2 border-purple-500/40" 
                     style={{ 
                       animation: 'spin 15s linear infinite'
                     }} />
                
                {/* Middle Ring */}
                <div className="absolute w-28 h-28 rounded-full border border-pink-500/50" 
                     style={{ 
                       animation: 'spin 12s linear infinite reverse'
                     }} />
                
                {/* Inner Core */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-lg flex items-center justify-center border border-white/20 shadow-2xl">
                  <i 
                    className={`skill-icon ${skill.icon} text-4xl`}
                  />
                </div>
              </div>

              {/* Skill Name - Fixed positioning and styling */}
              <h3 className="skill-name text-lg md:text-xl font-bold text-gray-800 dark:text-white mt-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 text-center">
                {skill.name}
              </h3>

              {/* Mastery Indicator */}
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3" />
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="text-center mt-24">
          <div className="inline-flex items-center gap-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-full px-10 py-6 border border-purple-500/20 shadow-lg">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
              Continuously Learning & Growing
            </span>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;