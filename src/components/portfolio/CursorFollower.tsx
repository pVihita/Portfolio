import { useEffect, useRef } from 'react';
import gsap from '@/utils/gsap';

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      isHovering = true;
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(follower, {
        scale: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    // Animate cursor position
    const animateCursor = () => {
      gsap.to(cursor, {
        x: mouseX - 8,
        y: mouseY - 8,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(follower, {
        x: mouseX - 16,
        y: mouseY - 16,
        duration: 0.3,
        ease: "power2.out"
      });

      requestAnimationFrame(animateCursor);
    };

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', updateMousePosition);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Trailing ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-purple-400 rounded-full pointer-events-none z-40 opacity-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
};

export default CursorFollower;