# Beauty Clinic Reservation Management

A bilingual (English / Persian) beauty clinic web app with a public landing page and an admin dashboard for managing reservations.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** + **shadcn/ui** (Base UI) + **Lucide** icons
- **i18next** / **react-i18next** (EN & FA, RTL support)
- **Zod** for form validation
- Cookie-based admin authentication

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root by copying the sample:

```bash
cp .env.example .env
```

Then edit `.env` if needed. The default admin credentials are:

```env
ADMIN_USERNAME=metthew
ADMIN_PASSWORD=123456
```


### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project structure

- `src/app/_landing` — public marketing / landing page
- `src/app/login` — admin login
- `src/app/dashboard` — overview & reservations management
- `src/i18n` — locales and i18n setup (`en`, `fa`)
- `src/components/ui` — shared UI primitives
