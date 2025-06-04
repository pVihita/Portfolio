
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
      {/* Enhanced 3D Background Animation */}
      <div className="absolute inset-0 opacity-20">
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
          
          {/* 3D Network Grid */}
          <motion.g filter="url(#skillsGlow)">
            {/* Horizontal Grid Lines */}
            {[...Array(15)].map((_, i) => (
              <motion.path
                key={`h-grid-${i}`}
                d={`M0,${i * 60 + 50} Q${700 + Math.random() * 200},${i * 60 + 50 + (Math.random() * 80 - 40)} 1400,${i * 60 + 50}`}
                stroke="url(#skillsGrad)"
                strokeWidth="1"
                strokeOpacity="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  y: [0, Math.random() * 20 - 10, 0]
                }}
                transition={{
                  pathLength: { duration: 2, delay: i * 0.1 },
                  y: { duration: 10 + i, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            ))}
            
            {/* Vertical Grid Lines */}
            {[...Array(20)].map((_, i) => (
              <motion.path
                key={`v-grid-${i}`}
                d={`M${i * 70 + 50},0 Q${i * 70 + 50 + (Math.random() * 80 - 40)},${450 + Math.random() * 200} ${i * 70 + 50},900`}
                stroke="url(#skillsGrad)"
                strokeWidth="1"
                strokeOpacity="0.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  x: [0, Math.random() * 20 - 10, 0]
                }}
                transition={{
                  pathLength: { duration: 2, delay: i * 0.1 },
                  x: { duration: 15 + i, repeat: Infinity, ease: "easeInOut" }
                }}
              />
            ))}
          </motion.g>
          
          {/* 3D Floating Tech Nodes */}
          {[...Array(30)].map((_, i) => (
            <motion.g key={`node-${i}`}>
              <motion.circle
                cx={Math.random() * 1400}
                cy={Math.random() * 900}
                r={Math.random() * 6 + 2}
                fill="url(#skillsGrad)"
                filter="url(#skillsGlow)"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1, 1, 0],
                  opacity: [0, 0.8, 0.8, 0],
                  x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                  z: [0, Math.random() * 50, 0]
                }}
                transition={{
                  duration: Math.random() * 15 + 10,
                  delay: Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Connection Lines between nodes */}
              {i < 20 && (
                <motion.line
                  x1={Math.random() * 1400}
                  y1={Math.random() * 900}
                  x2={Math.random() * 1400}
                  y2={Math.random() * 900}
                  stroke="url(#skillsGrad)"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: [0, 1, 1, 0],
                    opacity: [0, 0.3, 0.3, 0]
                  }}
                  transition={{
                    duration: Math.random() * 10 + 5,
                    delay: Math.random() * 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.g>
          ))}
          
          {/* 3D Perspective Grid Floor */}
          <motion.g filter="url(#skillsGlow)" opacity="0.2">
            {[...Array(15)].map((_, i) => (
              <motion.path
                key={`floor-${i}`}
                d={`M${200 + i * 70},800 L${1200 - i * 70},800 L${1200 - i * 70 - 40},${700 - i * 30} L${200 + i * 70 + 40},${700 - i * 30} Z`}
                fill="none"
                stroke="url(#skillsGrad)"
                strokeWidth="0.5"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.2, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 8,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
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
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Technologies I work with to create amazing digital experiences
          </motion.p>
        </motion.div>

        {/* Orbital Skills Layout */}
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
                {/* Enhanced 3D Skill Sphere */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  {/* Outer Orbit Ring */}
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

                {/* Skill Name */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mt-6 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
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

        {/* Summary Section */}
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
            <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
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
