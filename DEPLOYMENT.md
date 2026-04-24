# Deployment Guide (Next.js + Django)

This repository is split into:
- Frontend: `next-vlogging` (Next.js)
- Backend: `django-backend` (Django API)

Recommended hosting:
- Frontend: Vercel
- Backend: Render (or Railway)
- Database: Managed Postgres (Render/Railway/Neon/Supabase)

## 1) Deploy Django backend

### Render setup
1. Create a new **Web Service** from this repository.
2. Set **Root Directory** to `django-backend`.
3. Build Command:
   `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
4. Start Command:
   `gunicorn vlogging_django.wsgi:application --bind 0.0.0.0:$PORT`
5. Add environment variables from `django-backend/.env.example`.

Required backend env values:
- `SECRET_KEY`: strong random value
- `DEBUG=false`
- `ALLOWED_HOSTS`: your Render hostname (comma-separated if multiple)
- `CORS_ALLOWED_ORIGINS`: your frontend domain(s)
- `CSRF_TRUSTED_ORIGINS`: your frontend domain(s)
- `DATABASE_URL`: Postgres connection string for production
- `GOOGLE_OAUTH_CLIENT_IDS`: comma-separated accepted Google OAuth web client IDs
- `APPLE_SERVICES_ID`: Apple Service ID (web identifier)

Example:
- `ALLOWED_HOSTS=your-api.onrender.com`
- `CORS_ALLOWED_ORIGINS=https://your-site.vercel.app`
- `CSRF_TRUSTED_ORIGINS=https://your-site.vercel.app`

After deploy, verify:
- `https://your-api.onrender.com/api/hello/`

## 2) Deploy Next.js frontend

### Vercel setup
1. Import this repository in Vercel.
2. Set **Root Directory** to `next-vlogging`.
3. Framework should auto-detect as Next.js.
4. Add env variable:
   - `NEXT_PUBLIC_DJANGO_API_BASE=https://your-api.onrender.com`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com`
   - `NEXT_PUBLIC_APPLE_CLIENT_ID=com.yourdomain.vloghub.web`
   - `NEXT_PUBLIC_APPLE_REDIRECT_URI=https://your-site.vercel.app/login`
5. Deploy.

After deploy, verify:
- Login/register flow calls backend successfully.
- Tracking page can read/write snapshot events.
- Django test page loads backend message.

## 3) Post-deploy checklist

- Backend `DEBUG` is `false`.
- Backend `ALLOWED_HOSTS` includes production host.
- Backend CORS/CSRF values include frontend URL.
- Backend uses Postgres (`DATABASE_URL` set).
- Frontend env points to backend HTTPS URL.
- Password reset email credentials are configured.

## 4) Optional: Railway backend

Use same `django-backend` root and same env vars.
- Build: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
- Start: `gunicorn vlogging_django.wsgi:application --bind 0.0.0.0:$PORT`

