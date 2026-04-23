import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./App.module.css";

const DOC_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

// Public assets from /public/work-samples (extracted from Notion portfolio)
const img = {
  cabaret: "/work-samples/01-event-cabaret.png",
  neon: "/work-samples/02-event-neon.png",
  jury: "/work-samples/03-event-jury.png",
  wcib: "/work-samples/04-event-wcib.png",
  ditd: "/work-samples/05-event-ditd.png",
  onboardingEmail: "/work-samples/06-onboarding-email.png",
  onboardingClub: "/work-samples/07-onboarding-club.png",
  purchase: "/work-samples/08-purchase-candlelight.png",
  reminder: "/work-samples/09-reminder-qr.png",
  churn: "/work-samples/10-churn-winback.png",
  loyalty: "/work-samples/11-loyalty-points.png",
  newsletter: "/work-samples/12-newsletter-movies.png",
  reactivation: "/work-samples/13-reactivation-bridgerton.png",
  giftcard: "/work-samples/14-giftcard.png",
};

const services = [
  {
    num: "01",
    title: "Lifecycle Strategy",
    body: "End-to-end journey design — from acquisition and onboarding to retention, reactivation and referral. Built around real user behavior, not channels.",
  },
  {
    num: "02",
    title: "CRM Automation",
    body: "Scalable SFMC systems with reusable journeys, dynamic content and modular campaign structures. Less manual work, more personalization.",
  },
  {
    num: "03",
    title: "Data Activation",
    body: "Audience segmentation via SQL and Automation Studio. Connect behavioral data to messaging that actually lands at the right moment.",
  },
  {
    num: "04",
    title: "Multichannel Orchestration",
    body: "Coordinated email, push and in-app programs that stay consistent across markets, products and verticals.",
  },
  {
    num: "05",
    title: "Product × CRM Integration",
    body: "Translate product features — flexible booking, wallet, referrals — into transactional flows that drive repeat purchase.",
  },
  {
    num: "06",
    title: "Campaign Optimization",
    body: "Testing frameworks, performance diagnostics and iteration loops that turn one-off wins into systems that scale.",
  },
];

// Stack with proficiency levels (1-5). 5 = Expert, 4 = Advanced, 3 = Proficient.
type StackItem = { name: string; level: 3 | 4 | 5 };
const stack: StackItem[] = [
  { name: "Salesforce Marketing Cloud", level: 5 },
  { name: "Journey Builder", level: 5 },
  { name: "Automation Studio", level: 5 },
  { name: "AMPscript", level: 5 },
  { name: "SQL", level: 4 },
  { name: "Content Builder", level: 5 },
  { name: "Braze", level: 4 },
  { name: "HTML / CSS (Email)", level: 4 },
  { name: "Git / GitHub", level: 3 },
  { name: "Figma", level: 3 },
  { name: "Jira & Confluence", level: 4 },
  { name: "Looker / GA4", level: 3 },
];

const levelLabel = (n: number) =>
  n >= 5 ? "Expert" : n >= 4 ? "Advanced" : "Proficient";

type Slide = { src: string; alt: string; meta?: string };

/* ============ Channel orchestration visual (hero right) ============ */
const channels: {
  key: string;
  name: string;
  badge: string;
  preview: string;
  iconClass: string;
  icon: ReactNode;
}[] = [
  {
    key: "email",
    name: "Email",
    badge: "SFMC · AMPscript",
    preview: "Mario, tonight's Candlelight is almost sold out →",
    iconClass: styles.channelIconEmail,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </svg>
    ),
  },
  {
    key: "push",
    name: "Push",
    badge: "Braze · Native",
    preview: "Your waitlist just opened · tap to secure seats",
    iconClass: styles.channelIconPush,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    ),
  },
  {
    key: "sms",
    name: "SMS",
    badge: "Transactional",
    preview: "Fever: your QR ticket for tonight →",
    iconClass: styles.channelIconSms,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    key: "wa",
    name: "WhatsApp",
    badge: "Reminders · HSM",
    preview: "Tu experiencia empieza en 2 h — detalles aquí",
    iconClass: styles.channelIconWa,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11.9 11.9 0 0 0 3.5 20.4L2 22l1.7-.4a11.9 11.9 0 0 0 16.8-18.1zM12 21.2a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-3 .8.8-2.9-.2-.3A9.2 9.2 0 1 1 12 21.2zm5.3-6.9-1.9-.6-.2.1c-.2.1-.4.3-.9.9l-.2.2a15.6 15.6 0 0 1-4.1-4l.3-.3a3 3 0 0 0 .7-1.1l-.1-.2-.7-1.7c-.2-.5-.4-.5-.6-.5H8.9a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2 5.2 5.2 0 0 0 1.1 2.8 11.7 11.7 0 0 0 4.8 4.3c2.2 1 2.9.9 3.5.8a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2z" />
      </svg>
    ),
  },
  {
    key: "app",
    name: "In-app",
    badge: "Personalized",
    preview: "New near you — based on your last 3 bookings",
    iconClass: styles.channelIconApp,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
];

