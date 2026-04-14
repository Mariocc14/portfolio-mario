import { useEffect } from "react";
import styles from "./App.module.css";

const DOC_TITLE = "Mario Calvo — CRM & Lifecycle Marketing Consultant";

export default function App() {
  useEffect(() => {
    document.title = DOC_TITLE;
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <p className={styles.name}>Mario Calvo</p>
            <p className={styles.role}>CRM & Lifecycle Marketing Consultant</p>
          </div>
          <nav className={styles.nav} aria-label="Page">
            <a href="#what-i-do">What I do</a>
            <a href="#case-studies">Case studies</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className={styles.hero} aria-labelledby="hero-heading">
          <h1 id="hero-heading" className={styles.headline}>
            I design and build lifecycle journeys and CRM automation systems that scale across markets.
          </h1>
          <div className={styles.description}>
            <p>
              I’m a CRM specialist with 4+ years of experience working across lifecycle marketing, automation, and
              multichannel campaigns. I focus on building scalable CRM systems, improving user engagement, and
              connecting data with execution.
            </p>
            <p>
              I’ve worked in fast-paced environments managing global lifecycle strategies across email, push, and
              in-app channels, with a strong focus on automation, personalization, and product integration.
            </p>
          </div>
        </section>

        <section id="what-i-do" className={styles.section} aria-labelledby="what-heading">
          <h2 id="what-heading" className={styles.sectionTitle}>
            What I do
          </h2>
          <div className={styles.gridWhat}>
            <article className={styles.whatCard}>
              <h3 className={styles.whatTitle}>Lifecycle Strategy</h3>
              <p className={styles.whatBody}>Design of end-to-end user journeys across the full lifecycle</p>
            </article>
            <article className={styles.whatCard}>
              <h3 className={styles.whatTitle}>CRM Automation</h3>
              <p className={styles.whatBody}>Building scalable automation systems using SFMC and similar tools</p>
            </article>
            <article className={styles.whatCard}>
              <h3 className={styles.whatTitle}>Journey Building</h3>
              <p className={styles.whatBody}>Creation of onboarding, activation, and reactivation flows</p>
            </article>
            <article className={styles.whatCard}>
              <h3 className={styles.whatTitle}>Multichannel Campaigns</h3>
              <p className={styles.whatBody}>Coordinated execution across email, push, and in-app</p>
            </article>
            <article className={styles.whatCard}>
              <h3 className={styles.whatTitle}>Data Activation</h3>
              <p className={styles.whatBody}>Audience segmentation and targeting using SQL and CRM tools</p>
            </article>
            <article className={styles.whatCard}>
              <h3 className={styles.whatTitle}>Campaign Optimization</h3>
              <p className={styles.whatBody}>Testing, iteration, and performance improvement</p>
            </article>
          </div>
        </section>

        <section id="case-studies" className={styles.section} aria-labelledby="cases-heading">
          <h2 id="cases-heading" className={styles.sectionTitle}>
            Case studies
          </h2>
          <div className={styles.gridCases}>
            <article className={styles.caseCard}>
              <h3 className={styles.caseTitle}>Global Lifecycle Automation for Event Launches</h3>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Problem</p>
                <p className={styles.caseText}>
                  Event launches across multiple cities and countries required heavy manual effort, making it difficult
                  to scale campaigns and maintain consistency.
                </p>
              </div>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Solution</p>
                <p className={styles.caseText}>
                  Designed and implemented a fully automated lifecycle framework covering waitlist acquisition,
                  pre-launch, launch, open gates, date extensions, and FOMO campaigns.
                </p>
                <p className={styles.caseText}>
                  Built dynamic templates and automated workflows in Salesforce Marketing Cloud, enabling scalable
                  campaign creation across markets. Content was fully dynamic based on city, event, and user
                  segmentation.
                </p>
              </div>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Outcome</p>
                <p className={styles.caseText}>
                  Reduced manual campaign workload significantly and enabled scalable, repeatable global event launches.
                </p>
              </div>
            </article>

            <article className={styles.caseCard}>
              <h3 className={styles.caseTitle}>Personalized CRM System with Dynamic Content</h3>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Problem</p>
                <p className={styles.caseText}>
                  Manual campaign creation limited personalization and created operational bottlenecks when scaling
                  across markets.
                </p>
              </div>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Solution</p>
                <p className={styles.caseText}>
                  Developed automated CRM systems using AMPscript, dynamic content, and SQL-based segmentation in
                  Automation Studio.
                </p>
                <p className={styles.caseText}>
                  Implemented a translation system with centralized content and automated AMPscript generation from
                  structured data, enabling efficient multi-language rollout.
                </p>
              </div>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Outcome</p>
                <p className={styles.caseText}>
                  Enabled personalized communication at scale and reduced dependency on manual campaign creation across
                  multiple markets.
                </p>
              </div>
            </article>

            <article className={styles.caseCard}>
              <h3 className={styles.caseTitle}>Lifecycle Strategy & Product Integration (Tourism Vertical)</h3>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Problem</p>
                <p className={styles.caseText}>
                  New business vertical lacked lifecycle structure and understanding of user behavior across the travel
                  journey.
                </p>
              </div>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Solution</p>
                <p className={styles.caseText}>
                  Defined lifecycle strategies based on behavioral analysis (booking timing, travel patterns,
                  conversion windows).
                </p>
                <p className={styles.caseText}>
                  Designed campaigns across pre-trip, in-trip, and post-event stages. Collaborated with product teams to
                  integrate CRM with platform features (flexible booking, wallet integration, referrals).
                </p>
                <p className={styles.caseText}>
                  Optimized transactional emails to drive repeat purchases and improve brand experience.
                </p>
              </div>
              <div className={styles.caseBlock}>
                <p className={styles.caseLabel}>Outcome</p>
                <p className={styles.caseText}>
                  Established a scalable lifecycle framework and increased opportunities for repeat engagement and
                  monetization.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section id="skills" className={styles.section} aria-labelledby="skills-heading">
          <h2 id="skills-heading" className={styles.sectionTitle}>
            Skills
          </h2>
          <ul className={styles.skillList}>
            <li className={styles.skillItem}>Salesforce Marketing Cloud (SFMC)</li>
            <li className={styles.skillItem}>SQL</li>
            <li className={styles.skillItem}>AMPscript</li>
            <li className={styles.skillItem}>HTML / CSS (Email)</li>
            <li className={styles.skillItem}>Journey Builder</li>
            <li className={styles.skillItem}>Automation Studio</li>
            <li className={styles.skillItem}>Braze</li>
            <li className={styles.skillItem}>Multichannel CRM (Email, Push, In-app)</li>
          </ul>
        </section>

        <section id="contact" className={styles.section} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionTitle}>
            Contact
          </h2>
          <div className={styles.contactActions}>
            <a className={`${styles.btn} ${styles.btnPrimary}`} href="mailto:mariocalvocst@gmail.com">
              Email
            </a>
            <a
              className={`${styles.btn} ${styles.btnSecondary}`}
              href="https://www.linkedin.com/in/mariocalvocastillo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
          <p className={styles.footer}>CRM & lifecycle consulting — Mario Calvo</p>
        </section>
      </div>
    </div>
  );
}
