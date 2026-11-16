# TVS Community Portal

The portal includes the existing login, signup, and role dashboards, plus role-based management pages:

- Super admins can create and manage admins.
- Admins can create and manage community rides and events.
- Users can register for available rides and include additional riders.

## Development

The frontend dependency versions are summarized in the root `requirements.txt`; the authoritative npm manifests are `package.json` and `package-lock.json`. The backend dependencies are listed in `backend/requirements.txt`.

Install and start the frontend with:

```bash
npm ci
npm run dev
```

After installation, start the development server with `npm run dev`.
Create a production build with `npm run build`.

## Run the backend

Configure the ignored `backend/.env` with valid MySQL and JWT settings, then start FastAPI in a separate terminal:

```powershell
Set-Location backend
.\.venv\Scripts\python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The frontend uses `http://127.0.0.1:8000` by default. Override it with `VITE_API_BASE_URL` if the backend runs elsewhere. Community sign-up/sign-in, admin sign-in, and the community profile use the existing backend endpoints. Event and admin-management tables remain frontend mock data because the supplied backend has no corresponding API routes.

The supplied `database` folder contains no schema or database files. The configured MySQL server must already contain the tables expected by the backend (`admin_users` and `community_users`).