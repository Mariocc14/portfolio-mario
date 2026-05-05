import { useEffect } from "react";
import styles from "./AppV2.module.css";

const DOC_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

type Project = {
  num: string;
  title: string;
  company: string;
  year: string;
  description: string;
  thumb: string;
  thumbDark?: boolean; // dark email frame variant
  href?: string;
};

const work: Project[] = [
  {
    num: "01",
    title: "Lifecycle Automation System",
    company: "Fever",
    year: "'23",
    description:
      "Reusable SFMC journeys, AMPscript dynamic content and SQL-driven audiences — cutting ~50% of manual campaign work.",
    thumb: "/work-samples/06-onboarding-email.png",
  },
  {
    num: "02",
    title: "Premium Live Experiences",
    company: "Fever Originals",
    year: "'23",
    description:
      "Lifecycle communications for branded live events — waitlist, pre-sale, launch, sold-out and FOMO orchestrated end to end.",
    thumb: "/work-samples/01-event-cabaret.png",
    thumbDark: true,
  },
  {
    num: "03",
    title: "Purchase Confirmation Redesign",
    company: "Fever",
    year: "'24",
    description:
      "Transactional emails turned into product surfaces — flexible booking, Apple Wallet, referrals and cross-sell entry points.",
    thumb: "/work-samples/08-purchase-candlelight.png",
  },
  {
    num: "04",
    title: "Tourism Lifecycle Strategy",
    company: "Fever",
    year: "'24",
    description:
      "Lifecycle built from scratch for a new tourism vertical. Pre-trip, in-trip and post-trip stages with re-purchase moments along the way.",
    thumb: "/work-samples/13-reactivation-bridgerton.png",
    thumbDark: true,
  },
  {
    num: "05",
    title: "In-app Content Cards",
    company: "Magnific",
    year: "'25",
    description:
      "Always-on owned channel inside the app via Braze SDK. Same SQL + SFMC segmentation as email, modular templates, editorial calendar synced.",
    thumb: "/magnific/notifications-panel.png",
    thumbDark: true,
  },
];

export default function AppV2() {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
    <div className={styles.page}>
      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <a href="#top" className={styles.navIdentity}>
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
          {work.map((p) => (
            <ProjectCard key={p.num} project={p} />
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

function ProjectCard({ project }: { project: Project }) {
  const Tag = project.href ? "a" : "div";
  const tagProps = project.href
    ? { href: project.href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  const meta = `${project.company}, ${project.year} — ${project.description}`;
  return (
    <Tag className={styles.project} {...tagProps}>
      <div className={styles.projectHead}>
        <div className={styles.projectTitleBlock}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectMeta}>
            <strong>
              {project.company}, {project.year}
            </strong>{" "}
            — {project.description}
          </p>
          <span className={styles.srOnly}>{meta}</span>
        </div>
        <span className={styles.projectArrow} aria-hidden="true">
          →
        </span>
      </div>
      <div className={styles.projectMockup}>
        <div
          className={`${styles.emailFrame} ${
            project.thumbDark ? styles.emailFrameDark : ""
          }`}
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
            src={project.thumb}
            alt={`${project.title} mockup`}
            className={styles.emailImg}
            loading="lazy"
          />
        </div>
      </div>
    </Tag>
  );
}
