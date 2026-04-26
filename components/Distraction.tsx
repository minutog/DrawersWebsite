export default function Distraction() {
  return (
    <section
      id="demo"
      style={{
        padding: '140px 64px 160px',
        background: 'var(--paper-warm)',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1280, marginInline: 'auto', textAlign: 'center' }}>
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          The idea, in one breath
        </div>
        <h2
          className="serif"
          style={{
            fontSize: 104,
            lineHeight: 0.96,
            marginTop: 18,
            marginBottom: 28,
            maxWidth: 1100,
            marginInline: 'auto',
            textWrap: 'balance',
          }}
        >
          One <span className="ital">drawer</span> per project.
          <br />
          <span style={{ color: 'var(--accent)' }}>Nothing</span> else in the way.
        </h2>
        <p
          style={{
            fontSize: 21,
            lineHeight: 1.5,
            color: 'var(--ink-soft)',
            maxWidth: 720,
            marginInline: 'auto',
            marginTop: 0,
            marginBottom: 64,
            textWrap: 'pretty',
          }}
        >
          Every project gets its own menu bar identity, dock, space, and set of artifacts.
          Switch projects, switch worlds. Close a drawer, close the noise.
        </p>

        <div
          style={{
            width: '100%',
            maxWidth: 970,
            marginInline: 'auto',
            borderRadius: 18,
            overflow: 'hidden',
            background: '#0d0906',
            aspectRatio: '960 / 620',
            filter: 'drop-shadow(0 30px 40px rgba(26,20,12,0.18))',
          }}
        >
          <video
            src="/DrawersTheMovie.mov"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  );
}
