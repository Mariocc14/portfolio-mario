import { useEffect, useState } from "react";
import styles from "./AppResource.module.css";
import { spotlight } from "./spotlight";
import { getResourceBySlug, type ResourceBlock } from "./resources";
import LeadModal from "./LeadModal";
import { captureEvent } from "./posthog";

export default function AppResource({ slug }: { slug: string }) {
  const resource = getResourceBySlug(slug);
  const [modalOpen, setModalOpen] = useState(false);
  const openLeadModal = (placement: "top" | "bottom") => {
    captureEvent("resource_download_clicked", { resource_slug: slug, placement });
    setModalOpen(true);
  };

  useEffect(() => {
    if (resource) {
      document.title = `${resource.title} — Mario Calvo`;
    } else {
      document.title = "Resource not found — Mario Calvo";
    }
  }, [resource]);

  if (!resource) {
    return (
      <div className={styles.page}>
        <div className={styles.notFound}>
          <h1>Resource not found</h1>
          <a href="/resources">← Back to resources</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} lang={resource.language}>
      <a href="/resources" className={styles.back}>
        <span className={styles.backArrow}>←</span> Back to resources
      </a>

      <main className={styles.main}>
        {/* ============ HEADER ============ */}
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.metaItem}>{resource.category}</span>
            <span className={styles.metaDot}>·</span>
            {resource.format && (
              <>
                <span className={styles.metaItem}>{resource.format}</span>
                <span className={styles.metaDot}>·</span>
              </>
            )}
            <span className={styles.metaItem}>{resource.readingTime} read</span>
            <span className={styles.metaLang}>{resource.language.toUpperCase()}</span>
          </div>
          <h1 className={styles.title}>{resource.title}</h1>
          <p className={styles.subtitle}>{resource.subtitle}</p>
          {resource.downloadHref && (
            <button
              type="button"
              className={styles.downloadCtaTop}
              onClick={() => openLeadModal("top")}
            >
              Download the {resource.format}
              <span className={styles.ctaArrow}>↓</span>
            </button>
          )}
        </header>

        {/* ============ BODY ============ */}
        <article className={styles.body}>
          {resource.body.map((block, i) => renderBlock(block, i))}
        </article>

        {/* ============ DOWNLOAD CTA ============ */}
        {resource.downloadHref && (
        <section className={styles.downloadSection}>
          <div className={`${styles.downloadCard} spotlight`} style={{ "--spot-size": "420px" } as React.CSSProperties} {...spotlight}>
            <p className={styles.downloadLabel}>Get the {resource.format}</p>
            <h2 className={styles.downloadTitle}>
              Quick form, direct download.
            </h2>
            <button
              type="button"
              className={styles.downloadCta}
              onClick={() => openLeadModal("bottom")}
            >
              Download the {resource.format}
              <span className={styles.ctaArrow}>↓</span>
            </button>
          </div>
        </section>
        )}

        {/* ============ FOOTER ============ */}
        <footer className={styles.footer}>
          <p className={styles.footerNote}>
            Made with <span className={styles.heart}>♥</span> and the collaboration of my cat buddy.
          </p>
          <span className={styles.footerCopy}>
            © {new Date().getFullYear()} Mario Calvo
          </span>
        </footer>
      </main>

      <LeadModal
        resource={resource}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

function renderBlock(block: ResourceBlock, key: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={key} className={styles.p}>
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 key={key} className={styles.h2}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={key} className={styles.h3}>
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul key={key} className={styles.ul}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key} className={styles.ol}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote key={key} className={styles.quote}>
          <p>{block.text}</p>
          {block.attr && <cite>— {block.attr}</cite>}
        </blockquote>
      );
  }
}
