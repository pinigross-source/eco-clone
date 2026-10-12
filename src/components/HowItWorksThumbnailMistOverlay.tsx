import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  originX?: number;
  originY?: number;
};

export function HowItWorksThumbnailMistOverlay({
  className,
  originX = 0.62,
  originY = 0.52,
}: Props) {
  const left = `${Math.min(1, Math.max(0, originX)) * 100}%`;
  const top = `${Math.min(1, Math.max(0, originY)) * 100}%`;

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Ambient room mist - spread across the entire room */}
      <div className="absolute inset-0">
        {/* Large ambient clouds drifting across the room */}
        <div
          className={cn(
            "absolute top-1/4 left-0 w-full h-1/2",
            "bg-gradient-to-r from-teal-200/20 via-teal-300/15 to-teal-200/10",
            "blur-3xl animate-drift-slow"
          )}
        />
        <div
          className={cn(
            "absolute top-1/3 left-1/4 w-3/4 h-1/3",
            "bg-gradient-to-l from-teal-300/15 via-teal-200/20 to-transparent",
            "blur-3xl animate-drift-slower"
          )}
        />
        <div
          className={cn(
            "absolute bottom-1/4 left-0 w-2/3 h-1/3",
            "bg-gradient-to-tr from-teal-200/15 via-teal-300/10 to-transparent",
            "blur-3xl animate-drift-medium"
          )}
        />
      </div>

      {/* Origin point mist from the device */}
      <div
        className="absolute"
        style={{ left, top, transform: "translate(-10%, -50%)" }}
      >
        <div className="relative">
          {/* Core bright spot at nozzle */}
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2",
              "h-8 w-16 md:h-10 md:w-20",
              "rounded-full blur-md",
              "bg-teal-200/90 animate-pulse-soft"
            )}
          />

          {/* Near-source glow */}
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2",
              "h-16 w-48 md:h-20 md:w-56",
              "rounded-full blur-xl",
              "bg-gradient-to-l from-teal-200/60 via-teal-300/30 to-transparent",
              "animate-pulse-soft"
            )}
          />

          {/* Expanding plume */}
          <div
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2",
              "h-32 w-[30rem] md:h-40 md:w-[38rem]",
              "rounded-full blur-2xl",
              "bg-gradient-to-l from-teal-300/40 via-teal-200/20 to-transparent",
              "animate-expand"
            )}
          />
        </div>
      </div>

      {/* Floating particles spread across the room */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <g className="mix-blend-screen">
          {/* Large floating particles */}
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 5 + ((i * 17) % 90);
            const y = 10 + ((i * 23) % 80);
            const r = 0.3 + ((i * 11) % 5) / 10;
            const delay = (i * 0.15) % 3;
            const duration = 4 + ((i * 7) % 4);

            return (
              <circle
                key={`large-${i}`}
                cx={x}
                cy={y}
                r={r}
                fill="#5eead4"
                opacity={0.6}
                style={{
                  animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}

          {/* Medium particles */}
          {Array.from({ length: 15 }).map((_, i) => {
            const x = 3 + ((i * 13) % 94);
            const y = 8 + ((i * 31) % 84);
            const r = 0.15 + ((i * 7) % 4) / 20;
            const delay = (i * 0.1) % 2.5;
            const duration = 3 + ((i * 11) % 3);

            return (
              <circle
                key={`med-${i}`}
                cx={x}
                cy={y}
                r={r}
                fill="#99f6e4"
                opacity={0.5}
                style={{
                  animation: `float ${duration}s ease-in-out ${delay}s infinite`,
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          25% {
            transform: translate(-2px, -3px);
            opacity: 0.7;
          }
          50% {
            transform: translate(-4px, 1px);
            opacity: 0.6;
          }
          75% {
            transform: translate(-1px, -2px);
            opacity: 0.7;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        .animate-drift-slow {
          animation: drift 12s ease-in-out infinite;
        }

        .animate-drift-slower {
          animation: drift 16s ease-in-out infinite reverse;
        }

        .animate-drift-medium {
          animation: drift 10s ease-in-out infinite;
          animation-delay: -3s;
        }

        .animate-pulse-soft {
          animation: pulse-soft 3s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 4s ease-in-out infinite;
        }

        @keyframes drift {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          25% {
            transform: translateX(-3%) translateY(2%);
          }
          50% {
            transform: translateX(-5%) translateY(-1%);
          }
          75% {
            transform: translateX(-2%) translateY(1%);
          }
        }

        @keyframes pulse-soft {
          0%, 100% {
            opacity: 0.8;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.05);
          }
        }

        @keyframes expand {
          0%, 100% {
            opacity: 0.35;
            transform: translateY(-50%) scaleX(1);
          }
          50% {
            opacity: 0.45;
            transform: translateY(-50%) scaleX(1.03);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-drift-slow,
          .animate-drift-slower,
          .animate-drift-medium,
          .animate-pulse-soft,
          .animate-expand {
            animation: none;
          }
          circle {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
