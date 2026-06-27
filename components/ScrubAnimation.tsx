"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const FRAME_COUNT = 106;
const FRAME_WIDTH = 578;
const FRAME_HEIGHT = 665;
const SMOOTHING = 0.12;
const framePath = (i: number) => `/animation/frame_${i}.webp`;

export default function ScrubAnimation({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const drawnFrameRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === FRAME_COUNT && !cancelled) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  const draw = (index: number) => {
    if (index === drawnFrameRef.current) return;
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    const ctx = canvas?.getContext("2d");
    if (!canvas || !img || !ctx || !img.complete) return;
    drawnFrameRef.current = index;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Continuously eases the current frame toward whatever frame the mouse is
  // pointing at, rather than snapping straight to it, so fast mouse moves
  // read as a smooth scrub instead of a flicker between frames.
  useEffect(() => {
    if (!loaded || reducedMotion) {
      if (loaded) draw(0);
      return;
    }

    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current += diff * SMOOTHING;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(currentFrameRef.current)));
      draw(index);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !loaded) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const ratio = Math.min(Math.max(x / rect.width, 0), 1);
    targetFrameRef.current = ratio * (FRAME_COUNT - 1);
  };

  const handleMouseLeave = () => {
    if (reducedMotion || !loaded) return;
    targetFrameRef.current = 0;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <canvas
        ref={canvasRef}
        width={FRAME_WIDTH}
        height={FRAME_HEIGHT}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
