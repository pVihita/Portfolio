
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Full-Stack Developer & ASU Student";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Advanced High-Tech SVG Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="1000"
          height="800"
          viewBox="0 0 1000 800"
          className="opacity-15"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#10B981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="codeFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
            </linearGradient>
            <filter id="neonGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="digitalNoise">
              <feTurbulence baseFrequency="0.9" numOctaves="1" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2"/>
            </filter>
          </defs>
          
          {/* Central Holographic Display */}
          <motion.g
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Holographic Frame */}
            <motion.rect 
              x="250" 
              y="200" 
              width="500" 
              height="400" 
              rx="20" 
              fill="none" 
              stroke="url(#matrixGrad)" 
              strokeWidth="3"
              filter="url(#neonGlow)"
              animate={{
                strokeDasharray: ["0 20", "20 20", "40 20"],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Matrix Code Rain */}
            {[...Array(12)].map((_, i) => (
              <motion.g key={i}>
                {[...Array(8)].map((_, j) => (
                  <motion.text
                    key={j}
                    x={280 + i * 35}
                    y={230 + j * 40}
                    fontSize="12"
                    fill="url(#codeFlow)"
                    fontFamily="monospace"
                    filter="url(#neonGlow)"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [230 + j * 40, 230 + j * 40 + 400, 230 + j * 40 + 800]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      delay: i * 0.2 + j * 0.1,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    {Math.random() > 0.5 ? '1' : '0'}
                  </motion.text>
                ))}
              </motion.g>
            ))}
          </motion.g>

          {/* Floating Tech Elements */}
          <motion.g filter="url(#neonGlow)">
            {/* HTML5 Symbol */}
            <motion.polygon
              points="150,150 200,150 175,100"
              fill="#E34F26"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.text
              x="160"
              y="135"
              fontSize="16"
              fill="white"
              fontWeight="bold"
              textAnchor="middle"
            >
              5
            </motion.text>
            
            {/* CSS3 Cube */}
            <motion.g
              animate={{
                rotateY: [0, 360],
                x: [800, 750, 800]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <rect x="800" y="100" width="60" height="60" fill="#1572B6" />
              <polygon points="800,100 830,70 890,70 860,100" fill="#33A9DC" />
              <polygon points="860,100 890,70 890,130 860,160" fill="#1572B6" />
            </motion.g>
            
            {/* JavaScript Gear */}
            <motion.circle
              cx="150"
              cy="400"
              r="40"
              fill="#F7DF1E"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.text
              x="150"
              y="410"
              fontSize="24"
              fill="#000"
              fontWeight="bold"
              textAnchor="middle"
            >
              JS
            </motion.text>
            
            {/* React Atom */}
            <motion.g
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="850" cy="400" r="8" fill="#61DAFB" />
              <ellipse cx="850" cy="400" rx="25" ry="10" fill="none" stroke="#61DAFB" strokeWidth="2" />
              <ellipse cx="850" cy="400" rx="25" ry="10" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(60 850 400)" />
              <ellipse cx="850" cy="400" rx="25" ry="10" fill="none" stroke="#61DAFB" strokeWidth="2" transform="rotate(120 850 400)" />
            </motion.g>
          </motion.g>

          {/* Neural Network Connections */}
          <motion.g stroke="url(#matrixGrad)" strokeWidth="2" fill="none" opacity="0.6">
            {[...Array(15)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${100 + i * 60} 600 Q ${200 + i * 40} ${500 - i * 20} ${300 + i * 50} 650`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ 
                  duration: 3, 
                  delay: i * 0.1,
                  repeat: Infinity, 
                  repeatDelay: 2,
                  ease: "easeInOut" 
                }}
              />
            ))}
            
            {/* Data Packets */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                r="4"
                fill="#8B5CF6"
                filter="url(#neonGlow)"
              >
                <animateMotion
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                  path={`M ${100 + i * 60} 600 Q ${200 + i * 40} ${500 - i * 20} ${300 + i * 50} 650`}
                />
              </motion.circle>
            ))}
          </motion.g>

          {/* Quantum Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.circle
              key={i}
              r={Math.random() * 3 + 1}
              fill={`hsl(${Math.random() * 60 + 240}, 70%, 60%)`}
              filter="url(#neonGlow)"
              initial={{ 
                x: Math.random() * 1000, 
                y: Math.random() * 800,
                opacity: 0 
              }}
              animate={{
                x: [
                  Math.random() * 1000,
                  Math.random() * 1000,
                  Math.random() * 1000
                ],
                y: [
                  Math.random() * 800,
                  Math.random() * 800,
                  Math.random() * 800
                ],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Holographic Grid */}
          <motion.g stroke="url(#matrixGrad)" strokeWidth="1" opacity="0.3">
            {[...Array(20)].map((_, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={i * 40}
                x2="1000"
                y2={i * 40}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.05 }}
              />
            ))}
            {[...Array(25)].map((_, i) => (
              <motion.line
                key={`v-${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="800"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.03 }}
              />
            ))}
          </motion.g>
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent"
          >
            <motion.span
              animate={{
                textShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(139, 92, 246, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Romil Patel
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-3xl text-gray-300 h-12 flex items-center justify-center"
          >
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {text}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1 text-purple-400"
            >
              |
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Passionate web developer specializing in modern technologies. 
            Creating exceptional digital experiences with React, TypeScript, and cutting-edge design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={scrollToAbout}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  Explore My Work
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('mailto:romilpatel2007@gmail.com')}
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
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
              y: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.2 }}
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
