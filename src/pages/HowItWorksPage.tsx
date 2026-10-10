import { lazy, Suspense, useState } from 'react';
import { ArrowRight, Play, Microscope, Building2, ClipboardCheck, Users, ShieldCheck, Sparkles, Wind, SprayCan } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SEOHead, howToJsonLd, makeBreadcrumbJsonLd } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ExplainerVideo } from '@/components/ExplainerVideo';
import { Link } from '@/lib/link';
import { shopifyAllProducts, shopifyProductUrl } from '@/lib/shopify';
import { explainerProducts, explainerFaqs, explainerTrial } from '@/lib/howItWorks';
import girlGreen from '@/assets/girl-green.avif.asset.json';
import ecoSurfaces from '@/assets/hiw-eco-surfaces.jpg';
import ecoObjects from '@/assets/hiw-eco-objects.jpg';
import ecoFabrics from '@/assets/hiw-eco-fabrics.jpg';
import ecoHvac from '@/assets/hiw-eco-hvac.jpg';
import ecoZones from '@/assets/hiw-eco-zones.jpg';
import ecoHidden from '@/assets/hiw-eco-hidden.jpg';
import release from '@/assets/how-it-works/release.mp4.asset.json';
import releaseWebm from '@/assets/how-it-works/release.webm.asset.json';
import studio from '@/assets/how-it-works/mini-studio.png.asset.json';
import alwaysOn from '@/assets/how-it-works/always-on.mp4.asset.json';
import alwaysOnWebm from '@/assets/how-it-works/always-on.webm.asset.json';
import pets from '@/assets/how-it-works/pets.png.asset.json';
import mini from '@/assets/how-it-works/mini-living.png.asset.json';
import biotica from '@/assets/how-it-works/biotica-room.png.asset.json';
import pro from '@/assets/ebiotic-pro-office.avif.asset.json';

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));
const title = 'How EnviroBiotics Works | Natural Probiotics for Odor, Mold and Allergens';
const description = 'Why the smell comes back, and how natural probiotics settle on sofas, rugs and pet beds and keep working on odor, mold and allergens every day.';
const shareImage = 'https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-mini-studio.png?v=1791647578&width=1200&format=jpg';
const ecosystem = [
  { img: ecoFabrics, title: 'Fabrics', text: 'Couches, rugs, bedding, curtains and pet beds.' },
  { img: ecoSurfaces, title: 'Surfaces', text: 'Counters, floors, walls and furniture.' },
  { img: ecoHidden, title: 'Hidden spaces', text: 'Corners, grooves and under the furniture.' },
  { img: ecoObjects, title: 'Objects', text: 'Keyboards, phones, toys and shared equipment.' },
  { img: ecoHvac, title: 'HVAC pathways', text: 'Ducts and vents, in buildings with central air.' },
  { img: ecoZones, title: 'Busy zones', text: 'Offices, classrooms, clinics and lobbies.' },
];
const comparisons = [
  { icon: SprayCan, title: 'Sprays and candles', text: 'Cover the smell for a few hours. The source is still there.' },
  { icon: Wind, title: 'Air purifiers', text: 'Clean the air that passes through them. Odor, mold and allergens settle on sofas, rugs and pet beds.' },
  { icon: Sparkles, title: 'EnviroBiotics', text: 'Natural probiotics settle on those surfaces and keep working on them, all day, every day.' },
];
const steps = [
  { title: 'It releases', text: 'A short, quiet burst of natural probiotics every few minutes. No sprays to remember, no filters to change.' },
  { title: 'It settles', text: 'The probiotics travel with the air in the room and settle on fabrics, rugs, furniture and the corners you never clean.' },
  { title: 'It keeps working', text: 'On those surfaces they work on the odor-causing bacteria that bring the smell back, every day, between your cleanings.' },
];
const research = [
  { icon: Microscope, title: 'Years of development', text: 'Dedicated research and optimization' },
  { icon: Building2, title: 'Field tested', text: 'Used in a variety of real-world indoor environments' },
  { icon: ClipboardCheck, title: 'Research-backed', text: 'Supported by laboratory studies and third-party validation' },
  { icon: Users, title: 'Real-world applications', text: 'Trusted by organizations across multiple sectors' },
];
const container = 'mx-auto max-w-7xl px-5 sm:px-8';
const heading = 'font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-balance';
const productImages = [mini.url, biotica.url, pro.url];

