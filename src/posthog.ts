import type { PostHog } from 'posthog-js';

/* This module is also pulled into the build-time prerender, which runs in Node with no
   window and no document. Everything with a side effect is guarded.

   posthog-js is loaded after the page has finished loading and the main thread is idle,
   not in the main bundle: it was the largest thing standing between the first byte and
   the largest paint on the home page. The events and their properties are the same as
   before; anything captured before the library arrives is queued (with its properties
   read at the moment it happened) and sent as soon as it loads. A click before then
   starts the load straight away instead of waiting for idle time. */
const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

type Queued = [name: string, properties: Record<string, unknown>];
const queue: Queued[] = [];
let client: PostHog | null = null;
let loading: Promise<void> | null = null;

function load(): Promise<void> {
  if (loading) return loading;
  loading = import('posthog-js').then(({ default: posthog }) => {
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
    client = posthog;
    for (const [name, properties] of queue.splice(0)) posthog.capture(name, properties);
  });
  return loading;
}

function capture(name: string, properties: Record<string, unknown>) {
  if (client) {
    client.capture(name, properties);
    return;
  }
  queue.push([name, properties]);
  void load();
}

if (inBrowser) {
  const whenIdle = () => {
    const ric = (window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (ric) ric(() => void load(), { timeout: 3000 });
    else setTimeout(() => void load(), 1500);
  };
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });
}

if (inBrowser) document.addEventListener('click', (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>('a,button,[role="button"]');
  if (!target) return;
  const href = target.getAttribute('href') ?? '';
  const label = target.dataset.analyticsName
    || target.getAttribute('aria-label')
    || target.textContent?.replace(/\s+/g, ' ').trim()
    || target.getAttribute('title')
    || target.id
    || href
    || 'CTA sin nombre';
  capture('cta_clicked', {
    site: 'marioclv',
    domain: window.location.hostname,
    button_name: label.slice(0, 100),
    element_type: target.tagName.toLowerCase(),
    destination: href.split('?')[0],
    source_path: window.location.pathname,
  });
  if (href.startsWith('mailto:') || href.includes('linkedin.com')) {
    capture('contact_cta_clicked', {
      site: 'marioclv',
      destination: href.startsWith('mailto:') ? 'email' : 'linkedin',
      source_path: window.location.pathname,
    });
  }
});

export function captureEvent(name: string, properties: Record<string, unknown> = {}) {
  if (!inBrowser) return;
  capture(name, { site: 'marioclv', domain: window.location.hostname, ...properties });
}
