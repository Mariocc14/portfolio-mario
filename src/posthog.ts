import posthog from 'posthog-js';

posthog.init('phc_QPwTqqZbVEIwjiRz7bRvM2W8PXmBEgyjpIjHLq0zJQH', {
  api_host: 'https://eu.i.posthog.com',
  defaults: '2026-05-30',
  person_profiles: 'identified_only',
  persistence: 'memory',
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: true,
  disable_session_recording: true,
  loaded: (ph) => ph.register({ site: 'marioclv', domain: window.location.hostname }),
});

document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
  if (!target) return;
  const href = target.getAttribute('href') ?? '';
  if (href.startsWith('mailto:') || href.includes('linkedin.com')) {
    posthog.capture('contact_cta_clicked', {
      site: 'marioclv',
      destination: href.startsWith('mailto:') ? 'email' : 'linkedin',
      source_path: window.location.pathname,
    });
  }
});

export function captureEvent(name: string, properties: Record<string, unknown> = {}) {
  posthog.capture(name, { site: 'marioclv', domain: window.location.hostname, ...properties });
}

export default posthog;
