
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const experiences = [
    {
      title: "🎓 Computer Science Student",
      company: "Arizona State University",
      description: "Pursuing my Bachelor's degree in Computer Science with a focus on web development and software engineering."
    },
    {
      title: "💻 Frontend Developer",
      company: "Self-Employed & Projects",
      description: "Building responsive web applications using React, TypeScript, and modern web technologies."
    },
    {
      title: "🏆 Certified Developer",
      company: "Global Career Accelerator",
      description: "Completed comprehensive training in HTML, CSS, JavaScript, and responsive design principles."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black relative overflow-hidden">
      {/* Animated Background SVG */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute">
          <defs>
            <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          
          {/* Neural Network Animation */}
          <motion.g stroke="url(#aboutGrad)" strokeWidth="1" fill="none">
            {/* Network Nodes */}
            {[...Array(20)].map((_, i) => (
              <motion.circle
                key={i}
                cx={100 + (i % 5) * 200}
                cy={100 + Math.floor(i / 5) * 150}
                r="4"
                fill="url(#aboutGrad)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.5, 1], 
                  opacity: [0, 1, 0.7] 
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 4
                }}
              />
            ))}
            
            {/* Connecting Lines */}
            {[...Array(15)].map((_, i) => (
              <motion.line
                key={i}
                x1={100 + (i % 4) * 200}
                y1={100 + Math.floor(i / 4) * 150}
                x2={300 + (i % 3) * 200}
                y2={250 + Math.floor(i / 3) * 150}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              Hello! I'm <span className="text-purple-400 font-semibold">Romil Patel</span>, 
              a passionate Computer Science student at Arizona State University with a deep love for 
              creating innovative web experiences. My journey in technology started with curiosity 
              and has evolved into a dedication to crafting clean, efficient, and user-friendly applications.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              I specialize in <span className="text-pink-400 font-semibold">frontend development</span> 
              with expertise in React, TypeScript, and modern web technologies. I'm constantly learning 
              and staying up-to-date with the latest industry trends and best practices.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-lg text-gray-300 leading-relaxed"
            >
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or working on personal projects that challenge my skills and creativity.
            </motion.p>

            {/* Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-2 gap-6 mt-8"
            >
              {[
                { number: "15+", label: "Projects Completed" },
                { number: "5+", label: "Technologies Mastered" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  className="text-center bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-purple-500/20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                    className="text-2xl font-bold text-purple-400 mb-1"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Experience Cards with SVG */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                className="relative group"
              >
                {/* SVG Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 300 150">
                    <defs>
                      <linearGradient id={`expGrad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0,75 Q75,25 150,75 T300,75"
                      stroke={`url(#expGrad${index})`}
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 1 + index * 0.3 }}
                    />
                    {/* Animated Dots */}
                    <motion.circle r="3" fill={`url(#expGrad${index})`}>
                      <motion.animateMotion
                        dur="4s"
                        repeatCount="indefinite"
                        begin={`${index * 0.5}s`}
                        path="M0,75 Q75,25 150,75 T300,75"
                      />
                    </motion.circle>
                  </svg>
                </div>

                <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors"
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + index * 0.2 }}
                    className="text-purple-400 font-semibold mb-3"
                  >
                    {exp.company}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + index * 0.2 }}
                    className="text-gray-300 leading-relaxed"
                  >
                    {exp.description}
                  </motion.p>

                  {/* Floating Icon Animation */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute top-4 right-4 text-2xl opacity-70"
                  >
                    {exp.title.charAt(0)}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
