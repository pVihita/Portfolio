
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
      {/* High-Tech Web Developer SVG Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="800"
          height="600"
          viewBox="0 0 800 600"
          className="opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="techGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated Monitor/Computer */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Monitor Base */}
            <rect x="320" y="450" width="160" height="20" rx="10" fill="url(#techGrad1)" />
            <rect x="380" y="420" width="40" height="50" rx="5" fill="url(#techGrad1)" />
            
            {/* Monitor Screen */}
            <rect x="280" y="250" width="240" height="180" rx="15" fill="#1a1a2e" stroke="url(#techGrad1)" strokeWidth="3" />
            <rect x="290" y="260" width="220" height="160" rx="8" fill="#16213e" />
            
            {/* Code Lines Animation */}
            <motion.g>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.rect
                  key={i}
                  x="300"
                  y={280 + i * 20}
                  width={120 + Math.random() * 80}
                  height="3"
                  rx="2"
                  fill="url(#codeGrad)"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 120 + Math.random() * 80, opacity: 1 }}
                  transition={{ 
                    delay: i * 0.2 + 1,
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 4,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </motion.g>
          </motion.g>

          {/* Floating Code Symbols */}
          <motion.g filter="url(#glow)">
            {/* HTML Brackets */}
            <motion.text
              x="150"
              y="200"
              fontSize="24"
              fill="#E34F26"
              fontFamily="monospace"
              animate={{
                y: [200, 180, 200],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              &lt;/&gt;
            </motion.text>
            
            {/* CSS Curly Braces */}
            <motion.text
              x="600"
              y="180"
              fontSize="28"
              fill="#1572B6"
              fontFamily="monospace"
              animate={{
                y: [180, 160, 180],
                rotate: [0, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              {'{}'}
            </motion.text>
            
            {/* JavaScript Function */}
            <motion.text
              x="120"
              y="400"
              fontSize="20"
              fill="#F7DF1E"
              fontFamily="monospace"
              animate={{
                x: [120, 140, 120],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              function()
            </motion.text>
            
            {/* React Brackets */}
            <motion.text
              x="580"
              y="420"
              fontSize="22"
              fill="#61DAFB"
              fontFamily="monospace"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              ⚛
            </motion.text>
          </motion.g>

          {/* Animated Circuit Lines */}
          <motion.g stroke="url(#techGrad1)" strokeWidth="2" fill="none" opacity="0.6">
            <motion.path
              d="M 100 300 Q 200 280 300 300 T 500 300"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 700 250 Q 600 230 500 250 T 300 250"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Animated Dots on Circuit */}
            <motion.circle
              r="4"
              fill="#8B5CF6"
              filter="url(#glow)"
            >
              <motion.animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M 100 300 Q 200 280 300 300 T 500 300"
              />
            </motion.circle>
          </motion.g>

          {/* Data Flow Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              r="2"
              fill={i % 3 === 0 ? "#8B5CF6" : i % 3 === 1 ? "#EC4899" : "#06B6D4"}
              initial={{ 
                x: Math.random() * 800, 
                y: Math.random() * 600,
                opacity: 0 
              }}
              animate={{
                x: Math.random() * 800,
                y: Math.random() * 600,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
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
