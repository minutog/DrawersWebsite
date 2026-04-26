import EmojiPhysics, { EMOJIS } from './EmojiPhysics';

const rows = [
  {
    n: '01',
    stat: '9.8',
    statLabel: 'spheres of work',
    statNote: 'the average information worker juggles per day',
    cite: 'Gonzalez & Mark, 2004',
    causeH: 'Fragmented project data.',
    causeB:
      'A single project lives across Slack, Jira, Docs, Figma, Notes, and email. No app owns the whole thing — so the worker becomes the integration layer.',
  },
  {
    n: '02',
    stat: '11:28',
    statLabel: 'minutes per sphere',
    statNote: 'before a switch away to another context',
    cite: 'Gonzalez & Mark, 2004',
    causeH: 'Mental reconstruction burden.',
    causeB:
      'Every switch in, you rebuild the map: which tools, which files, which conversations belong to this project. The cost is paid every eleven minutes.',
  },
  {
    n: '03',
    stat: 'residue',
    statLabel: 'follows every switch',
    statNote:
      'part of your attention stays on the last task, degrading the next',
    cite: 'Leroy, 2009',
    causeH: 'Distraction is one click. Focus is fifteen.',
    causeB:
      'Entertainment sits in the same dock, with the same weight, as the tools that pay your rent. The OS treats them as equals — your nervous system pays the difference.',
  },
];

export default function Why() {
  return (
    <section
      id="why"
      style={{
        position: 'relative',
        padding: '160px 64px 180px',
        background: 'var(--paper)',
        borderTop: '1px solid rgba(26,20,12,0.08)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <EmojiPhysics
          assets={EMOJIS}
          count={8}
          minSize={70}
          maxSize={110}
          gravity={0.006}
          seed={41}
        />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 1200,
          marginInline: 'auto',
          pointerEvents: 'none',
        }}
      >
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          Why this matters
        </div>
        <h2
          className="serif"
          style={{
            fontSize: 92,
            lineHeight: 0.98,
            marginTop: 18,
            marginBottom: 0,
            maxWidth: 1200,
            textWrap: 'balance',
          }}
        >
          Your OS thinks every app, every file, and every notification weighs{' '}
          <span className="ital">exactly the same.</span>
        </h2>
        <p
          style={{
            fontSize: 22,
            lineHeight: 1.5,
            marginTop: 32,
            maxWidth: 820,
            color: 'var(--ink-soft)',
          }}
        >
          It doesn&rsquo;t. Decades of research show three structural failures, each
          measurable, each compounding. Focus modes and site blockers are patches.{' '}
          <span className="ital">The structure itself is the problem.</span>
        </p>

        <div
          style={{
            marginTop: 110,
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '0.85fr 1.15fr',
                columnGap: 80,
                padding: '56px 0',
                borderTop: '1px solid rgba(26,20,12,0.14)',
                borderBottom:
                  i === rows.length - 1 ? '1px solid rgba(26,20,12,0.14)' : 'none',
                alignItems: 'start',
              }}
            >
              <div style={{ pointerEvents: 'none' }}>
                <div className="mono-label" style={{ color: 'var(--muted)' }}>
                  Finding · {r.n}
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: 104,
                    lineHeight: 0.95,
                    fontWeight: 400,
                    marginTop: 14,
                    color: 'var(--ink)',
                  }}
                >
                  {r.stat}
                </div>
                <div
                  className="ital"
                  style={{ fontSize: 26, color: 'var(--accent)', marginTop: 8 }}
                >
                  {r.statLabel}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: 'var(--ink-soft)',
                    marginTop: 14,
                    lineHeight: 1.5,
                    maxWidth: 320,
                  }}
                >
                  {r.statNote}
                </div>
                <div
                  className="mono-label"
                  style={{
                    marginTop: 14,
                    letterSpacing: 0.15,
                    color: 'var(--muted)',
                  }}
                >
                  — {r.cite}
                </div>
              </div>
              <div
                style={{
                  pointerEvents: 'auto',
                  borderLeft: '2px solid var(--accent)',
                  paddingLeft: 36,
                  paddingTop: 8,
                }}
              >
                <div className="mono-label" style={{ color: 'var(--accent)' }}>
                  What the OS does wrong
                </div>
                <h3
                  className="serif"
                  style={{
                    fontSize: 36,
                    lineHeight: 1.15,
                    marginTop: 14,
                    marginBottom: 18,
                    fontWeight: 400,
                    textWrap: 'balance',
                  }}
                >
                  {r.causeH}
                </h3>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: 'var(--ink-soft)',
                    margin: 0,
                    maxWidth: 560,
                  }}
                >
                  {r.causeB}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 96,
            padding: '40px 48px',
            background: 'rgba(26,20,12,0.04)',
            border: '1px dashed rgba(26,20,12,0.25)',
            borderRadius: 8,
            maxWidth: 1060,
          }}
        >
          <div className="mono-label" style={{ color: 'var(--accent)' }}>
            Allostasis, briefly
          </div>
          <p
            className="serif"
            style={{
              fontSize: 32,
              lineHeight: 1.28,
              margin: '14px 0 28px',
              fontWeight: 400,
            }}
          >
            Flow moments produce significantly more positive experience than non-flow
            moments. Yet modern computer work is{' '}
            <span className="ital">structurally hostile</span> to sustaining them.
          </p>
          <div className="mono-label" style={{ color: 'var(--muted)' }}>
            — Csikszentmihalyi &amp; LeFevre, 1989
          </div>
        </div>
      </div>
    </section>
  );
}
