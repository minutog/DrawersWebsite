'use client';

import { useEffect, useState } from 'react';
import EmojiPhysics, { EMOJIS } from './EmojiPhysics';

export default function Hero() {
  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageLoaded(true);
      return;
    }
    const onLoad = () => setPageLoaded(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        height: 'calc(100vh - 74px)',
        minHeight: 720,
        padding: '0px 64px 20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <EmojiPhysics
          assets={EMOJIS}
          count={14}
          minSize={140}
          maxSize={240}
          seed={7}
        />
      </div>
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
       <div style={{ display: 'contents' }}>
        <div style={{ flex: 1 }} />
        <h1
          className="serif"
          style={{
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
        <div style={{ flex: 1 }} />
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
        {/*<div*/}
        {/*  style={{*/}
        {/*    marginTop: 32,*/}
        {/*    fontStyle: 'italic',*/}
        {/*    fontFamily: "var(--font-instrument), 'Instrument Serif', serif",*/}
        {/*    fontSize: 18,*/}
        {/*    color: 'var(--muted)',*/}
        {/*    pointerEvents: 'auto',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  (go on — grab one and throw it)*/}
        {/*</div>*/}
      </div>
    </section>
  );
}
