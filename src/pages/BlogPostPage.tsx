import { useParams } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { Navigate } from "@/lib/router-compat";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { ArrowLeft, Calendar, Clock, ArrowRight, BookOpen, Lightbulb, CheckCircle2, Share2, Bookmark } from "lucide-react";
import { getPostBySlug, getRelatedPosts, BlogPost } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";

const RelatedPostCard = ({ post }: { post: BlogPost }) => (
  <Link
    to={post.externalUrl ? post.externalUrl : `/blog/${post.slug}`}
    target={post.externalUrl ? "_blank" : undefined}
    rel={post.externalUrl ? "noopener noreferrer" : undefined}
    className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
  >
    <div className="relative h-36 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2 capitalize">
        {post.category}
      </span>
      <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h3>
    </div>
  </Link>
);

// Extract key takeaways from content
const extractKeyTakeaways = (content: string[]): string[] => {
  const takeaways: string[] = [];
  
  // Look for benefit-related sentences
  content.filter(p => !p.startsWith("## ") && !p.startsWith("> ")).forEach(paragraph => {
    if (paragraph.toLowerCase().includes("benefit") || 
        paragraph.toLowerCase().includes("protection") ||
        paragraph.toLowerCase().includes("sustainable")) {
      const sentences = paragraph.split(". ");
      sentences.forEach(sentence => {
        if (sentence.length > 30 && sentence.length < 150 && takeaways.length < 4) {
          takeaways.push(sentence.trim().replace(/\.$/, ""));
        }
      });
    }
  });
  
  // Default takeaways if none found
  if (takeaways.length === 0) {
    return [
      "Probiotic technology creates a healthier microbial balance",
      "24/7 protection on surfaces throughout your space",
      "Natural and sustainable alternative to chemical cleaners",
      "Works with nature to create safer indoor environments"
    ];
  }
  
  return takeaways.slice(0, 4);
};

// Extract a compelling quote from content
const extractPullQuote = (content: string[]): string => {
  for (const paragraph of content) {
    if (paragraph.includes("shift") || paragraph.includes("represents") || paragraph.includes("inevitable")) {
      const sentences = paragraph.split(". ");
      for (const sentence of sentences) {
        if (sentence.length > 50 && sentence.length < 200) {
          return sentence.trim();
        }
      }
    }
  }
  return content[0]?.split(". ")[0] || "";
};

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  // If post has external URL, redirect there
  if (post?.externalUrl) {
    window.location.href = post.externalUrl;
    return null;
  }

  // If post not found, redirect to blog
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const readingTime = Math.ceil(post.content.join(" ").split(" ").length / 200);
  const keyTakeaways = extractKeyTakeaways(post.content);
  const pullQuote = extractPullQuote(post.content);
  
  // Filter plain paragraphs for legacy layout (non-markdown posts)
  const plainParagraphs = post.content.filter(p => !p.startsWith("## ") && !p.startsWith("> "));
  const hasMarkdown = post.content.some(p => p.startsWith("## ") || p.startsWith("> ") || p.includes("**"));

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={post.title}
        description={post.description}
        path={`/blog/${slug}`}
        type="article"
        image={typeof post.image === 'string' ? post.image : undefined}
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              image: typeof post.image === 'string' ? post.image : undefined,
              datePublished: "2026-02-01",
              dateModified: "2026-03-11",
              wordCount: post.content.join(" ").split(" ").length,
              author: {
                "@type": "Organization",
                name: "EnviroBiotics",
                url: "https://envirobiotics.com",
              },
              publisher: {
                "@type": "Organization",
                name: "EnviroBiotics",
                logo: {
                  "@type": "ImageObject",
                  url: "https://envirobiotics.com/favicon.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://envirobiotics.com/blog/${slug}/`,
              },
              url: `https://envirobiotics.com/blog/${slug}/`,
              inLanguage: "en-US",
              keywords: ["probiotic air purifier", "indoor air quality", "environmental probiotics", "EnviroBiotics"],
              about: {
                "@type": "Thing",
                name: "Probiotic Air Purification",
                description: "The use of beneficial Bacillus bacteria to continuously treat indoor air and surfaces.",
              },
            },
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
              { name: post.title, url: `/blog/${slug}` },
            ]),
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />
          
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Blog
                </Link>
              </ScrollReveal>
              
              <ScrollReveal delay={0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium capitalize">
                    <BookOpen className="w-4 h-4" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    February 2026
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {readingTime} min read
                  </span>
                </div>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1] mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
                  {post.title}
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  {post.description}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-16">
          <div className="container">
            <ScrollReveal>
              <div className="max-w-5xl mx-auto">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[300px] md:h-[500px] object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Key Takeaways Card */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal>
                <Card className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent border-primary/20 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-xl bg-primary/20">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-display font-bold text-foreground">Key Takeaways</h3>
                    </div>
                    <ul className="space-y-4">
                      {keyTakeaways.map((takeaway, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              {hasMarkdown ? (
                <BlogContentRenderer content={post.content} />
              ) : (
                <>
                  <StaggerContainer className="space-y-8 mb-16">
                    {post.content.slice(0, 2).map((paragraph, index) => (
                      <StaggerItem key={index}>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                          {paragraph}
                        </p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {pullQuote && (
                    <ScrollReveal>
                      <blockquote className="relative my-16 py-8 px-8 md:px-12 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-2xl">
                        <div className="absolute -left-3 -top-3 text-6xl text-primary/20 font-serif">"</div>
                        <p className="text-xl md:text-2xl font-display font-medium text-foreground leading-relaxed italic">
                          {pullQuote}
                        </p>
                      </blockquote>
                    </ScrollReveal>
                  )}

                  <StaggerContainer className="space-y-8 mb-16">
                    {post.content.slice(2, -2).map((paragraph, index) => (
                      <StaggerItem key={index}>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                        {index % 2 === 1 && index < post.content.length - 4 - 1 && (
                          <div className="flex items-center justify-center gap-2 my-12">
                            <div className="w-2 h-2 rounded-full bg-primary/30" />
                            <div className="w-2 h-2 rounded-full bg-primary/50" />
                            <div className="w-2 h-2 rounded-full bg-primary/30" />
                          </div>
                        )}
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <ScrollReveal>
                    <div className="my-16 p-8 bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl border border-border/50">
                      <h4 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-1 bg-primary rounded-full" />
                        Why This Matters
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Understanding the difference between reactive filtration and proactive microbial balance is key to creating truly healthy indoor environments. This technology represents a fundamental shift in how we approach indoor air quality.
                      </p>
                    </div>
                  </ScrollReveal>

                  <StaggerContainer className="space-y-8">
                    {post.content.slice(-2).map((paragraph, index) => (
                      <StaggerItem key={index}>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </>
              )}

              {/* CTA Section */}
              <ScrollReveal delay={0.2}>
                <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl border border-primary/20 text-center">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                    Ready to improve your indoor environment?
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Discover our range of probiotic air purification solutions designed to create healthier spaces for you and your family.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/shop"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                      Explore Products
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted text-foreground rounded-xl font-semibold hover:bg-muted/80 transition-colors"
                    >
                      Learn How It Works
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-primary rounded-full" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    Related Articles
                  </h2>
                </div>
              </ScrollReveal>
              
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <StaggerItem key={relatedPost.slug}>
                    <RelatedPostCard post={relatedPost} />
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <ScrollReveal delay={0.3}>
                <div className="text-center mt-10">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    View All Articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
