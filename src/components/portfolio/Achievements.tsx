import { useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationUtils } from '@/utils/gsap';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Achievements = () => {
  const achievementsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const achievements = [
    {
      title: 'HTML, CSS, and Bootstrap Badge',
      description: 'Completed certification in HTML, CSS, and Bootstrap through the GCA program.',
      image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/136728910',
      link: 'https://www.credential.net/74c31023-1dd8-4e86-8b18-7f1a518b3b50'
    },
    {
      title: 'JavaScript & APIs Badge',
      description: 'Completed certification in JavaScript & APIs through the GCA program.',
      image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/142435296',
      link: 'https://www.credential.net/3e175b16-4b2e-4b24-93d7-4b24077e3dbe'
    },
    {
      title: 'Intercultural Skills Badge',
      description: 'Completed training in intercultural communication, emotional intelligence, and cultural self-awareness to collaborate effectively in diverse global teams.',
      image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/badge/142918764',
      link: 'https://www.credential.net/6edc1ed8-8b14-47a5-9899-9787f0ade449'
    },
    {
      title: 'Global Career Accelerator Certificate',
      description: 'Completed training in HTML, CSS, JavaScript, and Bootstrap, demonstrating strong front-end development and responsive design skills.',
      image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/142704496',
      link: 'https://www.credential.net/68ac15e5-2b79-41d8-be2e-20433056a854'
    },
    {
      title: 'Publicis Sapient Project Certificate',
      description: 'Completed a real-world web development project using JavaScript and prototyping frameworks, applying product management and user research skills.',
      image: 'https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/142922854',
      link: 'https://www.credential.net/421ca7be-749a-490a-9a26-8b2018c311ca'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title animation
      animationUtils.textReveal(titleRef.current!, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      // Achievement cards animation
      const achievementCards = gridRef.current?.querySelectorAll('.achievement-card');
      
      achievementCards?.forEach((card, index) => {
        const cardElement = card as HTMLElement;
        const badge = card.querySelector('.achievement-badge');
        const content = card.querySelector('.achievement-content');
        const button = card.querySelector('.achievement-button');

        // Initial setup
        gsap.set(card, {
          opacity: 0,
          y: 100,
          rotationX: 45,
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d"
        });

        // Entrance animation
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
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          delay: index * 0.15
        })
        .from(badge, {
          scale: 0,
          rotation: 180,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.6")
        .from(content, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4")
        .from(button, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "back.out(1.7)"
        }, "-=0.2");

        // Hover effects
        cardElement.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(badge, {
            scale: 1.1,
            rotation: 360,
            duration: 0.6,
            ease: "power2.out"
          });

          // Particle explosion effect
          animationUtils.particleExplosion(cardElement, 15);
        });

        cardElement.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.4,
            ease: "power2.out"
          });

          gsap.to(badge, {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        });

        // Continuous floating animation
        gsap.to(card, {
          y: -5,
          duration: 3 + index * 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });

        // Badge glow animation
        gsap.to(badge, {
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.4), 0 0 50px rgba(236, 72, 153, 0.5), 0 0 30px rgba(139, 92, 246, 0.4)",
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5
        });

        // Add magnetic effect to button
        const buttonElement = button as HTMLElement;
        if (buttonElement) {
          animationUtils.magneticButton(buttonElement);
        }
      });

      // Background trophy animation
      createTrophyBackground();

    }, achievementsRef);

    return () => ctx.revert();
  }, []);

  const createTrophyBackground = () => {
    const container = achievementsRef.current;
    if (!container) return;

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
    gradient.setAttribute('id', 'trophyGradient');
    gradient.innerHTML = `
      <stop offset="0%" stop-color="#FFD700" />
      <stop offset="50%" stop-color="#FFA500" />
      <stop offset="100%" stop-color="#FF6347" />
    `;
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Create floating trophies
    for (let i = 0; i < 8; i++) {
      const trophy = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      trophy.setAttribute('transform', `translate(${150 + i * 130}, ${200 + Math.random() * 400})`);

      // Trophy base
      const base = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      base.setAttribute('x', '0');
      base.setAttribute('y', '60');
      base.setAttribute('width', '40');
      base.setAttribute('height', '8');
      base.setAttribute('fill', 'url(#trophyGradient)');
      trophy.appendChild(base);

      // Trophy stem
      const stem = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      stem.setAttribute('x', '16');
      stem.setAttribute('y', '40');
      stem.setAttribute('width', '8');
      stem.setAttribute('height', '20');
      stem.setAttribute('fill', 'url(#trophyGradient)');
      trophy.appendChild(stem);

      // Trophy cup
      const cup = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      cup.setAttribute('d', 'M5,40 Q20,10 35,40 L30,40 Q20,20 10,40 Z');
      cup.setAttribute('fill', 'url(#trophyGradient)');
      trophy.appendChild(cup);

      svg.appendChild(trophy);

      // Animate trophy
      gsap.to(trophy, {
        y: -20,
        rotation: 5,
        duration: 4 + i * 0.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3
      });
    }

    // Create floating stars
    for (let i = 0; i < 20; i++) {
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      star.setAttribute('points', '0,-8 2.4,-2.4 8,-2.4 4,0 6.4,4.8 0,2.4 -6.4,4.8 -4,0 -8,-2.4 -2.4,-2.4');
      star.setAttribute('fill', 'url(#trophyGradient)');
      star.setAttribute('transform', `translate(${Math.random() * 1200}, ${Math.random() * 800})`);
      svg.appendChild(star);

      gsap.to(star, {
        scale: [0, 1, 0.7, 1, 0],
        rotation: [0, 360, 180, 360, 0],
        y: Math.random() * 200 - 100,
        opacity: [0, 0.8, 0.5, 0.8, 0],
        duration: Math.random() * 6 + 4,
        repeat: -1,
        delay: Math.random() * 3,
        ease: "sine.inOut"
      });
    }

    container.appendChild(svg);
  };

  return (
    <section 
      ref={achievementsRef} 
      id="achievements" 
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          >
            Achievements & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card group h-full cursor-pointer"
            >
              <div className="relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 h-full overflow-hidden flex flex-col">
                <div className="achievement-content relative z-10 flex flex-col h-full">
                  <div className="text-center mb-4 flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {achievement.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <div className="achievement-badge relative">
                      <img 
                        src={achievement.image} 
                        alt="Achievement Badge" 
                        className="w-32 h-32 object-contain"
                      />
                    </div>
                  </div>

                  <div className="text-center mt-auto">
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="achievement-button inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 group cursor-pointer"
                    >
                      View Certificate
                      <ExternalLink className="h-4 w-4" />
                    </a>
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

export default Achievements;