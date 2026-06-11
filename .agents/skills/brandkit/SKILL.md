---
name: brandkit
description: Premium brand-kit image generation for high-end brand-guidelines boards, logo systems, identity decks, and visual-world presentations. Use when the user asks for brand kits, logo concepts, identity systems, brand boards, visual identity decks, or mood/world boards across categories like minimalist, cinematic, editorial, dark-tech, luxury, cultural, security, gaming, developer-tool, or consumer-app brands.
---

# Brandkit — Premium Brand Identity Image Generation

Use this skill whenever the user asks for any of:
- Brand kit / brand board / brand guidelines image
- Logo concept board, logo system, logo lockups, monogram explorations
- Identity deck, visual identity system, brand presentation
- Mood board, world board, art direction reference
- Launch direction / brand case study image

Output goal: a single composed image (or small set) that looks like a senior brand designer's presentation board — strategic, symbolic, minimal, premium, art-directed.

---

## 1. Intake — establish the brief before generating

Before generating, infer or briefly ask for:
1. **Brand name** (1-3 words).
2. **Category / world** (e.g. dark-tech, luxury fashion, indie game studio, dev tool, cultural institution, security, consumer app, hospitality).
3. **One-line essence / promise** (what the brand stands for).
4. **Tone** (e.g. minimal & cinematic, editorial & cultural, raw & brutalist, warm & human, technical & precise).

If 2+ of these are missing and the user gave a vague prompt, ask ONE consolidated clarifying question with concrete options before generating. Otherwise proceed.

---

## 2. Direction — pick ONE coherent visual world

Never mix worlds. Choose a single direction and commit. Common directions:

- **Minimalist Editorial** — vast negative space, single serif wordmark, museum-grade restraint, off-white / bone / ink.
- **Cinematic Dark-Tech** — near-black canvas, single accent (electric blue, plasma green, signal red), monospace + geometric sans, glow only when meaningful.
- **Luxury Heritage** — warm neutrals (bone, camel, oxblood), high-contrast serif, foil-stamp feel, generous margins.
- **Cultural / Curatorial** — paper texture, museum captioning, Swiss grid, restrained palette of 2-3 muted tones.
- **Brutalist Raw** — monospace, hairline rules, off-register marks, paper grain, only black + one industrial accent.
- **Consumer Soft** — warm off-white, rounded geometric sans, 1-2 saturated accents, soft shadows, friendly monogram.
- **Gaming / Worldbuilding** — cinematic still energy, sculpted logomark, atmospheric haze, single saturated key light.
- **Developer Tool** — terminal restraint, monospace, grid background, single signal accent, ASCII-flavored marks.

---

## 3. Composition — board anatomy

A brand board image should compose 4-7 of these panels into one cohesive canvas (grid OR asymmetric editorial layout):

1. **Primary logo** (hero panel, largest) — wordmark, monogram, or combination mark on brand background.
2. **Logo variations** — horizontal, stacked, monogram-only, reversed (light-on-dark + dark-on-light).
3. **Color palette** — 4-6 swatches with hex codes in small mono caption.
4. **Typography** — display + body pairing shown with a real phrase, not "Lorem ipsum". Include type names.
5. **Symbol / icon system** — 3-6 supporting marks or pictograms aligned to the logomark's geometry.
6. **Mockup / application** — ONE restrained application (business card, app icon, signage, packaging, web header). Never more than two mockups on one board.
7. **Brand statement** — one short sentence (≤9 words) that anchors the brand's purpose.

Panel rules:
- Align everything to a visible or implied grid.
- Use thin hairline dividers or pure negative space — never decorative borders.
- Label panels with small mono captions (e.g. `01 / WORDMARK`, `PALETTE`, `TYPE`).
- Whitespace is a panel. Leave at least one generous breathing zone.

---

## 4. Logo craft — non-negotiables

- **Symbolic intent**: the mark must mean something tied to the brand's essence (geometry, letterform play, negative space, cultural reference). State the symbolism in a small caption.
- **Geometric discipline**: built on circles, squares, golden ratio, or a strict grid. No freehand wobble unless the direction is explicitly raw/brutalist.
- **One idea per mark**: do not combine 3 metaphors. One strong concept, executed precisely.
- **Reversibility**: shows clean on both light and dark.
- **Scale test**: include a small-size version (favicon-scale) somewhere on the board to prove it holds up.

