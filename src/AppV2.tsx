import { useEffect, useRef, useState } from "react";
import styles from "./AppV2.module.css";
import { projects, type ProjectDetail } from "./v2-projects";

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
  if (project.visualKind === "lifecycle" && project.phases) {
    return <LifecycleProjectCard project={project} />;
  }

  // Regular card with mockups
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const range = rect.height - vh;
      if (range <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.max(0, -rect.top);
      const p = Math.min(1, scrolled / range);
      setProgress(p);
    };
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const phases = project.phases!;
  const N = phases.length;
  const currentIdx = Math.min(N - 1, Math.floor(progress * N));
  const phase = phases[currentIdx];

  return (
    <a
      ref={ref}
      className={`${styles.project} ${styles.projectLifecycle}`}
      href={`/v2/${project.slug}`}
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
