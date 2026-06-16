import { useEffect, useRef, useState } from "react";
import styles from "./LeadModal.module.css";
import {
  BUSINESS_OWNER_INDUSTRIES,
  EMPLOYEE_AREAS,
  submitLead,
  type LeadRole,
} from "./submitLead";
import type { Resource } from "./resources";

type Props = {
  resource: Resource;
  open: boolean;
  onClose: () => void;
};

type RoleKind = "business_owner" | "employee";

export default function LeadModal({ resource, open, onClose }: Props) {
  const firstInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roleKind, setRoleKind] = useState<RoleKind | null>(null);
  const [roleValue, setRoleValue] = useState("");

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Reset form when modal opens for a new resource
  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setRoleKind(null);
      setRoleValue("");
      setStatus("idle");
      setErrorMsg("");
      // Focus the first input after the modal renders
      setTimeout(() => firstInputRef.current?.focus(), 80);
    }
  }, [open]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit =
    name.trim().length >= 2 &&
    validEmail &&
    roleKind !== null &&
    roleValue.trim().length > 0 &&
    status !== "submitting";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || roleKind === null) return;

    setStatus("submitting");
    setErrorMsg("");

    const role: LeadRole =
      roleKind === "business_owner"
        ? { kind: "business_owner", industry: roleValue }
        : { kind: "employee", area: roleValue };

    const result = await submitLead({
      name: name.trim(),
      email: email.trim(),
      role,
      resourceSlug: resource.slug,
      resourceTitle: resource.title,
    });

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  };

  const options =
    roleKind === "business_owner"
      ? BUSINESS_OWNER_INDUSTRIES
      : roleKind === "employee"
        ? EMPLOYEE_AREAS
        : [];

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
    >
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {status === "success" ? (
          <div className={styles.success}>
            <span className={styles.successIcon}>✓</span>
            <h2 id="lead-modal-title" className={styles.title}>
              You're in.
            </h2>
            <p className={styles.body}>
              We'll send <strong>{resource.title}</strong> to{" "}
              <strong>{email}</strong> shortly. Check your inbox in a couple
              of minutes.
            </p>
            <button
              type="button"
              className={styles.submit}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <header className={styles.header}>
              <span className={styles.eyebrow}>Download</span>
              <h2 id="lead-modal-title" className={styles.title}>
                {resource.title}
              </h2>
              <p className={styles.body}>
                Tell me where to send it. I'll only use this to deliver the
                resource and the occasional related update.
              </p>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.field}>
                <span className={styles.label}>Name</span>
                <input
                  ref={firstInputRef}
                  type="text"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  autoComplete="name"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Email</span>
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                />
              </label>

              <fieldset className={styles.fieldset}>
                <legend className={styles.label}>I am a…</legend>
                <div className={styles.roleToggle}>
                  <button
                    type="button"
                    className={`${styles.roleBtn} ${roleKind === "business_owner" ? styles.roleBtnActive : ""}`}
                    onClick={() => {
                      setRoleKind("business_owner");
                      setRoleValue("");
                    }}
                  >
                    Business owner
                  </button>
                  <button
                    type="button"
                    className={`${styles.roleBtn} ${roleKind === "employee" ? styles.roleBtnActive : ""}`}
                    onClick={() => {
                      setRoleKind("employee");
                      setRoleValue("");
                    }}
                  >
                    Employee
                  </button>
                </div>
              </fieldset>

              {roleKind && (
                <label className={styles.field}>
                  <span className={styles.label}>
                    {roleKind === "business_owner" ? "Industry" : "Area"}
                  </span>
                  <select
                    className={styles.select}
                    value={roleValue}
                    onChange={(e) => setRoleValue(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Pick one…
                    </option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {status === "error" && (
                <p className={styles.error}>
                  {errorMsg || "Something went wrong. Try again."}
                </p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={!canSubmit}
              >
                {status === "submitting" ? "Sending…" : "Send me the PDF →"}
              </button>

              <p className={styles.footnote}>
                No spam. Unsubscribe in one click.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
