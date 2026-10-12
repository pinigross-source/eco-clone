import { Fragment, lazy, Suspense, useState } from 'react';
import { ArrowRight, Play, Check, ShieldCheck, Sparkles, Wind, SprayCan, Droplets, Layers, Laptop, MoveDown, MoveRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { SEOHead, howToJsonLd, makeBreadcrumbJsonLd } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ExplainerVideo } from '@/components/ExplainerVideo';
import { Link } from '@/lib/link';
import { shopifyAllProducts, shopifyProductUrl } from '@/lib/shopify';
import { explainerProducts, explainerFaqs, explainerTrial, settleSteps } from '@/lib/howItWorks';
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
import fabric from '@/assets/how-it-works/fabric.png.asset.json';
import mold from '@/assets/how-it-works/mold-laundry.jpg.asset.json';
import allergenPets from '@/assets/how-it-works/allergens-pets.png.asset.json';
import pollen from '@/assets/how-it-works/pollen.png.asset.json';
import lungsDiagram from '@/assets/hvac-lungs-anatomy.jpg.asset.json';

const Footer = lazy(() => import('@/components/Footer').then(m => ({ default: m.Footer })));
const title = 'How EnviroBiotics Works | Natural Probiotics for Odor, Mold and Allergens';
const description = "What builds up in your home (odor-causing bacteria, mold, dust-mite and pet-dander allergens, pollen), why cleaning doesn't last, and how natural probiotics keep working on surfaces every day.";
const shareImage = 'https://cdn.shopify.com/s/files/1/0785/0826/1628/files/ebh-mini-studio.png?v=1791647578&width=1200&format=jpg';
const ecosystem = [
  { img: ecoFabrics, title: 'Fabrics', text: 'Couches, rugs, bedding, curtains and pet beds.' },
  { img: ecoSurfaces, title: 'Surfaces', text: 'Counters, floors, walls and furniture.' },
  { img: ecoHidden, title: 'Hidden spaces', text: 'Corners, grooves and under the furniture.' },
  { img: ecoObjects, title: 'Objects', text: 'Keyboards, phones, toys and shared equipment.' },
  { img: ecoHvac, title: 'Ducts and vents', text: 'Inside the HVAC, with E-Biotic Pro.' },
  { img: ecoZones, title: 'Busy zones', text: 'Offices, classrooms, clinics and lobbies.' },
];
const indoorIssues = [
  { img: fabric.url, label: 'Odor', title: 'Odor-causing bacteria', hides: 'Couches, rugs, pet beds, mattresses and curtains.', returns: 'The bacteria feed on sweat, skin and pet oils in the fabric. Sprays cover the smell; the bacteria stay.' },
  { img: mold.url, label: 'Mold', title: 'Mold and musty spores', hides: 'Basements, laundry rooms, closets, bathrooms, air ducts and anywhere damp.', returns: 'Spores are always in the air. Where moisture stays, they settle and grow back after every wipe-down.' },
  { img: allergenPets.url, label: 'Allergens', title: 'Dust mites and pet dander', hides: "Bedding, upholstery, carpets and the dog's favorite spot.", returns: 'The allergens are tiny proteins. Vacuuming and washing lift some of them; the rest stay deep in the fibers.' },
  { img: pollen.url, label: 'Seasonal', title: 'Pollen', hides: 'Window sills, floors, couches and everything near the door.', returns: 'It rides in on clothes, shoes, pets and open windows, every day of the season.' },
];
const comparisons = [
  { icon: SprayCan, title: 'Sprays and candles', text: 'Cover the smell for a few hours. Nothing underneath changes.' },
  { icon: Droplets, title: 'Disinfectants', text: 'Wipe a surface clean for a moment. Bacteria and spores settle right back, and nothing is left to hold the space.' },
  { icon: Wind, title: 'Air purifiers', text: 'Clean the air that passes through them. What has already settled on fabrics and in the ducts stays there, and gets stirred back up.' },
  { icon: Sparkles, title: 'EnviroBiotics', text: 'Works on the air, the surfaces and the objects themselves, all day, every day, topped up every few minutes.' },
];
const coverage = [
  { icon: Wind, label: 'AIR', title: 'Carried by the air', text: 'Released in short bursts, the probiotics move with the natural airflow of the room, or through the ducts with E-Biotic Pro, and reach every corner of the space.' },
  { icon: Layers, label: 'SURFACES', title: 'Settled on every surface', text: 'They settle on floors, counters, walls, couches, rugs, bedding and curtains, the large surfaces where odor, mold and allergens collect.' },
  { icon: Laptop, label: 'OBJECTS', title: 'On the things you touch', text: 'Keyboards, phones, toys, remotes and the corners under the furniture. Delicate objects and fabrics are reached without harm, because nothing is sprayed on them directly.' },
];
const ductChallenges = [
  { title: 'Dark and out of reach', text: 'Ducts run behind walls, ceilings and floors. No one wipes them, and most people never see inside them.' },
  { title: 'Dust and debris build up', text: 'Dust, skin flakes, pet dander and pollen collect along the inside of the ducts, year after year.' },
  { title: 'Moisture from cooling', text: 'Cooling creates condensation and humidity inside the system, the perfect conditions for mold and odor-causing bacteria to grow.' },
  { title: "Then it's blown into every room", text: 'Every time the system runs, air passes over all of it on its way to the bedrooms, the nursery and the living room.' },
];
const hvacProtection = [
  { title: 'Connected at the air handler.', text: 'E-Biotic Pro is installed on your existing HVAC. No new ducts and no redesign.' },
  { title: 'Through every duct.', text: 'Natural probiotics travel with the airflow along the ductwork, settling on its inner surfaces, where mold and bacteria like to grow.' },
  { title: 'Into every room.', text: 'They come out of every vent and settle on the air, surfaces and objects of each room the system serves.' },
  { title: 'Continuously.', text: 'Every time the system breathes, the protection is renewed, instead of waiting years for the next duct cleaning.' },
];
const science = [
  { title: 'They take the space', text: 'Probiotics settle on fabrics and surfaces and use up the room and the food that odor-causing bacteria and mold need. Less room for them means less smell and less musty growth.' },
  { title: 'They break down allergens', text: 'Probiotic cells release natural enzymes that break down allergen proteins from dust mites, pet dander and mold, right on the surfaces where they settle.' },
  { title: 'They keep going', text: 'Cleaning resets a surface once. A fresh dose arrives every few minutes, so the balance holds between cleanings instead of starting over.' },
];
const timeline = [
  { time: 'Day 1', title: 'Place it and turn it on', text: 'No setup and no filters. The first bursts start right away.' },
  { time: 'Week 1', title: 'Probiotics start to settle', text: 'In lab testing, allergen levels on treated surfaces dropped measurably within 8 days of continuous use.' },
  { time: 'Weeks 2–3', title: 'Settled across the room', text: 'It takes two to three weeks for probiotics to settle across a whole room. This is when most people notice the difference.' },
  { time: 'Every ~90 days', title: 'Swap the cartridge', text: 'One cartridge lasts about three months. Auto-Refill can send it for you, so the balance never lapses.' },
];
const deviceSummaries = [
  'One room, up to 300 sq ft. Battery or USB-C, under 25 dB.',
  'Living spaces up to 800 sq ft. Plug it in once.',
  'Whole homes and buildings through the HVAC, ducts included, up to 25,000 sq ft.',
];
const labResults = [
  { stat: '8 days', text: 'to a measurable drop in dust-mite, pet-dander and mold allergens on treated surfaces, with continuous use.', source: 'Indoor Biotechnologies, Cardiff, UK, 2024, with a parallel simulation at EMSL Analytical Laboratories.' },
  { stat: 'Up to 95%', text: 'less mold measured after treatment, across Stachybotrys, Chaetomium and Aspergillus species.', source: 'EMSL Analytical Laboratories, USA.' },
];
const steps = [
  { title: 'It releases', text: 'A short, quiet burst of natural probiotics every few minutes. No sprays to remember, no filters to change.' },
  { title: 'It settles', text: 'The probiotics travel with the air in the room and settle on fabrics, rugs, furniture, objects and the corners you never clean.' },
  { title: 'It keeps working', text: 'On those surfaces they crowd out odor-causing bacteria and mold and break down allergens, every day, between your cleanings.' },
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
          <p className="max-w-3xl mx-auto mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">Odor-causing bacteria, mold, dust-mite and pet-dander allergens and pollen settle into the couch, the rug, the air ducts and every soft surface. A small, quiet device releases natural probiotics that reach the air, the surfaces and the objects in your home, and keep working on them every day, between your cleanings.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8 mb-6">
            <Button variant="hero" size="lg" asChild><Link to={shopifyAllProducts()}>Find your device <ArrowRight /></Link></Button>
            <Button variant="outline" size="lg" onClick={() => setVideoOpen(true)}><Play /> Watch how it works (2 min)</Button>
          </div>
          <nav aria-label="Explore how it works" className="flex flex-wrap justify-center gap-2 mb-12">{[['What lives in your home', 'what'], ['Why surfaces matter', 'settle'], ['The science', 'science'], ['3D coverage', 'coverage'], ['Your home has lungs', 'lungs'], ['What to expect', 'timeline'], ['Is it safe?', 'safety'], ['Choose a device', 'shop']].map(([label, id]) => <Button key={id} variant="outline" size="sm" asChild><a href={`#${id}`}>{label}</a></Button>)}</nav>
        </div>
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8"><ExplainerVideo eager src={release.url} webm={releaseWebm.url} poster={studio.url} label="BioLogic Mini releasing a short mist from its front nozzle, then stopping" className="rounded-2xl" /></div>
      </section>

      <section id="what" className="py-16 sm:py-24"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">What lives in your home</p>
        <h2 className={heading}>Your home is more than the air you breathe.</h2>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">Four things build up indoors, and all four end up in the same place: on surfaces, in fabrics and inside the ducts, where air purifiers never reach and cleaning only lasts a day or two.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">{indoorIssues.map(issue => <article key={issue.label} className="rounded-lg border border-border bg-card overflow-hidden">
          <img src={issue.img} alt={issue.title} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          <div className="p-5"><p className="text-sm font-semibold text-primary mb-3">{issue.label}</p><h3 className="font-display text-xl font-semibold">{issue.title}</h3><dl className="mt-5 text-sm leading-relaxed"><dt className="font-semibold">Where it hides</dt><dd className="text-muted-foreground mt-1">{issue.hides}</dd><dt className="font-semibold mt-4">Why it comes back</dt><dd className="text-muted-foreground mt-1">{issue.returns}</dd></dl></div>
        </article>)}</div>
      </div></section>

      <section id="settle" className="py-16 sm:py-24 bg-muted/40"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">From the air to the surfaces, and back again</p>
        <h2 className={heading}>What's in the air doesn't stay in the air.</h2>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground leading-relaxed">Bacteria, mold spores, allergens and dust are heavier than air. Sooner or later they settle onto floors, fabrics and the objects you touch, and those surfaces become a reservoir of contamination that feeds the air again and again.</p>
        <div className="grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-6 lg:gap-3 mt-12">
          {settleSteps.map((step, i) => <Fragment key={step.title}>
            <article className="rounded-lg border border-border bg-card p-6">
              <span aria-hidden="true" className={`font-display text-xl font-semibold w-11 h-11 rounded-full inline-flex items-center justify-center ${i === 2 ? 'bg-primary text-primary-foreground' : 'bg-foreground text-background'}`}>{i + 1}</span>
              <h3 className="font-display text-lg font-semibold mt-4 leading-snug">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{step.text}</p>
              {i === 3 && <p className="text-primary text-sm font-semibold mt-4">↻ Back to step 1</p>}
            </article>
            {i < 3 && <Fragment>
              <MoveRight aria-hidden="true" className="hidden lg:block w-6 h-6 text-muted-foreground self-center" />
              <MoveDown aria-hidden="true" className="lg:hidden w-6 h-6 text-muted-foreground mx-auto" />
            </Fragment>}
          </Fragment>)}
        </div>
        <div className="hiw-dark rounded-lg mt-12 p-8 sm:p-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">Cleaner surfaces mean <span className="text-primary">cleaner air.</span></h3>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">By reducing contamination on surfaces and objects, EnviroBiotics shrinks the reservoir itself, so less of it returns to the room with every movement you make. Air purifiers can only catch what is already floating; EnviroBiotics works on the place it comes back from.</p>
        </div>
      </div></section>

      <section className="hiw-dark py-16 sm:py-24"><div className={container}>
        <p className="text-primary text-sm font-semibold mb-5">Why the usual fixes don't last</p><h2 className={heading}>You've tried everything. It still comes back.</h2>
        <ul className="flex flex-wrap gap-2 mt-8 mb-10" aria-label="Common approaches">{['Spray', 'Candle', 'Air purifier', 'Disinfectant', 'Deep clean', 'Pro cleaners', 'Ozone', 'Rip out the carpet'].map((chip, i) => <li key={chip} className={`rounded-full border px-4 py-2 text-sm ${i === 7 ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}`}>{chip}</li>)}</ul>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{comparisons.map(({ icon: Icon, title: label, text }, i) => <article key={label} className={`rounded-lg border p-6 ${i === 3 ? 'border-primary bg-background text-background' : 'border-border bg-foreground/5'}`}>
          <Icon className={`w-6 h-6 mb-6 ${i === 3 ? 'text-primary' : 'text-muted-foreground'}`} /><h3 className={`font-display text-xl font-semibold ${i === 3 ? 'text-primary-foreground' : ''}`}>{label}</h3><p className={`mt-4 leading-relaxed ${i === 3 ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{text}</p>
        </article>)}</div><p className="mt-8 text-base sm:text-lg">And after a few minutes in your own home, your nose stops noticing it. Guests don't.</p>
      </div></section>

      <section id="science" className="py-16 sm:py-24"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">The science, simply</p><h2 className={heading}>Good bacteria, working where the problem lives.</h2><p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">Every surface in your home is covered in microbes. The question is which ones. EnviroBiotics adds natural probiotics, the beneficial kind, and keeps adding them.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-10">{science.map((item, i) => <article key={item.title} className="rounded-lg border border-border bg-card p-7"><span className="font-display text-4xl text-primary font-semibold">0{i + 1}</span><h3 className="font-display text-xl font-semibold mt-5">{item.title}</h3><p className="text-muted-foreground leading-relaxed mt-3">{item.text}</p>{i === 1 && <p className="text-xs leading-relaxed text-muted-foreground mt-5">Indoor Biotechnologies (Cardiff, UK) and EMSL Analytical (USA) testing. <Link to="/research" className="underline text-primary">See the research</Link></p>}</article>)}</div>
        <p className="bg-primary/5 border-l-2 border-primary p-6 mt-8 text-lg leading-relaxed">Same idea as a probiotic for your gut, applied to your home: instead of killing everything and starting from zero, you keep the good kind in charge.</p>
      </div></section>

      <section id="coverage" className="py-16 sm:py-24 bg-muted/40"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">3D coverage</p><h2 className={heading}>The air, the surfaces and the objects. All three, all the time.</h2><p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">Sprays reach the spot you aim at. Air purifiers reach the air that passes through them. Natural probiotics travel with the air itself, so they reach every dimension of a room, including the places no cloth or filter gets to.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-10">{coverage.map(({ icon: Icon, label, title: cardTitle, text }) => <article key={label} className="rounded-lg border border-border bg-card p-7"><Icon aria-hidden="true" className="w-8 h-8 text-primary mb-6" /><p className="text-sm font-semibold text-primary">{label}</p><h3 className="font-display text-xl font-semibold mt-3">{cardTitle}</h3><p className="text-muted-foreground leading-relaxed mt-3">{text}</p></article>)}</div>
      </div><div className="hiw-dark py-7 mt-10"><p className={`${container} text-lg font-medium leading-relaxed`}>Three dimensions, one device: air, surfaces and objects, treated together, around the clock.</p></div><div className={container}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">{ecosystem.map(item => <article key={item.title} className="rounded-lg border border-border overflow-hidden bg-card"><img src={item.img} alt={item.title} loading="lazy" decoding="async" width={800} height={550} className="aspect-[16/11] w-full object-cover" /><div className="p-6"><h3 className="font-display text-xl font-semibold">{item.title}</h3><p className="mt-2 text-muted-foreground leading-relaxed">{item.text}</p></div></article>)}</div>
      </div></section>

      <section id="lungs" className="hiw-dark py-16 sm:py-24"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">Your home has lungs</p><h2 className={heading}>The HVAC is your home's respiratory system.</h2><p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">Just like your lungs, your heating and cooling system breathes for the whole house. It draws air in, filters it, carries it through a network of ducts to every room, and breathes it out again, all day and all night.</p>
        <div className="rounded-lg bg-card p-3 sm:p-6 mt-10 overflow-hidden"><img src={lungsDiagram.url} alt="Human lungs alongside a home's HVAC system, comparing their branching air pathways" loading="lazy" decoding="async" className="w-full h-auto" /></div>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-border py-8">{[['Inhales', 'Fresh-air intake'], ['Filters', 'Air filters'], ['Distributes', 'Ducts and supply vents'], ['Exhales', 'Return and exhaust vents']].map(([label, text]) => <div key={label}><dt className="font-display text-xl font-semibold text-primary">{label}</dt><dd className="text-muted-foreground mt-2 leading-relaxed">{text}</dd></div>)}</dl>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-12 items-start">
          <div><h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">The hardest place in the house to clean: inside the ducts.</h3><ul className="space-y-6 mt-8">{ductChallenges.map(item => <li key={item.title}><h4 className="font-semibold text-lg">{item.title}</h4><p className="text-muted-foreground leading-relaxed mt-2">{item.text}</p></li>)}</ul></div>
          <article className="rounded-lg bg-card text-card-foreground p-6 sm:p-8"><p className="text-sm font-semibold text-primary mb-4">How EnviroBiotics protects it</p><h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">Probiotics that travel through the whole system.</h3><ol className="space-y-6 mt-8">{hvacProtection.map((item, i) => <li key={item.title} className="flex gap-4"><span className="text-primary font-display text-2xl font-semibold shrink-0" aria-hidden="true">0{i + 1}</span><p className="leading-relaxed"><strong>{item.title}</strong> {item.text}</p></li>)}</ol><div className="flex flex-col gap-3 mt-8"><Button variant="hero" asChild><Link to="/business" hash="quote">Ask about E-Biotic Pro <ArrowRight /></Link></Button><Button variant="outline" asChild className="text-card-foreground"><Link to="/business" hash="ebiotic-pro">How it installs <ArrowRight /></Link></Button></div></article>
        </div><p className="text-sm text-muted-foreground leading-relaxed mt-8">No central air? The Biotica 800 and BioLogic Mini treat the air, surfaces and objects room by room; they don't reach inside ducts.</p>
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
          <div className="grid md:grid-cols-3 gap-5 mt-10">{explainerProducts.map((product, i) => <article key={product.slug} className="rounded-lg border border-border bg-foreground/5 p-5"><h3 className="font-display text-lg font-semibold">{product.name}</h3><p className="text-sm text-muted-foreground leading-relaxed mt-2">{deviceSummaries[i]}</p></article>)}</div>
          <p className="border-t border-border pt-7 mt-12 text-sm text-muted-foreground">EnviroBiotics works alongside your cleaning. It doesn't replace it: spills, accidents, litter and visible mold still need cleaning up.</p>
        </div>
      </section>

      <section id="timeline" className="py-16 sm:py-24"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">What to expect</p><h2 className={heading}>From day one to month three.</h2>
        <ol className="grid md:grid-cols-4 gap-8 mt-12">{timeline.map(point => <li key={point.time} className="border-l-2 md:border-l-0 md:border-t-2 border-primary pl-5 md:pl-0 md:pt-6"><p className="text-primary font-semibold">{point.time}</p><h3 className="font-display font-semibold text-xl mt-3">{point.title}</h3><p className="mt-3 text-muted-foreground leading-relaxed">{point.text}</p></li>)}</ol>
      </div></section>

      <section id="safety" className="py-16 sm:py-24 bg-muted/40"><div className={`${container} grid md:grid-cols-2 gap-10 lg:gap-20 items-center`}>
        <div><p className="text-sm font-semibold text-primary mb-5">What's inside, and is it safe?</p><h2 className={heading}>Found in nature. Screened for safety.</h2><p className="mt-6 text-lg text-muted-foreground leading-relaxed">Our team collected hundreds of samples from mountains, forests and the sea. Each was screened for safety, effectiveness and regulatory compliance. Only a few passed every test and became the patented strains inside every cartridge.</p>
          <ul className="space-y-4 mt-8">{['EPA registered (Reg. No. 94339-1). Use it as the label directs.', 'MADE SAFE® certified device, screened for known harmful ingredients.', 'PTPA parent-tested and awarded.', 'No fragrance, no harsh chemicals, nothing to cover anything up.'].map(text => <li key={text} className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0 mt-1" /><span className="leading-relaxed">{text}</span></li>)}<li className="flex items-start gap-3"><Check className="w-5 h-5 text-primary shrink-0 mt-1" /><span className="leading-relaxed">Cartridges made under an ISO 9001 quality system. <a href="https://cdn.shopify.com/s/files/1/0785/0826/1628/files/EnviroBiotics-MSDS.pdf?v=1791483432" target="_blank" rel="noopener noreferrer" className="underline text-primary">Safety data sheet (PDF)</a></span></li></ul>
        </div><img src={girlGreen.url} alt="EnviroBiotics, nature meets science" loading="lazy" decoding="async" className="w-full aspect-[4/5] max-h-[560px] object-cover rounded-2xl" />
      </div></section>

      <section className="py-16 sm:py-24"><div className={container}>
        <p className="text-sm font-semibold text-primary mb-5">Measured, not promised</p><h2 className={heading}>What the lab found.</h2>
        <div className="grid md:grid-cols-2 gap-5 mt-10">{labResults.map(result => <article key={result.stat} className="rounded-lg border border-border p-8 bg-card"><p className="font-display text-5xl sm:text-6xl font-semibold text-primary">{result.stat}</p><p className="text-lg leading-relaxed mt-5">{result.text}</p><p className="text-sm text-muted-foreground leading-relaxed mt-5">{result.source}</p></article>)}</div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-6">Lab results on treated surfaces; your results depend on your space. EnviroBiotics is not a medical device and does not treat or prevent any disease. <Link to="/research" className="text-primary underline">Methods and sources</Link></p>
        <ul className="flex flex-wrap gap-x-8 gap-y-4 mt-8">{['EPA Reg. No. 94339-1', 'MADE SAFE® certified', 'PTPA parent-tested', 'ISO 9001 production'].map(badge => <li key={badge} className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="w-5 h-5 text-primary shrink-0" />{badge}</li>)}</ul>
      </div></section>

      <section id="shop" className="py-16 sm:py-24"><div className={container}>
        <h2 className={`${heading} max-w-3xl mb-10`}>Start with the room that needs it most.</h2>
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
