
# Portfolio Website

Hey there! This is my personal portfolio site built with [Next.js](https://nextjs.org), where I showcase my work, projects, and a bit about myself.
It's live at [sumit-s-nair.vercel.app](https://sumit-s-nair.vercel.app)

## What’s Inside
The portfolio comes with:

- A clean, responsive design built using Tailwind CSS
- Dynamic content pulled from Firebase Firestore
- A neat admin panel secured with Google sign-in (so only I can make changes)
- Sections like About Me, Projects, Gallery, and Work Experience

## Tech Stack & Features

- Built using Next.js (App Router) and React
- Firebase handles both auth and content storage
- Admin area is protected – only accessible with Google Auth
- Images (like projects and profile pic) are either stored locally or in Firebase Storage
- Custom UI components for things like carousels to keep everything smooth and snappy

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can only do that after you set up the firebase stuff so all the best
