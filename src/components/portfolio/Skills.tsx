
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
      {/* Enhanced Background Animation */}
      <div className="absolute inset-0 opacity-15">
        <svg width="100%" height="100%" viewBox="0 0 1400 900" className="absolute">
          <defs>
            <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <filter id="skillsGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Geometric Network */}
          <motion.g stroke="url(#skillsGrad)" strokeWidth="1.5" fill="none" filter="url(#skillsGlow)">
            {[...Array(30)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${i * 50},0 L${i * 50 + 25},${Math.random() * 300 + 100} L${(i + 1) * 50},${Math.random() * 300 + 200} L${i * 50 + 75},${Math.random() * 300 + 300}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 4
                }}
              />
            ))}
          </motion.g>
          
          {/* Floating Tech Particles */}
          {[...Array(60)].map((_, i) => (
            <motion.circle
              key={i}
              cx={Math.random() * 1400}
              cy={Math.random() * 900}
              r={Math.random() * 4 + 1}
              fill="url(#skillsGrad)"
              filter="url(#skillsGlow)"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 1, 0.3],
                x: [0, Math.random() * 40 - 20, 0],
                y: [0, Math.random() * 40 - 20, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 4,
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
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift bg-200%">
              Skills & Technologies
            </span>
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-6"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Technologies I work with to create amazing digital experiences
          </motion.p>
        </motion.div>

        {/* Enhanced Orbital Skills Layout */}
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
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
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 8
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateY: 15,
                  rotateX: 10,
                  transition: { duration: 0.3 }
                }}
                className="relative group flex flex-col items-center"
              >
                {/* Enhanced Skill Sphere */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Outer Quantum Ring */}
                  <motion.div
                    className="absolute w-36 h-36 rounded-full border-2 border-purple-500/40"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.15, 1]
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  />
                  
                  {/* Middle Energy Ring */}
                  <motion.div
                    className="absolute w-28 h-28 rounded-full border border-pink-500/50"
                    animate={{
                      rotate: -360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                    }}
                  />
                  
                  {/* Inner Core Sphere */}
                  <motion.div
                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-blue-600/30 backdrop-blur-lg flex items-center justify-center border border-white/20 shadow-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(139, 92, 246, 0.4)",
                        "0 0 50px rgba(236, 72, 153, 0.5)",
                        "0 0 30px rgba(139, 92, 246, 0.4)"
                      ],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{
                      boxShadow: "0 0 60px rgba(139, 92, 246, 0.8)",
                      scale: 1.1
                    }}
                  >
                    {/* Skill Icon */}
                    <motion.i 
                      className={`${skill.icon} text-4xl`}
                      whileHover={{ 
                        scale: 1.4,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.6 }
                      }}
                      animate={{
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2
                      }}
                    />
                  </motion.div>
                  
                  {/* Orbiting Particles */}
                  {[...Array(6)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                      animate={{
                        x: [
                          0, 
                          Math.cos((particleIndex * 60) * (Math.PI / 180)) * 60,
                          Math.cos((particleIndex * 60 + 180) * (Math.PI / 180)) * 60,
                          0
                        ],
                        y: [
                          0,
                          Math.sin((particleIndex * 60) * (Math.PI / 180)) * 60,
                          Math.sin((particleIndex * 60 + 180) * (Math.PI / 180)) * 60,
                          0
                        ],
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.2, 1.2, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: index * 0.3 + particleIndex * 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Enhanced Skill Name */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-lg md:text-xl font-sans font-bold text-gray-800 dark:text-white mt-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
                >
                  {skill.name}
                </motion.h3>

                {/* Animated Mastery Indicator */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
                  className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 origin-left"
                  whileHover={{ scaleX: 1.2, height: 2 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mt-24"
        >
          <div className="inline-flex items-center gap-6 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-full px-10 py-6 border border-purple-500/20 shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium font-sans text-lg">
              Continuously Learning & Growing
            </span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 bg-purple-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
