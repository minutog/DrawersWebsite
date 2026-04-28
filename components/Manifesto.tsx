export default function Manifesto() {
  return (
    <section
      id="manifesto"
      style={{
        padding: '160px 64px',
        background: 'var(--paper)',
        borderTop: '1px solid rgba(26,20,12,0.08)',
      }}
    >
      <div style={{ maxWidth: 900, marginInline: 'auto' }}>
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          A note from the makers
        </div>
        <p
          className="serif"
          style={{
            fontSize: 'clamp(32px, 3.3vw, 42px)',
            lineHeight: 1.15,
            marginTop: 24,
            marginBottom: 32,
            textWrap: 'pretty',
          }}
        >
          We built Drawers because we were tired of ending days{' '}
          <span className="ital" style={{ color: 'var(--accent)' }}>
            exhausted
          </span>{' '}
         from context switching and constant distraction.
        </p>
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
            marginTop: 24,
          }}
        >
          The research is clear: people love being in the flow.
            But normal macOS doesn't invite flow; it forces distraction and work fragmentation.
        </p>
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
            marginTop: 24,
          }}
        >
          Existing tools treat symptoms. Focus modes nag, site blockers fight, Pomodoros
          count. None of them fix the thing underneath — that your OS doesn't know your projects, and can't
          help you get and stay in the flow.
        </p>

        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 48,
          }}
        >
          <div style={{ flex: 1 }}>
            <p
              className="serif"
              style={{
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                lineHeight: 1.25,
                margin: 0,
                fontStyle: 'italic',
                fontWeight: 400,
                textWrap: 'balance',
              }}
            >
              We don&rsquo;t want to make you more productive.
              We want to get you in the{' '}
              <span className="ital" style={{ color: 'var(--accent)' }}>
                flow
              </span>{' '}
              so you can feel more alive!
            </p>
            <div
              className="serif"
              style={{ fontStyle: 'italic', fontSize: 22, lineHeight: 1.2, marginTop: 32 }}
            >
              — Gonzalo &amp; Kieran
            </div>
            <div className="mono-label" style={{ marginTop: 6 }}>
                Creators of Drawers
            </div>
          </div>
          <img
            src="/makers.jpeg"
            alt="Gonzalo and Kieran, the makers of Drawers"
            style={{
              width: 340,
              height: 'auto',
              borderRadius: 8,
              border: '1px solid rgba(26,20,12,0.08)',
              display: 'block',
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </section>
  );
}
