import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export const SectionLabel = ({ children, className, centered = false }: SectionLabelProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-primary-text uppercase tracking-wider",
        centered && "justify-center",
        className
      )}
    >
      <span className="w-6 md:w-8 h-px bg-primary" />
      {children}
      <span className="w-6 md:w-8 h-px bg-primary" />
    </span>
  );
};
