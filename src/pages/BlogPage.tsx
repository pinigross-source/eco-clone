import { Link } from "@/lib/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts, articlePosts, BlogPost } from "@/data/blogData";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { RelatedTopics } from "@/components/RelatedTopics";
import { LifestyleHero } from "@/components/LifestyleHero";
import heroBlogLifestyleAsset from "@/assets/resources-hero.avif.asset.json";
const heroBlogLifestyle = heroBlogLifestyleAsset.url;

const BlogCard = ({ post }: { post: BlogPost }) => {
  const isExternal = !!post.externalUrl;
  const href = isExternal ? post.externalUrl! : `/blog/${post.slug}`;

  const cardContent = (
    <>
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full capitalize">
          {post.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.description}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          Read More
          {isExternal ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      {cardContent}
    </Link>
  );
};

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog & Articles on Indoor Air Quality"
        description="Discover insights about indoor wellness, probiotic technology, and creating healthier living spaces. Expert articles on air purification and surface treatment."
        path="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            makeBreadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Blog", url: "/blog" },
            ]),
            {
              "@type": "Blog",
              "@id": "https://envirobiotics.com/blog",
              "name": "Blog & Articles on Indoor Air Quality",
              "description": "Discover insights about indoor wellness, probiotic technology, and creating healthier living spaces.",
              "isPartOf": { "@id": "https://envirobiotics.com/#website" },
            },
          ],
        }}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <LifestyleHero
          image={heroBlogLifestyle}
          imageAlt="Woman reading by a sunlit window in a calm Scandinavian home"
          eyebrow="Stories & Insights"
          title={<><span className="block">Living a little better</span><span className="block text-heading-accent italic font-normal">indoors</span></>}
          subcopy="Insights on indoor wellness, probiotic technology, and creating healthier spaces for your family."
          ctaLabel="Read the Latest"
          ctaHref="#latest-posts"
        />

        {/* Blogs Section */}
        <section id="latest-posts" className="section-padding bg-muted/30 scroll-mt-24">
          <div className="container">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
                Latest Blogs
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Articles Section */}
        <section className="section-padding">
          <div className="container">
            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-10">
                Featured Articles
              </h2>
            </ScrollReveal>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articlePosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto p-8 md:p-12 rounded-3xl glass-card border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                  Ready to Transform Your Indoor Environment?
                </h2>
                <p className="text-muted-foreground mb-8">
                  Explore our probiotic solutions and discover clean that keeps working.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Shop Products
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="container max-w-4xl px-4 pb-16">
          <RelatedTopics currentPath="/blog" />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
