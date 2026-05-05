import { useEffect, useState } from "react";
import styles from "./AppV2.module.css";
import { projects, type Phase, type ProjectDetail } from "./v2-projects";

const DOC_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

export default function AppV2() {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
    <div className={styles.page}>
      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <a href="/v2" className={styles.navIdentity}>
          <span className={styles.navName}>Mario Calvo</span>
          <span className={styles.navRole}>CRM &amp; Lifecycle</span>
        </a>
        <div className={styles.navPill}>
          <a href="#work" className={styles.navPillActive}>Work</a>
          <a href="#info">Info</a>
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
      </nav>

      <main className={styles.main} id="top">
        {/* ============ HERO ============ */}
        <section className={styles.hero}>
          <div className={styles.heroWindow}>
            <div className={styles.heroChrome}>
              <span className={`${styles.heroDot} ${styles.heroDotR}`} />
              <span className={`${styles.heroDot} ${styles.heroDotY}`} />
              <span className={`${styles.heroDot} ${styles.heroDotG}`} />
              <span className={styles.heroPlus}>+</span>
            </div>
            <div className={styles.heroBody}>
              <h1 className={styles.heroHeadline}>
                I build systems, journeys &amp; <em>automation.</em>
              </h1>
              <p className={styles.heroSub}>
                CRM &amp; Lifecycle Consultant. Based in Madrid.
                <span className={styles.heroSubMuted}>
                  Worked across Fever, Candlelight, Freepik and Magnific.
                </span>
              </p>
              <span className={styles.heroScroll} aria-hidden="true">↓</span>
            </div>
          </div>
        </section>

        {/* ============ WORK ============ */}
        <section id="work" className={styles.work}>
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </section>

        {/* ============ FOOTER ============ */}
        <footer id="info" className={styles.footer}>
          <div className={styles.footerTop}>
            <p className={styles.footerNote}>
              Made with <span className={styles.heart}>♥</span> between Madrid commutes
              and AMPscript queries — and the occasional Bridgerton ticket.
            </p>
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
            <span>© {new Date().getFullYear()} Mario Calvo</span>
            <span>v2 · Built with React + Vite</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectDetail }) {
  // Show up to 3 mockups from the gallery (or fall back to the thumb)
  const mockups =
    project.gallery && project.gallery.length > 0
      ? project.gallery.slice(0, 3)
      : [{ src: project.thumb, alt: project.title, dark: project.thumbDark }];

  return (
    <a className={styles.project} href={`/v2/${project.slug}`}>
      <div className={styles.projectGlow} aria-hidden="true" />
      <div className={styles.projectHead}>
        <div className={styles.projectTitleBlock}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectMeta}>
            <strong>
              {project.company}, {project.year}
            </strong>{" "}
            — {project.shortDesc}
          </p>
        </div>
        <span className={styles.projectArrow} aria-hidden="true">
          →
        </span>
      </div>
      {project.visualKind === "lifecycle" && project.phases ? (
        <LifecycleCarouselV2 phases={project.phases} />
      ) : (
        <div className={styles.projectMockup} data-count={mockups.length}>
          {mockups.map((m, i) => (
            <div
              key={`${m.src}-${i}`}
              className={`${styles.emailFrame} ${m.dark ? styles.emailFrameDark : ""}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={styles.emailFrameHeader}>
                <span className={`${styles.emailDot} ${styles.emailDotR}`} />
                <span className={`${styles.emailDot} ${styles.emailDotY}`} />
                <span className={`${styles.emailDot} ${styles.emailDotG}`} />
                <span className={styles.emailMeta}>
                  {project.company} · {project.year}
                </span>
              </div>
              <img
                src={m.src}
                alt={m.alt}
                className={styles.emailImg}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </a>
  );
}

function LifecycleCarouselV2({ phases }: { phases: Phase[] }) {
  const [index, setIndex] = useState(0);
  const phase = phases[index];
  const total = phases.length;

  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={styles.lifecycle} onClick={stop}>
      <div className={styles.lifecycleCard}>
        <div className={styles.lifecyclePhase}>
          <span className={styles.lifecycleDot} />
          PHASE {phase.num} / {String(total).padStart(2, "0")}
        </div>
        <h4 className={styles.lifecycleTitle}>{phase.title}</h4>
        <p className={styles.lifecycleDesc}>{phase.desc}</p>
        <div className={styles.lifecycleChannels}>
          {phase.channels.map((ch) => (
            <span key={ch} className={styles.lifecycleChannel}>
              {ch}
            </span>
          ))}
        </div>
        <div className={styles.lifecycleSample}>
          <span className={styles.lifecycleSampleLabel}>{phase.sample.label}</span>
          <span className={styles.lifecycleSampleText}>{phase.sample.text}</span>
        </div>
        <div className={styles.lifecycleProgress}>
          {phases.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex(i);
              }}
              className={`${styles.lifecycleProgressBar} ${
                i === index ? styles.lifecycleProgressBarActive : ""
              } ${i < index ? styles.lifecycleProgressBarDone : ""}`}
              aria-label={`Phase ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className={styles.lifecycleControls}>
        <span className={styles.lifecycleCounter}>
          {phase.num} <span className={styles.lifecycleCounterMuted}>/ {String(total).padStart(2, "0")}</span>
        </span>
        <div className={styles.lifecycleArrows}>
          <button
            type="button"
            className={styles.lifecycleArrow}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIndex((i) => Math.max(0, i - 1));
            }}
            disabled={index === 0}
            aria-label="Previous phase"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.lifecycleArrow}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIndex((i) => Math.min(total - 1, i + 1));
            }}
            disabled={index === total - 1}
            aria-label="Next phase"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
