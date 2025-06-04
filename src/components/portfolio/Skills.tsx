
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Circuit Board Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute">
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <filter id="circuitGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Circuit Paths */}
          <motion.g stroke="url(#circuitGrad)" strokeWidth="2" fill="none" filter="url(#circuitGlow)">
            {[...Array(20)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${i * 60},0 L${i * 60},${Math.random() * 400 + 200} L${(i + 1) * 60},${Math.random() * 400 + 200}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 3
                }}
              />
            ))}
          </motion.g>
          
          {/* Circuit Nodes */}
          {[...Array(50)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1200}
              cy={Math.random() * 800}
              r="3"
              fill="url(#circuitGrad)"
              filter="url(#circuitGlow)"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
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
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        {/* Skill Orbs Layout */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0, rotateY: 180 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ 
                  duration: 1, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 120,
                  damping: 10
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 15,
                  transition: { duration: 0.3 }
                }}
                className="relative group flex flex-col items-center"
              >
                {/* Glowing Orb Container */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Outer Energy Ring */}
                  <motion.div
                    className="absolute w-32 h-32 rounded-full border-2 border-purple-500/30"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* Middle Energy Ring */}
                  <motion.div
                    className="absolute w-24 h-24 rounded-full border border-pink-500/40"
                    animate={{
                      rotate: -360,
                      scale: [1, 1.15, 1]
                    }}
                    transition={{
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                  />
                  
                  {/* Inner Orb */}
                  <motion.div
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-lg flex items-center justify-center border border-white/10 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(139, 92, 246, 0.3)",
                        "0 0 40px rgba(236, 72, 153, 0.4)",
                        "0 0 20px rgba(139, 92, 246, 0.3)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      boxShadow: "0 0 60px rgba(139, 92, 246, 0.6)"
                    }}
                  >
                    {/* Skill Icon */}
                    <motion.i 
                      className={`${skill.icon} text-3xl`}
                      whileHover={{ 
                        scale: 1.3,
                        rotate: [0, -15, 15, 0],
                        transition: { duration: 0.6 }
                      }}
                    />
                  </motion.div>
                  
                  {/* Floating Energy Particles */}
                  {[...Array(8)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      animate={{
                        x: [
                          0, 
                          Math.cos((particleIndex * 45) * (Math.PI / 180)) * 50,
                          Math.cos((particleIndex * 45 + 180) * (Math.PI / 180)) * 50,
                          0
                        ],
                        y: [
                          0,
                          Math.sin((particleIndex * 45) * (Math.PI / 180)) * 50,
                          Math.sin((particleIndex * 45 + 180) * (Math.PI / 180)) * 50,
                          0
                        ],
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.2 + particleIndex * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Skill Name */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  className="text-lg font-bold text-gray-800 dark:text-white mt-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                >
                  {skill.name}
                </motion.h3>

                {/* Skill Mastery Indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: index * 0.15 + 1, duration: 0.8 }}
                  className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 origin-left"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skill Mastery Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-full px-8 py-4 border border-purple-500/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Passionate About Learning New Technologies
            </span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-purple-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
