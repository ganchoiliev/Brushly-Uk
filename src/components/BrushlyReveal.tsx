import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'motion/react';

const FRAME_COUNT = 192;
// Adjust path to match the copied files. Example: /reveal-sequence/00001.jpg
const currentFrame = (index: number) => `/reveal-sequence/${(index + 1).toString().padStart(5, '0')}.jpg`;

export default function BrushlyReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [progress, setProgress] = useState(0);

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
                setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));

                if (loadedCount === FRAME_COUNT && !isPushed) {
                    isPushed = true;
                    setImages([...imgArray]);
                    setLoaded(true);
                }
            };

            img.onerror = () => {
                // If an image fails to load, still count it so we don't hang forever
                loadedCount++;
                if (loadedCount === FRAME_COUNT && !isPushed) {
                    isPushed = true;
                    setImages([...imgArray]);
                    setLoaded(true);
                }
            }
            imgArray.push(img);
        }
    }, []);

    // Playback state
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false); // Track if it's finished playing

    // Animation loop when playing
    useEffect(() => {
        if (!isPlaying || currentIndex >= FRAME_COUNT - 1) {
            if (currentIndex >= FRAME_COUNT - 1) {
                setIsPlaying(false);
                setHasPlayed(true);
            }
            return;
        }

        let animationFrameId: number;
        let lastTime = performance.now();
        const fps = 30; // 30 frames per second gives it a cinematic feel
        const frameInterval = 1000 / fps;

        const renderLoop = (time: number) => {
            if (time - lastTime >= frameInterval) {
                setCurrentIndex(prev => {
                    const next = prev + 1;
                    if (next >= FRAME_COUNT - 1) {
                        setIsPlaying(false);
                        setHasPlayed(true);
                        return FRAME_COUNT - 1;
                    }
                    return next;
                });
                lastTime = time;
            }
            if (isPlaying) {
                animationFrameId = requestAnimationFrame(renderLoop);
            }
        };

        animationFrameId = requestAnimationFrame(renderLoop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying, currentIndex]);

    // Handle Click to Play
    const handlePlayClick = () => {
        if (!isPlaying && currentIndex < FRAME_COUNT - 1) {
            setIsPlaying(true);
        } else if (hasPlayed) {
            // Optional: Replay from beginning
            setCurrentIndex(0);
            setIsPlaying(true);
            setHasPlayed(false);
        }
    };


    // Canvas drawing logic
    useEffect(() => {
        if (!loaded || !canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[currentIndex];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        let animationFrameId: number;

        const drawFrame = () => {
            // Handle high-DPI displays safely
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Use 'contain' logic on ALL devices so the image is NEVER zoomed or cropped
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

            if (canvasRatio > imgRatio) {
                // Canvas is wider than image (fit to height)
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                // Image is wider than canvas (fit to width)
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw image scaled up to devicePixelRatio dimensions
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Draw once immediately on index change
        animationFrameId = requestAnimationFrame(drawFrame);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [loaded, images, currentIndex]);

    // Calculate progression fraction based on current frame (0 to 1)
    const playFraction = currentIndex / (FRAME_COUNT > 1 ? FRAME_COUNT - 1 : 1);

    // Text Overlay Opacities mapped directly from play fraction
    const getOpacity = (frac: number, inStart: number, inEnd: number, outStart: number, outEnd: number) => {
        if (frac < inStart || frac > outEnd) return 0;
        if (frac >= inEnd && frac <= outStart) return 1;
        if (frac >= inStart && frac < inEnd) return (frac - inStart) / (inEnd - inStart);
        if (frac > outStart && frac <= outEnd) return 1 - ((frac - outStart) / (outEnd - outStart));
        return 0;
    };

    // Adjusted for 3 slides played throughout the video sequence
    const text1Opacity = getOpacity(playFraction, 0.05, 0.15, 0.30, 0.40);
    const text2Opacity = getOpacity(playFraction, 0.40, 0.50, 0.65, 0.75);
    const text3Opacity = getOpacity(playFraction, 0.75, 0.85, 1, 1);

    if (!loaded) {
        return (
            <div className="w-full h-screen bg-[#111111] flex flex-col items-center justify-center p-6 bg-brand-navy">
                {/* Simple loader if logo isn't available right away */}
                <div className="w-16 h-16 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin mb-8"></div>
                <p className="text-brand-gold font-sans tracking-widest uppercase text-sm mb-4">Focusing the lens...</p>
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-brand-gold transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        // Standard full-screen container
        <div className="relative w-full h-screen bg-[#111111] overflow-hidden" onClick={handlePlayClick}>

            {/* Play Button Indicator */}
            {!isPlaying && !hasPlayed && currentIndex === 0 && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/40">
                    <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all font-sans tracking-widest text-sm uppercase">
                        Play
                    </div>
                </div>
            )}
            {/* Replay Indicator */}
            {!isPlaying && hasPlayed && (
                <div className="absolute inset-x-0 bottom-10 z-50 flex items-center justify-center pointer-events-none">
                    <div className="px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/70 text-sm tracking-widest uppercase">
                        Click to Replay
                    </div>
                </div>
            )}

            {/* The Canvas */}
            <div className="absolute top-28 bottom-0 inset-x-0 overflow-hidden pointer-events-none">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full opacity-90 cursor-pointer pointer-events-auto"
                />
            </div>

            {/* Dark overlay gradient to ensure text always pops on dark images */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none cursor-pointer" />

            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end md:justify-center p-8 md:p-24 pb-32 md:pb-24">

                <motion.div style={{ opacity: text1Opacity }} className="absolute md:top-1/2 md:-translate-y-1/2 bottom-[10%] left-4 right-4 md:left-24 md:right-auto md:max-w-xl p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3 md:mb-6 leading-tight drop-shadow-lg shadow-black">
                        Protection First.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl font-sans text-brand-gold font-medium tracking-wide drop-shadow-md">
                        We treat your home like a gallery.
                    </p>
                </motion.div>

                <motion.div style={{ opacity: text2Opacity }} className="absolute md:top-1/2 md:-translate-y-1/2 bottom-[10%] left-4 right-4 md:left-24 md:right-auto md:max-w-xl p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3 md:mb-6 leading-tight drop-shadow-lg shadow-black">
                        Meticulous Prep.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl font-sans text-brand-gold font-medium tracking-wide drop-shadow-md">
                        Excellence begins before the first brushstroke.
                    </p>
                </motion.div>

                <motion.div style={{ opacity: text3Opacity }} className="absolute md:top-1/2 md:-translate-y-1/2 bottom-[10%] left-4 right-4 md:left-24 md:right-auto md:max-w-xl p-6 sm:p-8 md:p-12 flex flex-col justify-center text-left">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-3 md:mb-6 leading-tight drop-shadow-lg shadow-black">
                        Impeccable Results.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl font-sans text-white font-semibold tracking-wide flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4 drop-shadow-md">
                        <span className="w-8 md:w-12 h-[2px] bg-brand-gold drop-shadow-sm"></span>
                        Clean, curated, and ready for living.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
