import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, RotateCcw, HelpCircle, Check } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Link } from "@/lib/link";

// Product images
import bioticaMini from "@/assets/biologic-mini-device.png";
import biotica800 from "@/assets/biotica800-hero.avif";
import ba2080 from "@/assets/ebiotic-pro.avif";
import hvacImage from "@/assets/ebiotic-pro.avif";

const INTERNAL_LINKS = {
  how_it_works: "/how-it-works",
  support: "/support",
  bundle: "/shop",
};

const PRODUCTS = {
  mini: {
    name: "BioLogic Mini",
    cover: "Up to 300 sq ft",
    fit: "Personal spaces and high-touch zones",
    url: "/product/biologic-mini",
    img: bioticaMini,
    also: ["biotica800", "ba2080"]
  },
  biotica800: {
    name: "Biotica 800",
    cover: "Up to 800 sq ft",
    fit: "Living rooms and shared/open areas",
    url: "/product/biotica-800",
    img: biotica800,
    also: ["mini", "ba2080"]
  },
  ba2080: {
    name: "BA 2080",
    cover: "Up to 2,600 sq ft",
    fit: "Hybrid probiotic + advanced HEPA for large spaces",
    url: "/product/ba-2080",
    img: ba2080,
    also: ["biotica800", "mini"]
  },
  hvac: {
    name: "HVAC Series",
    cover: "Whole home (ducted systems)",
    fit: "Installed in central HVAC with ducts",
    url: "/product/ebiotic-pro",
    img: hvacImage,
    also: ["mini", "biotica800"]
  }
};

type ProductKey = keyof typeof PRODUCTS;

interface QuizState {
  step: "start" | "q1" | "q2" | "q3" | "q4" | "q5" | "results";
  primary_goal: string | null;
  space_size: string | null;
  ducted_hvac: string | null;
  priority: string | null;
  preference: string | null;
}

