import React from "react";
import { Link } from "@/lib/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Render the inline Markdown used by the authored articles.
export const renderInlineMarkdown = (text: string): React.ReactNode => {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Find the earliest match of bold or link
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+?)\*(?!\*)/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const boldIdx = boldMatch?.index ?? Infinity;
    const linkIdx = linkMatch?.index ?? Infinity;
    const italicIdx = italicMatch?.index ?? Infinity;

    if (boldIdx === Infinity && linkIdx === Infinity && italicIdx === Infinity) {
      parts.push(remaining);
      break;
    }

    if (linkIdx < boldIdx && linkIdx < italicIdx && linkMatch && linkMatch.index !== undefined) {
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
    } else if (boldIdx < italicIdx && boldMatch && boldMatch.index !== undefined) {
      // Bold comes first
      if (boldMatch.index > 0) parts.push(remaining.slice(0, boldMatch.index));
      parts.push(
        <strong key={key++} className="text-foreground font-semibold">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
    } else if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) parts.push(remaining.slice(0, italicMatch.index));
      parts.push(<em key={key++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
    }
  }

  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : <>{parts}</>;
};

interface ContentBlockProps {
  item: string;
  isFirstParagraph?: boolean;
}

const ContentBlock = ({ item, isFirstParagraph = false }: ContentBlockProps) => {
  if (item.startsWith("|") && item.includes("\n")) {
    const rows = item.split("\n").filter((row) => !/^\|?[\s:|-]+\|?$/.test(row));
    const cells = rows.map((row) => row.replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
    const [head, ...body] = cells;
    if (!head) return null;
    return (
      <div className="my-8 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead className="bg-muted/70">
            <tr>{head.map((cell, index) => <th key={index} className="border-b border-border px-4 py-3 font-semibold text-foreground">{renderInlineMarkdown(cell)}</th>)}</tr>
          </thead>
          <tbody>{body.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-border/60 last:border-0">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top text-muted-foreground">{renderInlineMarkdown(cell)}</td>)}</tr>)}</tbody>
        </table>
      </div>
    );
  }

  const unordered = item.match(/^[-*]\s+(.+)/);
  const ordered = item.match(/^\d+\.\s+(.+)/);
  if (unordered || ordered) {
    const content = unordered?.[1] ?? ordered?.[1] ?? "";
    const List = ordered ? "ol" : "ul";
    return <List className={ordered ? "ml-6 list-decimal text-lg text-muted-foreground" : "ml-6 list-disc text-lg text-muted-foreground"}><li className="pl-1 leading-relaxed">{renderInlineMarkdown(content)}</li></List>;
  }

  // Heading ###
  if (item.startsWith("### ")) {
    return (
      <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mt-8 mb-2">
        {renderInlineMarkdown(item.slice(4))}
      </h3>
    );
  }

  // Heading ##
  if (item.startsWith("## ")) {
    return (
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-12 mb-2">
        {renderInlineMarkdown(item.slice(3))}
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
