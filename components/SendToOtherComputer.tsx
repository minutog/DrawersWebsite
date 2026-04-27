'use client';

import { useState } from 'react';
import EmailForm from './EmailForm';

export default function SendToOtherComputer() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 56, textAlign: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          appearance: 'none',
          fontSize: 15,
          fontWeight: 500,
          padding: '14px 22px',
          background: 'transparent',
          color: 'var(--ink)',
          border: '1.5px solid var(--ink)',
          borderRadius: 999,
          cursor: 'pointer',
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          letterSpacing: 0.2,
        }}
      >
        Need to send to another computer?
      </button>
      {open && (
        <div
          style={{
            marginTop: 24,
            maxWidth: 560,
            marginInline: 'auto',
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: 'var(--ink-soft)',
              margin: '0 0 16px',
              lineHeight: 1.5,
            }}
          >
            We&rsquo;ll email the download link so you can open it on your Mac.
          </p>
          <EmailForm />
        </div>
      )}
    </div>
  );
}
