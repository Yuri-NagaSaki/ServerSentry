# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ServerSentry is a Next.js 15 + React 19 monitoring dashboard for ServerStatus-Rust. It provides real-time monitoring of server metrics including CPU, memory, disk usage, and network traffic with a modern, responsive UI designed for optimal performance.

## Development Commands

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build production version
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun install` - Install dependencies (Bun is the preferred package manager)

## Architecture

### Core Technologies
- **Next.js 15** with App Router and standalone output
- **React 19** with Strict Mode enabled
- **TypeScript** for type safety
- **Tailwind CSS** with custom font (HarmonyOS Sans SC) and native animations
- **TanStack Query** for data fetching and caching
- **Axios** for API requests

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── dashboard/       # Dashboard-specific components
│   ├── server/          # Server card components
│   └── ui/              # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and configuration
└── styles/              # CSS files
```

### Key Configuration Files

- `src/lib/config.ts` - Global app configuration including API URL, refresh interval, and site metadata
- `src/lib/api.ts` - API client, type definitions, and data formatting utilities
- `next.config.ts` - Next.js configuration with standalone output, API rewrites, and CORS headers

### Data Flow

1. **API Integration**: Connects to ServerStatus-Rust backend via `/json/stats.json` endpoint
2. **Query Management**: Uses TanStack Query with optimized caching (30s stale time, 5min garbage collection)
3. **Real-time Updates**: Auto-refreshes every 1 second (configurable via `config.refreshInterval`)
4. **Type Safety**: Comprehensive TypeScript interfaces for Server and StatsResponse types

### UI Design Philosophy

- **Performance-First**: No heavy animation libraries (framer-motion removed)
- **Lightweight Animations**: CSS-only transitions and hover effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper semantic HTML and reduced motion support

### Performance Optimizations

- Query configuration optimized for reduced memory footprint
- Disabled refetching on window focus
- Data selection in useServers hook to minimize memory usage
- Turbopack for faster development builds
- CSS-only animations instead of JavaScript-based motion libraries
- **macOS Scroll Optimization**: Specialized CSS classes for smooth scrolling on macOS
- **GPU Acceleration**: Hardware acceleration for all interactive elements
- **Layout Containment**: CSS containment to reduce reflow and repaint
- **Optimized Scrollbars**: Thinner, GPU-accelerated scrollbars
- **Background Rendering**: Optimized backdrop-filter and background effects

### Theme System

- Supports light/dark mode toggle
- Configurable background system with gradient animations
- Custom theme selector component
- CSS variables for consistent theming

## Environment Variables

- `NEXT_PUBLIC_API_URL` - ServerStatus-Rust API URL (defaults to `http://localhost:8080`)

## Deployment

The app is configured for standalone deployment with:
- Static export capability (`bun run export`)
- Unoptimized images for static hosting
- API proxy configuration for CORS handling
- Docker-friendly standalone output

## Component Patterns

- Use the established component structure in `components/` directories
- Follow the existing TypeScript interface patterns in `src/lib/api.ts`
- Utilize the custom hooks pattern for data fetching (`use-servers.ts`, `use-theme.ts`)
- Implement hover effects and transitions using Tailwind CSS classes
- Use `transition-*` classes for smooth interactions without JavaScript animations
- Apply performance optimization classes for macOS compatibility:
  - `gpu-accelerated` - For hardware acceleration
  - `card-optimized` - For card components
  - `grid-optimized` - For grid layouts
  - `layout-optimized` - For containers
  - `hover-optimized` - For interactive elements
  - `macos-scroll-optimized` - For smooth scrolling on macOS