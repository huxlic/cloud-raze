# CloudRaze

CloudRaze is a modern weather dashboard built with Next.js and React. It combines live weather data, city search, forecast cards, and a rain-chance chart in one polished interface.

## What the app does

- Search for a city and fetch current weather data from Open-Meteo.
- Show a default weather location on first load for immediate value.
- Display a weather overview card with live time, temperature, and weather conditions.
- Render forecast cards for the upcoming days.
- Show a 7-day rain probability and rainfall chart.
- Support theme switching between light and dark mode.
- Use Zustand for weather state management and local persistence.

## Current tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn for charts
- Zustand for state
- Axios for API requests
- Lucide / React Icons / Meteocons for UI icons

## Project structure

- src/app — app routes and main dashboard page
- src/components — UI components such as navbar, widget, forecast cards, and chart
- src/hooks — reusable weather logic
- src/lib — API helpers and data mapping utilities
- src/store — Zustand stores
- src/types — TypeScript interfaces and data contracts

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

## Future features

The roadmap for CloudRaze includes:

- Air quality insights and a dedicated air-quality tab
- Hourly forecast details for the next 24 hours
- Saved favorite cities and quick access chips
- Better search autocomplete with location suggestions
- Weather alerts and severe-condition notifications
- Unit conversion (°C / °F) and localization
- PWA support for offline-friendly access

## Notes

This project currently uses Open-Meteo APIs for weather and geocoding data. The UI is still evolving, and some sections such as the air-quality tab are placeholders for future expansion.

## License

This project is for personal learning and skill development.
