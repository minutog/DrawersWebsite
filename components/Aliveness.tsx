import EmojiPhysics, { EMOJIS } from './EmojiPhysics';

export default function Aliveness() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '180px 64px',
        background: 'var(--ink)',
        color: 'var(--cream)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(26,20,12,0.5)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.55 }}>
        <EmojiPhysics
          assets={EMOJIS}
          count={9}
          minSize={70}
          maxSize={130}
          gravity={0.005}
          seed={128}
        />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          marginInline: 'auto',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <p
          className="serif"
          style={{ fontSize: 72, lineHeight: 1.1, margin: 0 }}
        >
          Drawers brings
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/aliveness-wordmark.png"
          alt="Aliveness"
          style={{
            height: 130,
            margin: '32px auto 32px',
            display: 'block',
            filter: 'invert(0.95) hue-rotate(-10deg) brightness(1.1)',
          }}
        />
        <p
          className="serif"
          style={{
            fontSize: 48,
            lineHeight: 1.2,
            margin: 0,
            fontWeight: 300,
            maxWidth: 1000,
            marginInline: 'auto',
          }}
        >
          into macOS through simple, <span className="ital">intuitive</span> changes to
          its UI.
        </p>
        <p
          style={{
            fontSize: 18,
            color: '#d9cbb2',
            marginTop: 48,
            letterSpacing: 0.2,
          }}
        >
          Completely private. No data leaves your computer.
        </p>
      </div>
    </section>
  );
}
