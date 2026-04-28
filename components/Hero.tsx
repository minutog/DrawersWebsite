'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import EmojiPhysics, { EMOJIS } from './EmojiPhysics';
import HeroDemo from './HeroDemo';

const SubheadingGroup = forwardRef<HTMLDivElement>(function SubheadingGroup(_props, ref) {
  return (
    <div
      ref={ref}
      style={{
        position: 'sticky',
        bottom: 20,
        zIndex: 11,
        width: '100%',
        pointerEvents: 'none',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontSize: 22,
          color: 'var(--ink-soft)',
          margin: 0,
          maxWidth: 640,
          marginInline: 'auto',
          lineHeight: 1.45,
          textWrap: 'pretty',
        }}
      >
        A macOS interface layer that gives every project its own space. Switch projects,
        switch worlds. Close the rest.
      </p>
      <div
        className="hero-cta-row"
        style={{
          marginTop: 24,
          display: 'flex',
          gap: 14,
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
        <a
          className="download-desktop"
          href="https://wwwkieran.github.io/DrawersReleases/Drawers.dmg"
          style={{
            fontSize: 15,
            fontWeight: 500,
            padding: '16px 26px',
            background: 'var(--ink)',
            color: 'var(--cream)',
            borderRadius: 999,
            textDecoration: 'none',
            letterSpacing: 0.2,
          }}
        >
          ↓ Download for macOS
        </a>
        <a
          className="download-mobile"
          href="#download"
          style={{
            fontSize: 15,
            fontWeight: 500,
            padding: '16px 26px',
            background: 'var(--ink)',
            color: 'var(--cream)',
            borderRadius: 999,
            textDecoration: 'none',
            letterSpacing: 0.2,
            textAlign: 'center',
          }}
        >
          ↓ Send to my Mac
        </a>
        <button
          type="button"
          className="watch-demo-btn"
          onClick={() => {
            document
              .getElementById('demo-video')
              ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }}
          style={{
            fontSize: 15,
            fontWeight: 500,
            padding: '16px 24px',
            background: 'transparent',
            color: 'var(--ink)',
            border: '1.5px solid var(--ink)',
            borderRadius: 999,
            textDecoration: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          ▶ Watch 45s demo
        </button>
      </div>
      <div className="mono-label" style={{ marginTop: 16, pointerEvents: 'auto' }}>
        Free · macOS 14+ · Local-first · No account
      </div>
    </div>
  );
});

export default function Hero() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [mode, setMode] = useState<'physics' | 'lined'>('physics');
  const [revealOpacity, setRevealOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [headingTopPad, setHeadingTopPad] = useState(40);
  const [heroMinHeight, setHeroMinHeight] = useState<number | null>(null);
  const lineTargetRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subheadingRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  // Visual block extent below lineTargetRef = emoji radius + label gap (14) + label line-height (~14).
  // Mirrors EmojiPhysics.tsx uniformSize/labels.
  const belowLineExtent = isMobile ? 60 : 83;
  useEffect(() => {
    const compute = () => {
      const heading = headingRef.current;
      const subheading = subheadingRef.current;
      const toggle = toggleRef.current;
      if (!heading || !subheading) return;
      const headingHeight = heading.getBoundingClientRect().height;
      const toggleHeight = toggle ? toggle.getBoundingClientRect().height : 51;
      const visualBlockHeight = toggleHeight + 70 + belowLineExtent;
      const subheadingHeight = subheading.getBoundingClientRect().height;
      // Top padding centers the heading vertically between the section top (y = nav height = 74) and the
      // sticky subheading's top when scrolled to the very top (viewport.bottom - 20 - subheadingHeight).
      const visibleH = window.innerHeight - 74;
      const centeredPad = Math.max(40, (visibleH - subheadingHeight - 20 - headingHeight) / 2);
      setHeadingTopPad(centeredPad);
      // Section min height ensures sticky's natural-flow rest position is exactly 40px below the labels:
      // headingTopPad + heading + 40 + visualBlock + 40 + subheading + 80 (bottom padding).
      setHeroMinHeight(centeredPad + headingHeight + 40 + visualBlockHeight + 40 + subheadingHeight + 80);
    };
    compute();
    window.addEventListener('resize', compute);
    const ros: ResizeObserver[] = [];
    [headingRef.current, subheadingRef.current, toggleRef.current].forEach((el) => {
      if (!el) return;
      const ro = new ResizeObserver(compute);
      ro.observe(el);
      ros.push(ro);
    });
    return () => {
      window.removeEventListener('resize', compute);
      ros.forEach((ro) => ro.disconnect());
    };
  }, [belowLineExtent]);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageLoaded(true);
      return;
    }
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  useEffect(() => {
    let pending: ReturnType<typeof setTimeout> | null = null;
    let lastTarget: 'physics' | 'lined' | null = null;
    const onScroll = () => {
      const fadeStart = 40;
      const fadeEnd = 220;
      const modeThreshold = 260;
      const y = window.scrollY;
      const op = Math.max(0, Math.min(1, (y - fadeStart) / (fadeEnd - fadeStart)));
      setRevealOpacity(op);
      const target: 'physics' | 'lined' = y >= modeThreshold ? 'lined' : 'physics';
      if (target === lastTarget) return;
      lastTarget = target;
      if (pending) clearTimeout(pending);
      pending = setTimeout(() => {
        setMode(target);
        pending = null;
      }, 220);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (pending) clearTimeout(pending);
    };
  }, []);
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        padding: `${headingTopPad}px 64px 80px`,
        minHeight: heroMinHeight
          ? `max(calc(100vh - 74px), ${Math.ceil(heroMinHeight)}px)`
          : 'calc(100vh - 74px)',
        textAlign: 'center',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <EmojiPhysics
          assets={EMOJIS}
          count={8}
          minSize={140}
          maxSize={240}
          seed={7}
          mode={mode}
          lineTargetRef={lineTargetRef}
        />
      </div>
      <h1
        ref={headingRef}
        className="serif"
        style={{
          position: 'relative',
          zIndex: 10,
          pointerEvents: 'none',
          fontSize: 'clamp(84px, 10.3vw, 148px)',
          lineHeight: 1,
          margin: 0,
          marginInline: 'auto',
          maxWidth: 1300,
          textAlign: 'center',
        }}
      >
        <div className="hero-flow-line" style={{ fontSize: 'clamp(102px, 12.3vw, 176px)' }}>
          <span className={`flow-highlight flow-highlight--off${pageLoaded ? ' is-loaded' : ''}`}>
            <svg
              className="flow-highlight-svg"
              viewBox="0 0 600 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="flow-rough-1" x="-3%" y="-25%" width="106%" height="150%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.018 0.06" numOctaves="2" seed="3" />
                  <feDisplacementMap in="SourceGraphic" scale="14" />
                </filter>
                <filter id="flow-rough-2" x="-3%" y="-25%" width="106%" height="150%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.025 0.07" numOctaves="2" seed="11" />
                  <feDisplacementMap in="SourceGraphic" scale="10" />
                </filter>
                <linearGradient id="flow-ink" x1="0" y1="0.2" x2="1" y2="0.7">
                  <stop offset="0%" stopColor="#ffcdb8" stopOpacity="0.35" />
                  <stop offset="12%" stopColor="#ffa48a" stopOpacity="0.78" />
                  <stop offset="50%" stopColor="#ff8a6e" stopOpacity="0.85" />
                  <stop offset="88%" stopColor="#ffa48a" stopOpacity="0.78" />
                  <stop offset="100%" stopColor="#ffd0bd" stopOpacity="0.32" />
                </linearGradient>
                <linearGradient id="flow-streak" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0.22" />
                  <stop offset="70%" stopColor="#d96a4f" stopOpacity="0" />
                  <stop offset="100%" stopColor="#c4513a" stopOpacity="0.18" />
                </linearGradient>
              </defs>
              <rect
                x="10"
                y="22"
                width="580"
                height="116"
                fill="url(#flow-ink)"
                filter="url(#flow-rough-1)"
                rx="4"
              />
              <rect
                x="14"
                y="28"
                width="572"
                height="104"
                fill="url(#flow-streak)"
                filter="url(#flow-rough-2)"
                rx="4"
              />
            </svg>
            <span className="flow-highlight-text">Flow</span>
          </span>
        </div>
        <div
          style={{
            fontStyle: 'italic',
            fontFamily: "var(--font-instrument), 'Instrument Serif', serif",
            fontWeight: 400,
            marginTop: -8,
          }}
        >
          without distractions
        </div>
        <div
          className="hero-with-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            marginTop: -8,
          }}
        >
          with{' '}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/drawers-wordmark.png"
            alt="Drawers"
            style={{ height: 'clamp(84px, 10.3vw, 148px)', display: 'block' }}
          />
        </div>
      </h1>
      <HeroDemo
        mode={mode}
        onModeChange={setMode}
        revealOpacity={revealOpacity}
        toggleRef={toggleRef}
        lineTargetRef={lineTargetRef}
        style={{ position: 'relative', zIndex: 10, marginTop: 40 }}
      />
      {/* Reserves vertical room for the emoji + label area (overlaid by EmojiPhysics) plus the 40px gap to the subheading. */}
      <div aria-hidden style={{ height: belowLineExtent + 40 }} />
      <SubheadingGroup ref={subheadingRef} />
    </section>
  );
}
