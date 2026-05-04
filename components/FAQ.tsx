const qs = [
  {
    q: 'How is this different from macOS Spaces or Stage Manager?',
    a: "Spaces tie apps to spaces, not projects to spaces. If Slack is open in Space 1 and you click Slack from the dock in Space 2, macOS yanks you back to Space 1 — because the system assumes one app belongs to one place. That breaks the moment you have two projects that both need Slack, or Chrome, or your editor: you end up sharing one window across projects, or fighting the OS to keep them apart.\n\nDrawers flips it. Each drawer is a project, and each project gets its own dock — populated only with the things this project actually needs. You can add specific links to the dock: a single Slack channel instead of all of Slack, the three files for this project instead of your whole Documents folder, the two websites you actually use. And every app you open from a drawer opens in its own project-scoped window — open Chrome in two drawers and you get two Chrome windows, each pinned to that project's conversation, instead of macOS dragging you back to the other space. Spaces puts apps in boxes. Drawers puts projects in boxes.",
  },
  {
    q: 'How does this actually help me focus?',
    a: "Distraction usually isn't a willpower problem — it's a surface-area problem. Open Slack to message one person and you see twelve other conversations. Open Chrome and your other project's tabs are right there. Drawers shrinks the surface to just what this project needs: the channels you pinned, the files you pinned, a browser window with only this project's tabs. Less in front of you means less to pull you away, and getting back into a project takes seconds because everything is already laid out where you left it.",
  },
  {
    q: 'Does it work with my apps?',
    a: "Yes. If the app runs on macOS and has files, links, or channels, it can live in a drawer. You don't install anything app-side — Drawers points at things that already exist (a file path, a Slack URL, a website) and opens them in a window scoped to the current project.",
  },
  {
    q: 'Will I have to reorganize how I work?',
    a: "No. Drawers sits on top of macOS — it uses Apple's existing Spaces and menubar APIs and coordinates them around projects. Your apps, files, and shortcuts don't change. You add a drawer when you want one and ignore it when you don't.",
  },
  {
    q: 'Is my data safe?',
    a: "Drawers is local-first. Everything lives on your Mac — no account, no sync, no server. Drawers stores pointers (paths and URLs) to things you already have; it doesn't copy your files or read your messages. We collect light anonymous usage stats (drawer count, switch frequency — that kind of thing) to figure out what's working. No file contents, no message contents, nothing personally identifying. Opt-out toggle in settings.",
  },
  {
    q: 'Is it free?',
    a: 'Yes.',
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
                {it.a.split('\n\n').map((para, j) => (
                  <p
                    key={j}
                    style={{
                      fontSize: 17,
                      lineHeight: 1.55,
                      color: 'var(--ink-soft)',
                      margin: j === 0 ? 0 : '12px 0 0',
                      maxWidth: 820,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
