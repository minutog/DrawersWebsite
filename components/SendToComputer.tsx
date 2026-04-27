'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

const APPS_SCRIPT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbx8i-Om1UcBBqiHQSE9zu9luzWF9z3Fceo-ssA3196iouvjc0ZQdJIuuh3lZdfyoPmNYg/exec';
const FALLBACK_ENDPOINT = 'https://formsubmit.co/ajax/gonzalominuto@gmail.com';
const FRAME_NAME = 'drawers-mobile-target';
const SOURCE = 'Drawers website (mobile)';
const SUBJECT = 'Drawers download link request';
const SHARE_URL = 'https://drawers.computer';

type OptionId = 'airdrop' | 'email' | 'share';
type EmailStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function SendToComputer() {
  const [picked, setPicked] = useState<OptionId | null>(null);

  const invokeNativeShare = async () => {
    const data = {
      title: 'Drawers',
      text: 'Open this on your Mac to download Drawers.',
      url: SHARE_URL,
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // user cancelled — fall through to copy fallback
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(SHARE_URL);
      } catch {
        // ignore
      }
    }
  };

  const handlePick = (id: OptionId) => {
    if (id === 'email') {
      setPicked('email');
      return;
    }
    void invokeNativeShare();
  };

  const options: {
    id: OptionId;
    glyph: string;
    title: string;
    blurb: string;
  }[] = [
    {
      id: 'airdrop',
      glyph: '📡',
      title: 'AirDrop to your Mac',
      blurb: "Both devices on the same Apple ID? It's already nearby.",
    },
    {
      id: 'email',
      glyph: '✉️',
      title: 'Email yourself the link',
      blurb: 'Old school, works everywhere. Open the link on your Mac.',
    },
    {
      id: 'share',
      glyph: '🔗',
      title: 'Share to anywhere',
      blurb: 'iMessage, Slack DM, Notes — wherever your Mac will see it.',
    },
  ];

  return (
    <>
      <p
        className="ital"
        style={{
          fontSize: 18,
          marginTop: 22,
          color: 'var(--ink-soft)',
          textAlign: 'center',
          pointerEvents: 'auto',
        }}
      >
        Drawers is a Mac app, but you&rsquo;re on your phone.
      </p>
      <p
        style={{
          fontSize: 15,
          marginTop: 6,
          color: 'var(--muted)',
          lineHeight: 1.5,
          textAlign: 'center',
          pointerEvents: 'auto',
        }}
      >
        Pick the way that gets it from here to your computer fastest:
      </p>

      <div
        style={{
          marginTop: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          pointerEvents: 'auto',
          textAlign: 'left',
        }}
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => handlePick(o.id)}
            style={{
              appearance: 'none',
              border: '1px solid rgba(26,20,12,0.12)',
              background: 'var(--paper-warm)',
              borderRadius: 16,
              padding: '16px 16px',
              display: 'grid',
              gridTemplateColumns: '46px 1fr 18px',
              gap: 14,
              alignItems: 'center',
              textAlign: 'left',
              cursor: 'pointer',
              fontFamily: "var(--font-inter), 'Inter', sans-serif",
              color: 'var(--ink)',
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: 'var(--paper)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 24,
                boxShadow: '0 1px 0 rgba(26,20,12,0.06)',
              }}
            >
              {o.glyph}
            </div>
            <div>
              <div
                className="serif"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 2 }}
              >
                {o.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'var(--ink-soft)',
                  lineHeight: 1.4,
                }}
              >
                {o.blurb}
              </div>
            </div>
            <span style={{ fontSize: 22, color: 'var(--muted)' }}>›</span>
          </button>
        ))}
      </div>

      <div
        style={{
          marginTop: 36,
          padding: '18px 16px',
          background: 'var(--paper-warm)',
          border: '1px dashed rgba(26,20,12,0.18)',
          borderRadius: 12,
          textAlign: 'left',
          pointerEvents: 'auto',
        }}
      >
        <div className="mono-label" style={{ color: 'var(--muted)' }}>
          Or, the boring way
        </div>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.5,
            margin: '8px 0 0',
            color: 'var(--ink-soft)',
          }}
        >
          Open <span className="ital">drawers.computer</span> in Safari on your Mac. The download starts on its own.
        </p>
      </div>

      {picked === 'email' && (
        <Sheet onClose={() => setPicked(null)}>
          <EmailSheet />
        </Sheet>
      )}
    </>
  );
}

