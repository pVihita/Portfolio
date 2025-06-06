import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      title: 'AWS Certified Solutions Architect',
      description: 'Professional certification demonstrating expertise in designing distributed systems on AWS.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=200',
      link: 'https://example.com/cert1'
    },
    {
      title: 'React Developer Certification',
      description: 'Advanced certification in React development and best practices.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=200',
      link: 'https://example.com/cert2'
    },
    {
      title: 'Google Cloud Professional',
      description: 'Certification in Google Cloud Platform services and architecture.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=200',
      link: 'https://example.com/cert3'
    },
    {
      title: 'Full Stack Developer Bootcamp',
      description: 'Completed intensive 12-week bootcamp covering modern web development technologies.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=200',
      link: 'https://example.com/cert4'
    },
    {
      title: 'JavaScript Advanced Concepts',
      description: 'Deep dive certification covering advanced JavaScript patterns and concepts.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=200',
      link: 'https://example.com/cert5'
    },
    {
      title: 'DevOps Foundation Certificate',
      description: 'Foundation level certification in DevOps practices and tools.',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=200',
      link: 'https://example.com/cert6'
    }
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
      {/* Animated Achievement Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute">
          <defs>
            <linearGradient id="achieveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF6347" />
            </linearGradient>
            <filter id="achieveGlow">
              <feGaussianBlur stdDeviation="4" result="glow"/>
              <feComposite in="SourceGraphic" in2="glow" operator="over"/>
            </filter>
          </defs>
          
          {/* 3D Trophy */}
          <motion.g 
            filter="url(#achieveGlow)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 0.7,
              y: [0, -20, 0]
            }}
            transition={{
              scale: { duration: 1 },
              opacity: { duration: 1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Trophy Base */}
            <rect x="550" y="600" width="100" height="20" fill="url(#achieveGrad)" />
            <rect x="570" y="580" width="60" height="20" fill="url(#achieveGrad)" />
            
            {/* Trophy Stem */}
            <rect x="590" y="480" width="20" height="100" fill="url(#achieveGrad)" />
            
            {/* Trophy Cup */}
            <path d="M550,480 Q600,420 650,480 L630,480 Q600,450 570,480 Z" fill="url(#achieveGrad)" />
            <path d="M560,480 L640,480 L630,450 L570,450 Z" fill="url(#achieveGrad)" />
          </motion.g>
          
          {/* Star Animations */}
          {[...Array(15)].map((_, i) => (
            <motion.g key={i}>
              <motion.polygon
                points="0,-20 6,-8 20,-8 10,0 16,12 0,6 -16,12 -10,0 -20,-8 -6,-8"
                fill="url(#achieveGrad)"
                filter="url(#achieveGlow)"
                initial={{ 
                  x: Math.random() * 1200, 
                  y: Math.random() * 800,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  scale: [0, 1, 0.7, 1, 0],
                  rotate: [0, 360, 180, 360, 0],
                  y: [Math.random() * 800, Math.random() * 800 - 200],
                  opacity: [0, 0.8, 0.5, 0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 6 + 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            </motion.g>
          ))}
          
          {/* 3D Medal Ribbons */}
          {[...Array(5)].map((_, i) => {
            const x = 300 + i * 150;
            return (
              <motion.g key={`medal-${i}`} filter="url(#achieveGlow)">
                <motion.path
                  d={`M${x},200 C${x-30},250 ${x-20},300 ${x},320 C${x+20},300 ${x+30},250 ${x},200`}
                  fill="none"
                  stroke="url(#achieveGrad)"
                  strokeWidth="8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: 1, 
                    opacity: 0.7,
                    y: [0, 10, 0]
                  }}
                  transition={{
                    pathLength: { duration: 2, delay: i * 0.3 },
                    opacity: { duration: 1, delay: i * 0.3 },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                  }}
                />
                <motion.circle
                  cx={x}
                  cy="200"
                  r="25"
                  fill="url(#achieveGrad)"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    y: [0, 10, 0]
                  }}
                  transition={{
                    scale: { duration: 1, delay: i * 0.3 + 0.5 },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                  }}
                />
              </motion.g>
            );
          })}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Achievements & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100, rotateX: 90 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.03, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group perspective-1000 h-full"
            >
              <div className="relative bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 h-full overflow-hidden flex flex-col">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 300 400">
                    <defs>
                      <radialGradient id={`bgPattern${index}`} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
                      </radialGradient>
                    </defs>
                    <motion.circle
                      cx="150"
                      cy="200"
                      r="80"
                      fill={`url(#bgPattern${index})`}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={inView ? { 
                        scale: [0, 1.2, 1], 
                        rotate: [0, 180, 360] 
                      } : {}}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.2,
                        ease: "easeOut"
                      }}
                    />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-center mb-4 flex-grow">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors"
                    >
                      {achievement.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: index * 0.15 + 0.4 }}
                      className="text-gray-300 leading-relaxed mb-6"
                    >
                      {achievement.description}
                    </motion.p>
                  </div>
                  
                  <div className="flex justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: 180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.15 + 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.5 }
                      }}
                      className="relative"
                    >
                      <img 
                        src={achievement.image} 
                        alt="Achievement Badge" 
                        className="w-32 h-32 object-contain"
                      />
                      {/* Glow Effect */}
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(139, 92, 246, 0.5)",
                            "0 0 40px rgba(236, 72, 153, 0.7)",
                            "0 0 20px rgba(139, 92, 246, 0.5)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute inset-0 rounded-full"
                      />
                    </motion.div>
                  </div>

                  <div className="text-center mt-auto">
                    <motion.a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.15 + 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 group"
                    >
                      View Certificate
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </motion.div>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
