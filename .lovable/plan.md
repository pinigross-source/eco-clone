## Goal

Make `ActiveDefenseToggle` feel calm, premium, and confident — closer to Apple/Sonos product demos — instead of the current dashboard-y look (traffic-light reds/greens/blues, dashed borders, spring bounces, multiple pulsing layers).

## Direction

One restrained color story, slower choreography, fewer simultaneous motions, softer surfaces.

## Changes

**Color & state language**
- Drop the red → blue → green traffic-light cycle. Use a single neutral baseline (graphite/foreground-muted) and one accent — soft sky/teal — that fades in for "Protected".
- "Vulnerable" state: monochrome only (no red icons or red labels). Communicate via a subtle desaturation + a single small status word.
- Replace the green check-shield badge with a thin ring or a 1.5px tick that fades in.
- Status pill: remove colored fill + bold text. Use a small dot + light-weight label on a frosted white pill with hairline border.

**Motion**
- Remove `type: "spring"` everywhere; use `ease: [0.22, 1, 0.36, 1]` (Apple-style cubic) at 0.5–0.8s for state transitions.
- Hotspot entrance: stagger 30ms, fade + 6px rise, no scale-from-zero.
- Remove the infinite scale pulse on each hotspot glow. Keep one slow breathing glow on the central device only (4s, opacity 0.4 ↔ 0.7).
- Reduce expanding wave rings from 3 to 1, slower (4s), thinner (1px), lower opacity (0.15 → 0), single accent color.
- Particles: fewer (2 per hotspot, not 4), smaller, no rainbow gradient — solid accent at 60% opacity, soft shadow only, ease-out path.

**Surfaces & typography**
- Container: remove primary-tinted glow shadow; use a single soft neutral shadow + 1px hairline border (`border-black/5`).
- Background: flat white, drop the dotted grid pattern (or drop opacity to 0.015).
- Hotspot chips: remove heavy 2px borders and drop-shadows. Use 1px hairline, `bg-white/80 backdrop-blur`, smaller radius.
- Labels: switch from bold pill labels to lightweight 11px tracked-wide text, no background, sitting quietly under the icon.

**Rhythm**
- Slow the auto-toggle from 8s to 12s so each state has room to breathe.
- Stretch the protected-phase reveal: particles arrive over ~4s instead of 2.8s.

## Out of scope

- Copy changes ("Protected" / "Vulnerable" / "Passive filters miss…" stay).
- Layout of hotspots (positions unchanged).
- The center device illustration and toggle behavior.

## Files

- `src/components/hero/ActiveDefenseToggle.tsx` — only file touched.