export default function HowItWorksPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  return <div className="how-it-works-page min-h-screen bg-background text-foreground">
    <SEOHead title={title} description={description} path="/how-it-works" image={shareImage} jsonLd={{ '@context': 'https://schema.org', '@graph': [howToJsonLd, makeBreadcrumbJsonLd([{ name: 'Home', url: '/' }, { name: 'How It Works', url: '/how-it-works' }]), { '@type': 'FAQPage', mainEntity: explainerFaqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }] }} />
    <Navbar />
    <main>
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className={`${container} text-center`}>
          <p className="text-sm font-semibold text-muted-foreground mb-5">How it works</p>
          <h1 className="font-display text-[32px] sm:text-5xl lg:text-6xl font-semibold leading-tight text-balance">Cleaning works for a day.<br /><span className="text-primary">EnviroBiotics keeps working.</span></h1>
          <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">A small, quiet device releases natural probiotics that settle on the couch, the rug and every soft surface, and keep working there, every day, on the odor-causing bacteria, mold and allergens that bring the smell back.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 mb-12">
            <Button variant="hero" size="lg" asChild><Link to={shopifyAllProducts()}>Find your device <ArrowRight /></Link></Button>
            <Button variant="outline" size="lg" onClick={() => setVideoOpen(true)}><Play /> Watch how it works (2 min)</Button>
          </div>
        </div>
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8"><ExplainerVideo eager src={release.url} webm={releaseWebm.url} poster={studio.url} label="BioLogic Mini releasing a short mist from its front nozzle, then stopping" className="rounded-2xl" /></div>
      </section>

      <section className="hiw-dark py-16 sm:py-24">
        <div className={`${container} max-w-5xl text-center`}>
          <p className="text-primary text-sm font-semibold mb-5">The problem</p>
          <h2 className={heading}>The smell that comes back.</h2>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed">You spray. You light a candle. You run the purifier, deep-clean, call the pros. It smells fine for a day, then it's back, because the bacteria behind it live on soft surfaces, not just in the air.</p>
          <ul className="flex flex-wrap justify-center gap-2 mt-8" aria-label="Common approaches to odors">{['Spray', 'Candle', 'Air purifier', 'Deep clean', 'Pro cleaners', 'Ozone', 'Rip out the carpet'].map((chip, i) => <li key={chip} className={`rounded-full border px-4 py-2 text-sm ${i === 6 ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}`}>{chip}</li>)}</ul>
          <p className="mt-8 text-base sm:text-lg">And after a few minutes in your own home, your nose stops noticing it. Guests don't.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24"><div className={container}>
        <h2 className={`${heading} max-w-3xl mb-10`}>Your home is more than the air you breathe.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{ecosystem.map(item => <article key={item.title} className="rounded-lg border border-border overflow-hidden bg-card">
          <img src={item.img} alt={item.title} loading="lazy" decoding="async" width={800} height={550} className="aspect-[16/11] w-full object-cover" />
          <div className="p-6"><h3 className="font-display text-xl font-semibold">{item.title}</h3><p className="mt-2 text-muted-foreground leading-relaxed">{item.text}</p></div>
        </article>)}</div>
      </div></section>

      <section className="bg-muted/40 py-16 sm:py-24"><div className={container}>
        <h2 className={`${heading} max-w-3xl mb-10`}>Three ways to fight a smell. Only one keeps going.</h2>
        <div className="grid md:grid-cols-3 gap-5">{comparisons.map(({ icon: Icon, title: label, text }, i) => <article key={label} className={`rounded-lg border p-7 ${i === 2 ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
          <Icon className={`h-7 w-7 mb-6 ${i === 2 ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={1.5} />
          <h3 className="font-display text-xl font-semibold">{label}</h3><p className="mt-4 text-muted-foreground leading-relaxed">{text}</p>
        </article>)}</div>
      </div></section>

      <section className="hiw-dark">
        <div className="relative">
          <ExplainerVideo src={alwaysOn.url} webm={alwaysOnWebm.url} poster={pets.url} label="EnviroBiotics working quietly in a home with pets" className="hiw-always-video" />
          <div className="hiw-video-overlay absolute inset-0 flex items-end pointer-events-none"><div className={`${container} w-full pb-8 sm:pb-14`}>
            <p className="text-primary font-semibold text-sm mb-3">Always on</p><p className="font-display text-3xl sm:text-5xl font-semibold max-w-xl text-balance">Set it once. It keeps working.</p>
          </div></div>
        </div>
        <div className={`${container} py-16 sm:py-24`}>
          <h2 className={`${heading} max-w-3xl`}>Three steps. Then you forget it's there.</h2>
          <div className="grid md:grid-cols-3 gap-10 mt-12">{steps.map((step, i) => <div key={step.title}>
            <span className="font-display text-5xl text-primary font-semibold">0{i + 1}</span><h3 className="font-display text-2xl font-semibold mt-5">{step.title}</h3><p className="mt-3 text-muted-foreground leading-relaxed">{step.text}</p>
          </div>)}</div>
          <p className="border-t border-border pt-7 mt-12 text-sm text-muted-foreground">EnviroBiotics works alongside your cleaning. It doesn't replace it: spills, accidents and litter still need cleaning up.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24"><div className={`${container} grid md:grid-cols-2 gap-10 lg:gap-20 items-center`}>
        <div><p className="text-sm font-semibold text-primary mb-5">Finding EnviroBiotics</p><h2 className={heading}>Found in nature. Screened for safety.</h2><p className="mt-6 text-lg text-muted-foreground leading-relaxed">Our team collected hundreds of samples from mountains, forests and the sea. Each was screened for safety, effectiveness and regulatory compliance. Only a few passed every test and became the patented strains inside EnviroBiotics.</p></div>
        <img src={girlGreen.url} alt="EnviroBiotics, nature meets science" loading="lazy" decoding="async" className="w-full aspect-[4/5] max-h-[560px] object-cover rounded-2xl" />
      </div></section>

      <section className="py-16 sm:py-24 border-y border-border bg-muted/40"><div className={container}>
        <h2 className={heading}>Registered, certified and tested.</h2>
        <ul className="flex flex-wrap gap-x-8 gap-y-4 mt-8 mb-10">{['EPA Reg. No. 94339-1', 'MADE SAFE® certified', 'PTPA parent-tested', 'ISO 9001 production'].map(badge => <li key={badge} className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="w-5 h-5 text-primary shrink-0" />{badge}</li>)}</ul>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{research.map(({ icon: Icon, title: label, text }) => <article key={label} className="bg-card rounded-lg border border-border p-6"><Icon className="h-6 w-6 text-primary mb-6" /><h3 className="font-display font-semibold text-lg">{label}</h3><p className="text-muted-foreground mt-3 leading-relaxed">{text}</p></article>)}</div>
        <Button variant="link" asChild className="px-0 mt-7"><Link to="/research">See the research <ArrowRight /></Link></Button>
      </div></section>

      <section className="py-16 sm:py-24"><div className={container}>
        <h2 className={`${heading} max-w-3xl mb-10`}>Start with the room that smells first.</h2>
        <div className="grid md:grid-cols-3 gap-5">{explainerProducts.map((product, i) => <article key={product.slug} className="rounded-lg overflow-hidden border border-border bg-card flex flex-col">
          <img src={productImages[i]} alt={`${product.name} in an indoor space`} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          <div className="p-6 flex flex-col flex-1"><h3 className="font-display text-2xl font-semibold">{product.name}</h3><p className="text-muted-foreground leading-relaxed mt-3 mb-6">{product.price !== null && <>Up to {product.coverage} sq ft. </>}{product.text}{'noiseDb' in product && <> Under {product.noiseDb} dB.</>}</p>
            <div className="mt-auto">{product.price !== null ? <><p className="font-display text-2xl font-semibold mb-4">${product.price}</p><Button variant="hero" asChild className="w-full"><Link to={shopifyProductUrl(product.slug)}>Shop {product.name} <ArrowRight /></Link></Button></> : <Button variant="outline" asChild className="w-full"><Link to="/business" hash="quote">Get a quote <ArrowRight /></Link></Button>}</div>
          </div>
        </article>)}</div>
      </div></section>

      <section className="pb-16 sm:pb-24"><div className={`${container} max-w-3xl`}>
        <h2 className={`${heading} mb-8`}>Questions? Answered.</h2>
        <Accordion type="single" collapsible>{explainerFaqs.map((faq, i) => <AccordionItem key={faq.question} value={`faq-${i}`}><AccordionTrigger className="text-left text-base font-semibold py-6">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion>
      </div></section>

      <section className="hiw-dark py-16 sm:py-24"><div className={`${container} max-w-3xl text-center`}>
        <h2 className={heading}>Live with it for {explainerTrial.days} days.</h2>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">If you don't notice the difference within {explainerTrial.days} days of {explainerTrial.startsAt}, send it back for a full refund. {explainerTrial.returnShippingPaid && 'Return shipping is on us.'}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8"><Button variant="hero" size="lg" asChild><Link to={shopifyAllProducts()}>Find your device <ArrowRight /></Link></Button><Button variant="outline" size="lg" asChild><Link to="/business">For businesses <ArrowRight /></Link></Button></div>
      </div></section>
    </main>
    <Suspense fallback={null}><Footer /></Suspense>
    <Dialog open={videoOpen} onOpenChange={setVideoOpen}><DialogContent className="max-w-5xl w-[calc(100%-2rem)] p-0 overflow-hidden rounded-lg pt-10" aria-describedby="explainer-video-description"><DialogTitle className="sr-only">Watch how EnviroBiotics works</DialogTitle><DialogDescription id="explainer-video-description" className="sr-only">A two-minute introduction to EnviroBiotics technology.</DialogDescription>{videoOpen && <iframe src="https://player.vimeo.com/video/1041721190?autoplay=1&title=0&byline=0&portrait=0" title="EnviroBiotics Technology" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full aspect-video" />}</DialogContent></Dialog>
  </div>;
}
