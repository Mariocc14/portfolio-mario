import { useEffect, type ReactNode } from "react";
import styles from "./AppInfo.module.css";

const DOC_TITLE = "Info — Mario Calvo";

export default function AppInfo() {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
    <div className={styles.page}>
      {/* ============ NAV ============ */}
      <nav className={styles.nav}>
        <a href="/" className={styles.navIdentity}>
          <span className={styles.navName}>Mario Calvo</span>
          <span className={styles.navRole}>CRM &amp; Lifecycle</span>
        </a>
        <div className={styles.navPill}>
          <a href="/">Work</a>
          <a href="/info" className={styles.navPillActive}>Info</a>
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
          <a href="mailto:mariocalvocst@gmail.com">
            Email <span className={styles.tinyArrow}>↗</span>
          </a>
        </div>
      </nav>

      <main className={styles.main}>
        {/* ============ INTRO ============ */}
        <header className={styles.intro}>
          <div className={styles.avatarWrap}>
            <img
              src="/imagen_perfil/mario-avatar.png"
              alt="Mario Calvo"
              className={styles.avatar}
              loading="eager"
            />
          </div>
          <h1 className={styles.name}>Mario Calvo</h1>
          <p className={styles.role}>
            CRM &amp; Lifecycle Consultant. Based in Spain.
          </p>
        </header>

        <Section label="Background">
          <p>
            I trained in Law before specialising in digital marketing and
            automation. The combination — strategic thinking from one, practical
            execution from the other — has shaped how I work in every role since,
            across small teams and international companies.
          </p>
          <p>
            My career started in retail with a wide-angle view of digital
            marketing: content, social, email, the full mix. From there I became
            the sole marketer at a startup, owning acquisition and activation
            alone — which forced a results-oriented mindset, fast iteration and
            constant optimisation.
          </p>
        </Section>

        <Section label="What I do">
          <p>
            For the last several years I've specialised in <strong>CRM</strong> and{" "}
            <strong>lifecycle automation</strong>. I design and ship the
            communication systems that sit underneath the user journey: built
            across <strong>Salesforce Marketing Cloud</strong>,{" "}
            <strong>Braze</strong> and <strong>Odoo</strong>, segmented with SQL,
            templated with HTML and CSS, and orchestrated across email, push and
            in-app — rolled out across multiple markets and verticals.
          </p>
          <p>
            The approach is the same regardless of the vertical: improve the
            user experience, ship systems that scale, and tie every campaign
            back to a business outcome. I also work closely with product teams
            to integrate new features into the lifecycle and tighten the
            customer journey.
          </p>
        </Section>

        <Section label="Currently">
          <p>
            Part of the team at{" "}
            <a
              href="https://magnific.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Magnific
            </a>
            , applying my CRM and lifecycle experience to a fast-moving AI
            product. In parallel, I'm exploring how AI can sharpen automation
            work — practical solutions that ship fast and generate real business
            impact.
          </p>
        </Section>

        <Section label="Outside work">
          <p>
            I sit at the intersection of technology, creativity and business. I
            produce my own music, which keeps the creative muscle alive and
            sharpens my sensitivity to content and communication. I'm also
            obsessive about personal development — habits, performance,
            continuous improvement — which is the seed for{" "}
            <a
              href="https://monkway.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Monkway
            </a>
            , a habits app I built around it.
          </p>
          <p>
            On the business side, I'm co-founding{" "}
            <a
              href="https://web-production-98b02b.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineLink}
            >
              Sprintia
            </a>
            , an AI voice assistant for small businesses — built on ElevenLabs
            and Google Calendar, with a customer app and an internal CMS.
          </p>
        </Section>

        <Section label="How I work">
          <p>
            Resolute, adaptable, results-oriented. Comfortable in dynamic
            environments that demand autonomy and strategic thinking. I'm always
            open to collaborate on projects where I can add value through
            automation, process optimisation and improving the user experience.
          </p>
        </Section>

        <Section label="Get in touch">
          <div className={styles.contactLinks}>
            <a className={styles.contactLink} href="mailto:mariocalvocst@gmail.com">
              <span className={styles.contactLinkLabel}>Email</span>
              <span className={styles.contactLinkValue}>mariocalvocst@gmail.com</span>
              <span className={styles.tinyArrow}>→</span>
            </a>
            <a
              className={styles.contactLink}
              href="https://www.linkedin.com/in/mariocalvocastillo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.contactLinkLabel}>LinkedIn</span>
              <span className={styles.contactLinkValue}>/in/mariocalvocastillo</span>
              <span className={styles.tinyArrow}>↗</span>
            </a>
          </div>
        </Section>

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer}>
          <p className={styles.footerNote}>
            Made with <span className={styles.heart}>♥</span> between Madrid commutes
            and AMPscript queries — and the occasional Bridgerton ticket.
          </p>
          <span className={styles.footerCopy}>© {new Date().getFullYear()} Mario Calvo</span>
        </footer>
      </main>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionLabelRow}>
        <span className={styles.sectionLine} />
        <span className={styles.sectionLabel}>{label}</span>
      </div>
      <div className={styles.sectionBody}>{children}</div>
    </section>
  );
}