function ChannelStack() {
  return (
    <aside className={styles.channels} aria-hidden="true">
      <div className={styles.channelsHeader}>
        <p className={styles.channelsTitle}>Lifecycle orchestration</p>
        <span className={styles.channelsLive}>Live</span>
      </div>
      <div className={styles.channelList}>
        {channels.map((c) => (
          <div key={c.key} className={styles.channelRow}>
            <span className={`${styles.channelIcon} ${c.iconClass}`}>{c.icon}</span>
            <div className={styles.channelBody}>
              <p className={styles.channelName}>
                {c.name}
                <span className={styles.channelBadge}>{c.badge}</span>
              </p>
              <p className={styles.channelPreview}>{c.preview}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.channelsFooter}>
        <span>5 channels · 1 system</span>
        <span>
          <strong>SFMC</strong> · Braze · SQL
        </span>
      </div>
    </aside>
  );
}

/* ============ Lightbox ============ */
function Lightbox({
  slides,
  index,
  onClose,
  onIndex,
}: {
  slides: Slide[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex(Math.min(slides.length - 1, index + 1));
      if (e.key === "ArrowLeft") onIndex(Math.max(0, index - 1));
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, slides.length, onClose, onIndex]);

  const slide = slides[index];
  if (!slide) return null;

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded campaign preview"
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.lightboxClose}
        onClick={onClose}
        aria-label="Close preview"
      >
        ✕
      </button>
      <div className={styles.lightboxImgWrap} onClick={(e) => e.stopPropagation()}>
        <img className={styles.lightboxImg} src={slide.src} alt={slide.alt} />
      </div>
      {slides.length > 1 && (
        <div className={styles.lightboxNav} onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            aria-label="Previous"
          >
            ←
          </button>
          <span className={styles.lightboxCount}>
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => onIndex(Math.min(slides.length - 1, index + 1))}
            disabled={index === slides.length - 1}
            aria-label="Next"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

/* ============ Carousel (with email-frame + lightbox) ============ */
function Carousel({
  slides,
  light = false,
  frameMeta = "email · campaign preview",
}: {
  slides: Slide[];
  light?: boolean;
  frameMeta?: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: track.clientWidth * clamped, behavior: "smooth" });
    setIndex(clamped);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index) setIndex(i);
  };

  return (
    <div className={`${styles.carousel} ${light ? styles.carouselLight : ""}`}>
      <div className={styles.carouselTrack} ref={trackRef} onScroll={onScroll}>
        {slides.map((s, i) => (
          <div key={i} className={styles.carouselSlide}>
            <button
              type="button"
              className={styles.emailFrame}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Expand preview: ${s.alt}`}
            >
              <div className={styles.emailFrameBar}>
                <span className={styles.emailFrameDots}>
                  <span />
                  <span />
                  <span />
                </span>
                <span className={styles.emailFrameMeta}>{s.meta ?? frameMeta}</span>
                <span className={styles.emailFrameZoom} aria-hidden="true">
                  ⤢
                </span>
              </div>
              <div className={styles.emailFrameBody}>
                <img src={s.src} alt={s.alt} loading="lazy" />
                <span className={styles.emailFrameFade} aria-hidden="true" />
              </div>
            </button>
          </div>
        ))}
      </div>
      {slides.length > 1 && (
        <div className={styles.carouselControls}>
          <div className={styles.carouselDots} role="tablist" aria-label="Campaign slides">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}`}
                className={`${styles.carouselDot} ${i === index ? styles.carouselDotActive : ""}`}
                onClick={() => scrollTo(i)}
              />
            ))}
            <span className={styles.carouselCount}>
              {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
          <div className={styles.carouselArrows}>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={() => scrollTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.carouselArrow}
              onClick={() => scrollTo(index + 1)}
              disabled={index === slides.length - 1}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      )}
      {lightboxIndex !== null && (
        <Lightbox
          slides={slides}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}

/* ============ Sticky scroll progress + back-to-top FAB ============ */
function StickyChrome() {
  const [progress, setProgress] = useState(0);
  const [fabVisible, setFabVisible] = useState(false);

  const onScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const p = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
    setProgress(p);
    setFabVisible(scrollTop > 600);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  return (
    <>
      <div className={styles.progress} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
      <a
        href="#top"
        className={`${styles.fab} ${fabVisible ? styles.fabVisible : ""}`}
        aria-label="Back to top"
      >
        <span className={styles.fabIcon}>↑</span>
        Back to top
      </a>
    </>
  );
}

export default function App() {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
    <div className={styles.page}>
      <StickyChrome />

      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href="#top" className={styles.logo}>
            <span className={styles.logoMark}>M</span>
            <span>Mario Calvo</span>
          </a>
          <div className={styles.navLinks}>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#about">About</a>
          </div>
          <a href="#contact" className={styles.navCta}>
            <span className={styles.navDot} />
            Available for projects
          </a>
        </div>
      </nav>

      <div className={styles.inner} id="top">
        {/* ============ HERO ============ */}
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroLeft}>
            <span className={styles.pill}>
              <span className={styles.pillDot} />
              CRM &amp; Lifecycle Consultant · Remote / Madrid
            </span>
            <h1 id="hero-heading" className={styles.headline}>
              Lifecycle systems that <em>scale</em> across markets, channels and products.
            </h1>
            <p className={styles.heroLede}>
              I’m <strong>Mario Calvo</strong> — a CRM specialist with 4+ years designing and
              automating lifecycle programs for fast-moving consumer brands. I turn fragmented
              campaigns into scalable systems across <strong>email, push and in-app</strong>,
              powered by SFMC, AMPscript and SQL.
            </p>
            <div className={styles.heroActions}>
              <a href="#work" className={`${styles.btn} ${styles.btnPrimary}`}>
                See case studies <span className={styles.arrow}>→</span>
              </a>
              <a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>
                Book a call
              </a>
            </div>
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Experience</p>
                <p className={styles.metaValue}>4+ years</p>
              </div>
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Markets</p>
                <p className={styles.metaValue}>60+ cities</p>
              </div>
              <div className={styles.metaItem}>
                <p className={styles.metaLabel}>Core stack</p>
                <p className={styles.metaValue}>SFMC · SQL · AMP</p>
              </div>
            </div>
          </div>

          <ChannelStack />
        </section>

        {/* ============ TRUSTED BY ============ */}
        <section className={styles.clients} aria-label="Experience">
          <p className={styles.clientsLabel}>Shipping CRM work across</p>
          <div className={styles.clientsRow}>
            <span className={styles.clientLogoBold}>fever</span>
            <span className={styles.clientLogo}>Candlelight</span>
            <span className={styles.clientLogo}>Fever Originals</span>
            <span className={styles.clientLogoBold}>Freepik</span>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className={styles.stats} aria-label="Impact">
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              ~<em>60%</em>
            </p>
            <p className={styles.statLabel}>Reduction in campaign setup time after lifecycle automation</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>50%+</em>
            </p>
            <p className={styles.statLabel}>Operational workload reduced via reusable SFMC journeys</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>60+</em>
            </p>
            <p className={styles.statLabel}>Cities activated with dynamic, city-aware content</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>7</em>
            </p>
            <p className={styles.statLabel}>CRM programs designed end-to-end, from brief to rollout</p>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services" className={styles.section} aria-labelledby="services-heading">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>What I do</span>
            <h2 id="services-heading" className={styles.sectionTitle}>
              CRM done like a <em>system</em>, not a campaign calendar.
            </h2>
            <p className={styles.sectionLede}>
              Six practices I combine on every engagement. The mix depends on where your CRM is
              today — and how fast you need to move.
            </p>
          </div>

          <div className={styles.services}>
            {services.map((s) => (
              <article key={s.num} className={styles.serviceCard}>
                <p className={styles.serviceNum}>{s.num} /</p>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceBody}>{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ============ CASE STUDIES ============ */}
        <section id="work" className={styles.section} aria-labelledby="work-heading">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Selected work</span>
            <h2 id="work-heading" className={styles.sectionTitle}>
              Seven programs, <em>one playbook</em> — from ad-hoc launches to fully automated
              lifecycles.
            </h2>
            <p className={styles.sectionLede}>
              Every case below reflects real CRM systems I designed, built or scaled — across
              live experiences, cinema, tourism and loyalty verticals.
            </p>
          </div>

          <div className={styles.cases}>
            {/* CASE 1 */}
            <article className={styles.caseCard}>
              <div className={styles.caseTop}>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>01</span> · Lifecycle design · SFMC
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Event Lifecycle Design &amp; Automation at Scale
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Challenge</p>
                      <p className={styles.caseText}>
                        Event communication was fragmented and heavily dependent on manual execution.
                        Scalability across cities was limited and consistency suffered, especially
                        during high-demand launches.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Waitlist acquisition and audience building</li>
                        <li>Pre-launch expectation campaigns</li>
                        <li>Launch communications and “open gates” activation</li>
                        <li>Date extensions and FOMO-driven re-engagement</li>
                      </ul>
                      <p className={styles.caseText} style={{ marginTop: "0.75rem" }}>
                        Later fully automated in Salesforce Marketing Cloud with dynamic templates
                        and reusable journey structures adapting to city, event and engagement.
                      </p>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>~60% faster campaign setup</span>
                    <span className={styles.impactPill}>Global rollout</span>
                    <span className={styles.impactPill}>Consistent UX</span>
                  </div>
                </div>
                <div className={`${styles.caseVisual} ${styles.bgMidnight}`}>
                  <Carousel
                    frameMeta="email · fever originals · launch"
                    slides={[
                      { src: img.cabaret, alt: "Cabaret — Fever Original launch campaign" },
                      { src: img.neon, alt: "Neon Brush — creative experience campaign" },
                      { src: img.jury, alt: "The Jury Experience — launch email" },
                      { src: img.ditd, alt: "Dining in the Dark — event campaign" },
                      { src: img.wcib, alt: "Launch campaign — multichannel execution" },
                    ]}
                  />
                </div>
              </div>
            </article>

            {/* CASE 2 */}
            <article className={styles.caseCard}>
              <div className={`${styles.caseTop} ${styles.caseTopReverse}`}>
                <div className={`${styles.caseVisual} ${styles.bgCoral}`}>
                  <Carousel
                    frameMeta="email · multichannel launch"
                    slides={[
                      { src: img.wcib, alt: "High-impact launch — email" },
                      { src: img.cabaret, alt: "Cabaret launch push-to-email coordination" },
                      { src: img.jury, alt: "Jury Experience — multichannel activation" },
                    ]}
                  />
                </div>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>02</span> · Ad-hoc · Multichannel
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Ad-hoc execution for high-impact launches
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Context</p>
                      <p className={styles.caseText}>
                        Large event launches required fast, coordinated communication across
                        multiple channels to maximize initial demand — often under tight deadlines
                        with many stakeholders.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Email, push and in-app coordinated under a single playbook</li>
                        <li>Messaging adapted to demand and availability in real time</li>
                        <li>Sequencing optimized across channels to avoid fatigue</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>Higher launch peaks</span>
                    <span className={styles.impactPill}>CRM × marketing alignment</span>
                  </div>
                </div>
              </div>
            </article>

            {/* CASE 3 */}
            <article className={styles.caseCard}>
              <div className={styles.caseTop}>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>03</span> · Automation · SFMC · AMPscript
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Full Lifecycle Automation System
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Challenge</p>
                      <p className={styles.caseText}>
                        Manual campaign execution became unsustainable as the number of events and
                        markets grew. Scaling without multiplying operational complexity was the
                        brief.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Reusable journeys designed and versioned in SFMC</li>
                        <li>Dynamic content powered by AMPscript</li>
                        <li>Audience segmentation via SQL + Automation Studio</li>
                        <li>Modular campaign structures adaptable across markets</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>50%+ less operational load</span>
                    <span className={styles.impactPill}>Faster market expansion</span>
                    <span className={styles.impactPill}>More personalization</span>
                  </div>
                </div>
                <div className={`${styles.caseVisual} ${styles.bgMidnight}`}>
                  <Carousel
                    frameMeta="email · lifecycle automation"
                    slides={[
                      { src: img.onboardingEmail, alt: "Onboarding — dynamic content across movies and events" },
                      { src: img.onboardingClub, alt: "Fever Club onboarding — loyalty integration" },
                      { src: img.newsletter, alt: "Automated cinema newsletter" },
                    ]}
                  />
                </div>
              </div>
            </article>

            {/* CASE 4 */}
            <article className={styles.caseCard}>
              <div className={`${styles.caseTop} ${styles.caseTopReverse}`}>
                <div className={`${styles.caseVisual} ${styles.bgCream}`}>
                  <Carousel
                    light
                    frameMeta="email · transactional · candlelight"
                    slides={[
                      { src: img.purchase, alt: "Candlelight — purchase confirmation redesign" },
                      { src: img.giftcard, alt: "Gift card confirmation redesign" },
                      { src: img.reminder, alt: "Reminder QR — event tickets" },
                      { src: img.onboardingClub, alt: "Fever Club onboarding — loyalty integration" },
                    ]}
                  />
                </div>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>04</span> · Transactional · Product × CRM
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Purchase Confirmation Redesign &amp; Product Integration
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Challenge</p>
                      <p className={styles.caseText}>
                        Transactional emails were underutilized and misaligned with product
                        capabilities and revenue opportunities — no personalization, no brand, no
                        cross-sell.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Flexible booking (date/time changes)</li>
                        <li>Ticket transfers and Apple Wallet integration</li>
                        <li>Referral programs wired into the confirmation flow</li>
                        <li>Cross-sell and repeat-purchase entry points</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>Repeat purchase lift</span>
                    <span className={styles.impactPill}>Stronger product × CRM alignment</span>
                  </div>
                </div>
              </div>
            </article>

            {/* CASE 5 */}
            <article className={styles.caseCard}>
              <div className={styles.caseTop}>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>05</span> · Cinema · Geo-targeting
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Automated Cinema Launch System
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Challenge</p>
                      <p className={styles.caseText}>
                        Cinema releases required localized communication depending on theater
                        availability. Manually managing each movie and city was inefficient and
                        didn’t scale.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Generic waitlist and launch flows per premiere</li>
                        <li>Cinema location and availability integrated into the CRM layer</li>
                        <li>Users matched to screenings dynamically by proximity</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>Zero manual setup per city</span>
                    <span className={styles.impactPill}>More relevant sends</span>
                  </div>
                </div>
                <div className={`${styles.caseVisual} ${styles.bgMidnight}`}>
                  <Carousel
                    frameMeta="email · cinema · geo-targeted"
                    slides={[
                      { src: img.newsletter, alt: "Automated cinema newsletter — dynamic per market" },
                      { src: img.reminder, alt: "Cinema reminder QR email" },
                    ]}
                  />
                </div>
              </div>
            </article>

            {/* CASE 6 */}
            <article className={styles.caseCard}>
              <div className={`${styles.caseTop} ${styles.caseTopReverse}`}>
                <div className={`${styles.caseVisual} ${styles.bgForest}`}>
                  <Carousel
                    frameMeta="email · personalized newsletter"
                    slides={[
                      { src: img.newsletter, alt: "Personalized movies newsletter" },
                      { src: img.loyalty, alt: "Loyalty points expiration email" },
                      { src: img.churn, alt: "Churn re-engagement — personalized coupon" },
                      { src: img.reactivation, alt: "Reactivation — Candlelight Bridgerton" },
                    ]}
                  />
                </div>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>06</span> · Newsletter · Personalization
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Automated Newsletter System with Personalization
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>AMPscript for dynamic content generation at render time</li>
                        <li>SQL queries for precise audience segmentation</li>
                        <li>Automation Studio for scheduling, execution and QA</li>
                        <li>Content adapting to user behavior, preferences and history</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>Significant manual effort cut</span>
                    <span className={styles.impactPill}>Engagement uplift</span>
                  </div>
                </div>
              </div>
            </article>

            {/* CASE 7 */}
            <article className={styles.caseCard}>
              <div className={styles.caseTop}>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>07</span> · Tourism · Strategy
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      Lifecycle Strategy for a Tourism Vertical
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Context</p>
                      <p className={styles.caseText}>
                        A new tourism vertical launch required a lifecycle strategy built from
                        scratch — adapted to travel behavior, booking lead time and origin vs.
                        destination dynamics.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Pre-trip, in-trip and post-trip lifecycle stages</li>
                        <li>Digital benchmarking of competitors + on-site research</li>
                        <li>Campaigns optimized per stage, timing and messaging</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>New vertical launched</span>
                    <span className={styles.impactPill}>Repeat + cross-sell opportunities</span>
                  </div>
                </div>
                <div className={`${styles.caseVisual} ${styles.bgCream}`}>
                  <Carousel
                    light
                    frameMeta="email · tourism · lifecycle"
                    slides={[
                      { src: img.reactivation, alt: "Travel lifecycle — reactivation campaign" },
                      { src: img.reminder, alt: "Reminder QR — tourism ticketing" },
                      { src: img.purchase, alt: "Purchase confirmation — tourism" },
                    ]}
                  />
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============ OTHER PROJECTS ============ */}
        <section
          id="projects"
          className={`${styles.section} ${styles.projectsSection}`}
          aria-labelledby="projects-heading"
        >
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Beyond CRM</span>
            <h2 id="projects-heading" className={styles.sectionTitle}>
              Side projects where I <em>ship</em> the product, not just the brief.
            </h2>
            <p className={styles.sectionLede}>
              Two products I’m building outside the day job — each an excuse to go end-to-end from
              idea to live service.
            </p>
          </div>

          <div className={styles.projectsGrid}>
            {/* Monkway */}
            <a
              className={styles.projectCard}
              href="https://monkway.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Monkway — mindful habits app"
            >
              <div className={`${styles.projectVisual} ${styles.projectVisualMonkway}`}>
                <div className={styles.projectVisualInner}>
                  <span className={styles.projectGlyph} aria-hidden="true">
                    m
                  </span>
                  <div className={styles.projectMockup} aria-hidden="true">
                    <span className={styles.projectMockupLabel}>Today</span>
                    <span className={styles.projectMockupRow}>
                      <span
                        className={`${styles.projectMockupDot} ${styles.projectMockupDotOn}`}
                      />
                      Morning meditation · 07:00
                    </span>
                    <span className={styles.projectMockupRow}>
                      <span
                        className={`${styles.projectMockupDot} ${styles.projectMockupDotOn}`}
                      />
                      Read 20 pages · done
                    </span>
                    <span className={styles.projectMockupRow}>
                      <span
                        className={`${styles.projectMockupDot} ${styles.projectMockupDotCoral}`}
                      />
                      Evening walk · 19:30
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.projectBody}>
                <p className={styles.projectTag}>Side project · Habits & focus</p>
                <h3 className={styles.projectName}>Monkway</h3>
                <p className={styles.projectDesc}>
                  A calmer approach to habits — daily rituals instead of streak anxiety. Designed
                  around intentional consistency, reflection and gentle nudges rather than guilt.
                </p>
                <div className={styles.projectMeta}>
                  <span className={styles.projectMetaItem}>
                    <strong>Role:</strong> Founder · Product
                  </span>
                  <span className={styles.projectMetaItem}>
                    <strong>Stack:</strong> Mobile app
                  </span>
                </div>
                <span className={styles.projectLink}>monkway.app</span>
              </div>
            </a>

            {/* Sprint (AI voice receptionist) */}
            <a
              className={styles.projectCard}
              href="https://web-production-98b02b.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Sprint — AI voice receptionist for small businesses"
            >
              <div className={`${styles.projectVisual} ${styles.projectVisualSprint}`}>
                <div className={styles.projectVisualInner}>
                  <span className={styles.projectGlyph} aria-hidden="true">
                    s
                  </span>
                  <div className={styles.projectMockup} aria-hidden="true">
                    <span className={styles.projectMockupLabel}>Incoming call</span>
                    <span className={styles.projectMockupRow}>
                      <span
                        className={`${styles.projectMockupDot} ${styles.projectMockupDotOn}`}
                      />
                      AI answering · 00:14
                    </span>
                    <span
                      className={styles.projectWave}
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className={styles.projectMockupRow}>
                      <span
                        className={`${styles.projectMockupDot} ${styles.projectMockupDotCoral}`}
                      />
                      Booking confirmed · Google Cal
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.projectBody}>
                <p className={styles.projectTag}>Side project · AI agent · SMB</p>
                <h3 className={styles.projectName}>Sprint</h3>
                <p className={styles.projectDesc}>
                  An AI voice receptionist for small businesses — takes WhatsApp, chat and phone
                  calls, books into Google Calendar, and speaks with a cloned voice. Built for
                  clinics, salons and consultants who can’t afford to miss a call.
                </p>
                <div className={styles.projectMeta}>
                  <span className={styles.projectMetaItem}>
                    <strong>Role:</strong> Co-founder · CRM & Ops
                  </span>
                  <span className={styles.projectMetaItem}>
                    <strong>Stack:</strong> ElevenLabs · Google Cal · Web app
                  </span>
                </div>
                <span className={styles.projectLink}>See landing</span>
              </div>
            </a>
          </div>
        </section>

        {/* ============ STACK ============ */}
        <section id="stack" aria-labelledby="stack-heading">
          <div className={styles.stack}>
            <div className={styles.stackHead}>
              <h2 id="stack-heading" className={styles.stackTitle}>
                The stack behind the <em>systems</em>.
              </h2>
              <p className={styles.stackLede}>
                A hands-on toolkit honed in production: dynamic content, data activation,
                journey orchestration and multichannel delivery.
              </p>
            </div>
            <div className={styles.stackGrid}>
              {stack.map((s) => {
                const label = levelLabel(s.level);
                return (
                  <div key={s.name} className={styles.stackItem}>
                    <p className={styles.stackItemName}>{s.name}</p>
                    <div className={styles.stackItemLevel}>
                      <span className={styles.levelBar}>
                        <span
                          className={styles.levelBarFill}
                          style={{ width: `${(s.level / 5) * 100}%` }}
                        />
                      </span>
                      <span
                        className={`${styles.levelLabel} ${
                          label === "Expert" ? styles.levelLabelExpert : ""
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ PHILOSOPHY / QUOTE ============ */}
        <section id="about" className={styles.pullquote} aria-label="Philosophy">
          <span className={styles.eyebrow}>Philosophy</span>
          <p className={styles.quote}>
            CRM isn’t a send calendar — it’s a product. Every journey, template and query is
            infrastructure. Build it as a <em>system</em> and it scales with the business; build it
            as a campaign and it breaks every launch.
          </p>
          <p className={styles.quoteAttr}>— Mario Calvo · CRM &amp; Lifecycle Consultant</p>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" aria-labelledby="contact-heading">
          <div className={styles.contact}>
            <div className={styles.contactHead}>
              <p className={styles.contactEyebrow}>Let’s work together</p>
              <h2 id="contact-heading" className={styles.contactTitle}>
                Need a CRM program that actually <em>scales</em>?
              </h2>
              <p className={styles.contactLede}>
                I take on a small number of engagements each quarter — lifecycle audits, SFMC
                build-outs, automation migrations and hands-on CRM leadership. Drop a line and
                let’s see if we fit.
              </p>
            </div>
            <div className={styles.contactActions}>
              <a className={styles.contactBtn} href="mailto:mariocalvocst@gmail.com">
                <div className={styles.contactBtnText}>
                  <span className={styles.contactBtnLabel}>Email</span>
                  <span>mariocalvocst@gmail.com</span>
                </div>
                <span className={styles.arrow}>→</span>
              </a>
              <a
                className={styles.contactBtn}
                href="https://www.linkedin.com/in/mariocalvocastillo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.contactBtnText}>
                  <span className={styles.contactBtnLabel}>LinkedIn</span>
                  <span>/in/mariocalvocastillo</span>
                </div>
                <span className={styles.arrow}>↗</span>
              </a>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Mario Calvo · CRM &amp; Lifecycle consulting</span>
          <div className={styles.footerLinks}>
            <a href="mailto:mariocalvocst@gmail.com">Email</a>
            <a
              href="https://www.linkedin.com/in/mariocalvocastillo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
