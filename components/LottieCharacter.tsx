"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Lottie has no SSR support — dynamic import with ssr:false is required.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

const MAX_RETRIES = 6;
const READY_TIMEOUT_MS = 900;

export default function LottieCharacter({
  src = "/Happy Character Throwing Ball.json",
  size = 220,
  mobileSize,
  mobileBreakpoint = 768,
  loop = true,
  autoplay = true,
  className = "",
}: {
  src?: string;
  size?: number;
  mobileSize?: number;
  mobileBreakpoint?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const [resolvedSize, setResolvedSize] = useState(size);
  const [retryKey, setRetryKey] = useState(0);
  const renderedRef = useRef(false);
  const retryCountRef = useRef(0);

  // A single mounted player, resized via JS rather than two CSS-toggled
  // instances — mounting two DotLottieReact players at once (one hidden)
  // raced against each other and intermittently rendered blank.
  useEffect(() => {
    if (mobileSize === undefined) {
      setResolvedSize(size);
      return;
    }
    const mq = window.matchMedia(`(min-width: ${mobileBreakpoint}px)`);
    const update = () => setResolvedSize(mq.matches ? size : mobileSize);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [size, mobileSize, mobileBreakpoint]);

  // The underlying WASM player has an intermittent init race (independent of
  // any of the above) that silently leaves it frozen before its first frame.
  // If nothing has rendered shortly after mount, force a fresh instance.
  useEffect(() => {
    if (reducedMotion) return;
    renderedRef.current = false;
    const timer = setTimeout(() => {
      if (!renderedRef.current && retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        setRetryKey((k) => k + 1);
      }
    }, READY_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [retryKey, reducedMotion]);

  // Decorative animation — never plays for users who opted out of motion.
  if (reducedMotion) return null;

  return (
    <DotLottieReact
      key={retryKey}
      src={encodeURI(src)}
      loop={loop}
      autoplay={autoplay}
      width={resolvedSize}
      height={resolvedSize}
      style={{ width: resolvedSize, height: resolvedSize }}
      className={className}
      renderConfig={{ freezeOnOffscreen: false }}
      dotLottieRefCallback={(instance) => {
        if (!instance) return;
        instance.addEventListener("frame", () => {
          renderedRef.current = true;
        });
        instance.addEventListener("render", () => {
          renderedRef.current = true;
        });
      }}
    />
  );
}
