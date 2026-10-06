// Lead submit handler — sends the lead to /api/lead, which adds it to a Brevo list.
// The Brevo API key lives only on the server (Vercel env: BREVO_API_KEY, BREVO_LIST_ID).

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
  const roleValue = payload.role.kind === "business_owner" ? payload.role.industry : payload.role.area;
  try {
    const r = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        roleKind: payload.role.kind,
        roleValue,
        resourceSlug: payload.resourceSlug,
        resourceTitle: payload.resourceTitle,
      }),
    });
    const d = (await r.json().catch(() => null)) as SubmitResult | null;
    return d && d.ok ? { ok: true } : { ok: false, error: (d && !d.ok && d.error) || "Something went wrong. Try again." };
  } catch {
    return { ok: false, error: "Network error. Try again." };
  }
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
