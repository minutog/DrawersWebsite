const qs = [
  {
    q: 'Is this a launcher? A desktop manager? A new Mission Control?',
    a: "None of those. Drawers is an interface layer on top of macOS — it uses Apple's existing APIs (Spaces, menubar) and coordinates them around projects. Nothing is replaced; it's additive.",
  },
  {
    q: 'Does it work with my apps?',
    a: "Yes. If the app runs on macOS and has files, links, or channels, it can live in a drawer.",
  },
  {
    q: 'Is it free?',
    a: 'Yes!',
  },
  {
    q: 'Is my data safe?',
    a: 'Drawers is local-first. Everything lives on your Mac.',
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      style={{
        padding: '160px 64px',
        background: 'var(--paper-warm)',
        borderTop: '1px solid rgba(26,20,12,0.08)',
      }}
    >
      <div style={{ maxWidth: 1040, marginInline: 'auto' }}>
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          Questions
        </div>
        <h2
          className="serif"
          style={{
            fontSize: 'clamp(44px, 5vw, 64px)',
            lineHeight: 1.02,
            marginTop: 18,
            marginBottom: 56,
          }}
        >
          A few things people ask.
        </h2>
        <div style={{ borderTop: '1px solid rgba(26,20,12,0.15)' }}>
          {qs.map((it, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid rgba(26,20,12,0.15)',
                padding: '32px 0',
                display: 'grid',
                gridTemplateColumns: '56px 1fr',
                gap: 24,
              }}
            >
              <div className="mono-label" style={{ marginTop: 6 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h4
                  className="serif"
                  style={{
                    fontSize: 28,
                    lineHeight: 1.2,
                    margin: '0 0 12px',
                    fontWeight: 500,
                  }}
                >
                  {it.q}
                </h4>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: 'var(--ink-soft)',
                    margin: 0,
                    maxWidth: 820,
                  }}
                >
                  {it.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
