import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function FloatingBackground() {
  const containerRef = useRef();
  
  useEffect(() => {
    const shapes = Array.from({ length: 15 }).map(() => {
      const shape = document.createElement('div');
      shape.className = 'absolute w-12 h-12 rounded-lg bg-gradient-to-br opacity-20';
      
      // Randomize initial positions
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Random color combinations
      const colors = [
        'from-blue-400 to-purple-500',
        'from-green-400 to-blue-500',
        'from-purple-400 to-pink-500',
        'from-yellow-400 to-orange-500',
      ];
      shape.classList.add(...colors[Math.floor(Math.random() * colors.length)].split(' '));
      
      containerRef.current.appendChild(shape);
      return shape;
    });
    
    shapes.forEach((shape) => {
      gsap.to(shape, {
        x: 'random(-100, 100)',
        y: 'random(-100, 100)',
        rotation: 'random(-180, 180)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'none',
      });
    });
    
    return () => {
      shapes.forEach(shape => shape.remove());
    };
  }, []);
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
    />
  );
}
