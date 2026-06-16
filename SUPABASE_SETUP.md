# Lead capture — Supabase backend

The `/resources/<slug>` download modal writes leads to a Supabase Postgres table called `public.leads`. The frontend uses the publishable (anon) key and submissions are validated by an RLS policy. Reads are dashboard-only.

This file documents what's already wired up so you can recreate it or audit it later.

---

## Project

- **Name:** Portfolio Mario
- **Project ref:** `svqufucizwozcnokskft`
- **API URL:** `https://svqufucizwozcnokskft.supabase.co`
- **Region:** `eu-central-1`

## Table

```sql
create table public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  name            text not null,
  email           text not null,
  role_kind       text not null check (role_kind in ('business_owner', 'employee')),
  role_value      text not null,
  resource_slug   text not null,
  resource_title  text not null,
  user_agent      text,
  referrer        text
);

create unique index leads_email_resource_unique
  on public.leads (lower(email), resource_slug);
```

The unique index dedupes re-submissions of the same `(email, resource)` pair so a user clicking download twice doesn't pile up rows.

## RLS

The table has RLS enabled. The only allowed operation from the browser is `INSERT`, and only with valid fields. Reads must go through the dashboard or a server-side service-role client.

```sql
alter table public.leads enable row level security;

create policy "anon can insert valid leads"
  on public.leads for insert to anon
  with check (
    length(trim(name)) between 2 and 120
    and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'
    and length(email) <= 254
    and length(trim(role_value)) between 1 and 60
    and length(trim(resource_slug)) between 1 and 80
    and length(trim(resource_title)) between 1 and 200
  );
```

The same policy exists for the `authenticated` role.

## Env vars

`.env.local` (gitignored) holds the Vite-exposed credentials:

```
VITE_SUPABASE_URL=https://svqufucizwozcnokskft.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_GWfhMetBTAV6TAiVGfnUBw_OMYebbOx
```

For Vercel, add the same two variables in **Project → Settings → Environment Variables** (Production + Preview + Development environments).

## Frontend wiring

`src/submitLead.ts` builds a Supabase client and inserts the lead. If the env vars are missing (e.g. local dev without `.env.local`), it falls back to a stub that just resolves so the UI still works.

The handler treats unique-violation (Postgres `23505`) as success: the user already requested this resource with the same email, so the UX shows the confirmation anyway.

## Where the leads live

Open the Supabase dashboard → **Table Editor → leads**. From there you can sort, filter, search, export to CSV, or wire downstream automations:

- **Database Webhooks** (Database → Webhooks) — POST every new row to an n8n / Make / Zapier flow, your ESP, or your own endpoint.
- **Edge Functions** — trigger via `INSERT` to send the PDF with Resend / Postmark, mirror to Notion, push to a CRM, etc.
- **Service role** — for any server-side script that needs to read leads, use the service role key (Settings → API).

## Next steps (when you have content)

- Add the actual PDFs to your hosting (Supabase Storage bucket works well; or just `public/` if they're small) and have the Edge Function attach them on insert.
- Pipe `(email, resource_slug)` into the welcome series of your ESP per resource so each download triggers a related nurture flow.
- Add a hidden `utm_source` / `utm_campaign` column if you start running paid acquisition for specific resources.
