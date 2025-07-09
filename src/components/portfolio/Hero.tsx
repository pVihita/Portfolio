
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const roles = [
    "Computer Science Student",
    "Aspiring Developer", 
    "React Enthusiast",
    "Problem Solver"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsVisible(true);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Advanced 3D SVG Background */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          className="opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            
            <filter id="heroGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* 3D Effect Definitions */}
            <linearGradient id="cubeTopFace" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
            
            <linearGradient id="cubeFrontFace" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            
            <linearGradient id="cubeSideFace" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          
          {/* Center Platform */}
          <motion.circle
            cx="960"
            cy="540"
            r="400"
            fill="url(#centerGlow)"
            animate={{
              r: [400, 430, 400],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* 3D Grid Effect */}
          <motion.g opacity="0.6">
            {/* Horizontal Grid Lines */}
            {[...Array(20)].map((_, i) => (
              <motion.path
                key={`h-grid-${i}`}
                d={`M0,${300 + i * 30} C${640},${300 + i * 30 + (i % 2 === 0 ? 40 : -40)} ${1280},${300 + i * 30 + (i % 2 === 0 ? -30 : 30)} 1920,${300 + i * 30}`}
                stroke="url(#heroGradient)"
                strokeWidth="1"
                strokeOpacity="0.3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Vertical Grid Lines */}
            {[...Array(30)].map((_, i) => (
              <motion.path
                key={`v-grid-${i}`}
                d={`M${300 + i * 50},0 C${300 + i * 50 + (i % 2 === 0 ? 50 : -50)},${540} ${300 + i * 50 + (i % 2 === 0 ? -30 : 30)},${800} ${300 + i * 50},1080`}
                stroke="url(#heroGradient)"
                strokeWidth="1"
                strokeOpacity="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  delay: i * 0.07 + 1,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.g>

          {/* 3D Cubes */}
          {[...Array(8)].map((_, i) => {
            const x = 200 + i * 220;
            const y = 300 + ((i % 3) * 200);
            const size = 40 + Math.random() * 30;
            
            return (
              <motion.g 
                key={`cube-${i}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  y: [y - 20, y + 20, y - 20],
                  x: [x - 10, x + 10, x - 10],
                  rotateY: [0, 360],
                  rotateX: [30, 60, 30]
                }}
                transition={{
                  opacity: { duration: 1 },
                  y: { duration: 10 + i, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 15 + i, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 15, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: `${x}px ${y}px`
                }}
              >
                {/* Top Face */}
                <path 
                  d={`M${x-size/2},${y-size/2} l${size},${-size/2} l${size},${size/2} l${-size},${size/2} Z`}
                  fill="url(#cubeTopFace)" 
                  opacity="0.9"
                  stroke="white"
                  strokeWidth="0.5"
                />
                
                {/* Front Face */}
                <path 
                  d={`M${x-size/2},${y-size/2} l${-size},${size/2} l0,${size} l${size},${-size/2} Z`}
                  fill="url(#cubeFrontFace)" 
                  opacity="0.7"
                  stroke="white"
                  strokeWidth="0.5"
                />
                
                {/* Right Face */}
                <path 
                  d={`M${x-size/2},${y-size/2} l${size},${-size/2} l0,${size} l${-size},${size/2} Z`}
                  fill="url(#cubeSideFace)" 
                  opacity="0.8"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </motion.g>
            );
          })}

          {/* Floating Code Elements */}
          {[...Array(25)].map((_, i) => (
            <motion.text
              key={`code-${i}`}
              x={Math.random() * 1920}
              y={Math.random() * 1080}
              fontFamily="JetBrains Mono, monospace"
              fontSize="12"
              fill="url(#heroGradient)"
              opacity="0.7"
              filter="url(#heroGlow)"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.7, 0],
                y: [
                  Math.random() * 1080,
                  Math.random() * 1080 - 200,
                  Math.random() * 1080 - 400
                ],
                x: [
                  Math.random() * 1920,
                  Math.random() * 1920 + (Math.random() * 100 - 50),
                  Math.random() * 1920
                ]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                delay: Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {['function()', 'const app = {}', '<React />', 'import', 'export', '{code}', 'useState()', '=>'][Math.floor(Math.random() * 8)]}
            </motion.text>
          ))}

          {/* 3D Orbitals */}
          {[...Array(3)].map((_, i) => (
            <motion.g key={`orbital-${i}`}>
              <motion.ellipse
                cx="960"
                cy="540"
                rx={150 + i * 100}
                ry={50 + i * 30}
                fill="none"
                stroke="url(#heroGradient)"
                strokeWidth="1"
                strokeOpacity="0.3"
                animate={{
                  rotateX: [30, 60, 30],
                  rotateY: [0, 360],
                  rx: [150 + i * 100, 170 + i * 100, 150 + i * 100],
                  ry: [50 + i * 30, 60 + i * 30, 50 + i * 30]
                }}
                transition={{
                  rotateX: { duration: 15 + i * 5, repeat: Infinity, ease: "easeInOut" },
                  rotateY: { duration: 30 + i * 10, repeat: Infinity, ease: "linear" },
                  rx: { duration: 8 + i * 3, repeat: Infinity, ease: "easeInOut" },
                  ry: { duration: 8 + i * 3, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  transformOrigin: "960px 540px",
                  transformStyle: "preserve-3d"
                }}
              />
              
              {/* Particles along orbital path */}
              {[...Array(6)].map((_, j) => {
                const angle = j * 60;
                const x = 960 + (150 + i * 100) * Math.cos(angle * Math.PI / 180);
                const y = 540 + (50 + i * 30) * Math.sin(angle * Math.PI / 180);
                
                return (
                  <motion.circle
                    key={`orbital-particle-${i}-${j}`}
                    cx="960"
                    cy="540"
                    r="4"
                    fill="url(#heroGradient)"
                    filter="url(#heroGlow)"
                    animate={{
                      cx: [
                        960 + (150 + i * 100) * Math.cos((angle) * Math.PI / 180),
                        960 + (150 + i * 100) * Math.cos((angle + 120) * Math.PI / 180),
                        960 + (150 + i * 100) * Math.cos((angle + 240) * Math.PI / 180),
                        960 + (150 + i * 100) * Math.cos((angle + 360) * Math.PI / 180)
                      ],
                      cy: [
                        540 + (50 + i * 30) * Math.sin((angle) * Math.PI / 180),
                        540 + (50 + i * 30) * Math.sin((angle + 120) * Math.PI / 180),
                        540 + (50 + i * 30) * Math.sin((angle + 240) * Math.PI / 180),
                        540 + (50 + i * 30) * Math.sin((angle + 360) * Math.PI / 180)
                      ],
                      r: [4, 6, 4],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: j * 0.5
                    }}
                  />
                );
              })}
            </motion.g>
          ))}

          {/* Glowing Central Core */}
          <motion.circle
            cx="960"
            cy="540"
            r="30"
            fill="url(#heroGradient)"
            filter="url(#heroGlow)"
            animate={{
              r: [30, 45, 30],
              filter: ["blur(5px)", "blur(15px)", "blur(5px)"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold"
          >
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent bg-200% animate-gradient-shift"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Romil Patel
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 h-16 flex items-center justify-center font-medium"
          >
            <motion.span
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : -30, 
                rotateX: isVisible ? 0 : 90,
                scale: isVisible ? 1 : 0.8
              }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="font-mono bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              {roles[currentRoleIndex]}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about web development and modern technologies. 
            Currently studying Computer Science at ASU while building exceptional digital experiences 
            with React, TypeScript, and cutting-edge design principles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                <motion.span
                  className="group-hover:animate-text-shimmer bg-gradient-to-r from-white via-purple-200 to-white bg-200% bg-clip-text"
                >
                  Explore My Work
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('mailto:romilpatel2007@gmail.com')}
                className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ 
              y: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.3, y: -5 }}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ChevronDown className="h-8 w-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
