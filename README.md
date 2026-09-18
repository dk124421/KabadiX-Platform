# KabadiX

KabadiX is a high-fidelity, mobile-first prototype for an AI-assisted e-waste recycling and traceability platform. It demonstrates how informal collectors can identify scrap, compare fair prices, create a digital lot, and complete a verified handover.

This repository contains a front-end prototype for demos and concept validation. It does not include a production API, real authentication, machine-learning inference, payments, maps, or persistent storage. The screens use local React state and realistic sample data.

## Live Demo

The app is designed to deploy as a Render Static Site from this repository.

## Highlights

- Collector onboarding with English, Hindi, and Marathi language options
- Simulated OTP login and collector dashboard
- AI e-waste scan result with confidence, weight, and fair-value range
- Fair Deal comparison across authorized recyclers
- Digital scrap lot, traceability passport, QR handover, and earnings views
- Recycler and admin dashboard concepts
- Voice mode, offline mode, safety coach, and market prices
- Responsive phone-shell presentation for hackathon and stakeholder demos

## Demo Journey

1. Welcome → Language → Role → Login → OTP
2. Dashboard → **Scan E-Waste** → AI Result → Fair Deal AI
3. Compare recyclers → Create Digital Lot → Scrap Passport
4. QR Digital Handover → Earnings

The top demo bar can toggle the simulated offline state. Use the bottom navigation and dashboard cards to explore the alternate prototype areas.

## Tech Stack

- React 19
- Vite
- React Router
- Recharts
- Lucide React
- QRCode React

## Run Locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The default development server is usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create the production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run Oxlint
```

## Deploy On Render

The included `render.yaml` defines the app as a static site:

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render will run `npm install && npm run build` and publish `dist`.
4. The rewrite in `render.yaml` sends client-side routes to `index.html`.

No environment variables are required for this prototype.

## Project Structure

```text
src/
	components/   Shared phone shell, navigation, and UI elements
	context/      Local demo state and sample recycling data
	screens/      Collector, recycler, admin, and supporting prototype screens
	assets/       Static visual assets
```

## Product Direction

KabadiX is intended to grow into a production platform with verified recycler onboarding, live market pricing, image-based material classification, multilingual voice support, digital chain-of-custody records, and secure payments. Those capabilities are represented here as an interaction model, not implemented services.
