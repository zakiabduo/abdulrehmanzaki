# Portfolio – Abdul Rehman Zaki
## Run
npm install && cp .env.example .env.local && npm run dev   (build: npm run build)
## Env
RESEND_API_KEY (from resend.com), CONTACT_TO_EMAIL (where messages go)
## Edit content
Everything lives in data/content.ts (search for TODO). Add me.jpg and cv.pdf to /public.
Colors: CSS variables in app/globals.css. Animation presets: lib/variants.ts.
## Deploy
Push to GitHub, import the repo on vercel.com, add the two env vars, deploy.
