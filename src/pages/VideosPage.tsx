import { useState, useCallback, lazy, Suspense } from "react";
import { Link } from "@/lib/link";
import { Navbar } from "@/components/Navbar";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
import { Play, ArrowRight, Video, X, Share2, MessageCircle, Mail, Copy, ExternalLink, FileText } from "lucide-react";
import { videoCategories, getVideosByCategory, Video as VideoType } from "@/data/videoData";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SEOHead, makeBreadcrumbJsonLd } from "@/components/SEOHead";
import { LifestyleHero } from "@/components/LifestyleHero";
import heroVideosLifestyleAsset from "@/assets/resources-hero.avif.asset.json";
const heroVideosLifestyle = heroVideosLifestyleAsset.url;
const ContentProductCTA = lazy(() => import("@/components/ContentProductCTA").then(m => ({ default: m.ContentProductCTA })));

const videosPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    makeBreadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Videos", url: "/videos" },
    ]),
    {
      "@type": "CollectionPage",
      "@id": "https://envirobiotics.com/videos",
      "name": "Videos | EnviroBiotics Probiotic Technology in Action",
      "description": "Watch how EnviroBiotics probiotic technology works. Product demos, installation guides, and the science behind environmental probiotics.",
      "isPartOf": { "@id": "https://envirobiotics.com/#website" },
    },
  ],
};
const VideoCard = ({ video, onClick }: { video: VideoType; onClick: () => void }) => {
  const [copied, setCopied] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  const shareUrl = `https://vimeo.com/${video.vimeoId}`;
  const shareText = `${video.title} — ${video.description}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(video.title)}&body=${encodeURIComponent(`${video.description}\n\n${shareUrl}`)}`;

  const handleShare = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Native share (WhatsApp, email, etc.) when supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: shareUrl,
        });
        return;
      } catch {
        // Falls back to explicit share options below
      }
    }

    setIsShareDialogOpen(true);
  }, [shareUrl, video.description, video.title]);

  const handleCopyLink = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      setIsShareDialogOpen(false);
    } catch {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  }, [shareUrl]);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        className="group block w-full text-left bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
              <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {video.description}
              </p>
            </div>
            <button
              onClick={handleShare}
              className="shrink-0 w-9 h-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors mt-1"
              aria-label={`Share ${video.title}`}
              title="Share video"
            >
              <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
            </button>
          </div>
          {video.transcript && (
            <details className="mt-3 group/transcript">
              <summary className="text-xs font-medium text-primary-text cursor-pointer hover:underline flex items-center gap-1">
                <FileText className="w-3 h-3" />
                View transcript
              </summary>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed border-t border-border pt-2">
                {video.transcript}
              </p>
            </details>
          )}
        </div>
      </div>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="font-display text-xl">Share this video</DialogTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={emailShareUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <button
              type="button"
              onClick={() => void handleCopyLink()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Video
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const VideoModal = ({ video, isOpen, onClose }: { video: VideoType | null; isOpen: boolean; onClose: () => void }) => {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        <div className="aspect-video bg-black">
          <iframe
            src={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video: VideoType) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Videos | EnviroBiotics Probiotic Technology in Action"
        description="Watch how EnviroBiotics probiotic technology works. Product demos, installation guides, and the science behind environmental probiotics."
        path="/videos"
        jsonLd={videosPageJsonLd}
      />
      <Navbar />
      <main>
        {/* Hero Section */}
        <LifestyleHero
          image={heroVideosLifestyle}
          imageAlt="Person watching a calm Scandinavian living room scene"
          eyebrow="Watch & Learn"
          title={<>See it <span className="text-heading-accent italic font-normal">in action</span></>}
          subcopy="Demonstrations, installation walkthroughs, and the science behind environmental probiotics."
          ctaLabel="Browse Videos"
          ctaHref="#video-library"
        />

        {/* Video Sections */}
        <div id="video-library" className="scroll-mt-24" />
        {videoCategories.map((category, categoryIndex) => {
          const categoryVideos = getVideosByCategory(category.id);
          
          return (
            <section 
              key={category.id} 
              className={`section-padding ${categoryIndex % 2 === 0 ? 'bg-muted/30' : ''}`}
            >
              <div className="container">
                <ScrollReveal>
                  <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-display font-bold">
                      {category.title}
                    </h2>
                    {category.description && (
                      <p className="text-muted-foreground mt-3 max-w-2xl">
                        {category.description}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
                
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryVideos.map((video) => (
                    <StaggerItem key={video.id}>
                      <VideoCard video={video} onClick={() => handleVideoClick(video)} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </section>
          );
        })}

        {/* CTA Section */}
        <section className="section-padding bg-muted/30">
          <div className="container">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto p-8 md:p-12 rounded-3xl glass-card border border-primary/20">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">
                  Looking for More Information?
                </h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  >
                    Articles & Blogs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/support"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contextual product CTA */}
        <section className="container max-w-4xl px-4">
          <ContentProductCTA
            headline="See the technology in action at home"
          />
        </section>
      </main>
      <Suspense fallback={null}><Footer /></Suspense>

      {/* Video Modal */}
      <VideoModal 
        video={selectedVideo} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default VideosPage;
