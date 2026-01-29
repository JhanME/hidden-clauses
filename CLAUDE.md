# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"hidden-clauses" is a Next.js 16 web application using the App Router architecture with React 19, TypeScript 5, and Tailwind CSS 4.

## Commands

- `npm run dev` — Start development server (localhost:3000)
- `npm run build` — Production build
- `npm run start` — Serve production build
- `npm run lint` — Run ESLint (uses ESLint 9 flat config with Next.js core web vitals + TypeScript rules)

No test framework is configured yet.

## Architecture

- **App Router**: Uses `src/app/` directory structure (server components by default)
- **Path alias**: `@/*` maps to `./src/*`
- **Styling**: Tailwind CSS 4 via PostCSS, with CSS custom properties for theming in `src/app/globals.css`
- **Fonts**: Geist and Geist Mono loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`
- **Dark mode**: Supported via `prefers-color-scheme` media query and CSS variables (`--background`, `--foreground`)
