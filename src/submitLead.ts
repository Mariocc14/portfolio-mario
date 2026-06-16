// Lead submit handler — currently a stub.
//
// To wire up Supabase later, see SUPABASE_SETUP.md for the schema and
// auth setup, then replace the body of `submitLead` with something like:
//
//   import { createClient } from "@supabase/supabase-js";
//   const sb = createClient(
//     import.meta.env.VITE_SUPABASE_URL!,
//     import.meta.env.VITE_SUPABASE_ANON_KEY!
//   );
//   const { error } = await sb.from("leads").insert(payload);
//   return { ok: !error, error: error?.message };
//
// No other code needs to change — components call submitLead() and
// react to { ok, error } regardless of the backend.

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
  // STUB — replace with the Supabase (or other backend) call.
  // Logs the payload and waits 600ms so the UI can show its loading state.
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[lead submit — stub]", payload);
  }
  await new Promise((r) => setTimeout(r, 600));
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
