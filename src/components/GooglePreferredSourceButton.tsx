import { Bookmark } from "lucide-react";

interface GooglePreferredSourceButtonProps {
  theme?: "light" | "dark";
  lang?: string;
  className?: string;
}

export const GooglePreferredSourceButton = ({
  theme = "light",
  lang = "en",
  className = "",
}: GooglePreferredSourceButtonProps) => {
  return (
    <div
      className={`rounded-2xl border border-border/60 bg-card p-6 md:p-8 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-2 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            Add EnviroBiotics as a preferred source
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Get our latest research, guides, and air-quality insights highlighted
            in your Google experience.
          </p>
        </div>
        <div className="shrink-0">
          {/* Google's official button target */}
          <div
            google-add-preferred-source-btn
            data-theme={theme}
            data-lang={lang}
            className="min-h-[40px]"
          />
          {/* No-JS / email / social fallback */}
          <noscript>
            <a
              href="https://www.google.com/preferences/source?q=envirobiotics.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Add on Google
            </a>
          </noscript>
        </div>
      </div>
    </div>
  );
};

export default GooglePreferredSourceButton;