export const FindMySolutionQuiz = () => {
  const [state, setState] = useState<QuizState>({
    step: "start",
    primary_goal: null,
    space_size: null,
    ducted_hvac: null,
    priority: null,
    preference: null
  });

  const setStep = (step: QuizState["step"]) => {
    setState(prev => ({ ...prev, step }));
  };

  const setAnswer = (key: keyof QuizState, value: string, nextStep: QuizState["step"]) => {
    setState(prev => ({ ...prev, [key]: value, step: nextStep }));
  };

  const restart = () => {
    setState({
      step: "start",
      primary_goal: null,
      space_size: null,
      ducted_hvac: null,
      priority: null,
      preference: null
    });
  };

  const getProgress = () => {
    const steps = ["q1", "q2", "q3", "q4", "q5"];
    const currentIndex = steps.indexOf(state.step);
    if (currentIndex < 0) return 0;
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const getStepLabel = () => {
    const labels: Record<string, string> = {
      q1: "Step 1 of 5",
      q2: "Step 2 of 5",
      q3: "Step 3 of 5",
      q4: "Step 4 of 5",
      q5: "Step 5 of 5"
    };
    return labels[state.step] || "";
  };

  const decideResult = (): { result: ProductKey; note: string | null } => {
    const hvacWanted =
      state.ducted_hvac === "yes" &&
      (state.primary_goal === "whole" || state.space_size === "whole_multi" || state.preference === "installed");

    if (hvacWanted) return { result: "hvac", note: null };

    const hvacNoDucts = state.ducted_hvac === "no" && state.preference === "installed";
    const hvacNotSure = state.ducted_hvac === "unsure" && 
      (state.primary_goal === "whole" || state.space_size === "whole_multi" || state.preference === "installed");

    let r: ProductKey = "mini";
    if (state.space_size === "301_800" || state.primary_goal === "open") r = "biotica800";
    if (state.space_size === "801_2800") r = "ba2080";
    if (state.space_size === "0_300" || state.primary_goal === "bedroom") r = "mini";

    if (hvacNoDucts) return { result: r, note: "HVAC Series requires ducts. Here's the best room-device path instead." };
    if (hvacNotSure) return { result: r, note: "Not sure about ducts? Start with a room device, or check HVAC fit with support." };
    return { result: r, note: null };
  };

  const priorityLine = (p: string | null) => {
    const map: Record<string, string> = {
      surfaces: "Built to support high touch surfaces that get recontaminated constantly.",
      odor: "Supports the surfaces and fabrics where odors tend to linger.",
      allergies: "Many users choose it to support everyday comfort in daily spaces.",
      mold: "Designed to support surface environments where unwanted buildup can return.",
      fresh: "A simple always on way to support your everyday environment."
    };
    return map[p || "surfaces"] || map.surfaces;
  };

  const prettySize = (s: string | null) => {
    const m: Record<string, string> = {
      "0_300": "Up to 300 sq ft",
      "301_800": "301 to 800 sq ft",
      "801_2800": "801 to 2,800 sq ft",
      "whole_multi": "Whole home / multiple rooms"
    };
    return m[s || ""] || "Based on your goal";
  };

  const shouldShowBundle = (baseKey: ProductKey) => {
    if (baseKey === "hvac") return false;
    const wantsMultipleRooms = state.primary_goal === "whole" || state.space_size === "whole_multi";
    if (wantsMultipleRooms && state.ducted_hvac !== "yes") return true;
    if (baseKey === "biotica800") return true;
    return false;
  };

  const ProgressBar = () => (
    <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
      <span className="text-xs sm:text-sm font-semibold text-primary-text">EnviroBiotics</span>
      <div className="flex-1 h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${getProgress()}%` }}
        />
      </div>
      <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">{getStepLabel()}</span>
    </div>
  );

  const QuestionButton = ({ 
    label, 
    onClick 
  }: { 
    label: string; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-full text-left bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 font-medium text-foreground hover:border-primary/50 hover:shadow-lg transition-all duration-200 active:scale-[0.99] text-sm sm:text-base"
    >
      {label}
    </button>
  );

  const ProductCard = ({ 
    productKey, 
    isPrimary = false,
    showWhy = false 
  }: { 
    productKey: ProductKey; 
    isPrimary?: boolean;
    showWhy?: boolean;
  }) => {
    const product = PRODUCTS[productKey];
    const whyMap: Record<ProductKey, string> = {
      mini: "If you're starting with one room or a personal space.",
      biotica800: "If you want stronger coverage for open living areas.",
      ba2080: "If you want larger coverage from day one.",
      hvac: "If you have ducted central HVAC for whole-home support."
    };

    return (
      <div className={`border rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-card ${isPrimary ? 'border-primary shadow-lg' : 'border-border'}`}>
        <div className="flex gap-3 sm:gap-4 items-start">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl bg-muted/50 border border-border/50 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
            <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-foreground text-sm sm:text-base">{product.name}</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">{product.cover} - {product.fit}</p>
            {showWhy && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 sm:mt-2">{whyMap[productKey]}</p>
            )}
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
          {isPrimary ? (
            <Button variant="hero" size="sm" asChild className="flex-1 text-xs sm:text-sm">
              <Link to={product.url}>
                Buy Now <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
              <Link to={product.url}>View</Link>
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Render based on step
  const renderContent = () => {
    switch (state.step) {
      case "start":
        return (
          <div className="text-center space-y-6 sm:space-y-8 py-4 sm:py-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary-text text-xs sm:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Takes less than 60 seconds
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
              Answer 4 quick questions.<br />
              <span className="text-gradient-primary">Get your personalized recommendation.</span>
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
              Every home is different. We'll match you to the right device based on your space, goals, and setup.
            </p>

            <Button variant="hero" size="lg" onClick={() => setStep("q1")} className="text-sm sm:text-base px-8 sm:px-10 h-12 sm:h-14 font-bold">
              Start Quiz <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            <p className="text-xs text-muted-foreground/70">
              Most parents decide in under 2 minutes
            </p>
          </div>
        );

      case "q1":
        return (
          <div>
            <ProgressBar />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 sm:mb-6">
              What are you trying to support right now?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <QuestionButton label="Bedroom or personal space" onClick={() => setAnswer("primary_goal", "bedroom", "q2")} />
              <QuestionButton label="Living room or open area" onClick={() => setAnswer("primary_goal", "open", "q2")} />
              <QuestionButton label="Whole home" onClick={() => setAnswer("primary_goal", "whole", "q3")} />
              <QuestionButton label="I'm not sure yet" onClick={() => setAnswer("primary_goal", "unsure", "q2")} />
            </div>
          </div>
        );

      case "q2":
        return (
          <div>
            <ProgressBar />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-1.5 sm:mb-2">
              About how big is the space?
            </h2>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">If you're unsure, choose the closest option.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <QuestionButton label="Up to 300 sq ft" onClick={() => setAnswer("space_size", "0_300", "q4")} />
              <QuestionButton label="301 to 800 sq ft" onClick={() => setAnswer("space_size", "301_800", "q4")} />
              <QuestionButton label="801 to 2,800 sq ft" onClick={() => setAnswer("space_size", "801_2800", "q4")} />
              <QuestionButton label="Multiple rooms / whole home" onClick={() => setAnswer("space_size", "whole_multi", "q3")} />
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-6">
              <Button variant="ghost" size="sm" onClick={() => setStep("q1")} className="text-xs sm:text-sm">
                <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back
              </Button>
            </div>
          </div>
        );

      case "q3":
        return (
          <div>
            <ProgressBar />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-1.5 sm:mb-2">
              Do you have central HVAC with ducts?
            </h2>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">This helps determine whether the HVAC Series is relevant.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <QuestionButton label="Yes - ducted central HVAC" onClick={() => setAnswer("ducted_hvac", "yes", "q4")} />
              <QuestionButton label="No - mini-split / radiators / no ducts" onClick={() => setAnswer("ducted_hvac", "no", "q4")} />
              <QuestionButton label="Not sure" onClick={() => setAnswer("ducted_hvac", "unsure", "q4")} />
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-6">
              <Button variant="ghost" size="sm" onClick={() => setStep(state.primary_goal === "whole" ? "q1" : "q2")} className="text-xs sm:text-sm">
                <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back
              </Button>
            </div>
          </div>
        );

      case "q4":
        return (
          <div>
            <ProgressBar />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 sm:mb-6">
              What matters most to you?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <QuestionButton label="High touch surfaces (daily support)" onClick={() => setAnswer("priority", "surfaces", "q5")} />
              <QuestionButton label="Odor support" onClick={() => setAnswer("priority", "odor", "q5")} />
              <QuestionButton label="Allergies and comfort" onClick={() => setAnswer("priority", "allergies", "q5")} />
              <QuestionButton label="Mold concern / musty environment" onClick={() => setAnswer("priority", "mold", "q5")} />
              <QuestionButton label="General indoor freshness" onClick={() => setAnswer("priority", "fresh", "q5")} />
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-6">
              <Button variant="ghost" size="sm" onClick={() => setStep(state.ducted_hvac ? "q3" : "q2")} className="text-xs sm:text-sm">
                <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back
              </Button>
            </div>
          </div>
        );

      case "q5":
        return (
          <div>
            <ProgressBar />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 sm:mb-6">
              What kind of setup do you prefer?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <QuestionButton label="Portable (move it as needed)" onClick={() => setAnswer("preference", "portable", "results")} />
              <QuestionButton label="Leave it in one room" onClick={() => setAnswer("preference", "one_room", "results")} />
              <QuestionButton label="Whole home installed (HVAC)" onClick={() => setAnswer("preference", "installed", "results")} />
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-6">
              <Button variant="ghost" size="sm" onClick={() => setStep("q4")} className="text-xs sm:text-sm">
                <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back
              </Button>
            </div>
          </div>
        );

      case "results": {
        const { result, note } = decideResult();
        const product = PRODUCTS[result];
        const showBundle = shouldShowBundle(result);

        return (
          <div>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary-text text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Your Result
            </div>

            {/* Hero Result */}
            <div className="grid md:grid-cols-[140px_1fr] gap-4 sm:gap-6 items-center mb-4 sm:mb-6">
              <div className="bg-muted/30 border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-center mx-auto md:mx-0 w-28 h-28 sm:w-36 sm:h-36 md:w-auto md:h-auto">
                <img src={product.img} alt={product.name} className="w-24 sm:w-32 h-auto object-contain" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-foreground mb-1.5 sm:mb-2">
                  Your best match: {product.name}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  <strong>{product.cover}</strong> - {product.fit}.
                </p>
              </div>
            </div>

            {note && (
              <div className="bg-muted/50 border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <span className="font-semibold text-foreground text-sm sm:text-base">Note:</span>
                <span className="text-muted-foreground ml-1.5 sm:ml-2 text-sm sm:text-base">{note}</span>
              </div>
            )}

            {/* Key-Value Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="bg-muted/30 border border-border/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] sm:text-xs font-semibold text-foreground block">Your space</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">{prettySize(state.space_size)}</span>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] sm:text-xs font-semibold text-foreground block">Your priority</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{priorityLine(state.priority)}</span>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] sm:text-xs font-semibold text-foreground block">Always on</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">Runs 24/7 in the background</span>
              </div>
              <div className="bg-muted/30 border border-border/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] sm:text-xs font-semibold text-foreground block">Surface focused</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">Supports high touch hotspots</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-3 sm:mb-4">
              <Button variant="hero" size="lg" asChild className="text-sm sm:text-base">
                <Link to={product.url}>
                  Buy Now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-sm sm:text-base">
                <a href={INTERNAL_LINKS.how_it_works}>
                  See how it works
                </a>
              </Button>
            </div>
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-6 sm:mb-8">30-day money-back guarantee.</p>

            {/* Bundle Section */}
            {showBundle && (
              <div className="border-t border-border pt-4 sm:pt-6 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Best value bundle (for multiple rooms)</h3>
                <div className="border border-primary/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 bg-primary/5">
                  <div className="flex gap-3 sm:gap-4 items-start">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl bg-card border border-border/50 p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                      <img src={biotica800} alt="Bundle" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-sm sm:text-base">Biotica 800 + 2 Minis (Bundle)</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Best value for multiple rooms</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 hidden sm:block">One open-space device + two portable personal zones</p>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                    <Button variant="hero" size="sm" asChild className="text-xs sm:text-sm">
                      <a href={INTERNAL_LINKS.bundle}>
                        Shop Bundle <ArrowRight className="ml-1.5 sm:ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="text-xs sm:text-sm">
                      <a href={INTERNAL_LINKS.support}>Ask support</a>
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Also Consider */}
            <div className="border-t border-border pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Also consider</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {product.also.slice(0, 3).map((key) => (
                  <ProductCard key={key} productKey={key as ProductKey} showWhy />
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <Button variant="outline" size="sm" onClick={restart} className="text-xs sm:text-sm">
                <RotateCcw className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Restart quiz
              </Button>
              <a href={INTERNAL_LINKS.support} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                Talk to support
              </a>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <section id="find-my-solution" className="py-12 sm:py-16 lg:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground mb-3 sm:mb-4">
              Personalized Recommendation
            </p>
            <h2 className="font-display font-light text-foreground leading-[1.05] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              Find Your
              <br />
              <span className="italic font-normal text-primary">Best Match</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-10 shadow-xl">
              {renderContent()}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
