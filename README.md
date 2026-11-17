# TVS Community Portal

A role-based community portal for managing motorcycle rides and events. The repository contains a React frontend and a FastAPI backend.

## Features

- Role-based dashboards for super admins, admins, and community members.
- Community account registration and sign-in using the backend API.
- Admin sign-in and community profile retrieval using the backend API.
- Ride and event registration screens with sample data.
- Responsive interface styled with Tailwind CSS and project-specific CSS.

> Event and administrator management currently use frontend sample data. The supplied backend does not expose APIs for those records.

## Technology

- **Frontend:** React, React Router, Vite, Tailwind CSS
- **Backend:** Python, FastAPI, Uvicorn
- **Database:** MySQL

## Requirements

- Node.js supported by Vite 8: `^20.19.0` or `>=22.12.0`
- npm (included with Node.js)
- Python 3 and the Windows `py` launcher
- A reachable MySQL server with the tables expected by the backend

## Project structure

```text
.
├── backend/
│   ├── config/             # Backend and database configuration
│   ├── controllers/        # Authentication and profile logic
│   ├── routes/             # FastAPI endpoints
│   ├── schemas/            # Request validation
│   ├── utils/              # Password and token helpers
│   └── requirements.txt    # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── routes/
│   ├── index.html
│   └── requirements.txt    # Reference list; npm manifests are authoritative
├── package.json            # Frontend npm scripts and dependencies
└── package-lock.json       # Locked npm dependency versions
```

## Setup on Windows

Run these commands from the repository root in PowerShell:

```powershell
cd "C:\Users\<your-name>\Desktop\TVS project"
npm.cmd ci
py -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

The root `package.json` and `package-lock.json` are used to install the frontend dependencies. `frontend\requirements.txt` is provided as a package reference; it is not a pip requirements file.

### Configure the database

Create or update `backend\.env` locally with the MySQL connection and JWT settings:

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET_KEY=your_long_random_secret
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=30
```

Do not commit `backend\.env` or share its secrets. The backend expects the `admin_users` and `community_users` MySQL tables. No database schema or seed file is included in the supplied `database` folder, so those tables must exist in the configured database.

## Run the application

Start the backend and frontend in **separate PowerShell terminals**. Keep both terminals open while using the app.

**Terminal 1 — backend:**

```powershell
cd "C:\Users\<your-name>\Desktop\TVS project\backend"
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

**Terminal 2 — frontend:**

```powershell
cd "C:\Users\<your-name>\Desktop\TVS project"
npm.cmd run dev -- frontend --host 127.0.0.1 --port 5173 --strictPort
```

Open the frontend at [http://127.0.0.1:5173](http://127.0.0.1:5173). The backend API documentation is at [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs).

The frontend uses `http://127.0.0.1:8001` as its API base URL. To use a different backend URL, set `VITE_API_BASE_URL` before starting Vite. The backend's CORS configuration allows the frontend origins `http://127.0.0.1:5173` and `http://localhost:5173`.

## Build the frontend

From the repository root:

```powershell
npm.cmd run build -- frontend
```

The production files are written to `frontend\dist`.

## Troubleshooting

- **`uvicorn` is not recognized:** Run it through the project environment: `.\.venv\Scripts\python.exe -m uvicorn ...`. PowerShell script activation is not required.
- **Port 8001 is already in use:** Use the backend process already listening on that port, or stop it before starting another instance.
- **Port 5173 is already in use:** Stop the other frontend dev server. `--strictPort` prevents Vite from silently selecting another port that the backend may not allow.
- **Database access denied or missing tables:** Confirm the MySQL service is running, the local `backend\.env` values are correct, and the required tables exist.
- **Frontend cannot reach the API:** Keep the backend running on port 8001 and open the frontend on one of the CORS-allowed origins listed above.
