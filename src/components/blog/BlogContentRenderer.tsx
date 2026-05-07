import React from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Render inline markdown: **bold** and [link text](/path)
const renderInlineMarkdown = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Find the earliest match of bold or link
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const boldIdx = boldMatch?.index ?? Infinity;
    const linkIdx = linkMatch?.index ?? Infinity;

    if (boldIdx === Infinity && linkIdx === Infinity) {
      parts.push(remaining);
      break;
    }

    if (linkIdx < boldIdx && linkMatch && linkMatch.index !== undefined) {
      // Link comes first
      if (linkMatch.index > 0) parts.push(remaining.slice(0, linkMatch.index));
      const href = linkMatch[2];
      const isInternal = href.startsWith("/");
      if (isInternal) {
        parts.push(
          <Link key={key++} to={href} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-medium">
            {linkMatch[1]}
          </Link>
        );
      } else {
        parts.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors font-medium">
            {linkMatch[1]}
          </a>
        );
      }
      remaining = remaining.slice(linkMatch.index + linkMatch[0].length);
    } else if (boldMatch && boldMatch.index !== undefined) {
      // Bold comes first
      if (boldMatch.index > 0) parts.push(remaining.slice(0, boldMatch.index));
      parts.push(
        <strong key={key++} className="text-foreground font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    }
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
};

interface ContentBlockProps {
  item: string;
  isFirstParagraph?: boolean;
}

const ContentBlock = ({ item, isFirstParagraph = false }: ContentBlockProps) => {
  // Heading ##
  if (item.startsWith("## ")) {
    return (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-12 mb-2">
        {item.slice(3)}
      </h2>
    );
  }

  // Blockquote >
  if (item.startsWith("> ")) {
    return (
      <blockquote className="relative my-10 py-8 px-8 md:px-12 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-2xl">
        <div className="absolute -left-3 -top-3 text-6xl text-primary/20 font-serif">"</div>
        <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-relaxed italic">
          {renderInlineMarkdown(item.slice(2))}
        </p>
      </blockquote>
    );
  }

  // Regular paragraph
  const paragraphClass = isFirstParagraph
    ? "text-lg md:text-xl text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1"
    : "text-lg text-muted-foreground leading-relaxed";

  return (
    <p className={paragraphClass}>
      {renderInlineMarkdown(item)}
    </p>
  );
};

interface BlogContentRendererProps {
  content: string[];
}

export const BlogContentRenderer = ({ content }: BlogContentRendererProps) => {
  return (
    <div className="space-y-6">
      {content.map((item, index) => (
        <ScrollReveal key={index} delay={Math.min(index * 0.05, 0.3)}>
          <ContentBlock item={item} isFirstParagraph={index === 0} />
        </ScrollReveal>
      ))}
    </div>
  );
};
