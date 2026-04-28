import { useCallback, useEffect, useRef, useState } from "react";
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

// Stack grouped by domain. Minimalist — no proficiency levels.
type StackGroup = { label: string; items: string[] };
const stackGroups: StackGroup[] = [
  {
    label: "CRM & Lifecycle",
    items: [
      "Salesforce Marketing Cloud",
      "Journey Builder",
      "Automation Studio",
      "Content Builder",
      "AMPscript",
      "Braze",
    ],
  },
  {
    label: "Data & Code",
    items: [
      "SQL",
      "JavaScript",
      "React",
      "HTML / CSS (Email)",
      "Git / GitHub",
      "Looker / GA4",
    ],
  },
  {
    label: "AI & Tools",
    items: [
      "Claude",
      "Cursor",
      "ChatGPT",
      "GitHub Copilot",
      "Figma",
      "Jira & Confluence",
    ],
  },
];

type Slide = { src: string; alt: string; meta?: string };

/* ============ Channel orchestration visual (hero right) ============ */
const orchestrationChannels: {
  key: string;
  name: string;
  meta: string;
  x: number;
  y: number;
  color: string;
  pathD: string;
  dur: string;
  begin: string;
}[] = [
  {
    key: "email",
    name: "Email",
    meta: "SFMC",
    x: 270,
    y: 32,
    color: "#6366f1",
    pathD: "M 60 160 C 140 160, 190 40, 266 32",
    dur: "2.6s",
    begin: "0s",
  },
  {
    key: "push",
    name: "Push",
    meta: "Braze",
    x: 270,
    y: 96,
    color: "#f59e0b",
    pathD: "M 60 160 C 140 160, 200 100, 266 96",
    dur: "2.2s",
    begin: "0.35s",
  },
  {
    key: "sms",
    name: "SMS",
    meta: "TWL",
    x: 270,
    y: 160,
    color: "#2563eb",
    pathD: "M 60 160 C 160 160, 200 160, 266 160",
    dur: "1.8s",
    begin: "0.7s",
  },
  {
    key: "wa",
    name: "WhatsApp",
    meta: "HSM",
    x: 270,
    y: 224,
    color: "#10b981",
    pathD: "M 60 160 C 140 160, 200 220, 266 224",
    dur: "2.4s",
    begin: "1.05s",
  },
  {
    key: "app",
    name: "In-app",
    meta: "Native",
    x: 270,
    y: 288,
    color: "#ec4899",
    pathD: "M 60 160 C 140 160, 190 280, 266 288",
    dur: "2.8s",
    begin: "1.4s",
  },
];

