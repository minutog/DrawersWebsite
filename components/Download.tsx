import EmojiPhysics, { EMOJIS } from './EmojiPhysics';
import EmailForm from './EmailForm';

export default function Download() {
  return (
    <section
      id="download"
      style={{
        position: 'relative',
        padding: '180px 64px 140px',
        background: 'var(--paper)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(26,20,12,0.08)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <EmojiPhysics
          assets={EMOJIS}
          count={12}
          minSize={80}
          maxSize={150}
          seed={909}
        />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1000,
          marginInline: 'auto',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <h2
          className="serif"
          style={{
            fontSize: 120,
            lineHeight: 0.95,
            margin: 0,
            textWrap: 'balance',
          }}
        >
          Flow
          <br />
          <span className="ital">without distractions</span>
          <br />
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 20 }}>
            with{' '}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/drawers-wordmark.png"
              alt="Drawers"
              style={{ height: 86, transform: 'translateY(10px)' }}
            />
          </span>
        </h2>
        <div style={{ marginTop: 56 }}>
          <EmailForm />
        </div>
        <div
          className="mono-label"
          style={{
            marginTop: 120,
            display: 'flex',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
          }}
        >
          <span>Drawers · Toronto, ON</span>
          <span>@drawers.computer</span>
          <span>hello@drawers.computer</span>
          <span>© 2026</span>
        </div>
      </div>
    </section>
  );
}
