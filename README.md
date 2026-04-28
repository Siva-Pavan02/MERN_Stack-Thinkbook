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

Create `backend/.env` from the example:

```bash
cp backend/.env.example backend/.env
```

Fill in your real MongoDB, Upstash, JWT, and Google OAuth values.

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

## Notes

- Do not commit `backend/.env`.
- Do not commit downloaded `client_secret*.json` files.
- Each authenticated user can only see and manage their own notes.
