"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Lottie has no SSR support — dynamic import with ssr:false is required.
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function LottieCharacter({
  size = 220,
  loop = true,
  autoplay = true,
  className = "",
}: {
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  // Decorative animation — never plays for users who opted out of motion.
  if (reducedMotion) return null;

  return (
    <DotLottieReact
      src={encodeURI("/Happy Character Throwing Ball.json")}
      loop={loop}
      autoplay={autoplay}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
