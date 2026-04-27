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
            fontSize: 'clamp(60px, 7.2vw, 92px)',
            lineHeight: 0.96,
            marginTop: 18,
            marginBottom: 64,
            maxWidth: 1100,
            marginInline: 'auto',
            textWrap: 'balance',
          }}
        >
          One <span className="ital">drawer</span> per project.
          <br />
          <span style={{ color: 'var(--accent)' }}>Nothing</span> else in the way.
        </h2>

        <div className="distraction-row">
          <div id="demo-video" className="distraction-video" style={{ scrollMarginBottom: 20 }}>
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
          <p className="distraction-copy">
            Every project gets its own dock, space, and set of artifacts.
            Switch projects, switch worlds.
          </p>
        </div>
      </div>
    </section>
  );
}
