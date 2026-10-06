# Lead capture — Brevo

The `/resources/<slug>` download modal sends each lead to `api/lead.ts`, a Vercel function that adds the
contact to a Brevo list. The Brevo API key only lives on the server.

- **Brevo list:** «Portfolio · recursos» (id 4)
- **Attributes:** `NOMBRE` (name), `ROL` (e.g. "Business owner · saas"), `RECURSO` (resource title)
- **Vercel env (production and preview):** `BREVO_API_KEY`, `BREVO_LIST_ID=4`

If the contact already exists in Brevo (for example, in the Remite waitlist), it is added to this list and
those three fields are updated; nothing else on the contact changes.

Until 6 October 2026 leads went to a Supabase table (`public.leads`, project «Portfolio Mario»). It never
received a lead and was retired.
