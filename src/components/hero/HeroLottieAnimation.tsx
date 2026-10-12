import Lottie from "lottie-react";
import heroAnimation from "@/assets/hero-animation.json";

interface HeroLottieAnimationProps {
  className?: string;
}

export const HeroLottieAnimation = ({ className = "" }: HeroLottieAnimationProps) => {
  return (
    <div className={`relative ${className}`}>
      <Lottie
        animationData={heroAnimation}
        loop
        autoplay
        className="w-full h-auto"
      />
    </div>
  );
};
