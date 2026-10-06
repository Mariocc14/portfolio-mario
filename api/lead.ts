// Lead from the /resources download modal → Brevo list (BREVO_LIST_ID).
// Runs on the server so the Brevo API key never reaches the browser.

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const clip = (v: unknown, n = 200) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request): Promise<Response> {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  const email = clip(body?.email, 254).toLowerCase();
  const name = clip(body?.name, 120);
  const roleKind = clip(body?.roleKind, 40);
  const roleValue = clip(body?.roleValue, 80);
  const resource = clip(body?.resourceTitle, 200) || clip(body?.resourceSlug, 120);
  if (!EMAIL.test(email) || !name) return Response.json({ ok: false, error: "Invalid name or email" }, { status: 400 });

  const key = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!key || !listId) return Response.json({ ok: false, error: "Lead capture not configured" }, { status: 503 });

  const role = roleKind === "business_owner" ? `Business owner · ${roleValue}` : roleKind === "employee" ? `Employee · ${roleValue}` : roleValue;
  // updateEnabled: if the contact already exists it is added to the list and these fields are updated.
  const r = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ email, listIds: [listId], updateEnabled: true, attributes: { NOMBRE: name, ROL: role, RECURSO: resource } }),
  });
  if (r.status === 201 || r.status === 204) return Response.json({ ok: true });
  const err = (await r.json().catch(() => ({}))) as { code?: string };
  if (err.code === "duplicate_parameter") return Response.json({ ok: true });
  console.error("lead: brevo", r.status, err.code);
  return Response.json({ ok: false, error: "Could not save the lead" }, { status: 502 });
}
