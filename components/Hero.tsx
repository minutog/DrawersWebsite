import EmojiPhysics, { EMOJIS } from './EmojiPhysics';

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 820,
        padding: '80px 64px 120px',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <EmojiPhysics
          assets={EMOJIS}
          count={14}
          minSize={140}
          maxSize={240}
          seed={7}
        />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          paddingTop: 60,
        }}
      >
        <h1
          className="serif"
          style={{
            fontSize: 168,
            lineHeight: 0.9,
            margin: 0,
            maxWidth: 1300,
            marginInline: 'auto',
          }}
        >
          Flow
          <br />
          <span
            style={{
              fontStyle: 'italic',
              fontFamily: "var(--font-instrument), 'Instrument Serif', serif",
              fontWeight: 400,
            }}
          >
            without&nbsp;distractions
          </span>
          <br />
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 28 }}>
            with{' '}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/drawers-wordmark.png"
              alt="Drawers"
              style={{ height: 180, transform: 'translateY(20px)' }}
            />
          </span>
        </h1>
        <p
          style={{
            fontSize: 22,
            color: 'var(--ink-soft)',
            marginTop: 60,
            maxWidth: 640,
            marginInline: 'auto',
            lineHeight: 1.45,
            textWrap: 'pretty',
          }}
        >
          A macOS interface layer that gives every project its own space. Switch projects,
          switch worlds. Close the rest.
        </p>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}
        >
          <a
            href="https://wwwkieran.github.io/DrawersReleases/Drawers.dmg"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: '16px 26px',
              background: 'var(--ink)',
              color: 'var(--cream)',
              borderRadius: 999,
              textDecoration: 'none',
              letterSpacing: 0.2,
            }}
          >
            ↓ Download for macOS
          </a>
          <a
            href="#demo"
            style={{
              fontSize: 15,
              fontWeight: 500,
              padding: '16px 24px',
              background: 'transparent',
              color: 'var(--ink)',
              border: '1.5px solid var(--ink)',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            ▶ Watch 45s demo
          </a>
        </div>
        <div className="mono-label" style={{ marginTop: 24, pointerEvents: 'auto' }}>
          Free · macOS 14+ · Local-first · No account
        </div>
        <div
          style={{
            marginTop: 32,
            fontStyle: 'italic',
            fontFamily: "var(--font-instrument), 'Instrument Serif', serif",
            fontSize: 18,
            color: 'var(--muted)',
            pointerEvents: 'auto',
          }}
        >
          (go on — grab one and throw it)
        </div>
      </div>
    </section>
  );
}
