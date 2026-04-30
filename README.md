# ThinkBoard

A MERN stack notes app with Google OAuth login, JWT-protected APIs, and private user-specific notes.

## Tech Stack

- MongoDB + Mongoose
- Express + Node.js
- React + Vite
- Tailwind CSS + DaisyUI
- Passport Google OAuth 2.0
- JWT authentication

## Local Setup

Install dependencies:

```bash
npm install --prefix backend
npm install --prefix frontend
```

Create `backend/.env` and fill in your real MongoDB, Upstash, JWT, and Google OAuth values.

Required Google OAuth redirect URI:

```text
http://localhost:5000/auth/google/callback
```

Run the app:

```bash
npm run start --prefix backend
npm run dev --prefix frontend
```

Open:

```text
http://localhost:5173
```

## Production Build

```bash
npm run build
```

## Render Deployment

Set these environment variables in Render:

```env
MONGO_URI="your_mongodb_connection_string"
UPSTASH_REDIS_REST_URL="your_upstash_redis_rest_url"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_rest_token"
NODE_ENV="production"
JWT_SECRET="replace_with_a_long_random_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
CLIENT_URL="https://your-render-app.onrender.com"
GOOGLE_CALLBACK_URL="https://your-render-app.onrender.com/auth/google/callback"
```

Add this production redirect URI to your Google OAuth client:

```text
https://your-render-app.onrender.com/auth/google/callback
```

Keep the local redirect URI too if you still run locally:

```text
http://localhost:5000/auth/google/callback
```

## Notes

- Do not commit `backend/.env`.
- Do not commit downloaded `client_secret*.json` files.
- Each authenticated user can only see and manage their own notes.
