import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Play } from "lucide-react";
import { Link } from "@/lib/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { trackEvent } from "@/lib/tracking";
import miniAsset from "@/assets/biologic-mini-new.jpg.asset.json";
import bioticaAsset from "@/assets/biotica-800-new.jpg.asset.json";
import bedroomAsset from "@/assets/The_bedroom_you_rest_in.avif.asset.json";
import livingRoomAsset from "@/assets/The_living_room_floor.avif.asset.json";
import playroomAsset from "@/assets/The_playroom_and_beyond.avif.asset.json";
import "./mobile-home-preview.css";

const REVIEWED_PRICES = {
  reviewedOn: "2026-09-13",
  // TODO: Replace this reviewed snapshot with live commerce data before promoting this route to production.
  mini: { price: "$98", coverage: "Up to 300 sq ft" },
  biotica: { price: "$299", coverage: "Up to 800 sq ft" },
} as const;

const MINI_URL = "https://shop.envirobiotics.com/products/biologic-mini";
const BIOTICA_URL = "https://shop.envirobiotics.com/products/biotica-800";

type TidioApi = {
  close?: () => void;
  display?: (visible: boolean) => void;
  adjustStyles?: (styles: string) => void;
};

const trackPreview = (name: "homepage_cta_click" | "kit_select" | "demo_open", placement: string) => {
  trackEvent(name, { placement, preview: true });
};

function PreviewHeader() {
  return (
    <header className="preview-header">
      <div className="preview-shell preview-header-inner">
        <Link to="/" aria-label="EnviroBiotics home">
          <img className="preview-logo" src="/assets/logo.avif" alt="EnviroBiotics" width="210" height="80" />
        </Link>
        <a className="preview-header-link" href="#room-kits">
          Choose a kit
        </a>
      </div>
    </header>
  );
}

function VideoDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="preview-dialog" aria-describedby={undefined}>
        <DialogTitle className="sr-only">How EnviroBiotics works</DialogTitle>
        <div className="preview-dialog-video">
          {open ? (
            <iframe
              src="https://player.vimeo.com/video/1146300437?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              title="How EnviroBiotics works"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Hero({ onDemoOpen }: { onDemoOpen: () => void }) {
  return (
    <section className="preview-hero" aria-labelledby="preview-hero-title">
      <div className="preview-shell preview-hero-grid">
        <div>
          <p className="preview-eyebrow">Automatic probiotic room care</p>
          <h1 id="preview-hero-title">Probiotics for your home&apos;s surfaces.</h1>
          <p className="preview-lede">
            EnviroBiotics devices release a fine probiotic mist that disperses through your room and settles on surfaces. Add everyday care to the spaces you live in.
          </p>
          <p className="preview-offer">Starter kits from $98. Device + first cartridge. No subscription required.</p>
        </div>
        <div className="preview-hero-media">
          <div className="preview-hero-image-frame">
            <img
              className="preview-hero-image"
              src={miniAsset.url}
              alt="BioLogic Mini probiotic room care device on a tabletop"
              width="896"
              height="1200"
              fetchPriority="high"
            />
          </div>
          <div className="preview-actions" data-hero-actions>
            <a
              className="preview-button preview-button-primary"
              href="#room-kits"
              onClick={() => trackPreview("homepage_cta_click", "hero")}
            >
              Choose my room kit <ArrowRight aria-hidden="true" size={18} />
            </a>
            <Button
              type="button"
              variant="outline"
              className="preview-button preview-button-secondary"
              onClick={onDemoOpen}
            >
              <Play aria-hidden="true" size={17} /> How it works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mechanism({ onDemoOpen }: { onDemoOpen: () => void }) {
  const steps = [
    ["A fine mist, automatically", "Releases environmental probiotics at programmed intervals."],
    ["Through the room", "Mist disperses into surrounding space."],
    ["Onto surfaces", "Probiotics settle on room surfaces as part of ongoing environmental care."],
  ];

  return (
    <section id="how-it-works" className="preview-section preview-section-sage" aria-labelledby="mechanism-title">
      <div className="preview-shell">
        <p className="preview-kicker">Beyond the air</p>
        <h2 id="mechanism-title">Your room has surfaces, too.</h2>
        <p className="preview-section-intro">
          Bedding, sofas, and rugs are part of the indoor environment. EnviroBiotics is designed to bring ongoing probiotic care into that wider space.
        </p>
        <div className="preview-context-strip" aria-label="Bedroom, living room, and playroom surfaces">
          <img className="preview-context-image" src={bedroomAsset.url} alt="Bedding in a bright bedroom" width="640" height="640" loading="lazy" />
          <img className="preview-context-image" src={livingRoomAsset.url} alt="Sofa and rug in a living room" width="640" height="640" loading="lazy" />
          <img className="preview-context-image" src={playroomAsset.url} alt="Everyday surfaces in a family room" width="640" height="640" loading="lazy" />
        </div>
        <ol className="preview-steps">
          {steps.map(([title, body], index) => (
            <li className="preview-step" key={title}>
              <span className="preview-step-number" aria-hidden="true">{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="preview-note">Continue regular cleaning and ventilation as part of your home-care routine.</p>
        <div className="preview-actions">
          <Button type="button" variant="outline" className="preview-button preview-button-secondary" onClick={onDemoOpen}>
            <Play aria-hidden="true" size={17} /> Watch how it works
          </Button>
        </div>
      </div>
    </section>
  );
}

type ProductCardProps = {
  name: string;
  price: string;
  coverage: string;
  room: string;
  power: string;
  shipping: string;
  image: { url: string };
  imageWidth: number;
  imageHeight: number;
  href: string;
  eventLabel: string;
};

function ProductCard(props: ProductCardProps) {
  return (
    <article className="preview-product-card">
      <div className="preview-product-image-wrap">
        <img
          className="preview-product-image"
          src={props.image.url}
          alt={`${props.name} probiotic room care device`}
          width={props.imageWidth}
          height={props.imageHeight}
          loading="lazy"
        />
      </div>
      <div className="preview-product-copy" data-kit-action>
        <div className="preview-product-heading">
          <h3>{props.name}</h3>
          <span className="preview-price">{props.price} <small>one-time</small></span>
        </div>
        <p>{props.room}</p>
        <ul className="preview-features">
          {[props.coverage, props.power, "Device + first cartridge", props.shipping].map((feature) => (
            <li className="preview-feature" key={feature}>
              <Check size={15} strokeWidth={2.2} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a
          className="preview-button preview-button-primary"
          href={props.href}
          onClick={() => trackPreview("kit_select", props.eventLabel)}
        >
          View {props.name} <ArrowRight aria-hidden="true" size={18} />
        </a>
      </div>
    </article>
  );
}

function RoomKits() {
  return (
    <section id="room-kits" className="preview-section preview-section-white" aria-labelledby="kits-title">
      <div className="preview-shell">
        <p className="preview-kicker">Start with one room</p>
        <h2 id="kits-title">Which room comes first?</h2>
        <p className="preview-section-intro">Choose the device sized for the space you want to care for first.</p>
        <div className="preview-products">
          <ProductCard
            name="BioLogic Mini"
            price={REVIEWED_PRICES.mini.price}
            coverage={REVIEWED_PRICES.mini.coverage}
            room="Bedroom, desk, or small room"
            power="Rechargeable"
            shipping="Shipping calculated at checkout"
            image={miniAsset}
            imageWidth={896}
            imageHeight={1200}
            href={MINI_URL}
            eventLabel="room_kits_mini"
          />
          <ProductCard
            name="Biotica 800"
            price={REVIEWED_PRICES.biotica.price}
            coverage={REVIEWED_PRICES.biotica.coverage}
            room="Larger shared room"
            power="Plug-in"
            shipping="Eligible for continental US shipping over $200"
            image={bioticaAsset}
            imageWidth={1432}
            imageHeight={1920}
            href={BIOTICA_URL}
            eventLabel="room_kits_biotica"
          />
        </div>
        <p className="preview-fine-print">
          Each first cartridge lasts up to 90 days. Future refills are sold separately. Price snapshot reviewed {REVIEWED_PRICES.reviewedOn}.
        </p>
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section className="preview-section preview-section-sage" aria-labelledby="evidence-title">
      <div className="preview-shell preview-evidence-grid">
        <div>
          <p className="preview-kicker">Environmental probiotics</p>
          <h2 id="evidence-title">Know what you&apos;re bringing home.</h2>
        </div>
        <div className="preview-evidence-copy">
          <p className="preview-section-intro">
            Environmental probiotics are beneficial microorganisms selected for use in indoor environments. EnviroBiotics devices disperse them as a fine mist so they can settle across the room&apos;s surfaces as part of ongoing environmental care.
          </p>
          <p className="preview-fine-print">
            This is not a medical device and does not replace cleaning, ventilation, or a HEPA air purifier.
          </p>
          <div className="preview-actions">
            <Link className="preview-text-link" to="/how-it-works">Read how it works <ArrowRight aria-hidden="true" size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Refills() {
  return (
    <section className="preview-refill-band" aria-labelledby="refills-title">
      <div className="preview-shell preview-refill-grid">
        <h2 id="refills-title">Keep the device. Replace the cartridge.</h2>
        <p>The first cartridge lasts up to 90 days. Choose one-time refills or review optional subscription details on the product page.</p>
      </div>
    </section>
  );
}

const FAQS = [
  {
    question: "How is this different from a HEPA air purifier?",
    answer: "EnviroBiotics devices dispense environmental probiotics into a room; they do not pull air through a filter. They should not be compared by CADR and do not replace a HEPA air purifier.",
  },
  {
    question: "Do I need a subscription?",
    answer: "No. The starter kit is a one-time purchase. Future cartridges can be purchased one at a time, with optional subscription details available on each product page.",
  },
  {
    question: "What comes in the kit?",
    answer: "Each kit includes the device, one cartridge, and a quick-start guide. The BioLogic Mini includes a USB-C cable; the Biotica 800 includes an AC adapter.",
  },
  {
    question: "What is the return policy?",
    answer: "Returns are accepted within 30 days from shipment and require an RMA. Cartridges are excluded, and customers are responsible for return shipping. Review the linked policy for complete terms.",
  },
  {
    question: "Where can I get product-use help?",
    answer: "Follow the quick-start instructions included with your device. For product-use questions, contact contact@envirobiotics.com.",
  },
];

function FAQ() {
  return (
    <section className="preview-section preview-section-white" aria-labelledby="faq-title">
      <div className="preview-shell">
        <p className="preview-kicker">Practical details</p>
        <h2 id="faq-title">Before you choose.</h2>
        <div className="preview-faqs">
          {FAQS.map((item, index) => (
            <details className="preview-details" key={item.question} open={index === 0}>
              <summary className="preview-summary">{item.question}</summary>
              <p>
                {item.answer}{" "}
                {item.question === "What is the return policy?" ? (
                  <a className="preview-text-link" href="https://shop.envirobiotics.com/policies/shipping-policy">Read the shipping and returns policy.</a>
                ) : null}
                {item.question === "Where can I get product-use help?" ? (
                  <a className="preview-text-link" href="mailto:contact@envirobiotics.com">Email support.</a>
                ) : null}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="preview-section preview-section-sage preview-final" aria-labelledby="final-title" data-final-cta>
      <div className="preview-shell">
        <p className="preview-kicker">One room at a time</p>
        <h2 id="final-title">Bring probiotic care into your everyday space.</h2>
        <p className="preview-section-intro">Choose a starter kit sized for the room you want to begin with.</p>
        <div className="preview-actions">
          <a
            className="preview-button preview-button-primary"
            href="#room-kits"
            onClick={() => trackPreview("homepage_cta_click", "final")}
          >
            Choose my room kit <ArrowRight aria-hidden="true" size={18} />
          </a>
          <Link className="preview-button preview-button-secondary" to="/support">Get support</Link>
        </div>
      </div>
    </section>
  );
}

export default function MobileHomePreviewPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const heroActionVisible = useRef(true);
  const kitActionsVisible = useRef(false);
  const finalActionVisible = useRef(false);

  const updateSticky = () => {
    setShowSticky(!heroActionVisible.current && !kitActionsVisible.current && !finalActionVisible.current);
  };

  useEffect(() => {
    const visibleKitActions = new Set<Element>();
    const observers: IntersectionObserver[] = [];
    const observe = (target: Element | null, onChange: (visible: boolean, target: Element) => void) => {
      if (!target) return;
      const observer = new IntersectionObserver(([entry]) => {
        onChange(entry.isIntersecting, target);
        updateSticky();
      }, { threshold: 0.15 });
      observer.observe(target);
      observers.push(observer);
    };

    observe(document.querySelector("[data-hero-actions]"), (visible) => {
      heroActionVisible.current = visible;
    });
    document.querySelectorAll("[data-kit-action]").forEach((target) => {
      observe(target, (visible, element) => {
        if (visible) visibleKitActions.add(element);
        else visibleKitActions.delete(element);
        kitActionsVisible.current = visibleKitActions.size > 0;
      });
    });
    observe(document.querySelector("[data-final-cta]"), (visible) => {
      finalActionVisible.current = visible;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const configureChat = () => {
      const api = (window as unknown as { tidioChatApi?: TidioApi }).tidioChatApi;
      api?.close?.();
      api?.display?.(false);
      api?.adjustStyles?.(".widgetLabel { display: none !important; }");
    };
    document.addEventListener("tidioChat-ready", configureChat);
    configureChat();
    return () => {
      document.removeEventListener("tidioChat-ready", configureChat);
      (window as unknown as { tidioChatApi?: TidioApi }).tidioChatApi?.display?.(true);
    };
  }, []);

  const openDemo = () => {
    trackPreview("demo_open", "mobile_home_preview");
    setVideoOpen(true);
  };

  return (
    <div className="mobile-home-preview">
      <PreviewHeader />
      <main>
        <Hero onDemoOpen={openDemo} />
        <Mechanism onDemoOpen={openDemo} />
        <RoomKits />
        <Evidence />
        <Refills />
        <FAQ />
        <FinalCTA />
      </main>
      <footer className="preview-footer">
        <div className="preview-shell preview-footer-inner">
          <p>© EnviroBiotics. Automatic probiotic room care.</p>
          <nav className="preview-footer-links" aria-label="Footer">
            <Link className="preview-text-link" to="/support">Support</Link>
            <Link className="preview-text-link" to="/privacy">Privacy</Link>
            <Link className="preview-text-link" to="/terms">Terms</Link>
          </nav>
        </div>
      </footer>
      {showSticky && !videoOpen ? (
        <div className="preview-sticky" role="region" aria-label="Choose a room kit">
          <a
            className="preview-button preview-button-primary"
            href="#room-kits"
            onClick={() => trackPreview("homepage_cta_click", "sticky")}
          >
            Choose my room kit <ArrowRight aria-hidden="true" size={18} />
          </a>
        </div>
      ) : null}
      <VideoDialog open={videoOpen} onOpenChange={setVideoOpen} />
    </div>
  );
}