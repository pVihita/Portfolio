import { useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationUtils } from '@/utils/gsap';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/contexts/DataContext';

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { projects } = useData();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title animation - ensure visibility
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
          y: 50,
          rotationX: -45,
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

      // Project cards animation - removed excessive bouncing
      const projectCards = gridRef.current?.querySelectorAll('.project-card');
      
      projectCards?.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        const techTags = card.querySelectorAll('.tech-tag');
        const buttons = card.querySelectorAll('.project-button');

        // Initial setup
        gsap.set(card, {
          opacity: 0,
          y: 80,
          scale: 0.9
        });

        // Entrance animation - smooth and professional
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.15
        })
        .from(image, {
          scale: 1.2,
          duration: 1,
          ease: "power2.out"
        }, 0)
        .from(techTags, {
          opacity: 0,
          scale: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .from(buttons, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.2");

        // Hover effects - subtle and elegant
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(image, {
            scale: 1.05,
            duration: 0.6,
            ease: "power2.out"
          });

          // Add subtle glow
          gsap.to(card, {
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)",
            duration: 0.4
          });
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(image, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
          });

          gsap.to(card, {
            boxShadow: "0 0px 0px rgba(139, 92, 246, 0)",
            duration: 0.4
          });
        });

        // Very subtle breathing animation instead of floating
        gsap.to(card, {
          y: -2,
          duration: 4 + index * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });
      });

      // Background grid animation
      createProjectGrid();

    }, projectsRef);

    return () => ctx.revert();
  }, [projects]);

  const createProjectGrid = () => {
    const container = projectsRef.current;
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
      opacity: 0.05;
      pointer-events: none;
    `;

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'projectsGridGradient');
    gradient.innerHTML = `
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#EC4899" />
    `;
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create code-like pattern
    for (let i = 0; i < 15; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (i * 80).toString());
      rect.setAttribute('y', (Math.random() * 600).toString());
      rect.setAttribute('width', '60');
      rect.setAttribute('height', '4');
      rect.setAttribute('fill', 'url(#projectsGridGradient)');
      svg.appendChild(rect);

      gsap.to(rect, {
        opacity: [0.3, 0.8, 0.3],
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        delay: i * 0.2
      });
    }

    container.appendChild(svg);
  };

  return (
    <section 
      ref={projectsRef} 
      id="projects" 
      className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group h-full cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-purple-100 dark:border-purple-800 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="project-content p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        {project.status}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="tech-tag bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    <Button
                      asChild
                      className="project-button flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="project-button flex-1 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;