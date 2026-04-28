import Placeholder from './Placeholder';

const steps = [
  {
    t: 'Every project gets a drawer.',
    b: 'A drawer is its own menu bar identity, its own dock, its own space. Pull open a drawer and all the project context together with no noise.',
    shotLabel: 'Screenshot',
    shotNotes:
      'SPLIT SCREENSHOT —\nLEFT: a standard macOS desktop, cluttered (14 apps in dock, 3 badge unreads, mixed windows).\nRIGHT: same machine with a DIFFERENTLY-colored menubar (warm red) and a dock containing ONLY "Atlas launch" artifacts.\nAnnotations: "menubar identity", "per-project dock", "per-project Space".',
    media: '/how-1-project-drawer.mp4',
  },
  {
    t: 'Artifacts, not apps.',
    b: "Don't shortcut to Figma — shortcut to the one Figma file that matters. Not Slack, the #atlas-launch channel. Not Drive, the brief doc. Searching for resources invites distraction. Drawers keeps what you need right at your fingertips.",
    shotLabel: 'Screenshot · close-up',
    shotNotes:
      'CLOSE-UP on a drawer\'s dock — show NATIVE thumbnails (not app icons):\n• A real Figma file preview with a readable filename\n• A Google Doc with the title "Atlas GTM plan v3"\n• A person avatar with a presence dot\n• A Slack channel chip "#atlas-launch · 4"\n• A Loom thumbnail with duration 02:14\nCallouts: "file, not app · channel, not workspace · person, not app".',
    media: '/how-2-artifacts.mp4',
  },
  {
    t: 'What happens in a drawer stays in a drawer.',
    b: 'Need Chrome for 3 projects? Don\'t mix up your tabs. Drawers integrates with your applications so that you get a fresh window in each drawer.',
    shotLabel: 'Video loop · 6s',
    shotNotes:
      "VIDEO LOOP (~6s):\n1) Cursor drags a .fig file from Finder onto the drawer edge. Drawer glows softly. File appears as a live thumbnail inside the dock.\n2) Cursor drags a person's avatar from Messages onto the drawer. Same behaviour — avatar joins the dock with a presence dot.\n3) Loop back to start.",
    media: '/how-3-new-window.mp4',
  },
  {
    t: 'Swipe to switch.',
    b: 'A simple three-finger swipe switches between projects. Or, select your project from the menu bar. Drawers manages macOS spaces for you, so you can be sure there\'s a drawer for each project',
    shotLabel: 'Video loop · 4s',
    shotNotes:
      'VIDEO LOOP (~4s), POV of the menubar:\n• User clicks the drawer chip in the menubar. A panel opens listing three drawers with their colors.\n• User hovers "Personal." A subtle 0.4s delay plays + a small "switching..." animation before the desktop actually changes.\nOverlay caption at the end: "friction, on purpose."',
    media: '/how-4-swipe.mov',
  },
];

export default function HowSteps() {
  return (
    <section
      id="how"
      style={{
        padding: '160px 64px',
        background: 'var(--paper-warm)',
        borderTop: '1px solid rgba(26,20,12,0.08)',
      }}
    >
      <div style={{ maxWidth: 1280, marginInline: 'auto' }}>
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          How it works
        </div>
        <h2
          className="serif"
          style={{
            fontSize: 'clamp(56px, 6.1vw, 78px)',
            lineHeight: 0.98,
            marginTop: 18,
            marginBottom: 96,
            maxWidth: 1100,
            textWrap: 'balance',
          }}
        >
          Restructure the OS around <span className="ital">projects</span>, not
          applications.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 100 }}>
          {steps.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.1fr',
                gap: 72,
                alignItems: 'center',
                direction: i % 2 === 1 ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr' }}>
                <div className="mono-label" style={{ color: 'var(--accent)' }}>
                  Step {String(i + 1).padStart(2, '0')} / 05
                </div>
                <h3
                  className="serif"
                  style={{
                    fontSize: 52,
                    lineHeight: 1.05,
                    marginTop: 12,
                    marginBottom: 20,
                    textWrap: 'balance',
                  }}
                >
                  {s.t}
                </h3>
                <p
                  style={{
                    fontSize: 19,
                    lineHeight: 1.55,
                    color: 'var(--ink-soft)',
                    maxWidth: 520,
                    margin: 0,
                  }}
                >
                  {s.b}
                </p>
              </div>
              <div style={{ direction: 'ltr' }}>
                {s.media ? (
                  <div
                    style={{
                      aspectRatio: '1108 / 720',
                      borderRadius: 14,
                      overflow: 'hidden',
                      background: '#1a140c',
                      boxShadow: '0 30px 60px -20px rgba(26,20,12,0.25)',
                    }}
                  >
                    <video
                      src={s.media}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                ) : (
                  <Placeholder label={s.shotLabel} ratio="4/3" notes={s.shotNotes} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
