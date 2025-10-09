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
- **TypeScript** for type safety with ES2022 target
- **Tailwind CSS v4** with custom font (HarmonyOS Sans SC) and native animations
- **TanStack Query v5** for data fetching and caching
- **Native Fetch API** for all HTTP requests (no axios dependency)

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

1. **API Proxy Architecture**: Frontend makes requests to `/api/servers` Next.js route, which proxies to ServerStatus-Rust backend (configured via `BACKEND_API_URL` environment variable)
2. **Query Management**: Uses TanStack Query with optimized caching:
   - Stale time: 60 seconds (reduces request frequency)
   - Garbage collection: 2 minutes (reduces memory footprint)
   - Auto-refetch: Every 2 seconds (configurable via `config.refreshInterval`)
   - Disabled window focus refetching
3. **Data Processing**: Server data is fetched via native Fetch API with Next.js revalidation (1s cache)
4. **Type Safety**: Comprehensive TypeScript interfaces for Server and StatsResponse types in `src/lib/api.ts`

### UI Design Philosophy

- **Performance-First**: No heavy animation libraries (framer-motion removed)
- **Lightweight Animations**: CSS-only transitions and hover effects
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper semantic HTML and reduced motion support

### Performance Optimizations

- **Component Lazy Loading**: Large components (ServerList, RegionSelect, RegionGroupView) are lazy-loaded using React.lazy()
- **Query Optimization**: TanStack Query configured with reduced memory footprint (60s stale time, 2min GC, disabled window focus refetch)
- **Data Selection**: useServers hook uses select option to minimize data transformation overhead
- **Turbopack**: Fast development builds with Turbopack
- **CSS-Only Animations**: No JavaScript animation libraries - all transitions via Tailwind CSS classes
- **Modern Browser Target**: Webpack configured to disable polyfills and target modern browsers (ES2022)
- **macOS Scroll Optimization**: Specialized CSS classes for smooth scrolling on macOS
- **GPU Acceleration**: Hardware acceleration for all interactive elements
- **Layout Containment**: CSS containment to reduce reflow and repaint
- **Optimized Scrollbars**: Thinner, GPU-accelerated scrollbars
- **Background Rendering**: Optimized backdrop-filter and background effects

### Theme System

- Supports light/dark mode toggle via next-themes
- Configurable background system with gradient animations
- Custom theme selector component
- CSS variables for consistent theming
- Default theme: light, system theme detection disabled

### Key Features

- **Dashboard Stats**: Aggregated view of total/online servers, uptime, and traffic
- **Region Filtering**: Filter servers by location (groups servers by `location` field)
- **Region Grouping**: Displays servers grouped by region with collapsible sections
- **Real-time Monitoring**: Auto-refreshing server metrics (CPU, memory, disk, network)
- **Network Speed Display**: Live upload/download speeds with formatted units
- **Status Indicators**: Visual IPv4/IPv6 connectivity status badges
- **Loading States**: Skeleton screens and optimistic UI updates

## Environment Variables

- `BACKEND_API_URL` - ServerStatus-Rust backend API URL (used by Next.js API route `/api/servers`, **required** for production)
- `NEXT_PUBLIC_API_URL` - Legacy variable, now unused (API proxy handles routing internally)

## Deployment

The app is configured for standalone deployment with:
- **Standalone Output**: Next.js standalone mode for minimal Docker images
- **Unoptimized Images**: Static image serving without Next.js Image optimization
- **API Proxy**: Built-in Next.js API route handles backend communication and CORS
- **Production Build**: Console logs removed in production builds
- **Environment**: Requires `BACKEND_API_URL` to be set to ServerStatus-Rust backend endpoint

### Deployment Options

1. **Standalone Node.js**: Deploy `.next/standalone` directory with Node.js 18+
2. **Nginx Reverse Proxy**: Proxy frontend on port 3000, ensure `BACKEND_API_URL` is set
3. **Replace Built-in Theme**: Export and copy to ServerStatus-Rust `web/` directory (see README.md)

## Component Patterns

- **Component Organization**:
  - `components/dashboard/` - Dashboard-specific components
  - `components/server/` - Server card and detail components
  - `components/ui/` - Reusable UI primitives
  - Export components via index.ts barrel files

- **Lazy Loading**: Large components should use React.lazy() with Suspense fallbacks
  ```tsx
  const ServerList = lazy(() => import('@/components/server-list').then(m => ({ default: m.ServerList })));
  ```

- **Styling**:
  - Use Tailwind CSS classes exclusively (no CSS-in-JS)
  - Apply performance optimization classes for macOS:
    - `gpu-accelerated` - Hardware acceleration
    - `card-optimized` - Card components
    - `grid-optimized` - Grid layouts
    - `macos-scroll-optimized` - Smooth scrolling
  - Use `transition-*` classes for hover effects

- **Data Fetching**:
  - Use custom hooks (`use-servers.ts`, `use-region-data.ts`)
  - Follow TanStack Query patterns with select for data transformation
  - TypeScript interfaces defined in `src/lib/api.ts`

- **Formatting Utilities**: Available in `src/lib/api.ts`
  - `formatBytes(bytes, decimals)` - Format storage/memory sizes
  - `formatSpeed(bytes, decimals)` - Format network speeds
  - `formatPercent(value, total)` - Calculate percentages
  - `groupServersByRegion(servers)` - Group servers by location
  - `getUniqueRegions(servers)` - Extract unique region list
  - All use native `Intl.NumberFormat` for localization