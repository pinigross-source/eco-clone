## Change /bobby hero image

Replace the current hero background image on the `/bobby` landing page with the newly uploaded photo (`user-uploads://AiStudio_47675.avif`).

### Steps
1. Copy `user-uploads://AiStudio_47675.avif` → `src/assets/bobby/bobby-hero.avif`.
2. In `src/pages/BobbyParrishLandingPage.tsx`:
   - Replace the import `import heroImg from "@/assets/dorm/dorm-hero-moving-in.jpg"` with `import heroImg from "@/assets/bobby/bobby-hero.avif"`.
   - Update the hero `<img alt="...">` text to describe the new photo.
3. Leave all hero copy, gradient overlay, CTAs, and layout untouched.

No other pages or components are affected.