function Sheet({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(20,17,15,0.45)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        animation: 'sheet-fade .2s ease-out',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 480,
          maxWidth: '100%',
          background: 'var(--paper-warm)',
          borderRadius: '20px 20px 0 0',
          padding: '14px 22px 32px',
          animation: 'sheet-up .25s ease-out',
          boxShadow: '0 -8px 30px rgba(0,0,0,0.2)',
          color: 'var(--ink)',
        }}
      >
        <div
          style={{
            width: 40,
            height: 4,
            background: 'rgba(26,20,12,0.2)',
            borderRadius: 999,
            margin: '0 auto 18px',
          }}
        />
        {children}
        <button
          onClick={onClose}
          type="button"
          style={{
            width: '100%',
            marginTop: 18,
            appearance: 'none',
            border: 'none',
            background: 'transparent',
            color: 'var(--muted)',
            fontSize: 14,
            padding: 12,
            cursor: 'pointer',
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
          }}
        >
          Close
        </button>
      </div>
      <style>{`
        @keyframes sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes sheet-fade { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function EmailSheet() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const userAgentRef = useRef<HTMLInputElement | null>(null);
  const pendingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<EmailStatus>('idle');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userAgentRef.current && typeof navigator !== 'undefined') {
      userAgentRef.current.value = navigator.userAgent || '';
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const finishSuccess = () => {
    pendingRef.current = false;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          source: SOURCE,
          _subject: SUBJECT,
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        }),
      });
      if (res.ok) {
        finishSuccess();
        return;
      }
    } catch {
      // fall through
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
      if (pendingRef.current) tryFallback();
    }, 8000);
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '12px 0' }}>
        <div style={{ fontSize: 56, marginBottom: 14 }}>✉️</div>
        <p
          className="serif"
          style={{ fontSize: 22, margin: '0 0 8px', textWrap: 'balance' }}
        >
          Sent — check your inbox.
        </p>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
          Open the link on your Mac to start the download.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p
        className="serif"
        style={{ fontSize: 20, margin: '0 0 14px', textWrap: 'balance' }}
      >
        Where should we send it?
      </p>
      <form
        ref={formRef}
        action={APPS_SCRIPT_ENDPOINT}
        method="post"
        target={FRAME_NAME}
        onSubmit={onSubmit}
      >
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourmac.com"
          aria-label="Email"
          autoComplete="email"
          style={{
            width: '100%',
            appearance: 'none',
            border: '1px solid rgba(26,20,12,0.18)',
            borderRadius: 12,
            padding: '14px 16px',
            fontSize: 16,
            background: 'var(--paper)',
            fontFamily: "var(--font-inter), 'Inter', sans-serif",
            outline: 'none',
            color: 'var(--ink)',
          }}
        />
        <input type="hidden" name="source" value={SOURCE} />
        <input type="hidden" name="subject" value={SUBJECT} />
        <input type="hidden" name="userAgent" ref={userAgentRef} defaultValue="" />
        <button
          type="submit"
          disabled={!email || status === 'submitting'}
          style={{
            width: '100%',
            marginTop: 12,
            padding: '14px 18px',
            borderRadius: 999,
            background: email ? 'var(--ink)' : 'rgba(26,20,12,0.2)',
            color: 'var(--cream)',
            border: 'none',
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: 0.2,
            cursor: status === 'submitting' ? 'wait' : 'pointer',
            opacity: status === 'submitting' ? 0.7 : 1,
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send me Drawers →'}
        </button>
        <iframe
          ref={iframeRef}
          name={FRAME_NAME}
          title="Hidden submission target"
          onLoad={onIframeLoad}
          style={{ display: 'none' }}
        />
      </form>
      <p
        style={{
          fontSize: 12,
          color: 'var(--muted)',
          marginTop: 12,
          lineHeight: 1.4,
        }}
      >
        We&rsquo;ll email you the macOS installer link. No newsletter, no follow-up.
      </p>
      {status === 'error' && (
        <p
          className="mono-label"
          style={{ color: 'var(--accent)', marginTop: 8 }}
        >
          Couldn&rsquo;t send — try the share sheet instead.
        </p>
      )}
    </div>
  );
}