function OrchestrationGraph() {
  return (
    <svg
      className={styles.orchestration}
      viewBox="0 0 360 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Multichannel CRM orchestration — one system dispatching to email, push, SMS, WhatsApp and in-app"
    >
      <defs>
        <filter id="orchGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="orchOrigin" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fca68e" />
          <stop offset="60%" stopColor="#e55337" />
          <stop offset="100%" stopColor="#b83d22" />
        </radialGradient>
      </defs>

      {/* Connection curves */}
      <g fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round">
        {orchestrationChannels.map((c) => (
          <path key={c.key} id={`orch-${c.key}`} d={c.pathD} />
        ))}
      </g>

      {/* Origin node (CRM engine) */}
      <g>
        {/* expanding pulse rings */}
        <circle cx="60" cy="160" r="12" fill="none" stroke="#e55337" strokeOpacity="0.35">
          <animate
            attributeName="r"
            values="12;36"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.35;0"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="160" r="12" fill="none" stroke="#e55337" strokeOpacity="0.35">
          <animate
            attributeName="r"
            values="12;36"
            dur="3s"
            begin="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.35;0"
            dur="3s"
            begin="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        {/* static rings */}
        <circle cx="60" cy="160" r="20" fill="none" stroke="rgba(229,83,55,0.18)" strokeWidth="1" />
        <circle cx="60" cy="160" r="12" fill="none" stroke="rgba(229,83,55,0.45)" strokeWidth="1" />
        {/* core */}
        <circle cx="60" cy="160" r="6" fill="url(#orchOrigin)" filter="url(#orchGlow)" />
        {/* label */}
        <text
          x="60"
          y="204"
          className={styles.orchestrationLabel}
          textAnchor="middle"
        >
          CRM engine
        </text>
        <text
          x="60"
          y="216"
          className={styles.orchestrationChannelMeta}
          textAnchor="middle"
        >
          SFMC · BRAZE · SQL
        </text>
      </g>

      {/* Endpoints */}
      {orchestrationChannels.map((c) => (
        <g key={c.key}>
          <circle
            cx={c.x}
            cy={c.y}
            r="10"
            fill="none"
            stroke={c.color}
            strokeOpacity="0.22"
          />
          <circle cx={c.x} cy={c.y} r="4" fill={c.color} />
          <text
            x={c.x + 14}
            y={c.y - 1}
            className={styles.orchestrationChannel}
          >
            {c.name}
          </text>
          <text
            x={c.x + 14}
            y={c.y + 10}
            className={styles.orchestrationChannelMeta}
          >
            {c.meta}
          </text>
        </g>
      ))}

      {/* Animated pulse dots traveling along each path */}
      {orchestrationChannels.map((c) => (
        <circle key={`pulse-${c.key}`} r="2.5" fill="#fca68e" filter="url(#orchGlow)">
          <animateMotion
            dur={c.dur}
            repeatCount="indefinite"
            begin={c.begin}
            rotate="auto"
          >
            <mpath href={`#orch-${c.key}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>
  );
}

function ChannelStack() {
  return (
    <aside className={styles.channels} aria-hidden="true">
      <div className={styles.channelsHeader}>
        <p className={styles.channelsTitle}>Lifecycle orchestration</p>
        <span className={styles.channelsLive}>Live</span>
      </div>
      <OrchestrationGraph />
      <div className={styles.channelsFooter}>
        <span>5 channels · 1 system</span>
        <span>
          <strong>Real-time</strong> dispatch
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

/* ============ Automation pipeline (case 03) ============ */
type AutomationStep = {
  key: "sql" | "automation" | "journey" | "ampscript" | "metabase";
  num: string;
  title: string;
  desc: string;
  color: string;
};

const automationSteps: AutomationStep[] = [
  { key: "sql", num: "01", title: "SQL", desc: "Automated audiences", color: "#6366f1" },
  { key: "automation", num: "02", title: "Automation Studio", desc: "Scheduled SFMC pipelines", color: "#00a1e0" },
  { key: "journey", num: "03", title: "Journey Builder", desc: "Modular lifecycle flows", color: "#ec4899" },
  { key: "ampscript", num: "04", title: "AMPscript", desc: "Dynamic HTML templates", color: "#f59e0b" },
  { key: "metabase", num: "05", title: "Metabase", desc: "Data analytics", color: "#10b981" },
];

function PipelineIcon({ step }: { step: AutomationStep }) {
  const c = step.color;
  switch (step.key) {
    case "sql":
      return (
        <g fill={c}>
          <ellipse cx="0" cy="-4.5" rx="6.5" ry="2" />
          <ellipse cx="0" cy="0" rx="6.5" ry="2" />
          <ellipse cx="0" cy="4.5" rx="6.5" ry="2" />
        </g>
      );
    case "automation":
      return <polygon points="-3.5,-4.5 -3.5,4.5 4.5,0" fill={c} />;
    case "journey":
      return (
        <g fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M -5.5 -3.5 L 0 1.5 L 5.5 -3.5" />
          <path d="M 0 1.5 L 0 5.5" />
          <circle cx="-5.5" cy="-3.5" r="0.9" fill={c} stroke="none" />
          <circle cx="5.5" cy="-3.5" r="0.9" fill={c} stroke="none" />
          <circle cx="0" cy="5.5" r="0.9" fill={c} stroke="none" />
        </g>
      );
    case "ampscript":
      return (
        <text
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
          dy="3.5"
          fill={c}
        >
          {"{ }"}
        </text>
      );
    case "metabase":
      return (
        <g fill={c}>
          <rect x="-6" y="-1" width="2" height="6" rx="0.5" />
          <rect x="-2.5" y="-3.5" width="2" height="8.5" rx="0.5" />
          <rect x="1" y="-5" width="2" height="10" rx="0.5" />
          <rect x="4.5" y="-2.5" width="2" height="7.5" rx="0.5" />
        </g>
      );
    default:
      return null;
  }
}

function AutomationPipeline() {
  const startY = 64;
  const stepGap = 84;
  const lineTop = startY + 18;
  const lineBottom = startY + (automationSteps.length - 1) * stepGap - 18;
  return (
    <svg
      className={styles.automationFlow}
      viewBox="0 0 360 440"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lifecycle automation pipeline — SQL audiences, Automation Studio, Journey Builder, AMPscript templates and Metabase analytics"
    >
      <defs>
        <filter id="pipeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Header */}
      <text
        x="60"
        y="28"
        className={styles.orchestrationLabel}
        textAnchor="middle"
      >
        AUTOMATION PIPELINE
      </text>

      {/* Vertical dashed connector */}
      <line
        x1="60"
        y1={lineTop}
        x2="60"
        y2={lineBottom}
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* Animated pulses traveling down */}
      {[0, 1.4, 2.8].map((delay, i) => (
        <circle
          key={i}
          cx="60"
          r="2.5"
          fill="#fafafa"
          filter="url(#pipeGlow)"
          opacity="0"
        >
          <animate
            attributeName="cy"
            from={lineTop}
            to={lineBottom}
            dur="4.2s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.85;0.85;0"
            keyTimes="0;0.1;0.9;1"
            dur="4.2s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Steps */}
      {automationSteps.map((step, i) => {
        const y = startY + i * stepGap;
        return (
          <g key={step.key}>
            <circle
              cx="60"
              cy={y}
              r="22"
              fill="none"
              stroke={step.color}
              strokeWidth="0.6"
              opacity="0.25"
            />
            <circle
              cx="60"
              cy={y}
              r="17"
              fill={`${step.color}1a`}
              stroke={step.color}
              strokeWidth="1.4"
            />
            <g transform={`translate(60 ${y})`}>
              <PipelineIcon step={step} />
            </g>
            <text
              x="100"
              y={y - 7}
              className={styles.pipelineNum}
              fill={step.color}
            >
              {step.num}
            </text>
            <text
              x="100"
              y={y + 7}
              className={styles.orchestrationChannel}
            >
              {step.title}
            </text>
            <text
              x="100"
              y={y + 22}
              className={styles.orchestrationChannelMeta}
            >
              {step.desc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============ Tourism lifecycle journey (case 07) ============ */
type TourismStage = {
  key: "plan" | "purchase" | "travel" | "event" | "stay";
  num: string;
  title: string;
  desc: string;
};

const tourismStages: TourismStage[] = [
  { key: "plan", num: "01", title: "Trip planning", desc: "Research & inspiration" },
  { key: "purchase", num: "02", title: "Purchase", desc: "Booking moment" },
  { key: "travel", num: "03", title: "Travel", desc: "Journey to city" },
  { key: "event", num: "04", title: "Event", desc: "Live experience" },
  { key: "stay", num: "05", title: "City stay", desc: "Extended visit" },
];

const repurchaseSpurs: { key: string; label: string }[] = [
  { key: "preevent", label: "Pre-event upsell" },
  { key: "cross", label: "Cross-sell shows" },
  { key: "city", label: "Local activities" },
  { key: "loyalty", label: "Loyalty + next" },
];

function TourismIcon({ stage }: { stage: TourismStage }) {
  const c = "rgba(20, 20, 20, 0.85)";
  switch (stage.key) {
    case "plan":
      return (
        <g fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round">
          <circle cx="-1.5" cy="-1.5" r="4" />
          <line x1="1.7" y1="1.7" x2="5" y2="5" />
        </g>
      );
    case "purchase":
      return (
        <g>
          <rect x="-6.5" y="-4.5" width="13" height="9" rx="1.6" fill="none" stroke={c} strokeWidth="1.2" />
          <rect x="-6.5" y="-2" width="13" height="1.6" fill={c} />
        </g>
      );
    case "travel":
      return <path d="M -6 -3 L 6 0 L -6 3 L -3 0 Z" fill={c} />;
    case "event":
      return (
        <g>
          <rect x="-6" y="-4" width="12" height="8" rx="1.4" fill="none" stroke={c} strokeWidth="1.2" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke={c} strokeWidth="0.9" strokeDasharray="1 1" />
        </g>
      );
    case "stay":
      return (
        <g fill={c}>
          <rect x="-5" y="-5" width="10" height="10" fill="none" stroke={c} strokeWidth="1.2" />
          <rect x="-3" y="-3" width="2" height="2" />
          <rect x="1" y="-3" width="2" height="2" />
          <rect x="-3" y="1" width="2" height="2" />
          <rect x="1" y="1" width="2" height="2" />
        </g>
      );
    default:
      return null;
  }
}

function TourismLifecycle() {
  const startY = 50;
  const stageGap = 90;
  const lineTop = startY + 18;
  const lineBottom = startY + (tourismStages.length - 1) * stageGap - 18;
  return (
    <svg
      className={styles.tourismFlow}
      viewBox="0 0 360 480"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Tourism user lifecycle journey from trip planning, purchase, travel, event attendance to city stay, with re-purchase opportunities along the way"
    >
      <text x="60" y="22" className={styles.tourismHeader} textAnchor="middle">
        USER LIFECYCLE
      </text>

      {/* Vertical journey line */}
      <line
        x1="60"
        y1={lineTop}
        x2="60"
        y2={lineBottom}
        stroke="rgba(20,20,20,0.18)"
        strokeWidth="1"
        strokeDasharray="2 4"
      />

      {/* Animated traveling pulse */}
      {[0, 1.6, 3.2].map((delay, i) => (
        <circle key={i} cx="60" r="2.5" fill="rgba(20,20,20,0.85)" opacity="0">
          <animate
            attributeName="cy"
            from={lineTop}
            to={lineBottom}
            dur="4.8s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.85;0.85;0"
            keyTimes="0;0.1;0.9;1"
            dur="4.8s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Re-purchase spurs */}
      {repurchaseSpurs.map((spur, i) => {
        const y = startY + (i + 0.5) * stageGap;
        return (
          <g key={spur.key}>
            <line
              x1="60"
              y1={y}
              x2="115"
              y2={y}
              stroke="#e55337"
              strokeWidth="0.9"
              strokeDasharray="2 3"
              opacity="0.7"
            />
            <circle cx="60" cy={y} r="2.5" fill="#e55337" />
            <circle cx="125" cy={y} r="7" fill="#fef0ec" stroke="#e55337" strokeWidth="1" />
            <text
              x="125"
              y={y + 2.6}
              fontFamily="JetBrains Mono, monospace"
              fontSize="7.5"
              fontWeight="700"
              textAnchor="middle"
              fill="#c24a2d"
            >
              €+
            </text>
            <text x="140" y={y + 2.8} className={styles.tourismSpurLabel}>
              {spur.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Stages */}
      {tourismStages.map((stage, i) => {
        const y = startY + i * stageGap;
        return (
          <g key={stage.key}>
            <circle
              cx="60"
              cy={y}
              r="22"
              fill="none"
              stroke="rgba(20,20,20,0.18)"
              strokeWidth="0.6"
            />
            <circle
              cx="60"
              cy={y}
              r="17"
              fill="rgba(255,255,255,0.7)"
              stroke="rgba(20,20,20,0.55)"
              strokeWidth="1.2"
            />
            <g transform={`translate(60 ${y})`}>
              <TourismIcon stage={stage} />
            </g>
            <text x="98" y={y - 7} className={styles.tourismNum}>
              {stage.num}
            </text>
            <text x="98" y={y + 7} className={styles.tourismTitle}>
              {stage.title}
            </text>
            <text x="98" y={y + 22} className={styles.tourismDesc}>
              {stage.desc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ============ In-app content cards (case 08) ============ */
type ContentCard = {
  time: string;
  image: string;
  title: string;
  body: string;
  cta: string;
};

const contentCards: ContentCard[] = [
  {
    time: "9h ago",
    image: "/magnific/freepik-magnific.png",
    title: "Freepik is now Magnific",
    body: "Pro workflows and creative tools, all designed around one belief.",
    cta: "Find out more",
  },
  {
    time: "12h ago",
    image: "/magnific/kling-3-4k.png",
    title: "Native 4K AI video model",
    body: "Kling 3.0 4K — no upscaling. Richer texture and depth.",
    cta: "Create videos",
  },
  {
    time: "12h ago",
    image: "/magnific/gpt-2.png",
    title: "Photorealism down to the last pixel",
    body: "GPT Image 2 — portraits, product shots and UI mockups.",
    cta: "Try GPT 2",
  },
];

function ContentCardsMockup() {
  return (
    <div className={styles.cardsMock} aria-hidden="true">
      <div className={styles.cardsMockTop}>
        <span className={styles.cardsMockHeading}>Notifications</span>
        <span className={styles.cardsMockClose}>×</span>
      </div>
      <div className={styles.cardsMockTabs}>
        <span className={`${styles.cardsTab} ${styles.cardsTabActive}`}>What's new</span>
        <span className={styles.cardsTab}>Inbox</span>
      </div>
      <div className={styles.cardsMockBody}>
        {contentCards.map((card) => (
          <article key={card.title} className={styles.contentCard}>
            <p className={styles.contentCardTime}>{card.time}</p>
            <div
              className={styles.contentCardImage}
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <p className={styles.contentCardTitle}>{card.title}</p>
            <p className={styles.contentCardText}>{card.body}</p>
            <span className={styles.contentCardCta}>{card.cta} →</span>
          </article>
        ))}
      </div>
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

/* ============ Lifecycle carousel (Case 1 — event lifecycle phases) ============ */
type LifecyclePhase = {
  num: number;
  title: string;
  desc: string;
  channels: string[];
  sampleLabel: string;
  sample: string;
};

const lifecyclePhases: LifecyclePhase[] = [
  {
    num: 1,
    title: "Waitlist launch",
    desc: "Build an early demand pool before any ticket is on sale — the foundation of every scalable event.",
    channels: ["Email", "Web"],
    sampleLabel: "Subject",
    sample: "Be first in line when this experience drops — join the waitlist →",
  },
  {
    num: 2,
    title: "Pre-sale notification",
    desc: "Reward the waitlist with early access. Turn anticipation into commitment before general launch.",
    channels: ["Email", "Push"],
    sampleLabel: "Push title",
    sample: "Your early access opens in 24h — secure your seats before everyone else.",
  },
  {
    num: 3,
    title: "Sales launch",
    desc: "Open gates communication across every active channel to maximize the launch-window peak.",
    channels: ["Email", "Push", "SMS"],
    sampleLabel: "Launch email",
    sample: "Tickets are live — pick your date before they're gone.",
  },
  {
    num: 4,
    title: "Open gates",
    desc: "Sustain demand post-launch with real-time, availability-aware messaging for remaining inventory.",
    channels: ["Push", "In-app"],
    sampleLabel: "Reminder",
    sample: "Last available dates for this weekend — reserve now.",
  },
  {
    num: 5,
    title: "Dates extension",
    desc: "When demand extends, new dates reactivate the existing audience with zero friction — one journey, repeatable.",
    channels: ["Email", "Push"],
    sampleLabel: "Announcement",
    sample: "More dates just added — pick your evening.",
  },
  {
    num: 6,
    title: "FOMO last days",
    desc: "Closing-window sequence that lifts conversion among procrastinators through scarcity and timing cues.",
    channels: ["Push", "SMS", "Email"],
    sampleLabel: "Final push",
    sample: "48h left — 90% sold out. Don't miss your chance.",
  },
];

function LifecycleCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const total = lifecyclePhases.length;

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(total - 1, i));
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
    <div className={styles.carousel}>
      <div className={styles.carouselTrack} ref={trackRef} onScroll={onScroll}>
        {lifecyclePhases.map((p, i) => (
          <div key={p.num} className={styles.carouselSlide}>
            <div className={styles.lifecycleFrame}>
              <p className={styles.lifecyclePhaseNum}>
                Phase {String(p.num).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <h4 className={styles.lifecycleTitle}>{p.title}</h4>
              <p className={styles.lifecycleDesc}>{p.desc}</p>
              <div className={styles.lifecycleChannels}>
                {p.channels.map((c) => (
                  <span key={c} className={styles.lifecycleChannelChip}>
                    {c}
                  </span>
                ))}
              </div>
              <div className={styles.lifecycleSample}>
                <p className={styles.lifecycleSampleLabel}>{p.sampleLabel}</p>
                {p.sample}
              </div>
              <div className={styles.lifecycleTimeline} aria-hidden="true">
                {Array.from({ length: total }, (_, j) => (
                  <span
                    key={j}
                    className={`${styles.lifecycleTimelineDot} ${
                      j < i ? styles.lifecycleTimelineDotDone : ""
                    } ${j === i ? styles.lifecycleTimelineDotActive : ""}`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.carouselControls}>
        <div className={styles.carouselDots} role="tablist" aria-label="Lifecycle phases">
          {lifecyclePhases.map((p, i) => (
            <button
              key={p.num}
              role="tab"
              aria-selected={i === index}
              aria-label={`Phase ${i + 1}: ${p.title}`}
              className={`${styles.carouselDot} ${i === index ? styles.carouselDotActive : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
          <span className={styles.carouselCount}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <div className={styles.carouselArrows}>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous phase"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => scrollTo(index + 1)}
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
            <span className={styles.clientLogoBold}>Magnific</span>
          </div>
        </section>

        {/* ============ STATS ============ */}
        <section className={styles.stats} aria-label="Impact">
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>40M+</em>
            </p>
            <p className={styles.statLabel}>Users in the CRM databases I've worked with</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>25+</em>
            </p>
            <p className={styles.statLabel}>Languages handled across lifecycle communications</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>150+</em>
            </p>
            <p className={styles.statLabel}>Cities with dynamic, locally-aware content</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNumber}>
              <em>30+</em>
            </p>
            <p className={styles.statLabel}>Automated flows shipped across the lifecycle</p>
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
                  <LifecycleCarousel />
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
                <div className={`${styles.caseVisual} ${styles.bgMidnight} ${styles.caseVisualPipeline}`}>
                  <AutomationPipeline />
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
                <div className={`${styles.caseVisual} ${styles.bgCream} ${styles.caseVisualPipeline}`}>
                  <TourismLifecycle />
                </div>
              </div>
            </article>

            {/* CASE 8 */}
            <article className={styles.caseCard}>
              <div className={`${styles.caseTop} ${styles.caseTopReverse}`}>
                <div className={`${styles.caseVisual} ${styles.bgMidnight} ${styles.caseVisualCards}`}>
                  <ContentCardsMockup />
                </div>
                <div className={styles.caseCopy}>
                  <span className={styles.caseTag}>
                    <span className={styles.caseTagNum}>08</span> · In-app · Braze · Content Cards
                  </span>
                  <div>
                    <h3 className={styles.caseTitle}>
                      In-app Content Cards System
                    </h3>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Challenge</p>
                      <p className={styles.caseText}>
                        Email reach plateaued for time-sensitive launches. The app had a captive
                        audience but no CRM-driven surface to activate it in real time.
                      </p>
                    </div>
                    <div className={styles.caseBlock}>
                      <p className={styles.caseLabel}>Solution</p>
                      <ul className={styles.caseList}>
                        <li>Braze Content Cards delivered through the app SDK</li>
                        <li>Shared segmentation logic with email (SQL + SFMC)</li>
                        <li>Modular templates: image · headline · body · deep-link</li>
                        <li>Editorial calendar synced across email, push and in-app</li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.caseImpact}>
                    <span className={styles.impactPill}>New always-on owned channel</span>
                    <span className={styles.impactPill}>Higher reach on launches</span>
                    <span className={styles.impactPill}>Cross-vertical promotion</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============ OTHER PRODUCTS ============ */}
        <section
          id="projects"
          className={`${styles.section} ${styles.productsSection}`}
          aria-labelledby="products-heading"
        >
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Other products</span>
            <h2 id="products-heading" className={styles.sectionTitle}>
              Products I’ve <em>built</em> end-to-end — from concept to live service.
            </h2>
            <p className={styles.sectionLede}>
              Beyond consulting, I design and ship full products. These are two I own from
              strategy and CRM to UX, stack and go-to-market.
            </p>
          </div>

          <div className={styles.productsGrid}>
            {/* Monkway — mindful habits app */}
            <a
              className={styles.productCard}
              href="https://monkway.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Monkway — habit tracking app"
            >
              <div className={`${styles.productPreview} ${styles.previewMonkway}`}>
                <div className={styles.monkwayPhone} aria-hidden="true">
                  <div className={styles.monkwayHeader}>
                    <div className={styles.monkwayBrand}>
                      <span className={styles.monkwayMark} />
                      <span className={styles.monkwayWordmark}>Monkway</span>
                    </div>
                    <span className={styles.monkwayStreak}>12-day streak</span>
                  </div>
                  <p className={styles.monkwayToday}>Today · 23 apr</p>
                  <div className={styles.monkwayList}>
                    <div className={styles.monkwayItem}>
                      <span className={styles.monkwayCheck}>✓</span>
                      <span className={styles.monkwayLabel}>Morning meditation</span>
                      <span className={styles.monkwayTime}>07:00</span>
                    </div>
                    <div className={styles.monkwayItem}>
                      <span className={styles.monkwayCheck}>✓</span>
                      <span className={styles.monkwayLabel}>Read 20 pages</span>
                      <span className={styles.monkwayTime}>done</span>
                    </div>
                    <div className={styles.monkwayItem}>
                      <span
                        className={`${styles.monkwayCheck} ${styles.monkwayCheckEmpty}`}
                      >
                        ✓
                      </span>
                      <span className={styles.monkwayLabel}>Evening walk</span>
                      <span className={styles.monkwayTime}>19:30</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.productBody}>
                <p className={styles.productTag}>Product · Consumer app</p>
                <h3 className={styles.productName}>Monkway</h3>
                <p className={styles.productKicker}>
                  A calmer way to build habits.
                </p>
                <p className={styles.productDesc}>
                  Daily rituals over streak anxiety. A PWA designed around intentional
                  consistency, reflection and gentle nudges — for people tired of guilt-driven
                  productivity apps.
                </p>
                <div className={styles.productMeta}>
                  <span className={styles.productMetaItem}>
                    <strong>Role:</strong> Founder · Product · CRM
                  </span>
                  <span className={styles.productMetaItem}>
                    <strong>Stack:</strong> PWA · React
                  </span>
                </div>
                <span className={styles.productLink}>monkway.app</span>
              </div>
            </a>

            {/* Sprint — AI voice receptionist */}
            <a
              className={styles.productCard}
              href="https://web-production-98b02b.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Sprint — AI voice receptionist for small businesses"
            >
              <div className={`${styles.productPreview} ${styles.previewSprint}`}>
                <div className={styles.sprintBoard} aria-hidden="true">
                  <p className={styles.sprintHeadline}>
                    Tus citas, en <em>piloto automático</em>.
                  </p>
                  <div className={styles.sprintCall}>
                    <div className={styles.sprintCallHead}>
                      <span className={styles.sprintMark} />
                      <span className={styles.sprintBrandName}>Sprint</span>
                      <span className={styles.sprintCallMeta}>AI · 00:14</span>
                    </div>
                    <div className={styles.sprintWave}>
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.sprintBooking}>
                      <span className={styles.sprintBookingDot} />
                      Cita confirmada · Google Calendar
                    </div>
                  </div>
                  <div className={styles.sprintChannels}>
                    <span className={styles.sprintChannel}>WhatsApp</span>
                    <span className={styles.sprintChannel}>Chat</span>
                    <span className={styles.sprintChannel}>Voz</span>
                  </div>
                </div>
              </div>
              <div className={styles.productBody}>
                <p className={styles.productTag}>Product · AI agent for SMBs</p>
                <h3 className={styles.productName}>Sprint</h3>
                <p className={styles.productKicker}>
                  An AI receptionist that never sleeps.
                </p>
                <p className={styles.productDesc}>
                  Answers WhatsApp, web chat and phone calls, books into Google Calendar and
                  speaks with a cloned voice via ElevenLabs. Built for clinics, salons and
                  consultants who can’t afford to miss a booking. Includes client app and
                  internal CMS.
                </p>
                <div className={styles.productMeta}>
                  <span className={styles.productMetaItem}>
                    <strong>Role:</strong> Co-founder · Product · CRM
                  </span>
                  <span className={styles.productMetaItem}>
                    <strong>Stack:</strong> ElevenLabs · Google Cal · Web
                  </span>
                </div>
                <span className={styles.productLink}>sprint.agency</span>
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
            <div className={styles.stackGroups}>
              {stackGroups.map((group) => (
                <div key={group.label} className={styles.stackGroup}>
                  <p className={styles.stackGroupLabel}>{group.label}</p>
                  <ul className={styles.stackChips}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.stackChip}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
