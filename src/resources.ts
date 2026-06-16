// Downloadable resources — content for /resources index + /resources/<slug>.
// Add a new entry to the `resources` array and it shows up automatically.

export type ResourceBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; attr?: string };

export type Resource = {
  slug: string;
  title: string;
  subtitle: string;
  language: "es" | "en";
  category: string;
  format: "PDF" | "Notion";
  readingTime: string;
  body: ResourceBlock[];
  /** Path or URL the user lands on after the lead form is submitted. */
  downloadHref: string;
  /** Filename suggested when the browser saves it (PDF only). */
  downloadFilename?: string;
};

export const resources: Resource[] = [
  {
    slug: "warm-up-de-dominio",
    title: "Las claves para hacer un buen warm-up de dominio",
    subtitle:
      "Por qué importa, qué hacer en las primeras 4 semanas y los errores que te cuestan meses recuperar.",
    language: "es",
    category: "Email Deliverability",
    format: "PDF",
    readingTime: "4 min",
    downloadHref: "/resources/warm-up-de-dominio.pdf",
    downloadFilename: "warm-up-de-dominio-mario-calvo.pdf",
    body: [
      {
        type: "p",
        text:
          "Cuando empiezas a enviar email desde un dominio nuevo, los ISPs (Gmail, Outlook, Yahoo) no te conocen. No saben si eres un sender legítimo o un spammer. Sin un warm-up correcto, tus campañas caen en spam, tu reputación de sender se hunde y, peor todavía, hasta tus transaccionales — confirmaciones de compra, password resets, recordatorios — pueden empezar a bloquearse.",
      },
      {
        type: "p",
        text:
          "El warm-up es el proceso de construir esa reputación de forma gradual. No es opcional: es la diferencia entre años de buena entregabilidad o meses de remontada.",
      },
      { type: "h2", text: "Por qué importa" },
      {
        type: "ul",
        items: [
          "Reputación de sender. Los ISPs guardan un score por dominio y por IP. Sube poco a poco con buenas prácticas y baja rápido con malas. Una vez que entras a una denylist como Spamhaus o SORBS, recuperarse exige semanas y cambios estructurales.",
          "Engagement como señal principal. Gmail mide qué porcentaje de tus mails se abren, se contestan o se marcan como spam en los primeros minutos. Si en tu primer envío de 5.000 emails solo el 5% abre, el algoritmo lo lee como spam.",
          "Protección del transaccional. Si mezclas marketing y transaccional en el mismo dominio sin separarlos, una bajada de reputación en marketing arrastra al transaccional. Eso son pedidos sin confirmación, resets que nunca llegan y un coste directo de soporte.",
        ],
      },
      { type: "h2", text: "El framework de 4 semanas" },
      {
        type: "p",
        text:
          "La progresión clásica para un dominio nuevo. Ajusta los volúmenes a tu tamaño de lista — lo importante es el ratio de crecimiento, no los números absolutos.",
      },
      {
        type: "ul",
        items: [
          "Semana 1 — 50 a 200 envíos al día solo a tu segmento más engaged (gente que ha interactuado en los últimos 30 días). Objetivo: open rate >40%, bounce <1%, spam complaints <0,05%.",
          "Semana 2 — 500 a 2.000 envíos al día. Añade un segundo tier de engagement (activos en los últimos 60 días). Mantén la calidad del contenido muy alta.",
          "Semana 3 — 5.000 a 10.000 envíos al día. Empieza a mezclar segmentos lukewarm. Monitoriza Google Postmaster Tools a diario.",
          "Semana 4 — Volumen completo. Vigila bounce, spam complaints, open rate y la reputación del dominio. Si algo se mueve, baja volumen un escalón.",
        ],
      },
      { type: "h2", text: "Señales que tienes que vigilar" },
      {
        type: "ul",
        items: [
          "Bounce rate < 2%",
          "Spam complaints < 0,1%",
          "Open rate > 20% durante warm-up",
          "Reputación en Google Postmaster Tools en Medium o High, nunca Low",
          "Inbox placement > 85% (usa GlockApps o un test parecido)",
        ],
      },
      { type: "h2", text: "Errores comunes" },
      {
        type: "ul",
        items: [
          "Empezar a volumen completo. Es el error nº1. Mata el dominio en 48 horas.",
          "Lista vieja sin limpiar. Si llevas 6 meses sin enviar, depura primero (Kickbox, NeverBounce). Cada bounce duro daña la reputación.",
          "No tener SPF, DKIM y DMARC bien configurados. Sin esto los ISPs te tratan automáticamente como sospechoso.",
          "Mezclar transaccional y marketing en el mismo subdominio. Sepáralos: mail.tudominio.com para marketing, notifications.tudominio.com para transaccional.",
          "No mirar Postmaster Tools. Es gratis, da datos reales de Google. Si lo ignoras, vuelas a ciegas.",
        ],
      },
      {
        type: "quote",
        text:
          "Warm-up bien hecho son 4 semanas de paciencia. Hecho mal son meses de remontada y el revenue perdido en transaccionales bloqueados.",
      },
    ],
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}
