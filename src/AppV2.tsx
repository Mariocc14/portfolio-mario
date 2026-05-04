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
  href?: string;
};

const work: Project[] = [
  {
    num: "01",
    title: "Lifecycle Automation System",
    company: "Fever",
    year: "'23",
    description:
      "Reusable SFMC journeys, dynamic content powered by AMPscript, and SQL-driven audiences — cutting ~50% of manual campaign work.",
    thumb: "/work-samples/06-onboarding-email.png",
  },
  {
    num: "02",
    title: "Premium Live Experiences",
    company: "Fever",
    year: "'23",
    description:
      "Lifecycle communications designed for branded live events. Waitlist, pre-sale, launch, sold-out and FOMO phases — orchestrated as one.",
    thumb: "/work-samples/01-event-cabaret.png",
  },
  {
    num: "03",
    title: "Purchase Confirmation Redesign",
    company: "Fever",
    year: "'24",
    description:
      "Transactional emails turned into product surfaces — flexible booking, Apple Wallet, referrals, and cross-sell entry points.",
    thumb: "/work-samples/08-purchase-candlelight.png",
  },
  {
    num: "04",
    title: "Tourism Lifecycle Strategy",
    company: "Fever",
    year: "'24",
    description:
      "Lifecycle built from scratch for a new tourism vertical — pre-trip, in-trip and post-trip stages with re-purchase moments along the way.",
    thumb: "/work-samples/13-reactivation-bridgerton.png",
  },
  {
    num: "05",
    title: "In-app Content Cards",
    company: "Magnific",
    year: "'25",
    description:
      "Always-on owned channel inside the app via Braze SDK. Same SQL + SFMC segmentation as email, modular templates, editorial calendar synced.",
    thumb: "/magnific/notifications-panel.png",
  },
];

const sideProjects: Project[] = [
  {
    num: "06",
    title: "Monkway",
    company: "Founder · Product · CRM",
    year: "'25",
    description:
      "A habits app I built end-to-end — concept, product, CRM and live service.",
    thumb: "/work-samples/11-loyalty-points.png",
    href: "https://monkway.app/",
  },
  {
    num: "07",
    title: "Sprint",
    company: "Co-founder · Product · CRM",
    year: "'25",
    description:
      "AI voice assistant for SMBs. ElevenLabs + Google Calendar, with a customer app and an internal CMS.",
    thumb: "/work-samples/12-newsletter-movies.png",
    href: "https://web-production-98b02b.up.railway.app/",
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
        <div className={styles.navInner}>
          <a href="#top" className={styles.navLogo}>
            <span className={styles.navLogoMark}>MC</span>
            <span>Mario Calvo</span>
          </a>
          <div className={styles.navLinks}>
            <a href="#work">Work</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main className={styles.main} id="top">
        {/* ============ HERO ============ */}
        <section className={styles.hero}>
          <div className={styles.avatarWrap}>
            <img
              src="/imagen_perfil/mario-avatar.png"
              alt="Mario Calvo"
              className={styles.avatar}
              loading="eager"
            />
          </div>
          <h1 className={styles.headline}>
            I build CRM systems, lifecycle journeys &amp; automation.
          </h1>
          <p className={styles.creds}>
            CRM &amp; Lifecycle Consultant. Based in Madrid. Currently freelance.
            <br />
            Worked across <span className={styles.credBold}>Fever</span>,{" "}
            <span className={styles.credBold}>Candlelight</span>,{" "}
            <span className={styles.credBold}>Fever Originals</span>,{" "}
            <span className={styles.credBold}>Freepik</span> and{" "}
            <span className={styles.credBold}>Magnific</span>.
          </p>
          <div className={styles.heroLinks}>
            <a href="#work" className={styles.heroLink}>
              Selected work <span className={styles.arrow}>→</span>
            </a>
            <a href="#contact" className={styles.heroLink}>
              Get in touch <span className={styles.arrow}>↗</span>
            </a>
          </div>
        </section>

        {/* ============ SELECTED WORK ============ */}
        <section id="work" className={styles.workSection}>
          <div className={styles.sectionLabelRow}>
            <span className={styles.sectionLine} />
            <span className={styles.sectionLabel}>Selected Work '23 — '25</span>
          </div>
          <div className={styles.workList}>
            {work.map((p) => (
              <ProjectCard key={p.num} project={p} />
            ))}
          </div>
        </section>

        {/* ============ SIDE PROJECTS ============ */}
        <section id="projects" className={styles.workSection}>
          <div className={styles.sectionLabelRow}>
            <span className={styles.sectionLine} />
            <span className={styles.sectionLabel}>Personal Projects '25</span>
          </div>
          <div className={styles.workList}>
            {sideProjects.map((p) => (
              <ProjectCard key={p.num} project={p} />
            ))}
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className={styles.contactSection}>
          <div className={styles.sectionLabelRow}>
            <span className={styles.sectionLine} />
            <span className={styles.sectionLabel}>Contact</span>
          </div>
          <h2 className={styles.contactHeadline}>
            Got a CRM program that needs to grow up?
          </h2>
          <p className={styles.contactSub}>
            I take on a small number of engagements each quarter — lifecycle audits,
            SFMC build-outs, automation migrations and hands-on CRM leadership.
          </p>
          <div className={styles.contactLinks}>
            <a className={styles.contactLink} href="mailto:mariocalvocst@gmail.com">
              <span className={styles.contactLinkLabel}>Email</span>
              <span className={styles.contactLinkValue}>mariocalvocst@gmail.com</span>
              <span className={styles.arrow}>→</span>
            </a>
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/mariocalvocastillo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.contactLinkLabel}>LinkedIn</span>
              <span className={styles.contactLinkValue}>/in/mariocalvocastillo</span>
              <span className={styles.arrow}>↗</span>
            </a>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer}>
          <p className={styles.footerNote}>
            Made with <span className={styles.footerHeart}>♥</span> between Madrid commutes and
            AMPscript queries — and the occasional Bridgerton ticket.
          </p>
          <div className={styles.footerBottom}>
            <span>© {new Date().getFullYear()} Mario Calvo</span>
            <span className={styles.footerCorner}>v2 · /v2</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const Tag = project.href ? "a" : "div";
  const tagProps = project.href
    ? { href: project.href, target: "_blank", rel: "noopener noreferrer" as const }
    : {};
  return (
    <Tag className={styles.card} {...tagProps}>
      <div className={styles.cardMeta}>
        <span className={styles.cardNum}>{project.num}</span>
        <span className={styles.cardCompany}>
          {project.company} {project.year}
        </span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>
      <div className={styles.cardThumb}>
        <img
          src={project.thumb}
          alt=""
          className={styles.cardImg}
          loading="lazy"
        />
        {project.href && (
          <span className={styles.cardThumbCorner}>
            <span className={styles.arrow}>↗</span>
          </span>
        )}
      </div>
    </Tag>
  );
}
