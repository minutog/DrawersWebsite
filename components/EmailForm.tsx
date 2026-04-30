'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { DOWNLOAD_URL } from '../lib/constants';

const APPS_SCRIPT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx8i-Om1UcBBqiHQSE9zu9luzWF9z3Fceo-ssA3196iouvjc0ZQdJIuuh3lZdfyoPmNYg/exec';
const FALLBACK_ENDPOINT = 'https://formsubmit.co/ajax/gonzalominuto@gmail.com';
const SUBJECT = 'Drawers website download request';
const SOURCE = 'Drawers website';
const FRAME_NAME = 'drawers-request-target';
const SUBMIT_TIMEOUT_MS = 8000;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function EmailForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const userAgentRef = useRef<HTMLInputElement | null>(null);
  const pendingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userAgentRef.current && typeof navigator !== 'undefined') {
      userAgentRef.current.value = navigator.userAgent || '';
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const finishSuccess = () => {
    pendingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatus('success');
  };

  const onIframeLoad = () => {
    if (!pendingRef.current) return;
    finishSuccess();
  };

  const tryFallback = async () => {
    try {
      const res = await fetch(FALLBACK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          source: SOURCE,
          _subject: SUBJECT,
          userAgent:
            typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });
      if (res.ok) {
        finishSuccess();
        return;
      }
    } catch {
      // fall through to error state
    }
    pendingRef.current = false;
    setStatus('error');
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!email || !/.+@.+\..+/.test(email)) {
      e.preventDefault();
      return;
    }
    pendingRef.current = true;
    setStatus('submitting');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (pendingRef.current) {
        // No iframe load fired — try CORS-friendly fallback.
        tryFallback();
      }
    }, SUBMIT_TIMEOUT_MS);
    // Let the form submit natively to the hidden iframe.
  };

  if (status === 'success') {
    return (
      <div style={{ pointerEvents: 'auto' }}>
        <div
          className="serif"
          style={{
            display: 'inline-block',
            background: 'var(--cream)',
            padding: '20px 32px',
            borderRadius: 999,
            fontSize: 20,
            lineHeight: 1.3,
            border: '1px solid rgba(26,20,12,0.15)',
          }}
        >
          Check your inbox — we sent the download link.
        </div>
        <div className="mono-label" style={{ marginTop: 16 }}>
          Or grab the .dmg directly:{' '}
          <a
            href={DOWNLOAD_URL}
            style={{ color: 'var(--accent)' }}
          >
            Drawers.dmg ↓
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ pointerEvents: 'auto' }}>
      <form
        ref={formRef}
        action={APPS_SCRIPT_ENDPOINT}
        method="post"
        target={FRAME_NAME}
        onSubmit={onSubmit}
        style={{
          display: 'inline-flex',
          alignItems: 'stretch',
          gap: 0,
          background: 'var(--cream)',
          borderRadius: 999,
          padding: 6,
          border: '1px solid rgba(26,20,12,0.15)',
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="you@yourmac.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email"
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 16,
            padding: '14px 22px',
            minWidth: 300,
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            color: 'var(--ink)',
          }}
        />
        <input type="hidden" name="source" value={SOURCE} />
        <input type="hidden" name="subject" value={SUBJECT} />
        <input type="hidden" name="userAgent" ref={userAgentRef} defaultValue="" />
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            fontSize: 15,
            fontWeight: 500,
            padding: '14px 26px',
            background: 'var(--ink)',
            color: 'var(--cream)',
            border: 'none',
            borderRadius: 999,
            cursor: status === 'submitting' ? 'wait' : 'pointer',
            letterSpacing: 0.2,
            opacity: status === 'submitting' ? 0.7 : 1,
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send me Drawers →'}
        </button>
      </form>
      <div className="mono-label" style={{ marginTop: 16 }}>
        We&rsquo;ll email you the link so you can open it on your Mac.
      </div>
      {status === 'error' && (
        <div
          className="mono-label"
          style={{ marginTop: 12, color: 'var(--accent)' }}
        >
          Something went wrong — try the direct{' '}
          <a
            href={DOWNLOAD_URL}
            style={{ color: 'var(--accent)' }}
          >
            Drawers.dmg
          </a>{' '}
          download.
        </div>
      )}
      <iframe
        ref={iframeRef}
        name={FRAME_NAME}
        title="Hidden submission target"
        onLoad={onIframeLoad}
        style={{ display: 'none' }}
      />
    </div>
  );
}
