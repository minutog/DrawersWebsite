export default function Nav() {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(250,241,238,0.82)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26,20,12,0.08)',
        padding: '18px 64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/drawers-wordmark.png" alt="Drawers" style={{ height: 28 }} />
      </div>
      <div style={{ display: 'flex', gap: 36, fontSize: 15 }}>
        <a href="#why" style={{ textDecoration: 'none' }}>Why</a>
        <a href="#how" style={{ textDecoration: 'none' }}>How it works</a>
        <a href="#manifesto" style={{ textDecoration: 'none' }}>Manifesto</a>
        <a href="#faq" style={{ textDecoration: 'none' }}>FAQ</a>
      </div>
      <a
        href="https://wwwkieran.github.io/DrawersReleases/Drawers.dmg"
        style={{
          fontSize: 14,
          fontWeight: 500,
          padding: '10px 20px',
          background: 'var(--ink)',
          color: 'var(--cream)',
          borderRadius: 999,
          textDecoration: 'none',
          letterSpacing: 0.2,
        }}
      >
        ↓ Download for Mac
      </a>
    </nav>
  );
}
