import EmojiPhysics, { EMOJIS } from './EmojiPhysics';

const consequences = [
  {
    n: '01',
    h: 'Your project lives across apps.',
    b: 'Slack, Jira, Docs, Figma, Notes, inbox — you’re the only thing holding it together.',
    img: '/why-01-fragmented.png',
    alt: 'A single project scattered across Slack, Jira, Docs, Figma, and Notes — connected by lines to one center point. ',
  },
  {
    n: '02',
    h: 'Project B distracts you while you’re working on A.',
    b: 'Every shared app mixes all your projects. Sidebar, tab strip, inbox — interleaved.',
    img: '/why-02-bleed.png',
    alt: 'A Slack sidebar with each conversation labeled by which project it belongs to — four different projects interleaved in one app.',
  },
  {
    n: '03',
    h: 'Distraction and focus weigh the same.',
    b: 'YouTube is one click. Your spreadsheet is one click. The dock sees no difference.',
    img: '/why-03-distraction.png',
    alt: 'A Netflix browser window next to an iMessage window — distraction apps one click away, same weight as work.',
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
          maxWidth: 1100,
          marginInline: 'auto',
          pointerEvents: 'none',
        }}
      >
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          The problem
        </div>
        <h2
          className="serif"
          style={{
            fontSize: 'clamp(56px, 6.7vw, 84px)',
            lineHeight: 0.98,
            marginTop: 18,
            marginBottom: 0,
            maxWidth: 1100,
            textWrap: 'balance',
          }}
        >
          macOS has apps and files. It doesn&rsquo;t have{' '}
          <span className="ital" style={{ color: 'var(--accent)' }}>
            projects.
          </span>{' '}
          {/*So everything gets <span className="ital">mixed together.</span>*/}
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
          You do, though. Your projects
          live in the only place macOS can&rsquo;t see: your head. Every app
          mixes them. Every notification interrupts them. The interface treats
          them as equals. Focus modes don&rsquo;t fix it.{' '}
          <span className="ital" style={{ color: 'var(--ink)' }}>
            That&rsquo;s a structural problem.
          </span>
        </p>

        <div
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
          }}
        >
          {consequences.map((c) => (
            <div key={c.n} style={{ pointerEvents: 'auto' }}>
              <img
                src={c.img}
                alt={c.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                  borderRadius: 14,
                  border: '1px solid rgba(26,20,12,0.15)',
                  boxShadow: '0 30px 60px -20px rgba(26,20,12,0.25)',
                  background: '#000',
                }}
              />
              <div
                className="mono-label"
                style={{ color: 'var(--muted)', marginTop: 24 }}
              >
                {c.n}
              </div>
              <h3
                className="serif"
                style={{
                  fontSize: 24,
                  lineHeight: 1.15,
                  fontWeight: 400,
                  margin: '10px 0 0',
                  textWrap: 'balance',
                  color: 'var(--ink)',
                }}
              >
                {c.h}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: 'var(--ink-soft)',
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                {c.b}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 80,
            pointerEvents: 'auto',
          }}
        >
          <div className="mono-label" style={{ color: 'var(--accent)' }}>
            Why this drains your energy
          </div>
          <p
            className="serif"
            style={{
              fontSize: 30,
              lineHeight: 1.32,
              fontWeight: 300,
              color: 'var(--ink)',
              margin: '18px 0 0',
              maxWidth: 820,
              textWrap: 'pretty',
            }}
          >
            Each time you switch projects, your brain rebuilds the picture
            from scratch — pulling Slack, the doc, the Figma, the half-formed
            plan back into one frame. It&rsquo;s not free. The brain pays for
            prediction, and a fragmented day forces it to pay over and over.{' '}
            <span className="ital">
              That&rsquo;s the cost you feel as exhaustion — not the work,
              the rebuild.
            </span>
          </p>
          <div
            className="mono-label"
            style={{ color: 'var(--muted)', marginTop: 24 }}
          >
            Gonzalez &amp; Mark, 2004 · Leroy, 2009 · Csikszentmihalyi &amp;
            LeFevre, 1989
          </div>
        </div>

        <p
          className="serif"
          style={{
            marginTop: 110,
            marginBottom: 0,
            fontSize: 'clamp(36px, 3.6vw, 46px)',
            lineHeight: 1.18,
            fontWeight: 300,
            color: 'var(--ink)',
            textWrap: 'balance',
            maxWidth: 1000,
          }}
        >
          Drawers gives macOS what it&rsquo;s missing:{' '}
          <span className="ital">projects.</span> Every project gets its own
          drawer — its own dock, its own apps, its own world.
        </p>
      </div>
    </section>
  );
}
