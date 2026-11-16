# Ride Management Dashboard

A React and Tailwind CSS dashboard with two role-aware pages:

- **Forms** — create administrators, create rides/events, or complete a rider profile.
- **Tables** — manage administrators, manage rides/events, or view rider registrations.

The role selector in the header previews each role. The theme toggle switches between light and dark modes and remembers the selection in local storage. Forms currently use client-side validation and sample-only feedback; tables use local mock data.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.