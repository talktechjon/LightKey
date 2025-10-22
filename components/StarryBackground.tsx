import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  velocity: number;
}

interface Comet {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  len: number;
  life: number;
  maxLife: number;
}

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const cometsRef = useRef<Comet[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext('2d');
    const ctx = ctxRef.current;
    if (!ctx) return;

    const STAR_DENSITY = 0.2;
    const MAX_STARS = 500;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = [];
      cometsRef.current = [];

      const rawStarCount = (canvas.width * canvas.height / 1000) * STAR_DENSITY;
      const starCount = Math.min(MAX_STARS, Math.floor(rawStarCount));
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          alpha: Math.random(),
          velocity: Math.random() * 0.01 // Reduced velocity for slower twinkling
        });
      }
    };

    const MAX_COMETS = 3; // Increased for more shooting stars
    const COMET_SPAWN_CHANCE = 0.001; // Increased for more frequent shooting stars

    const createComet = (): Comet => {
      const side = Math.floor(Math.random() * 4);
      let x, y, dx, dy;
      const speed = Math.random() * 1.5 + 0.5;

      switch (side) {
        case 0: // from top
            x = Math.random() * canvas.width; y = -50;
            dx = (Math.random() - 0.5) * 1.5; dy = speed;
            break;
        case 1: // from right
            x = canvas.width + 50; y = Math.random() * canvas.height;
            dx = -speed; dy = (Math.random() - 0.5) * 1.5;
            break;
        case 2: // from bottom
            x = Math.random() * canvas.width; y = canvas.height + 50;
            dx = (Math.random() - 0.5) * 1.5; dy = -speed;
            break;
        default: // from left
            x = -50; y = Math.random() * canvas.height;
            dx = speed; dy = (Math.random() - 0.5) * 1.5;
            break;
      }

      return { x, y, dx, dy, radius: Math.random() * 2 + 1, len: Math.random() * 80 + 60, life: 0, maxLife: Math.random() * 300 + 200 };
    };
    
    const animate = () => {
      // Spawn a new comet
      if (cometsRef.current.length < MAX_COMETS && Math.random() < COMET_SPAWN_CHANCE) {
        cometsRef.current.push(createComet());
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach(star => {
        star.alpha += star.velocity;
        if (star.alpha > 1 || star.alpha < 0) {
          star.velocity = -star.velocity;
        }
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Draw and update comets
      for (let i = cometsRef.current.length - 1; i >= 0; i--) {
        const comet = cometsRef.current[i];
        
        const tailX = comet.x - comet.len * comet.dx;
        const tailY = comet.y - comet.len * comet.dy;
        
        const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0.8)`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = comet.radius;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(comet.x, comet.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        comet.x += comet.dx;
        comet.y += comet.dy;
        comet.life++;

        const isOutOfBounds = comet.x < -150 || comet.x > canvas.width + 150 || comet.y < -150 || comet.y > canvas.height + 150;
        if (comet.life > comet.maxLife || isOutOfBounds) {
             cometsRef.current.splice(i, 1);
        }
      }

      animationFrameId.current = window.requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
        // A simple debounce to prevent rapid re-initialization on resize.
        let timeout: number;
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            init();
        }, 250);
    };

    init();
    animate(); // Start the animation loop
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once.

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, #1b2735 0%, #090a0f 100%)' }}/>;
};

export default React.memo(StarryBackground);