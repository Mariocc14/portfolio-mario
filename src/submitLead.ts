// Lead submit handler — writes to Supabase `public.leads`.
//
// The table is insert-only from the browser via the anon key. Reads
// happen in the Supabase dashboard (or server-side with the service
// role key). See SUPABASE_SETUP.md for the SQL and policies.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

const sb =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      })
    : null;

export type LeadRole =
  | { kind: "business_owner"; industry: string }
  | { kind: "employee"; area: string };

export type LeadPayload = {
  name: string;
  email: string;
  role: LeadRole;
  resourceSlug: string;
  resourceTitle: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!sb) {
    // No Supabase env vars at build time — fall back to the stub so the
    // UI is still usable in local dev / preview without keys.
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn("[lead submit] Supabase env not configured — using stub", payload);
    }
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true };
  }

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
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : null,
    referrer:
      typeof document !== "undefined" ? document.referrer || null : null,
  });

  // 23505 = unique_violation. The user already requested this resource
  // with the same email — treat as success so they still get the UX.
  if (error && error.code !== "23505") {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/* ============ Form options (UI uses these) ============ */

export const BUSINESS_OWNER_INDUSTRIES = [
  { value: "saas", label: "SaaS / Software" },
  { value: "ecommerce", label: "eCommerce / DTC" },
  { value: "marketplace", label: "Marketplace" },
  { value: "live-experiences", label: "Live experiences / Events" },
  { value: "tourism", label: "Tourism / Hospitality" },
  { value: "education", label: "Education" },
  { value: "media", label: "Media / Content" },
  { value: "other", label: "Other" },
] as const;

export const EMPLOYEE_AREAS = [
  { value: "crm", label: "CRM" },
  { value: "lifecycle", label: "Lifecycle / Email marketing" },
  { value: "marketing", label: "Marketing (general)" },
  { value: "product", label: "Product" },
  { value: "growth", label: "Growth" },
  { value: "engineering", label: "Engineering" },
  { value: "founder", label: "Founder / C-level" },
  { value: "other", label: "Other" },
] as const;
