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
