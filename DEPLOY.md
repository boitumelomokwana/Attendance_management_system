# Free Deployment Guide — Attendance Management System

## Architecture Overview

| Layer | Platform | Free Tier |
|-------|----------|-----------|
| Frontend (React + Vite) | **Vercel** | Unlimited static sites, auto HTTPS, GitHub auto-deploy |
| Backend (Express.js) | **Render** | Free web service, 750h/month, spins down after 15min idle |
| Database (MySQL) | **Aiven** | Free Aiven for MySQL: 1 CPU, 1GB RAM, 5GB storage |
| Database (Alternative) | **TiDB Cloud** | 25GB storage, no credit card required |

---

## ⚠️ BEFORE YOU START: Security Cleanup

Your `server/.env` file was committed to GitHub with real Gmail credentials.
**Do these immediately:**

```bash
# 1. Go to https://myaccount.google.com/apppasswords
# 2. Revoke the app password named for this project
# 3. Generate a new one after deployment
# 4. Remove .env from git history (optional but recommended):
git rm --cached server/.env
git commit -m "Remove sensitive .env from tracking"
```

---

## Step 1: Set Up Free MySQL Database (Aiven)

1. Go to https://console.aiven.io — sign up (no credit card for free tier)
2. Click **Create service** → choose **Aiven for MySQL**
3. Select **Free plan** (Hobbyist)
4. Choose a cloud region close to South Africa (e.g., `google-europe-west1`)
5. Name: `attendance-db`
6. Click **Create**
7. Once running, go to **Overview** → copy:
   - **Host** (e.g. `attendance-db-yourname.aivencloud.com`)
   - **Port** (e.g. `28265`)
   - **User** (e.g. `avnadmin`)
   - **Password** (click "Show password")

---

## Step 2: Deploy Backend to Render

1. Go to https://render.com — sign up with GitHub
2. Click **New +** → **Web Service**
3. Connect your GitHub repo (`boitumelomokwana/Attance_management_system`)
4. Configure:
   - **Name**: `attendance-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Under **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `PORT` | `10000` |
| `DB_HOST` | `your-db-host.aivencloud.com` |
| `DB_PORT` | `28265` |
| `DB_NAME` | `defaultdb` |
| `DB_USER` | `avnadmin` |
| `DB_PASSWORD` | `your-aiven-password` |
| `JWT_SECRET` | `generate-a-random-64-char-string` |
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `your-email@gmail.com` |
| `EMAIL_PASS` | `your-new-app-password` |
| `CORS_ORIGINS` | `http://localhost:5173,https://your-frontend.vercel.app` |

6. Click **Create Web Service**
7. Your API will be at: `https://attendance-api.onrender.com`
8. Test it: visit `https://attendance-api.onrender.com/api/health` — should return `{"status":"ok"}`

---

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com — sign up with GitHub
2. Click **Add New** → **Project**
3. Import your GitHub repo
4. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://attendance-api.onrender.com/api` |

6. Click **Deploy**
7. Your frontend will be at: `https://your-project.vercel.app`
8. **Go back to Render** → update `CORS_ORIGINS` to include your Vercel URL:
   - `CORS_ORIGINS` → `http://localhost:5173,https://your-project.vercel.app`

---

## Step 4: Verify Everything

1. Open your Vercel URL
2. Check the login page loads
3. Try registering a user — if it works, your backend + database are connected
4. Check the browser console (F12) for any CORS errors

---

## Files Changed (Summary)

| File | Change |
|------|--------|
| `client/src/services/api.js` | `baseURL` now uses `VITE_API_URL` env variable |
| `client/.env.production` | New file — set your Render URL here for local builds |
| `server/server.js` | CORS now reads from `CORS_ORIGINS` env variable |
| `server/package.json` | Added `engines.node`, `dev` script |
| `server/.env.example` | New template file (safe to commit) |
| `.gitignore` | New root gitignore — blocks all `.env` files |

---

## Free Tier Limitations

- **Render**: Web service sleeps after 15 minutes of inactivity. First request wakes it (takes ~30-60s). Set up a free uptime monitor at https://uptimerobot.com to ping `/api/health` every 5 minutes.
- **Aiven**: 5GB storage, 1 CPU, 1GB RAM — fine for small/medium usage.
- **Vercel**: 100GB bandwidth/month, commercial use requires Pro plan.

---

## Updating After Deployment

```bash
# Push code changes
git add .
git commit -m "Deploy-ready: env vars, CORS, gitignore"
git push origin main

# Vercel auto-deploys on push
# Render auto-deploys on push
