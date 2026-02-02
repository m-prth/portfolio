# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview
Personal portfolio website built with React 19, TypeScript, and Vite. Features a neo-brutalist design system and an AI-powered assistant using Google Gemini.

## Commands
```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build (requires GEMINI_API_KEY env var)
npm run preview  # Preview production build
```

## Environment Variables
- `GEMINI_API_KEY` - Required for the AI assistant chatbot. Set in `.env.local` for local dev.

## Architecture

### Entry Points
- `index.html` - Contains Tailwind config and custom neo-brutalist theme (colors, shadows, fonts)
- `index.tsx` - React app mount point
- `App.tsx` - Root component composing all sections

### Key Files
- `constants.ts` - All portfolio content (experiences, projects, skills, photos). Edit this to update site content.
- `types.ts` - TypeScript interfaces (`Project`, `Experience`, `Photo`, `ChatMessage`, `SectionId` enum)
- `vite.config.ts` - Path alias `@/*` → project root; injects `GEMINI_API_KEY` into build

### Components (`components/`)
Page sections: `Hero`, `Experience`, `Skills`, `Projects`, `Gallery`, `Contact`, `Navigation`
- `PortfolioAssistant.tsx` - Floating AI chatbot modal using Gemini

### Services (`services/`)
- `geminiService.ts` - Gemini API integration with system prompt containing portfolio context

### Design System
Neo-brutalist style defined in `index.html` Tailwind config:
- Colors: `neoBlack`, `neoWhite`, `neoYellow`, `neoPurple`, `neoGreen`, `neoBlue`, `neoRed`, `neoOrange`
- Shadows: `shadow-neo`, `shadow-neo-sm`, `shadow-neo-lg`, `shadow-neo-hover`
- Use 2-4px black borders (`border-neoBlack`) for brutalist aesthetic
- Fonts: `Inter` (body), `Space Grotesk` (display)

## CI/CD
GitHub Actions workflow (`.github/workflows/deploy.yml`) runs build verification on push/PR to main. Requires `GEMINI_API_KEY` secret in repository settings.
