import { useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationUtils } from '@/utils/gsap';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      title: "🎓 Computer Science Student",
      company: "Arizona State University",
      description: "Pursuing my Bachelor's degree in Computer Science with a focus on web development and software engineering."
    },
    {
      title: "🏆 Certified Developer",
      company: "Global Career Accelerator",
      description: "Completed comprehensive training in HTML, CSS, JavaScript, and responsive design principles."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title reveal animation
      animationUtils.textReveal(titleRef.current!, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Content paragraphs animation
      const paragraphs = contentRef.current?.querySelectorAll('p');
      paragraphs?.forEach((p, index) => {
        gsap.from(p, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Experience cards with 3D flip effect
      const experienceCards = experienceRef.current?.querySelectorAll('.experience-card');
      experienceCards?.forEach((card, index) => {
        // Initial setup
        gsap.set(card, {
          opacity: 0,
          rotationY: -90,
          transformOrigin: "center center",
          transformStyle: "preserve-3d"
        });

        // Entrance animation
        gsap.to(card, {
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.3,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        // Hover effect
        const cardElement = card as HTMLElement;
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

      // Stats animation with counter effect
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number');
      statNumbers?.forEach((stat) => {
        const finalValue = stat.textContent || '0';
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        gsap.set(stat, { textContent: '0' });
        
        gsap.to(stat, {
          textContent: numericValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function() {
            const currentValue = Math.round(this.targets()[0].textContent);
            stat.textContent = currentValue + (finalValue.includes('+') ? '+' : '');
          },
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Floating animation for stats cards
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      statCards?.forEach((card, index) => {
        gsap.to(card, {
          y: -5,
          duration: 2 + index * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });
      });

      // Background morphing shapes
      createMorphingShapes();

    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const createMorphingShapes = () => {
    const container = aboutRef.current;
    if (!container) return;

    // Create SVG morphing shapes
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
    gradient.setAttribute('id', 'morphGradient');
    gradient.innerHTML = `
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="50%" stop-color="#EC4899" />
      <stop offset="100%" stop-color="#06B6D4" />
    `;
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create morphing path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('fill', 'url(#morphGradient)');
    path.setAttribute('d', 'M200,300 Q400,200 600,300 Q800,400 1000,300 L1000,600 Q800,500 600,600 Q400,700 200,600 Z');
    svg.appendChild(path);

    container.appendChild(svg);

    // Animate morphing
    const morphTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    morphTimeline.to(path, {
      attr: { d: 'M200,350 Q450,150 600,350 Q750,450 1000,350 L1000,650 Q750,550 600,650 Q450,750 200,650 Z' },
      duration: 4,
      ease: "sine.inOut"
    });
  };

  return (
    <section 
      ref={aboutRef} 
      id="about" 
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          >
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div ref={contentRef} className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Hello! I'm <span className="text-purple-400 font-semibold">Romil Patel</span>, 
              a passionate Computer Science student at Arizona State University with a deep love for 
              creating innovative web experiences. My journey in technology started with curiosity 
              and has evolved into a dedication to crafting clean, efficient, and user-friendly applications.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm passionate about <span className="text-pink-400 font-semibold">web development</span> 
              and constantly learning modern technologies. I'm always exploring new frameworks and 
              staying up-to-date with the latest industry trends and best practices.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or working on personal projects that challenge my skills and creativity.
            </p>

            {/* Animated Stats */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-8">
              {[
                { number: "15+", label: "Projects Completed" },
                { number: "5+", label: "Technologies Learning" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="stat-card text-center bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20"
                >
                  <div className="stat-number text-2xl font-bold text-purple-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Experience Cards */}
          <div ref={experienceRef} className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card relative group cursor-pointer"
              >
                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-purple-400 font-semibold mb-3">
                    {exp.company}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Floating Icon Animation */}
                  <div className="absolute top-4 right-4 text-2xl opacity-70">
                    {exp.title.charAt(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;