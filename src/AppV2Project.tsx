import { useEffect } from "react";
import styles from "./AppV2Project.module.css";
import { getProjectBySlug, getNeighbours } from "./v2-projects";

export default function AppV2Project({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Mario Calvo`;
    } else {
      document.title = "Project not found — Mario Calvo";
    }
  }, [project]);

  if (!project) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Project not found</h1>
          <a href="/v2">← Back to work</a>
        </div>
      </div>
    );
  }

  const { prev, next } = getNeighbours(slug);

  return (
    <div className={styles.page}>
      <a href="/v2" className={styles.back}>
        <span className={styles.backArrow}>←</span> Back
      </a>

      <main className={styles.main}>
        {/* ============ HEADER ============ */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowNum}>{project.num}</span>
            <span className={styles.eyebrowSep}>·</span>
            <span>
              {project.company}, {project.year}
            </span>
          </div>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.shortDesc}</p>
        </header>

        {/* ============ INFO GRID ============ */}
        <section className={styles.infoGrid}>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>My role</p>
            <p className={styles.infoBody}>{project.role}</p>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Tools</p>
            <p className={styles.infoBody}>{project.tools.join(", ")}</p>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Timeline</p>
            <p className={styles.infoBody}>{project.timeline}</p>
          </div>
          <div className={styles.infoBlockWide}>
            <p className={styles.infoLabel}>Overview</p>
            <p className={styles.infoBody}>{project.longDesc}</p>
          </div>
        </section>

        {/* ============ HIGHLIGHTS ============ */}
        <section className={styles.section}>
          <p className={styles.sectionLabel}>The challenge</p>
          <p className={styles.sectionBody}>{project.challenge}</p>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>The solution</p>
          <ul className={styles.bulletList}>
            {project.solution.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Outcome</p>
          <ul className={styles.bulletList}>
            {project.outcome.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        {/* ============ GALLERY ============ */}
        {project.galleryKind === "transactional" && project.transactionalEmails ? (
          <section className={styles.gallery}>
            <p className={styles.sectionLabel}>Transactional emails</p>
            <TransactionalEmails emails={project.transactionalEmails} />
          </section>
        ) : project.phases ? (
          <section className={styles.gallery}>
            <p className={styles.sectionLabel}>Channel mockups</p>
            <ChannelMockups emailImg={project.gallery[0]?.src ?? project.thumb} />
          </section>
        ) : (
          <section className={styles.gallery}>
            <p className={styles.sectionLabel}>Gallery</p>
            <div className={styles.galleryGrid}>
              {project.gallery.map((g, i) => (
                <figure
                  key={`${g.src}-${i}`}
                  className={`${styles.galleryItem} ${g.dark ? styles.galleryItemDark : ""}`}
                >
                  <img src={g.src} alt={g.alt} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ============ PREV / NEXT ============ */}
        <nav className={styles.pager} aria-label="Project navigation">
          {prev ? (
            <a className={styles.pagerLink} href={`/v2/${prev.slug}`}>
              <span className={styles.pagerDir}>← Previous</span>
              <span className={styles.pagerTitle}>{prev.title}</span>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a className={`${styles.pagerLink} ${styles.pagerLinkRight}`} href={`/v2/${next.slug}`}>
              <span className={styles.pagerDir}>Next →</span>
              <span className={styles.pagerTitle}>{next.title}</span>
            </a>
          ) : (
            <a className={`${styles.pagerLink} ${styles.pagerLinkRight}`} href="/v2">
              <span className={styles.pagerDir}>All work →</span>
              <span className={styles.pagerTitle}>Back to selected work</span>
            </a>
          )}
        </nav>

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer}>
          <p className={styles.footerNote}>
            Made with <span className={styles.heart}>♥</span> between Madrid commutes
            and AMPscript queries.
          </p>
          <span className={styles.footerCopy}>© {new Date().getFullYear()} Mario Calvo</span>
        </footer>
      </main>
    </div>
  );
}

/* ============ Channel mockups (email + push + whatsapp) ============ */
function ChannelMockups({ emailImg }: { emailImg: string }) {
  return (
    <div className={styles.mockups}>
      {/* Email — uses a real event email image inside browser-style chrome */}
      <article className={`${styles.mockup} ${styles.mockupEmail}`}>
        <div className={styles.mockupEmailChrome}>
          <span
            className={styles.mockupChromeDot}
            style={{ background: "#ff5f57" }}
          />
          <span
            className={styles.mockupChromeDot}
            style={{ background: "#febc2e" }}
          />
          <span
            className={styles.mockupChromeDot}
            style={{ background: "#28c840" }}
          />
          <span className={styles.mockupChromeMeta}>
            <img
              src="/fever-logo.png"
              alt="Fever"
              className={styles.mockupChromeLogo}
            />
            <span className={styles.mockupChromeSep}>·</span>
            Tickets are live
          </span>
        </div>
        <img
          src={emailImg}
          alt="Email mockup"
          className={styles.mockupEmailImg}
          loading="lazy"
        />
        <span className={styles.mockupChannelTag}>Email</span>
      </article>

      {/* Push — iOS-style notification card on a dark glass surface */}
      <article className={`${styles.mockup} ${styles.mockupPush}`}>
        <div className={styles.mockupPushTop}>
          <span className={styles.mockupPushIcon}>
            <img src="/fever-icon.png" alt="" />
          </span>
          <span className={styles.mockupPushApp}>FEVER</span>
          <span className={styles.mockupPushTime}>now</span>
        </div>
        <p className={styles.mockupPushTitle}>Tickets just dropped 🎟</p>
        <p className={styles.mockupPushBody}>
          Your waitlist link is open for the next 60 minutes. Pick your night
          before the rest.
        </p>
        <span className={styles.mockupChannelTag}>Push</span>
      </article>

      {/* WhatsApp — green-themed message bubble in a chat client frame */}
      <article className={`${styles.mockup} ${styles.mockupWa}`}>
        <div className={styles.mockupWaHeader}>
          <span className={styles.mockupWaAvatar}>
            <img src="/fever-icon.png" alt="" />
          </span>
          <div className={styles.mockupWaHeaderText}>
            <span className={styles.mockupWaName}>Fever</span>
            <span className={styles.mockupWaStatus}>online</span>
          </div>
        </div>
        <div className={styles.mockupWaBody}>
          <div className={styles.mockupWaBubble}>
            <p>Hey 👋</p>
            <p>
              Tickets for <strong>Candlelight in Madrid</strong> just went live.
              Want me to send the link?
            </p>
            <span className={styles.mockupWaTime}>14:23 ✓✓</span>
          </div>
        </div>
        <span className={styles.mockupChannelTag}>WhatsApp</span>
      </article>
    </div>
  );
}

/* ============ Transactional emails (4 email frames) ============ */
function TransactionalEmails({
  emails,
}: {
  emails: { src: string; label: string; subject: string }[];
}) {
  return (
    <div className={styles.txEmails}>
      {emails.map((email) => (
        <article key={email.src} className={styles.txEmail}>
          <div className={styles.txEmailChrome}>
            <span className={styles.mockupChromeDot} style={{ background: "#ff5f57" }} />
            <span className={styles.mockupChromeDot} style={{ background: "#febc2e" }} />
            <span className={styles.mockupChromeDot} style={{ background: "#28c840" }} />
            <span className={styles.txEmailMeta}>
              <img src="/fever-logo.png" alt="Fever" className={styles.mockupChromeLogo} />
              <span className={styles.mockupChromeSep}>·</span>
              {email.subject}
            </span>
          </div>
          <img
            src={email.src}
            alt={email.label}
            className={styles.txEmailImg}
            loading="lazy"
          />
          <span className={styles.txEmailLabel}>{email.label}</span>
        </article>
      ))}
    </div>
  );
}
