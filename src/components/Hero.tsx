import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 192;
const currentFrame = (index: number) => `/video-landing/${(index + 1).toString().padStart(5, '0')}.jpg`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let isPushed = false;
    const imgArray: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);

      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !isPushed) {
          isPushed = true;
          setImages([...imgArray]);
          setLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !isPushed) {
          isPushed = true;
          setImages([...imgArray]);
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
  }, []);

  // Animation loop continuously playing
  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const fps = 30; // 30 frames per second gives it a cinematic feel
    const frameInterval = 1000 / fps;
    let currentIndex = 0;
    let isReversing = false;

    const drawFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

      // 'cover' logic, but we center it.
      // To avoid extreme zooming on tall mobile screens, we cap the canvas height scale.
      const widthScale = canvas.width / img.width;
      const heightScale = canvas.height / img.height;

      // We take the max of width and height scales (standard cover), but cap how much taller 
      // the height scale can be compared to the width scale to prevent extreme side cropping.
      // E.g., Don't zoom in more than 1.4x the width scale.
      const scale = Math.min(Math.max(widthScale, heightScale), widthScale * 1.4);

      drawWidth = img.width * scale;
      drawHeight = img.height * scale;

      // Center the image
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = (canvas.height - drawHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderLoop = (time: number) => {
      if (time - lastTime >= frameInterval) {
        drawFrame(currentIndex);

        // Ping-pong loop logic to make it seamless
        if (isReversing) {
          currentIndex--;
          if (currentIndex <= 0) {
            currentIndex = 0;
            isReversing = false;
          }
        } else {
          currentIndex++;
          if (currentIndex >= FRAME_COUNT - 1) {
            currentIndex = FRAME_COUNT - 1;
            isReversing = true;
          }
        }

        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Draw first frame immediately
    drawFrame(0);
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images]);

  return (
    <section className="relative w-full h-[60vh] md:min-h-screen bg-[#111111] overflow-hidden pt-16 md:pt-24">
      {/* The Canvas */}
      <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-90"
        />
      </div>

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

      {/* Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 md:p-24 text-center pointer-events-none mt-8 md:mt-16">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
          The Fine Art of <br />
          <span className="text-brand-gold font-medium tracking-tight" style={{ textShadow: '0 4px 24px rgba(212, 175, 55, 0.4)' }}>Painting & Decorating</span>
        </h1>
        <p className="max-w-xl text-sm sm:text-base md:text-lg font-sans text-white/90 font-medium tracking-wide drop-shadow-md">
          Premium craftsmanship in perfect harmony.
        </p>

        {!loaded && (
          <div className="absolute bottom-20 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-4"></div>
            <span className="text-brand-gold text-xs uppercase tracking-widest">Focusing the lens...</span>
          </div>
        )}
      </div>
    </section>
  );
}
