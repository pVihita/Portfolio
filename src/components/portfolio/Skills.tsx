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
      // Title animation with split text effect
      const titleAnimation = animationUtils.textReveal(titleRef.current!, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Skills grid entrance
      const skillCards = skillsGridRef.current?.querySelectorAll('.skill-card');
      
      skillCards?.forEach((card, index) => {
        const skillSphere = card.querySelector('.skill-sphere');
        const skillName = card.querySelector('.skill-name');
        const skillIcon = card.querySelector('.skill-icon');

        // Initial setup
        gsap.set([skillSphere, skillName], {
          opacity: 0,
          scale: 0,
          rotationY: 180
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
          ease: "back.out(2)",
          delay: index * 0.1
        })
        .to(skillName, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.4");

        // Hover animations
        const cardElement = card as HTMLElement;
        
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(skillSphere, {
            scale: 1.15,
            rotationY: 360,
            duration: 0.6,
            ease: "power2.out"
          });
          
          gsap.to(skillIcon, {
            scale: 1.3,
            rotation: 15,
            duration: 0.4,
            ease: "back.out(1.7)"
          });

          // Particle explosion effect
          animationUtils.particleExplosion(cardElement, 20);
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
            duration: 0.4,
            ease: "power2.out"
          });
        });

        // Continuous floating animation
        gsap.to(skillSphere, {
          y: -10,
          duration: 2 + Math.random(),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
        });

        // Orbital particles around each skill
        createOrbitalParticles(skillSphere as HTMLElement, index);
      });

      // Background grid animation
      createAnimatedGrid();

    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const createOrbitalParticles = (center: HTMLElement, skillIndex: number) => {
    const particleCount = 6;
    const particles: HTMLElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'orbital-particle';
      particle.style.cssText = `
        position: absolute;
        width: 3px;
        height: 3px;
        background: linear-gradient(45deg, #8B5CF6, #EC4899);
        border-radius: 50%;
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `;
      center.appendChild(particle);
      particles.push(particle);
    }

    particles.forEach((particle, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 60;
      
      gsap.to(particle, {
        motionPath: {
          path: `M0,0 Q${radius},${-radius} ${radius * 2},0 Q${radius},${radius} 0,0`,
          autoRotate: true
        },
        duration: 4 + skillIndex * 0.5,
        ease: "none",
        repeat: -1,
        delay: i * 0.3
      });
    });
  };

  const createAnimatedGrid = () => {
    const gridLines: HTMLElement[] = [];
    const container = skillsRef.current;
    if (!container) return;

    // Create grid lines
    for (let i = 0; i < 20; i++) {
      const line = document.createElement('div');
      line.className = 'grid-line';
      line.style.cssText = `
        position: absolute;
        background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent);
        height: 1px;
        width: 100%;
        top: ${i * 5}%;
        left: 0;
        opacity: 0;
      `;
      container.appendChild(line);
      gridLines.push(line);
    }

    // Animate grid lines
    gridLines.forEach((line, i) => {
      gsap.to(line, {
        opacity: 0.3,
        duration: 0.1,
        delay: i * 0.05,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(line, {
        scaleX: 0,
        transformOrigin: "center",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.1
      });
    });
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
                <div className="absolute w-36 h-36 rounded-full border-2 border-purple-500/40 animate-spin" 
                     style={{ animationDuration: '15s' }} />
                
                {/* Middle Ring */}
                <div className="absolute w-28 h-28 rounded-full border border-pink-500/50 animate-spin" 
                     style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
                
                {/* Inner Core */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-lg flex items-center justify-center border border-white/20 shadow-2xl">
                  <i 
                    className={`skill-icon ${skill.icon} text-4xl`}
                  />
                </div>
              </div>

              {/* Skill Name */}
              <h3 className="skill-name text-lg md:text-xl font-bold text-gray-800 dark:text-white mt-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {skill.name}
              </h3>

              {/* Mastery Indicator */}
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 origin-left" />
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