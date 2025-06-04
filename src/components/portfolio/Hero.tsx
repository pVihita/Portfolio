
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Computer Science Student & Aspiring Developer";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 80);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced High-Tech SVG Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="1200"
          height="900"
          viewBox="0 0 1200 900"
          className="opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#EC4899" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.9" />
              <stop offset="75%" stopColor="#10B981" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="codeStream" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
            </linearGradient>
            <filter id="techGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          
          {/* Central Holographic Interface */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Main Interface Frame */}
            <motion.rect 
              x="200" 
              y="150" 
              width="800" 
              height="600" 
              rx="30" 
              fill="none" 
              stroke="url(#techGrad)" 
              strokeWidth="2"
              filter="url(#techGlow)"
              animate={{
                strokeDasharray: ["0 40", "40 40", "80 40"],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Code Matrix Rain Effect */}
            {[...Array(20)].map((_, i) => (
              <motion.g key={`matrix-${i}`}>
                {[...Array(12)].map((_, j) => (
                  <motion.text
                    key={`char-${j}`}
                    x={230 + i * 35}
                    y={180 + j * 45}
                    fontSize="10"
                    fill="url(#codeStream)"
                    fontFamily="JetBrains Mono, monospace"
                    filter="url(#techGlow)"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [180 + j * 45, 180 + j * 45 + 600, 180 + j * 45 + 1200]
                    }}
                    transition={{
                      duration: 5 + Math.random() * 3,
                      delay: i * 0.15 + j * 0.08,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {Math.random() > 0.7 ? (Math.random() > 0.5 ? '{' : '}') : 
                     Math.random() > 0.6 ? (Math.random() > 0.5 ? '(' : ')') :
                     Math.random() > 0.5 ? '1' : '0'}
                  </motion.text>
                ))}
              </motion.g>
            ))}

            {/* Animated Tech Symbols */}
            <motion.g filter="url(#techGlow)">
              {/* React Atom Enhanced */}
              <motion.g
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="300" cy="300" r="6" fill="#61DAFB" />
                {[0, 60, 120].map((angle) => (
                  <ellipse 
                    key={angle}
                    cx="300" 
                    cy="300" 
                    rx="40" 
                    ry="15" 
                    fill="none" 
                    stroke="#61DAFB" 
                    strokeWidth="2" 
                    transform={`rotate(${angle} 300 300)`}
                  />
                ))}
              </motion.g>

              {/* JavaScript Quantum Circuit */}
              <motion.g
                animate={{
                  rotate: -360,
                  x: [0, 20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <rect x="850" y="250" width="80" height="80" rx="10" fill="#F7DF1E" />
                <text x="890" y="300" fontSize="24" fill="#000" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">JS</text>
                {/* Circuit lines */}
                <path d="M 850 290 L 800 290 L 800 250" stroke="#F7DF1E" strokeWidth="2" fill="none"/>
                <path d="M 930 290 L 980 290 L 980 350" stroke="#F7DF1E" strokeWidth="2" fill="none"/>
              </motion.g>

              {/* CSS Grid Animation */}
              <motion.g
                animate={{
                  rotateY: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {[0, 1, 2].map((row) => 
                  [0, 1, 2].map((col) => (
                    <motion.rect
                      key={`${row}-${col}`}
                      x={250 + col * 25}
                      y={500 + row * 25}
                      width="20"
                      height="20"
                      fill="#1572B6"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        delay: (row + col) * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))
                )}
              </motion.g>

              {/* TypeScript Diamond */}
              <motion.g
                animate={{
                  rotate: 360,
                  y: [0, -15, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <polygon points="900,500 930,530 900,560 870,530" fill="#3178C6" />
                <text x="900" y="540" fontSize="14" fill="white" fontWeight="bold" textAnchor="middle" fontFamily="JetBrains Mono">TS</text>
              </motion.g>
            </motion.g>

            {/* Quantum Data Streams */}
            <motion.g stroke="url(#techGrad)" strokeWidth="1.5" fill="none" opacity="0.7">
              {[...Array(25)].map((_, i) => (
                <motion.path
                  key={`stream-${i}`}
                  d={`M ${150 + i * 40} 750 Q ${250 + i * 30} ${650 - i * 15} ${350 + i * 35} 700`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ 
                    duration: 2.5, 
                    delay: i * 0.08,
                    repeat: Infinity, 
                    repeatDelay: 3,
                    ease: "easeInOut" 
                  }}
                />
              ))}
              
              {/* Data Particles */}
              {[...Array(15)].map((_, i) => (
                <motion.circle
                  key={`particle-${i}`}
                  r="3"
                  fill="#8B5CF6"
                  filter="url(#techGlow)"
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <animateMotion
                    dur={`${4 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M ${150 + i * 40} 750 Q ${250 + i * 30} ${650 - i * 15} ${350 + i * 35} 700`}
                  />
                </motion.circle>
              ))}
            </motion.g>
          </motion.g>

          {/* Background Ambient Effects */}
          <motion.circle
            cx="600"
            cy="450"
            r="300"
            fill="url(#centerGlow)"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8,
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
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold"
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
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 h-16 flex items-center justify-center font-sans font-medium"
          >
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono"
            >
              {text}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1 text-purple-400 font-mono"
            >
              |
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-sans"
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
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-sans"
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
                className="border-2 border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/25 font-sans"
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
