
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
    { name: 'HTML', icon: 'devicon-html5-plain colored', level: 95 },
    { name: 'CSS', icon: 'devicon-css3-plain colored', level: 90 },
    { name: 'JavaScript', icon: 'devicon-javascript-plain colored', level: 88 },
    { name: 'TypeScript', icon: 'devicon-typescript-plain colored', level: 85 },
    { name: 'React', icon: 'devicon-react-original colored', level: 92 },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain colored', level: 80 },
    { name: 'Firebase', icon: 'devicon-firebase-plain colored', level: 75 },
    { name: 'Git', icon: 'devicon-git-plain colored', level: 85 },
    { name: 'Vercel', icon: 'devicon-vercel-original colored', level: 78 },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 relative overflow-hidden">
      {/* Animated Background SVG */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute">
          <defs>
            <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          {/* Animated Geometric Shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.polygon
              key={i}
              points="50,0 100,50 50,100 0,50"
              fill="url(#skillsGrad)"
              initial={{ 
                x: Math.random() * 1000, 
                y: Math.random() * 1000,
                rotate: 0,
                scale: 0
              }}
              animate={{
                rotate: 360,
                scale: [0, 0.5, 0],
                x: Math.random() * 1000,
                y: Math.random() * 1000,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5
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

        {/* Skills Grid with Hexagonal Design */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
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
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, rotateY: 15 }}
                className="relative group"
              >
                {/* Hexagonal Background with SVG */}
                <div className="relative h-40 flex items-center justify-center">
                  <svg
                    width="160"
                    height="140"
                    viewBox="0 0 160 140"
                    className="absolute"
                  >
                    <defs>
                      <linearGradient id={`hex-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#EC4899" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
                      </linearGradient>
                      <filter id={`glow-${index}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Hexagon Shape */}
                    <motion.polygon
                      points="80,10 120,35 120,85 80,110 40,85 40,35"
                      fill={`url(#hex-grad-${index})`}
                      stroke="url(#hex-grad-${index})"
                      strokeWidth="2"
                      filter={`url(#glow-${index})`}
                      initial={{ scale: 0, rotate: 0 }}
                      animate={inView ? { scale: 1, rotate: 360 } : {}}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1,
                        type: "spring"
                      }}
                    />
                    
                    {/* Skill Level Progress Ring */}
                    <motion.circle
                      cx="80"
                      cy="60"
                      r="35"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.2)"
                      strokeWidth="4"
                    />
                    <motion.circle
                      cx="80"
                      cy="60"
                      r="35"
                      fill="none"
                      stroke="url(#hex-grad-${index})"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: skill.level / 100 } : {}}
                      transition={{ 
                        duration: 2, 
                        delay: index * 0.1 + 0.5,
                        ease: "easeOut"
                      }}
                      style={{
                        strokeDasharray: 220,
                        strokeDashoffset: 220,
                        transform: 'rotate(-90deg)',
                        transformOrigin: '80px 60px'
                      }}
                    />
                  </svg>
                  
                  {/* Skill Icon and Info */}
                  <div className="relative z-10 text-center">
                    <motion.i 
                      className={`${skill.icon} text-4xl mb-2 block`}
                      whileHover={{ 
                        scale: 1.3,
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    />
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                      {skill.name}
                    </h3>
                    <motion.span 
                      className="text-xs text-purple-600 dark:text-purple-400 font-semibold"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                </div>

                {/* Floating Particles around skill */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, particleIndex) => (
                    <motion.div
                      key={particleIndex}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      initial={{ 
                        x: 80, 
                        y: 70,
                        scale: 0
                      }}
                      animate={{
                        x: 80 + Math.cos((particleIndex * 60) * (Math.PI / 180)) * 60,
                        y: 70 + Math.sin((particleIndex * 60) * (Math.PI / 180)) * 60,
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.1 + particleIndex * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-full px-8 py-4 border border-purple-500/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
            />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Continuously Learning & Growing
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
