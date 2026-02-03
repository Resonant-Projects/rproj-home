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
