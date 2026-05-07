import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InstallationQuoteForm } from "@/components/InstallationQuoteForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Home, 
  Building2, 
  Briefcase, 
  Baby, 
  Dog, 
  Leaf, 
  DollarSign,
  Check,
  Star,
  X,
  Mail,
  Gift,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

import biologicMini from "@/assets/shop/biologic-mini.png";
import biotica800 from "@/assets/shop/biotica-800.png";
import ba2080 from "@/assets/shop/ba2080.png";
import ebioticProProduct from "@/assets/ebiotic-pro-device.png";

interface QuizOption {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  value: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: QuizOption[];
  multiSelect?: boolean;
}

const questions: QuizQuestion[] = [
  {
    id: "space",
    question: "What size is your space?",
    subtitle: "Select the area you want to cover",
    options: [
      { id: "small", label: "Small room (up to 300 sq ft)", icon: <Briefcase className="w-6 h-6" />, value: 1 },
      { id: "medium", label: "Medium room (300-800 sq ft)", icon: <Home className="w-6 h-6" />, value: 2 },
      { id: "large", label: "Large space (800-2,600 sq ft)", icon: <Building2 className="w-6 h-6" />, value: 3 },
      { id: "hvac", label: "Whole home (central HVAC system)", icon: <Building2 className="w-6 h-6" />, value: 10 },
    ],
  },
  {
    id: "needs",
    question: "What are your main concerns?",
    subtitle: "Select all that apply",
    multiSelect: true,
    options: [
      { id: "allergies", label: "Reducing allergens like pollen, dust, or dander", icon: <Leaf className="w-6 h-6" />, value: 1 },
      { id: "babies", label: "Creating a safer space for babies and children", icon: <Baby className="w-6 h-6" />, value: 0 },
      { id: "pets", label: "Eliminating pet odors and dander", icon: <Dog className="w-6 h-6" />, value: 1 },
      { id: "germs", label: "Reducing germs, bacteria, or mold", icon: <Sparkles className="w-6 h-6" />, value: 2 },
    ],
  },
  {
    id: "portability",
    question: "Do you need portability?",
    subtitle: "Will you move it between spaces?",
    options: [
      { id: "fixed", label: "Keeping it in one location", icon: <Home className="w-6 h-6" />, value: 0 },
      { id: "portable", label: "Moving it between rooms or traveling", icon: <Briefcase className="w-6 h-6" />, value: -2 },
    ],
  },
  {
    id: "budget",
    question: "What's your budget?",
    subtitle: "Select your price range",
    options: [
      { id: "budget", label: "Budget friendly (under $150)", icon: <DollarSign className="w-6 h-6" />, value: -2 },
      { id: "mid", label: "Mid range ($150 to $500)", icon: <DollarSign className="w-6 h-6" />, value: 0 },
      { id: "premium", label: "Premium ($500+)", icon: <DollarSign className="w-6 h-6" />, value: 2 },
    ],
  },
];

interface ProductRecommendation {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  coverage: string;
  highlights: string[];
  shopLink: string;
  matchScore: number;
}

const products: Omit<ProductRecommendation, 'matchScore'>[] = [
  {
    slug: "biologic-mini",
    name: "BioLogic Mini",
    tagline: "Perfect for personal spaces and travel",
    price: 98,
    image: biologicMini,
    coverage: "Up to 300 sq ft",
    highlights: ["Portable & USB powered", "Whisper quiet", "Travel friendly", "90 day cartridge"],
    shopLink: "/product/biologic-mini",
  },
  {
    slug: "biotica-800",
    name: "Biotica 800",
    tagline: "Ideal for living rooms and bedrooms",
    price: 299,
    image: biotica800,
    coverage: "Up to 800 sq ft",
    highlights: ["Whole room coverage", "Set & forget", "180 day cartridge", "Ultra quiet"],
    shopLink: "/product/biotica-800",
  },
  {
    slug: "ba-2080",
    name: "BA 2080",
    tagline: "Maximum protection with HEPA + Probiotics",
    price: 995,
    image: ba2080,
    coverage: "Up to 2,600 sq ft",
    highlights: ["HEPA + Probiotic hybrid", "Commercial grade", "Air quality indicator", "3 year warranty"],
    shopLink: "/product/ba-2080",
  },
];

