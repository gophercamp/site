'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig, type SiteAlert } from '@/lib/config';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'gophercamp:dismissed-alerts';

const VARIANT_CLASSES: Record<NonNullable<SiteAlert['variant']>, string> = {
  info: 'bg-go-blue text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-amber-500 text-black',
  error: 'bg-red-600 text-white',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readDismissed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeDismissed(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore – private browsing etc.
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Renders dismissable alert banners via a React portal into `document.body`.
 *
 * The banner is `position: fixed` at the top of the viewport with a z-index
 * above the site header. It floats over the page without shifting any layout.
 * Dismissals are persisted in localStorage under `gophercamp:dismissed-alerts`.
 *
 * SSR-safe: nothing is rendered on the server to avoid hydration mismatches
 * with the localStorage state.
 */
export default function AlertBanner() {
  const [dismissed, setDismissed] = useState<Set<string>>(() =>
    typeof window === 'undefined' ? new Set() : readDismissed()
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  const dismiss = (id: string) => {
    const next = new Set(dismissed);
    next.add(id);
    setDismissed(next);
    writeDismissed(next);
  };

  if (!mounted) return null;

  const visible = siteConfig.alerts.filter(a => !dismissed.has(a.id));

  return createPortal(
    <div className="fixed top-0 left-0 right-0 z-[70]">
      <AnimatePresence initial={false}>
        {visible.map(alert => (
          <motion.div
            key={alert.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className={`flex items-center gap-3 px-4 py-2 text-sm font-medium ${VARIANT_CLASSES[alert.variant ?? 'info']}`}
              role="alert"
            >
              <p className="flex-1 text-center">
                {alert.message}
                {alert.link && (
                  <a
                    href={alert.link.href}
                    className="ml-2 underline underline-offset-2 font-semibold opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {alert.link.label} →
                  </a>
                )}
              </p>

              <button
                onClick={() => dismiss(alert.id)}
                aria-label="Dismiss alert"
                className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
}
