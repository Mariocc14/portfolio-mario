import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { projects, type ProjectDetail } from "./projects";
import { captureEvent } from "./posthog";

const DOC_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

export default function App() {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
    <div className={styles.page} data-scroll-root>
      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <a href="/" className={styles.navIdentity}>
          <span className={styles.navName}>Mario Calvo</span>
          <span className={styles.navRole}>CRM &amp; Lifecycle</span>
        </a>
        <div className={styles.navPill}>
          <a href="/" className={styles.navPillActive}>Work</a>
          <a href="/info">Info</a>
          <a href="/resources">Resources</a>
        </div>
        <div className={styles.navSocials}>
          <a
            href="https://www.linkedin.com/in/mariocalvocastillo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span className={styles.tinyArrow}>↗</span>
          </a>
          <a href="mailto:mariocalvocst@gmail.com" data-analytics-name="Contactar por email - Hero">
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
                CRM &amp; Lifecycle Consultant. Based in Spain.
                <span className={styles.heroSubMuted}>
                  Currently working at Magnific. Formerly at Fever and Freepik.
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
            <span>&nbsp;</span>
            <div className={styles.footerLinks}>
              <a href="mailto:mariocalvocst@gmail.com" data-analytics-name="Contactar por email - Footer">
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

function ProjectCard({ project }: { project: ProjectDetail }) {
  if (project.visualKind === "lifecycle" && project.phases) {
    return <LifecycleProjectCard project={project} />;
  }

  // Regular card with mockups
  const mockups =
    project.gallery && project.gallery.length > 0
      ? project.gallery.slice(0, 3)
      : [{ src: project.thumb, alt: project.title, dark: project.thumbDark }];

  return (
    <a className={styles.project} href={`/${project.slug}`} onClick={() => captureEvent('project_opened', { project_slug: project.slug, project_title: project.title })}>
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
    </a>
  );
}

function LifecycleProjectCard({ project }: { project: ProjectDetail }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgressState] = useState(0);

  const setProgress = useCallback((updater: (p: number) => number) => {
    const next = Math.max(0, Math.min(1, updater(progressRef.current)));
    if (next !== progressRef.current) {
      progressRef.current = next;
      setProgressState(next);
    }
  }, []);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const root = card.closest<HTMLElement>("[data-scroll-root]");
    if (!root) return;

    // True when the card is roughly centered in the viewport (within 80px of midline)
    const isCentered = () => {
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const cardCenter = rect.top + rect.height / 2;
      return Math.abs(cardCenter - vh / 2) < 80;
    };

    // Wheel hijack — only intervene when card is centered AND there's room
    // to advance/retreat in the user's scroll direction.
    const onWheel = (e: WheelEvent) => {
      if (!isCentered()) return;
      const p = progressRef.current;
      if (e.deltaY > 0 && p < 1) {
        e.preventDefault();
        e.stopPropagation();
        setProgress((curr) => curr + e.deltaY / 1500);
      } else if (e.deltaY < 0 && p > 0) {
        e.preventDefault();
        e.stopPropagation();
        setProgress((curr) => curr + e.deltaY / 1500);
      }
    };

    // Touch hijack
    let lastTouchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (!isCentered()) return;
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (lastTouchY === null || !isCentered()) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;
      const p = progressRef.current;
      if ((deltaY > 0 && p < 1) || (deltaY < 0 && p > 0)) {
        e.preventDefault();
        const vh = window.innerHeight;
        setProgress((curr) => curr + deltaY / vh);
        lastTouchY = currentY;
      } else {
        // Reached boundary — release touch tracking so normal scroll resumes
        lastTouchY = null;
      }
    };
    const onTouchEnd = () => {
      lastTouchY = null;
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: false });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd);

    return () => {
      root.removeEventListener("wheel", onWheel);
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
    };
  }, [setProgress]);

  const phases = project.phases!;
  const N = phases.length;
  const currentIdx = Math.min(N - 1, Math.floor(progress * N));
  const phase = phases[currentIdx];

  return (
    <a
      ref={ref}
      className={`${styles.project} ${styles.projectLifecycle}`}
      href={`/${project.slug}`}
    >
      <div className={styles.lifecycleSticky}>
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
        <div className={styles.lifeScroll}>
          <div className={styles.lifeScrollHeader} key={currentIdx}>
            <span className={styles.lifeScrollNum}>
              Phase {phase.num} of {String(N).padStart(2, "0")}
            </span>
            <h4 className={styles.lifeScrollTitle}>{phase.title}</h4>
            <p className={styles.lifeScrollDesc}>{phase.desc}</p>
          </div>

          <div className={styles.lifeScrollTimeline}>
            <div className={styles.lifeScrollTrack}>
              <div
                className={styles.lifeScrollFill}
                style={{ width: `${progress * 100}%` }}
              />
              {phases.map((p, i) => {
                const pos = ((i + 0.5) / N) * 100;
                const isActive = progress >= (i + 0.5) / N;
                return (
                  <div
                    key={p.num}
                    className={`${styles.lifeScrollPoint} ${
                      isActive ? styles.lifeScrollPointActive : ""
                    }`}
                    style={{ left: `${pos}%` }}
                    aria-hidden="true"
                  >
                    <span className={styles.lifeScrollPointDot} />
                  </div>
                );
              })}
            </div>
            <div className={styles.lifeScrollLabels}>
              {phases.map((p, i) => {
                const pos = ((i + 0.5) / N) * 100;
                const isActive = progress >= (i + 0.5) / N;
                return (
                  <div
                    key={p.num}
                    className={`${styles.lifeScrollLabel} ${
                      isActive ? styles.lifeScrollLabelActive : ""
                    }`}
                    style={{ left: `${pos}%` }}
                  >
                    <span className={styles.lifeScrollLabelNum}>{p.num}</span>
                    <span className={styles.lifeScrollLabelName}>{p.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
