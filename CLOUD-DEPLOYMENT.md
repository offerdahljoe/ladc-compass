# LADC Compass Cloud Access

You can host LADC Compass so it opens from any computer, like a normal website.
The app is now prepared for optional invite-only Supabase login and cloud sync.

## Important Storage Note

Without Supabase keys, LADC Compass saves entries in each browser's local storage. That means:

- The website can be opened from any computer once hosted.
- Saved hours, notes, uploads, and plans will not automatically sync between computers.

With Supabase connected:

- Invited users can sign in with email and password.
- Saved hours, notes, plans, supervision notes, and documentation upload records sync across computers.
- Public visitors can still read the learning content, but they cannot use your private synced workspace.
- The app still warns against PHI and should not be used as a HIPAA client record system.

Because this is not a HIPAA client management system, do not enter real client identifying information or PHI.

## Step 1: Create Supabase Cloud Sync

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Paste and run the contents of `supabase-schema.sql`.
4. Go to Project Settings, then API.
5. Copy:
   - Project URL
   - anon public key

For local testing, create `.env.local`:

```text
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For cloud hosting, add those same two values as environment variables in Vercel or Netlify.
Also add the public website URL:

```text
NEXT_PUBLIC_SITE_URL=https://your-vercel-site.vercel.app
```

In Supabase, also go to Authentication, then URL Configuration:

1. Set Site URL to your Vercel URL.
2. Add your Vercel URL to Redirect URLs.
3. Save.

## Step 2: Make Login Invite-Only

In Supabase:

1. Go to Authentication, then Providers.
2. Open Email.
3. Keep email/password sign-in enabled.
4. Turn off public self-signups if the setting is available in your Supabase project.
5. Create or invite users manually from Authentication, then Users.

The LADC Compass app does not show a Create Account button. Only invited users should receive working accounts. The database policies in `supabase-schema.sql` keep each signed-in user's saved entries separate.

## Step 3: Deploy the Website

### Easiest: Vercel

Vercel is the simplest fit for a Next.js app.

1. Put this project in a GitHub repository.
2. Go to Vercel and create a new project from that repository.
3. Use the default build command: `npm run build`
4. Add the two Supabase environment variables.
5. Add `NEXT_PUBLIC_SITE_URL` with your Vercel URL.
6. Vercel will publish the site and give you a URL.

### Also Good: Netlify

This project is configured for static export.

1. Add the two Supabase environment variables.
2. Run `npm run cloud-build`
3. Upload the generated `out` folder to Netlify, or connect the GitHub repo.
4. Netlify will give you a public URL.

### Simple Single-File Option

You can also host `LADCCompass.html` by uploading it to a static file host. This is the simplest version, but the Next.js version is cleaner for a real cloud site.

## What Syncs Now

- Treatment Plan Lab entries
- Group Planner entries
- Internship Tracker hours
- Supervision Notebook entries
- Documentation Upload records and pasted de-identified text

## Future Upgrade

If you later want actual binary PDF/DOCX storage and extraction, add Supabase Storage and server-side parsing. For now, the safest workflow is to save upload records and paste de-identified text for analysis.
