'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from '@posthog/react';
import { useEffect } from 'react';

// PostHog credentials are public — they ship in the static bundle either way,
// so there's no benefit to reading them from env.
const POSTHOG_TOKEN = 'phc_A57cyNr5suTRieFw4jYdsmDMytpPs6cdZ9wfREkKqHzM';
const POSTHOG_HOST = 'https://us.i.posthog.com';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    posthog.init(POSTHOG_TOKEN, {
      api_host: POSTHOG_HOST,
      defaults: '2026-01-30',
    });
  }, []);
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