Avoid: gradient swooshes, generic globe/leaf/arrow clichés, stock geometric monograms with no concept, AI-style soft 3D blobs, glow for decoration.

---

## 5. Typography rules

- Pair exactly two families: ONE display + ONE text. Optionally a third mono for captions.
- Name the typefaces on the board (e.g. `DISPLAY — GT Sectra` / `TEXT — Inter` / `MONO — JetBrains Mono`).
- Show real words from the brand world, not filler.
- Tracking: display tight or neutral; captions wide-tracked uppercase at small sizes.
- No more than two type sizes per panel.

---

## 6. Color rules

- 4-6 colors total. One dominant, one ink/text, 1-2 accents, optional 1-2 neutrals.
- Always include hex codes in small mono caption beneath each swatch.
- Accents must be intentional — tied to the brand's emotion, not "because it pops".
- Dark-mode systems: dominant near-black (not pure `#000`), text off-white (`#E8E8E8`-ish), one signal accent.

---

## 7. Generation — execution

Use `imagegen--generate_image` with these defaults for brand boards:
- `model`: **premium** (mandatory — brand boards contain legible typography and fine detail).
- `width` × `height`: `1536 × 1024` for landscape boards, `1024 × 1536` for portrait decks, `1280 × 1280` for square IG-ready boards. All multiples of 32.
- `transparent_background`: false (boards are composed canvases).
- `target_path`: write to `/mnt/documents/brandkit/<brand>-<panel>.jpg` for user delivery, or `src/assets/brand/<name>.jpg` if the user wants it imported into the app.

### Prompt construction template

Build the image prompt with this structure:

```
A premium brand identity presentation board for "<BRAND NAME>", a <category> brand whose essence is <one-line>.
Composition: <grid description — e.g. "asymmetric 3-column editorial layout with generous negative space">.
Panels visible: <list panels with their position>.
Logo: <describe wordmark/monogram/symbol — typeface feel, geometry, symbolism>.
Typography: display = <font feel>, text = <font feel>, shown rendering the phrase "<real phrase>".
Color palette: <4-6 hex codes with role>.
Mockup: <one restrained application>.
Style: senior brand designer's presentation board, museum-quality, art-directed, intentional, premium, high craft.
Lighting: <soft directional studio light / flat editorial / cinematic single key>.
Negative instructions: no generic AI gradients, no swooshes, no stock cliché icons, no Lorem ipsum, no decorative borders, no purple/indigo default palette.
```

Always include the real brand name in the prompt so the wordmark renders legibly. Specify exact hex codes — vague "blue and cream" produces generic output.

### Multi-board sets

If the user wants a full deck, generate 3-5 boards in parallel, each with a different focus:
1. Logo system board
2. Color + typography board
3. Application / mockup board
4. (Optional) Symbol / icon system board
5. (Optional) Brand statement / world / mood board

Keep palette, typography, and grid consistent across the set.

---

## 8. QA before delivering

After generation, inspect every image:
- Wordmark legible and spelled correctly.
- Hex codes (if visible) readable and consistent with the named palette.
- No overlapping elements, no clipped text, no obvious AI artifacts on the logo geometry.
- Composition feels intentional — if it looks like a generic moodboard, regenerate with a more specific prompt.
- Only ONE direction expressed — no mixed worlds.

If a board fails QA, regenerate with a sharper, more specific prompt rather than adding more elements.

---

## 9. Delivery

- Save user-facing outputs to `/mnt/documents/brandkit/` and present each with a `<presentation-artifact>` tag (mime `image/jpeg` or `image/png`).
- If the user is building this into their Lovable app (hero, marketing site), save to `src/assets/brand/` and wire via ES6 import.
- In the chat reply: name the direction chosen, the palette, the type pairing, and the symbolism of the mark — in one short paragraph. Do not pad.

---

## Final output standard

Every brand board must feel like:
- a senior designer's presentation board
- a brand-system case study
- a launch direction worth pitching to a founder

Clean. Strategic. Symbolic. Minimal. Coherent. Premium. Stronger than default AI brand visuals.
