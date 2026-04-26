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
            fontSize: 48,
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
          without remembering what we&rsquo;d actually done.
        </p>
        <p
          style={{
            fontSize: 20,
            lineHeight: 1.6,
            color: 'var(--ink-soft)',
            marginTop: 24,
          }}
        >
          The research is clear: the brain budgets energy by predicting what&rsquo;s next.
          Every task switch forces a fresh prediction. A day of fragmented work drains
          that budget long before the actual work does.
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
          count. None of them fix the thing underneath — that your OS sees every file and
          every app and every distraction as equal weight, floating on a single
          undifferentiated plane.
        </p>
        <p
          className="serif"
          style={{
            fontSize: 34,
            lineHeight: 1.25,
            marginTop: 48,
            fontStyle: 'italic',
            fontWeight: 400,
            textWrap: 'balance',
          }}
        >
          We don&rsquo;t want to make you more productive. We want to give you back the
          feeling of closing a drawer and knowing the rest of the world can wait.
        </p>
        <div className="mono-label" style={{ marginTop: 40 }}>
          — the Drawers team · a small studio in Toronto
        </div>
      </div>
    </section>
  );
}
