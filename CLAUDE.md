# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal link tree website built with Next.js 16 (App Router) for Keith Elliott, featuring a custom brand color palette and responsive design.

## Commands

```bash
bun dev       # Start development server on localhost:3000
bun run build # Build for production
bun start     # Start production server
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom brand color palette
- **UI Components**: shadcn/ui (new-york style)
- **Icons**: Phosphor Icons (@phosphor-icons/react)
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics
- **Newsletter**: Kit (ConvertKit) API integration

### Project Structure
```
app/
  layout.tsx          # Root layout with fonts and analytics
  page.tsx            # Main link tree page composition
  globals.css         # Tailwind imports and brand color CSS variables
  api/newsletter/     # Kit API route for newsletter signups

components/
  profile-header.tsx      # User profile section
  projects-section.tsx    # Featured projects with tech badges
  social-links-section.tsx # Social media links
  newsletter-signup.tsx   # Newsletter form (uses Kit API)
  footer.tsx              # Page footer
  ui/                     # shadcn/ui components

lib/
  utils.ts            # cn() utility for Tailwind class merging
```

### Brand Color System
Colors are defined as CSS custom properties in `app/globals.css`:
- `--color-brand-50` through `--color-brand-900` (purple tones)
- Semantic tokens (`--background`, `--foreground`, `--primary`, etc.) reference brand colors
- Dark mode support via `.dark` class

### Path Aliases
Uses `@/*` alias for imports from project root (configured in tsconfig.json).

## Environment Variables

- `KIT_API_KEY`: Required for newsletter signup functionality (Kit/ConvertKit API)

## Design Context

### Users
Mixed audience — developer peers exploring open-source work, potential clients or employers evaluating Keith professionally, and existing community members seeking quick access to projects and socials. The page serves as a universal hub and online resume teaser: a first impression that invites deeper exploration.

### Brand Personality
**Elegant, Technical, Precise.** The voice is confident but warm — a craftsman who takes pride in clean execution across disciplines. The "Resonant Projects" brand bridges software engineering and audio/music, unified by the idea of resonance: things that vibrate at the right frequency, whether code, sound, or color.

### Aesthetic Direction
- **Visual tone**: Elevated link tree meets condensed portfolio, with a distinct nod to music/audio culture. Not a generic link list — it should feel like an artifact from someone who cares deeply about both engineering and art.
- **Palette**: Purple/magenta brand spectrum (#faf9fb → #2c1028). Primary (#6e2765) and secondary (#a87da3) carry warmth and depth. Use the full range intentionally — light tones for breathing room, deep tones for grounding.
- **Typography**: Geist Sans for clarity and modern technical feel; Geist Mono for code accents. Let type breathe — generous line-height and deliberate weight choices.
- **Motion**: Subtle and purposeful — the FlickeringGrid background, fade-in-up entrances, and hover scale effects establish a living, responsive surface without overwhelming. Avoid gratuitous animation.
- **Theme**: Light and dark mode both supported. Light mode is the default; dark mode inverts using the same brand scale.
- **Anti-references**: Avoid generic Linktree templates, overly corporate portfolio sites, or heavy "developer homepage" aesthetics with terminal themes. This is not a resume — it's a curated doorway.

### Design Principles
1. **Resonance over decoration** — Every visual choice should reinforce the connection between code, sound, and craft. Ornament must earn its place.
2. **Precision with warmth** — Technical rigor in spacing, alignment, and consistency, but never cold. The page should feel like meeting someone interesting, not reading a spec sheet.
3. **Invite, don't overwhelm** — Progressive disclosure and clear hierarchy. Visitors should feel welcomed and know exactly where to go, regardless of who they are.
4. **Craft signals craft** — Attention to detail in the page itself demonstrates the quality of Keith's work. Micro-interactions, type choices, and color usage are the portfolio.
5. **Audio DNA** — Subtle references to music and sound engineering (rhythm, frequency, waveform patterns) should be woven into the design language without making it a "music site."
