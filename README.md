# FINSA Cloud

Next.js + TypeScript + Tailwind CSS v4. Login and announcements run on Firebase (free Spark plan) and Cloudinary (free plan). No payment card needed.
Layout follows https://finsa-cloud-a.vercel.app/, styled with your own `app/globals.css`.

## What the site does
- **Before login**, visitors see only a welcome page with Log in and Sign up. Every other page sends them to the login page.
- **After login**, `/` becomes a dashboard that greets the user by name, with the latest announcements and quick links.
- **Page content is truly protected.** The server checks the login before it sends anything. The people list, handbook text, Drive links and announcements never reach a logged-out browser.
- **Admins** post announcements at `/admin`. They show as a banner under the menu on every page, and on `/announcements`.

## Where to edit things
| I want to change... | Open this file |
|---|---|
| Colours, fonts, animations | `app/globals.css` |
| Site name, menu labels, contact, social links, dashboard cards | `lib/site.ts` |
| People, Drive links, handbook text (private content) | `lib/content.ts` |
| Logo, hero picture, footer logo | `lib/images.ts` |
| Buttons, cards, form fields, round profile pictures | `components/ui/` (one small file each) |
| The welcome page (before login) | `components/Welcome.tsx` |
| The dashboard (after login) | `components/Dashboard.tsx` |
| The menu bar / footer | `components/NavBar.tsx` / `components/Footer.tsx` |
| A page | `app/<page name>/page.tsx` |

Every file has short comments explaining what it does.

## 1. Run it
```bash
npm install
cp .env.example .env.local   # then fill in the keys (steps 2 to 4)
npm run dev                  # http://localhost:3000
```
Without keys the site runs, but only the welcome, login and signup pages work.

## 2. Set up Firebase (free, one time)
Stay on the **Spark** plan. Never click "Upgrade".
1. console.firebase.google.com > Add project (Google Analytics can be off).
2. Build > Authentication > Get started > Sign-in method > turn on **Email/Password**.
3. Build > Firestore Database > Create database > **production mode** > pick the closest location. (Optional: paste `firestore.rules` into the Rules tab. The site only talks to the database through its own server, so browsers get no direct access.)
4. Project settings (gear) > General > Your apps > Web (`</>`) > register the app. Copy the four values into `.env.local` (the `NEXT_PUBLIC_FIREBASE_...` ones).
5. Project settings > **Service accounts** > Generate new private key. A `.json` file downloads. Copy three values from it into `.env.local`:
   - `project_id` goes in `FIREBASE_PROJECT_ID`
   - `client_email` goes in `FIREBASE_CLIENT_EMAIL`
   - `private_key` goes in `FIREBASE_PRIVATE_KEY` (keep the quotes and the `\n` characters)

   This file is a secret. Never share it, post it online or commit it to GitHub.

## 3. Set up Cloudinary for announcement images (free, optional)
Without it, announcements work as text only.
1. Sign up at cloudinary.com (no card). Copy your **Cloud name**.
2. Settings > Upload > Upload presets > Add: **Signing mode: Unsigned**, allowed formats `jpg,png,webp`. Copy the preset name.
3. Put both in `.env.local`.

## 4. Make yourself an admin
1. Sign up on the site.
2. Firebase console > Firestore Database > `users` > your document > change `role` from `student` to `admin`.
3. Refresh the site. An "Admin" button appears in the menu. To add more admins, repeat step 2 for them.

## Deploying to Vercel
Add every variable from `.env.local` in Vercel > Project > Settings > Environment Variables, then redeploy. For `FIREBASE_PRIVATE_KEY`, paste the value including the `\n` characters.

## Free-plan limits
- Firestore Spark allows about 50,000 reads a day. Each page load reads at most 20 announcements, so a department site stays well inside this. If the limit is hit, loading pauses until the next day and you are not charged.
- Deleting an announcement leaves its image in Cloudinary. There is plenty of free space; clear old images in the Cloudinary dashboard now and then.

## Things to know
- Logins last 5 days, then the person logs in again.
- The Cloudinary upload preset is unsigned, so anyone who finds its name could upload images to your account. The free quota is generous, and you can restrict formats and size in the preset settings.
- The CGPA calculator's code is part of the public website files, but it holds no private data.
- Colours: only the brand shades from `globals.css` are used (50, 100, 400, 500, 600, 900 and accent-500). Greys use Tailwind's slate, and error messages use red.