function calculateRecommendation(answers: Record<string, string | string[]>): ProductRecommendation {
  let score = 0;
  
  // Space size scoring
  const spaceAnswer = answers.space as string;
  if (spaceAnswer === "small") score -= 2;
  else if (spaceAnswer === "medium") score += 0;
  else if (spaceAnswer === "large") score += 3;
  
  // Needs scoring (multi-select)
  const needsAnswer = answers.needs as string[] || [];
  if (needsAnswer.includes("germs")) score += 1;
  if (needsAnswer.includes("allergies")) score += 1;
  
  // Portability scoring
  const portabilityAnswer = answers.portability as string;
  if (portabilityAnswer === "portable") score -= 3;
  
  // Budget scoring
  const budgetAnswer = answers.budget as string;
  if (budgetAnswer === "budget") score -= 2;
  else if (budgetAnswer === "premium") score += 2;
  
  // Determine product based on score
  let recommendedProduct: Omit<ProductRecommendation, 'matchScore'>;
  let matchScore: number;
  
  if (score <= -1) {
    recommendedProduct = products[0]; // BioLogic Mini
    matchScore = 95;
  } else if (score <= 2) {
    recommendedProduct = products[1]; // Biotica 800
    matchScore = 98;
  } else {
    recommendedProduct = products[2]; // BA 2080
    matchScore = 96;
  }
  
  return { ...recommendedProduct, matchScore };
}

interface ProductFinderQuizProps {
  onClose?: () => void;
  isModal?: boolean;
  hideHeader?: boolean;
}

const RECAPTCHA_SITE_KEY = "6LdFf2QsAAAAADxCvgV9IGrHVGs9CoF50_ksSjXu";

