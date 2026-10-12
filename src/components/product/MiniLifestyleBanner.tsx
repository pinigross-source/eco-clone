import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface MiniLifestyleBannerProps {
  image: string;
  alt: string;
  headline?: string;
  subtext?: string;
  position?: "left" | "center" | "right";
  dark?: boolean;
  imagePosition?: string;
}

export const MiniLifestyleBanner = ({
  image,
  alt,
  headline,
  subtext,
  position = "center",
  dark = false,
  imagePosition = "center center",
}: MiniLifestyleBannerProps) => {
  const textAlign =
    position === "left" ? "text-left items-start" :
    position === "right" ? "text-right items-end" :
    "text-center items-center";

  return (
    <section className="relative w-full overflow-hidden">
      <ScrollReveal>
        <div className="relative w-full aspect-square md:aspect-[16/9] lg:aspect-[2/1] min-h-[280px] max-h-[720px]">
          <img
            src={image}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: imagePosition }}
            loading="lazy"
            decoding="async"
          />
          {headline && (
            <div className={`absolute inset-0 flex flex-col justify-end p-8 md:p-16 ${textAlign}`}>
              <div className={`${dark ? "bg-foreground/60" : "bg-background/60"} backdrop-blur-sm rounded-xl px-6 py-4 md:px-8 md:py-5 max-w-md`}>
                <h3 className={`text-xl md:text-2xl lg:text-3xl font-display font-bold ${dark ? "text-background" : "text-foreground"}`}>
                  {headline}
                </h3>
                {subtext && (
                  <p className={`text-sm md:text-base mt-1 ${dark ? "text-background/70" : "text-muted-foreground"}`}>
                    {subtext}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
};
