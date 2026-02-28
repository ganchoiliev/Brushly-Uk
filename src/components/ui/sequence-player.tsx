import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface SequencePlayerProps {
    folderPath: string; // e.g., "/sequences/interior"
    frameCount: number; // e.g., 192
    startIndex?: number; // e.g., 1
    padLength?: number; // e.g., 5 for "00001"
    fps?: number; // e.g., 30
    pingPong?: boolean; // Seamlessly reverse playback instead of jumping to start
    objectFit?: 'cover' | 'cover-top' | 'cover-scroll-pan' | 'contain';
    className?: string;
}

export function SequencePlayer({
    folderPath,
    frameCount,
    startIndex = 1,
    padLength = 5,
    fps = 30,
    pingPong = false,
    objectFit = 'cover',
    className = ""
}: SequencePlayerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Only trigger when the container is entering the viewport
    const isInView = useInView(containerRef, { margin: "0px 0px -100px 0px" });

    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);

    // Preload images into memory
    useEffect(() => {
        let loaded = 0;
        const imgArray: HTMLImageElement[] = [];

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            const numStr = (startIndex + i).toString().padStart(padLength, '0');
            img.src = `${folderPath}/${numStr}.jpg`;

            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
            };

            imgArray.push(img);
        }
        setImages(imgArray);
    }, [folderPath, frameCount, startIndex, padLength]);

    // Play animation loop when in view
    useEffect(() => {
        if (!isInView || images.length === 0 || loadedCount === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let currentFrame = 0;
        let direction = 1;
        let animationFrameId: number;
        let lastTime = performance.now();
        const interval = 1000 / fps;

        const render = (time: number) => {
            animationFrameId = requestAnimationFrame(render);

            const deltaTime = time - lastTime;
            if (deltaTime > interval) {
                lastTime = time - (deltaTime % interval);

                const img = images[currentFrame];
                // Ensure image is ready before drawing
                if (img && img.complete && img.naturalWidth > 0) {
                    const canvasRatio = canvas.width / canvas.height;
                    const imgRatio = img.width / img.height;

                    let drawWidth = canvas.width;
                    let drawHeight = canvas.height;
                    let offsetX = 0;
                    let offsetY = 0;

                    if (objectFit === 'cover' || objectFit === 'cover-top' || objectFit === 'cover-scroll-pan') {
                        if (imgRatio > canvasRatio) {
                            // Image is wider than canvas -> crop sides
                            drawWidth = canvas.height * imgRatio;
                            if (objectFit === 'cover-scroll-pan') {
                                // Pan horizontally if it's wider? Let's assume we pan horizontally if it's wide and vertically if it's tall.
                                // But usually, we only have tall images for this project. Keep it centered horizontally for now.
                                offsetX = (canvas.width - drawWidth) / 2;
                            } else {
                                offsetX = (canvas.width - drawWidth) / 2;
                            }
                        } else {
                            // Image is taller than canvas -> crop top/bottom
                            drawHeight = canvas.width / imgRatio;

                            if (objectFit === 'cover-top') {
                                offsetY = 0; // Lock to top edge
                            } else if (objectFit === 'cover-scroll-pan') {
                                let scrollProgress = 0;
                                if (containerRef.current) {
                                    const rect = containerRef.current.getBoundingClientRect();
                                    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                                    // 0 when entering from bottom, 1 when leaving from top
                                    const rawProgress = (rect.top - windowHeight) / (-rect.height - windowHeight);
                                    scrollProgress = Math.max(0, Math.min(1, rawProgress));
                                }
                                // Interpolate from 0 (top) to negative max pan (bottom)
                                offsetY = (canvas.height - drawHeight) * scrollProgress;
                            } else {
                                offsetY = (canvas.height - drawHeight) / 2; // Center crop
                            }
                        }
                    } else { // contain
                        if (imgRatio > canvasRatio) {
                            drawHeight = canvas.width / imgRatio;
                            offsetY = (canvas.height - drawHeight) / 2;
                        } else {
                            drawWidth = canvas.height * imgRatio;
                            offsetX = (canvas.width - drawWidth) / 2;
                        }
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }

                if (pingPong) {
                    currentFrame += direction;
                    if (currentFrame >= frameCount - 1) {
                        currentFrame = frameCount - 1;
                        direction = -1;
                    } else if (currentFrame <= 0) {
                        currentFrame = 0;
                        direction = 1;
                    }
                } else {
                    currentFrame = (currentFrame + 1) % frameCount;
                }
            }
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, images, loadedCount, frameCount, fps, pingPong, objectFit]);

    // Handle canvas resize to maintain crispness
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = width * dpr;
                canvasRef.current.height = height * dpr;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
            {/* Loading Overlay */}
            {loadedCount < frameCount * 0.2 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-surface z-10 space-y-4">
                    <div className="w-12 h-12 rounded-full border-t-2 border-brand-gold animate-spin" />
                    <p className="text-brand-gold/60 text-xs tracking-widest uppercase">Loading Base Assets...</p>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}
