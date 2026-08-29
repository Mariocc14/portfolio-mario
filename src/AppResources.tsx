import { useEffect, useState } from "react";
import styles from "./AppResources.module.css";
import { resources } from "./resources";
import { spotlight } from "./spotlight";

const DOC_TITLE = "Resources — Mario Calvo";

export default function AppResources() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className={styles.page}>
      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <a href="/" className={styles.navIdentity}>
          <span className={styles.navName}>Mario Calvo</span>
          <span className={styles.navRole}>CRM &amp; Lifecycle</span>
        </a>
        <div className={styles.navPill}>
          <a href="/">Work</a>
          <a href="/info">Info</a>
          <a href="/resources" className={styles.navPillActive}>Resources</a>
        </div>
        <div className={styles.navSocials}>
          <a
            href="https://www.linkedin.com/in/mariocalvocastillo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span className={styles.tinyArrow}>↗</span>
          </a>
          <a href="mailto:mariocalvocst@gmail.com">
            Email <span className={styles.tinyArrow}>↗</span>
          </a>
        </div>
        <button
          type="button"
          className={styles.navToggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <a href="/" className={styles.mobileMenuLink}>Work</a>
        <a href="/info" className={styles.mobileMenuLink}>Info</a>
        <a href="/resources" className={styles.mobileMenuLinkActive}>Resources</a>
        <div className={styles.mobileMenuDivider} />
        <a
          href="https://www.linkedin.com/in/mariocalvocastillo/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileMenuSocial}
        >
          LinkedIn <span className={styles.tinyArrow}>↗</span>
        </a>
        <a
          href="mailto:mariocalvocst@gmail.com"
          className={styles.mobileMenuSocial}
        >
          Email <span className={styles.tinyArrow}>↗</span>
        </a>
      </div>

      <main className={styles.main}>
        {/* ============ HEADER ============ */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Resources</span>
          </div>
          <h1 className={styles.title}>
            Playbooks &amp; <em>guides</em>.
          </h1>
          <p className={styles.intro}>
            Practical notes from the trenches — deliverability, lifecycle
            automation, CRM × product integrations. Pick one, drop your email,
            and I'll send it over.
          </p>
        </header>

        {/* ============ LIST ============ */}
        <section className={styles.list}>
          {resources.map((r) => (
            <a
              key={r.slug}
              href={`/resources/${r.slug}`}
              className={`${styles.card} spotlight`}
              {...spotlight}
            >
              <div className={styles.cardHead}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardCategory}>{r.category}</span>
                  <span className={styles.cardDot}>·</span>
                  {r.format && (
                    <>
                      <span>{r.format}</span>
                      <span className={styles.cardDot}>·</span>
                    </>
                  )}
                  <span>{r.readingTime} read</span>
                  <span className={styles.cardLang}>{r.language.toUpperCase()}</span>
                </div>
              </div>
              <h2 className={styles.cardTitle}>{r.title}</h2>
              <p className={styles.cardSubtitle}>{r.subtitle}</p>
              <span className={styles.cardCta}>
                {r.downloadHref ? "Read & download" : "Read"}{" "}
                <span className={styles.cardArrow}>→</span>
              </span>
            </a>
          ))}
        </section>

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <span>&nbsp;</span>
            <div className={styles.footerLinks}>
              <a href="mailto:mariocalvocst@gmail.com">
                Email <span className={styles.tinyArrow}>↗</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mariocalvocastillo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span className={styles.tinyArrow}>↗</span>
              </a>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <div className={styles.footerSig}>
              <span>© {new Date().getFullYear()} Mario Calvo</span>
              <span className={styles.footerNoteSmall}>
                Made with <span className={styles.heart}>♥</span> and the collaboration of my cat buddy.
              </span>
            </div>
            <span>Built with React + Vite</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
