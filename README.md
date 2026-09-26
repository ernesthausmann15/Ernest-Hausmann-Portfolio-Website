# Ernest Hausmann — Portfolio

Cinematic portfolio for a junior software engineer. Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, GSAP, and React Three Fiber.

## Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## EmailJS

Copy `.env.example` to `.env.local` and fill in the three public EmailJS values. The template should accept `from_name`, `reply_to`, `company`, and `message`.

## Projects

Story copy lives in `src/lib/projects.ts`. Set `VERCEL_ACCESS_TOKEN` (and `VERCEL_TEAM_ID` if the account is a team) to attach production and GitHub URLs from the Vercel API.

## Certificate

The resume shows the issued credential. The original file is `public/certificates/fes-certificate.pdf`, and the page paints a render of that same page.
