import { useParams } from "@tanstack/react-router";
import { Link } from "@/lib/link";
import { Navigate } from "@/lib/router-compat";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ArrowLeft, BookOpen, ShieldCheck } from "lucide-react";
import { getAuthorBySlug } from "@/data/authorsData";
import { blogPosts } from "@/data/blogData";
import { Card, CardContent } from "@/components/ui/card";

const DOMAIN = "https://envirobiotics.com";

const AuthorPage = () => {
  const { slug } = useParams({ strict: false }) as { slug?: string };
  const author = slug ? getAuthorBySlug(slug) : undefined;

  if (!author) return <Navigate to="/blog" replace />;

  const posts = blogPosts.filter((p) => !p.externalUrl);
  const authorUrl = `${DOMAIN}/author/${author.slug}`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": author.type,
        "@id": `${authorUrl}#${author.type === "Person" ? "person" : "org"}`,
        name: author.name,
        url: authorUrl,
        jobTitle: author.jobTitle,
        description: author.bio,
        ...(author.image ? { image: author.image } : {}),
        ...(author.sameAs ? { sameAs: author.sameAs } : {}),
        worksFor: {
          "@type": "Organization",
          name: "EnviroBiotics",
          url: DOMAIN,
        },
      },
      makeBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: author.name, url: `/author/${author.slug}` },
      ]),
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${author.name} — Author`}
        description={author.bio}
        path={`/author/${author.slug}`}
        type="profile"
        jsonLd={personJsonLd}
      />
      <Navbar />
      <main>
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-50" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto">
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
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-3">Author</p>
                <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                  {author.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-2">{author.jobTitle}</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-6">
              {author.longBio.map((p, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-display font-bold">Credentials & Standards</h2>
                  </div>
                  <ul className="space-y-2">
                    {author.credentials.map((c, i) => (
                      <li key={i} className="text-foreground/80 flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container">
              <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    Articles by {author.name}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                    >
                      <div className="h-36 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-display font-bold text-foreground group-hover:text-primary line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AuthorPage;