const ProductFinderQuizInner = ({ onClose, isModal = false, hideHeader = false }: ProductFinderQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [showHVACResult, setShowHVACResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const multiSelectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  
  // Clear timer on unmount or step change
  useEffect(() => {
    return () => {
      if (multiSelectTimerRef.current) {
        clearTimeout(multiSelectTimerRef.current);
      }
    };
  }, [currentStep]);
  
  const handleSelect = (optionId: string) => {
    if (currentQuestion.multiSelect) {
      const currentAnswers = (answers[currentQuestion.id] as string[]) || [];
      let newAnswers: string[];
      
      if (currentAnswers.includes(optionId)) {
        // Deselecting an option
        newAnswers = currentAnswers.filter(id => id !== optionId);
      } else {
        // Selecting an option
        newAnswers = [...currentAnswers, optionId];
      }
      
      setAnswers({
        ...answers,
        [currentQuestion.id]: newAnswers,
      });
      
      // Clear any existing timer
      if (multiSelectTimerRef.current) {
        clearTimeout(multiSelectTimerRef.current);
        multiSelectTimerRef.current = null;
      }
      
      // If at least one option is selected, start auto-advance timer
      if (newAnswers.length > 0) {
        const nextStep = currentStep + 1;
        const isLastQuestion = currentStep >= questions.length - 1;
        
        multiSelectTimerRef.current = setTimeout(() => {
          if (isLastQuestion) {
            setShowResult(true);
          } else {
            setCurrentStep(nextStep);
          }
        }, 1000);
      }
    } else {
      // For single-select, set answer and auto-advance
      const newAnswers = {
        ...answers,
        [currentQuestion.id]: optionId,
      };
      setAnswers(newAnswers);
      
      // If HVAC selected on space question, show special HVAC result
      if (currentQuestion.id === 'space' && optionId === 'hvac') {
        setTimeout(() => {
          setShowHVACResult(true);
        }, 300);
        return;
      }
      
      // Auto-advance after a short delay for visual feedback
      const nextStep = currentStep + 1;
      const isLastQuestion = currentStep >= questions.length - 1;
      
      setTimeout(() => {
        if (isLastQuestion) {
          setShowResult(true);
        } else {
          setCurrentStep(nextStep);
        }
      }, 300);
    }
  };
  
  const isOptionSelected = (optionId: string) => {
    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.includes(optionId);
    }
    return answer === optionId;
  };
  
  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (currentQuestion.multiSelect) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };
  
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setShowHVACResult(false);
    setEmail("");
    setEmailSubmitted(false);
    setDiscountCode(null);
  };
  
  const recommendation = showResult ? calculateRecommendation(answers) : null;
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !recommendation) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let recaptchaToken = "";
      if (executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("quiz_recommendation");
        } catch (recaptchaError) {
          console.warn("reCAPTCHA failed, proceeding without token:", recaptchaError);
        }
      }

      // Only send productSlug - server validates and looks up product data
      const { data, error } = await supabase.functions.invoke('send-quiz-recommendation', {
        body: {
          email: email.trim(),
          productSlug: recommendation.slug,
          quizAnswers: answers,
          recaptchaToken,
        },
      });
      
      if (error) throw error;
      
      setEmailSubmitted(true);
      setDiscountCode(data?.discountCode || "QUIZ10");
      
      toast({
        title: "Check your inbox!",
        description: "We've sent your personalized recommendation with an exclusive discount code.",
      });
    } catch (error) {
      console.error("Error sending recommendation:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or shop directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={`${isModal ? '' : 'rounded-2xl sm:rounded-3xl border border-border bg-card overflow-hidden'}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 md:p-8 border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-accent/5">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Product Finder
          </Badge>
          {isModal && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="w-8 h-8 sm:w-10 sm:h-10">
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
        </div>
        
        {!showResult && !hideHeader && (
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2">
            Answer 4 quick questions to get your recommendation.
          </h2>
        )}
        
        {/* Progress Bar */}
        {!showResult && (
          <div className={hideHeader ? "" : "mt-4 sm:mt-6"}>
            <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2">
              <span className="text-muted-foreground">Question {currentStep + 1} of {questions.length}</span>
              <span className="font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <AnimatePresence mode="wait">
          {showHVACResult ? (
            <motion.div
              key="hvac-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="font-semibold text-sm sm:text-base">Whole Home HVAC Solution</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2">
                E-Biotic Pro Systems
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-8">
                Our probiotic HVAC solution designed for homes with central air systems. Installs directly into your ductwork for continuous, whole-home protection, no extra devices needed.
              </p>

              <div className="mb-5 sm:mb-8">
                <div className="bg-gradient-to-br from-background via-background to-muted/30 rounded-2xl border border-border/50 p-6 sm:p-8 flex items-center justify-center mb-4 sm:mb-6">
                  <img
                    src={ebioticProProduct}
                    alt="E-Biotic Pro System"
                    className="max-h-[180px] sm:max-h-[240px] w-auto object-contain mix-blend-multiply"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border mb-5 sm:mb-8">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 text-left mb-4 sm:mb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                    <span>Whole home coverage</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                    <span>Simple installation in your ducts</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                    <span>Works with existing central HVAC</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                    <span>Continuous probiotic protection</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  E-Biotic Pro is tailored to your home's HVAC setup. Contact us for a personalized recommendation and quote.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center">
                <Button variant="outline" size="lg" onClick={handleRestart} className="text-sm sm:text-base py-2.5 sm:py-3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <InstallationQuoteForm 
                  productName="E-Biotic Pro"
                  trigger={
                    <Button variant="hero" size="lg" className="text-sm sm:text-base py-2.5 sm:py-3">
                      Contact Us for a Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            </motion.div>
          ) : !showResult ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl mb-1.5 sm:mb-2">
                {currentQuestion.question}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-8">{currentQuestion.subtitle}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelect(option.id)}
                    className={`group w-full flex flex-col items-start p-4 sm:p-5 rounded-xl border transition-all duration-200 text-left ${
                      isOptionSelected(option.id)
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border bg-card hover:border-muted-foreground/40 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 ${
                      isOptionSelected(option.id)
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <div className="w-5 h-5 sm:w-6 sm:h-6">
                        {option.icon}
                      </div>
                    </div>
                    <span className={`text-sm sm:text-base transition-colors duration-200 ${
                      isOptionSelected(option.id) ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}>{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6">
                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                <span className="font-semibold text-sm sm:text-base">{recommendation?.matchScore}% Match</span>
              </div>
              
              <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2">
                We Recommend the {recommendation?.name}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-8">{recommendation?.tagline}</p>
              
              <div className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-border mb-5 sm:mb-8">
                <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
                    <img 
                      src={recommendation?.image} 
                      alt={recommendation?.name}
                      className="max-h-full max-w-full object-contain will-change-transform mix-blend-multiply"
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                        imageRendering: 'crisp-edges',
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider mb-0.5 sm:mb-1">
                      Coverage: {recommendation?.coverage}
                    </div>
                    <h4 className="font-display font-bold text-xl sm:text-2xl mb-1.5 sm:mb-2">{recommendation?.name}</h4>
                    <p className="text-2xl sm:text-3xl font-bold text-primary mb-3 sm:mb-4">${recommendation?.price}</p>
                    
                    <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-left">
                      {recommendation?.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center">
                <Button variant="outline" size="lg" onClick={handleRestart} className="text-sm sm:text-base py-2.5 sm:py-3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retake Quiz
                </Button>
                <Button variant="outline" size="lg" asChild className="text-sm sm:text-base py-2.5 sm:py-3">
                  <Link to={`/product/${recommendation?.slug}`}>
                    View Details
                  </Link>
                </Button>
                <Button variant="hero" size="lg" asChild className="text-sm sm:text-base py-2.5 sm:py-3">
                  <a href={recommendation?.shopLink}>
                    Buy Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Navigation - Back button only when not on first step */}
      {!showResult && !showHVACResult && currentStep > 0 && (
        <div className="p-4 sm:p-6 md:p-8 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="gap-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export const ProductFinderQuiz = (props: ProductFinderQuizProps) => (
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <ProductFinderQuizInner {...props} />
  </GoogleReCaptchaProvider>
);
