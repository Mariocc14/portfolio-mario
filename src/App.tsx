import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import styles from "./App.module.css";
import { projects, type ProjectDetail } from "./projects";
import { spotlight } from "./spotlight";
import { captureEvent } from "./posthog";

const DOC_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

const HEADLINE_WORDS = ["I", "build", "systems,", "journeys", "&"];

/* Reveals any element carrying the `reveal` class as it scrolls into view. */
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(`.${styles.reveal}`)
    );
    if (els.length === 0) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      els.forEach((el) => el.classList.add(styles.revealVisible));
      return;
    }

    // Opt in to the hidden start state only now that we know the observer will run.
    document.documentElement.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealVisible);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    // Safety net: if nothing has revealed shortly after mount — a zero-height viewport, a
    // container the observer cannot measure — show everything rather than leave a blank page.
    const failsafe = window.setTimeout(() => {
      const stillHidden = els.filter((el) => !el.classList.contains(styles.revealVisible));
      if (stillHidden.length === els.length) {
        document.documentElement.classList.remove("js-reveal");
      }
    }, 1200);

    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);
}

export default function App() {
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

  useScrollReveal();

  return (
    <div className={styles.page}>
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
        <a href="/" className={styles.mobileMenuLinkActive}>Work</a>
        <a href="/info" className={styles.mobileMenuLink}>Info</a>
        <a href="/resources" className={styles.mobileMenuLink}>Resources</a>
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

      <main className={styles.main} id="top">
        {/* ============ HERO ============ */}
        <section className={styles.hero}>
          <div className={`${styles.heroWindow} spotlight`} style={{ "--spot-size": "560px", "--spot-strength": "0.10" } as React.CSSProperties} {...spotlight}>
            <div className={styles.heroChrome}>
              <span className={`${styles.heroDot} ${styles.heroDotR}`} />
              <span className={`${styles.heroDot} ${styles.heroDotY}`} />
              <span className={`${styles.heroDot} ${styles.heroDotG}`} />
              <span className={styles.heroPlus}>+</span>
            </div>
            <div className={styles.heroBody}>
              <h1 className={styles.heroHeadline}>
                {HEADLINE_WORDS.map((word, i) => (
                  <span
                    key={word}
                    className={styles.heroWord}
                    style={{ animationDelay: `${0.15 + i * 0.09}s` }}
                  >
                    {word}{" "}
                  </span>
                ))}
                <span
                  className={styles.heroWord}
                  style={{ animationDelay: `${0.15 + HEADLINE_WORDS.length * 0.09}s` }}
                >
                  <em>automation.</em>
                </span>
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

  const handlePointerMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    // Tilt: map cursor offset from center to a few degrees
    el.style.setProperty("--tiltY", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--tiltX", `${(0.5 - py) * 6}deg`);
  };

  const handlePointerLeave = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--tiltX", "0deg");
    el.style.setProperty("--tiltY", "0deg");
  };

  return (
    <a
      className={`${styles.project} ${styles.reveal}`}
      href={`/${project.slug}`}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      onClick={() =>
        captureEvent("project_opened", {
          project_slug: project.slug,
          project_title: project.title,
        })
      }
    >
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

    /* Progress comes from scroll position, not from hijacked events.
       The card is taller than the viewport and its inner panel is sticky, so scrolling
       scrubs through the phases while the page keeps moving normally. The previous version
       called preventDefault on wheel, touchstart and touchmove — which is what made this
       fight the user on a phone, and would now block the document scroll outright. */
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = card.getBoundingClientRect();
      const scrubbable = r.height - window.innerHeight;
      if (scrubbable <= 0) {
        // Card fits the viewport (small screens): show the phases without scrubbing.
        setProgress(() => 0);
        return;
      }
      setProgress(() => -r.top / scrubbable);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [setProgress]);

  const phases = project.phases!;
  const N = phases.length;
  const currentIdx = Math.min(N - 1, Math.floor(progress * N));
  const phase = phases[currentIdx];

  return (
    <a
      ref={ref}
      className={`${styles.project} ${styles.projectLifecycle} ${styles.reveal}`}
      href={`/${project.slug}`}
      style={{ "--phases": N } as React.CSSProperties}
      onClick={() =>
        captureEvent("project_opened", {
          project_slug: project.slug,
          project_title: project.title,
        })
      }
    >
      <div className={`${styles.lifecycleSticky} spotlight`} style={{ "--spot-size": "520px" } as React.CSSProperties} {...spotlight}>
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
          {project.flowLabel && (
            <span className={styles.lifeScrollFlow}>{project.flowLabel}</span>
          )}
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
