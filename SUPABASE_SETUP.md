# Wiring the lead form to Supabase

The `/resources/<slug>` download modal collects `{ name, email, role, resourceSlug, resourceTitle }`. Right now the submit handler in `src/submitLead.ts` is a stub that just `console.log`s the payload. This file documents how to wire it up to a real Supabase backend so leads land in a queryable table you can plug into email tools, n8n, Zapier, or your own flow.

---

## 1. Create the project

1. Sign up at <https://supabase.com> (free tier is fine).
2. Create a new project. Pick the region closest to your users (Frankfurt or London for ES audiences).
3. Once it provisions, grab two values from **Settings → API**:
   - **Project URL** — `https://xxxxxxxx.supabase.co`
   - **Anon (public) API key** — long JWT starting with `eyJ...`

## 2. Create the `leads` table

In the Supabase dashboard, open **SQL Editor** and run:

```sql
create table public.leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text   not null,
  email        text   not null,
  role_kind    text   not null check (role_kind in ('business_owner', 'employee')),
  role_value   text   not null,
  resource_slug  text not null,
  resource_title text not null,
  user_agent   text,
  referrer     text
);

-- One row per (email, resource) so duplicates don't pile up.
create unique index leads_email_resource_unique
  on public.leads (lower(email), resource_slug);

-- Allow the public anon key to insert, but never read.
alter table public.leads enable row level security;

create policy "anyone can submit a lead"
  on public.leads for insert
  to anon
  with check (true);
```

That gives you a write-only table from the browser. Only authenticated users (you, in the dashboard) can read it.

## 3. Add env vars

Create `.env.local` in the project root (already gitignored by Vite):

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

On Vercel, add the same two variables in **Project → Settings → Environment Variables**.

## 4. Install the client and wire the handler

```bash
npm install @supabase/supabase-js
```

Replace the body of `src/submitLead.ts` (`submitLead` function) with:

```ts
import { createClient } from "@supabase/supabase-js";

const sb = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const role_kind = payload.role.kind;
  const role_value =
    payload.role.kind === "business_owner"
      ? payload.role.industry
      : payload.role.area;

  const { error } = await sb.from("leads").insert({
    name: payload.name,
    email: payload.email,
    role_kind,
    role_value,
    resource_slug: payload.resourceSlug,
    resource_title: payload.resourceTitle,
    user_agent: navigator.userAgent,
    referrer: document.referrer || null,
  });

  // Treat unique-violation as success — the user is just re-requesting the same PDF.
  if (error && error.code !== "23505") {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
```

That's it. Submissions now write to `public.leads` and the UI shows the success state.

## 5. Next steps (optional)

- **Email delivery of the PDF**: add a Supabase Edge Function triggered by an `INSERT` on `leads` that calls Resend / Postmark with the PDF attached.
- **Notion mirror**: webhook from the Edge Function to a Notion DB so you can pipe leads into your usual workspace.
- **Welcome series**: export to Brevo / MailerLite / your ESP via their API; trigger an automation per `resource_slug`.
- **CRM enrichment**: pipe to Clay or Apollo via webhook to enrich `role_value` with company size / industry data before contact.
