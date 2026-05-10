'use client';

import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import EmojiPhysics, { EMOJIS } from './EmojiPhysics';
import HeroDemo from './HeroDemo';
import HeroFlipWord from './HeroFlipWord';
import HeroVideoSequence, { STEPS } from './HeroVideoSequence';
import { DOWNLOAD_URL } from '../lib/constants';
import {
  trackDownloadClicked,
  trackSendToMacIntentShown,
} from '../lib/analytics';

// ─── Tunable knobs ──────────────────────────────────────────────────────────
// Vertical spacing above the toggle (heading → toggle) and below the labels
// (labels → subheading). They share a single value so the block stays
// symmetrically padded.
const BLOCK_GUTTER = 60;
// Scroll-Y where the toggle starts fading in.
const REVEAL_FADE_START = 0;
// Scroll-Y where the toggle is fully opaque.
const REVEAL_FADE_END = 30;
// Scroll-Y at which physics mode flips to lined mode (emojis snap into a row).
const MODE_THRESHOLD = 100;
// Debounce (ms) before committing the mode flip after crossing the threshold.
const MODE_FLIP_DEBOUNCE_MS = 220;
// ────────────────────────────────────────────────────────────────────────────

interface SubheadingGroupProps {
  onWatchDemo: () => void;
}
const SubheadingGroup = forwardRef<HTMLDivElement, SubheadingGroupProps>(function SubheadingGroup({ onWatchDemo }, ref) {
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
          Drawers gives every project its own dock, its own space, and its own windows. Switch projects,
        switch worlds. Designed for maximum flow state.
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
          href={DOWNLOAD_URL}
          onClick={() => trackDownloadClicked('hero')}
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
          onClick={() => trackSendToMacIntentShown('hero')}
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
          onClick={onWatchDemo}
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
  const [mode, setMode] = useState<'physics' | 'lined'>('physics');
  const [revealOpacity, setRevealOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [headingTopPad, setHeadingTopPad] = useState(40);
  const [heroMinHeight, setHeroMinHeight] = useState<number | null>(null);
  // True once the layout effect has measured heading/subheading and applied
  // the centered top padding. Until then, the hero-grid is rendered with
  // visibility:hidden so the user doesn't see a one-frame "drop" as the
  // padding goes from the 40px SSR fallback to the measured center value
  // on hydration. Subheading + emojis stay visible throughout.
  const [layoutReady, setLayoutReady] = useState(false);
  const [step, setStep] = useState(0);
  const [row2TextHeight, setRow2TextHeight] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  // Mirrors HeroVideoSequence's `visible` state so we can fade UI elements
  // (the "click to expand" hint) in sync with the video itself.
  const [videoVisible, setVideoVisible] = useState(false);
  useEffect(() => {
    setVideoVisible(false);
    // Same timing constants as HeroVideoSequence (FLIP_MS + HOLD_AFTER_MS).
    const t = setTimeout(() => setVideoVisible(true), 700 + 450);
    return () => clearTimeout(t);
  }, [step]);
  // If the user expands while the video is mid-hold, force-show the hint's
  // sibling state to true (same override HeroVideoSequence does for the video).
  useEffect(() => {
    if (expanded) setVideoVisible(true);
  }, [expanded]);
  const lineTargetRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subheadingRef = useRef<HTMLDivElement | null>(null);
  const row2TextRef = useRef<HTMLDivElement | null>(null);
  // Measure synchronously before paint so the video wrap has its final height
  // on the very first frame — otherwise the video defaults to its intrinsic
  // pixel size, the headline block (width: fit-content + marginInline: auto)
  // centers narrow, then re-centers a frame later when the height lands,
  // visibly shifting the "A" to the left.
  useLayoutEffect(() => {
    const el = row2TextRef.current;
    if (!el) return;
    const measure = () => setRow2TextHeight(el.getBoundingClientRect().height);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // Close the expanded video on Escape, and lock background scroll while open.
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [expanded]);
  // If the cycle advances away from the Drawers step while expanded, collapse.
  useEffect(() => {
    if (expanded && STEPS[step].word !== 'Drawers') setExpanded(false);
  }, [expanded, step]);
  // "Watch 45s demo" handler. Jump to Drawers (if not already there) and
  // expand. HeroVideoSequence forces its `visible` flag true whenever
  // `expanded` flips on, so the expand animation starts from a visible video
  // even if the post-step-change fade-in hold hasn't fired yet.
  const handleWatchDemo = () => {
    const drawersIdx = STEPS.findIndex((s) => s.word === 'Drawers');
    if (drawersIdx === -1) return;
    if (step !== drawersIdx) setStep(drawersIdx);
    setExpanded(true);
  };
  // Pause the cycle's auto-advance while expanded by holding the playback state
  // is the cycle's responsibility — we do that simply by not advancing step
  // (the watchdog is in HeroVideoSequence, but the Drawers clip is long
  // enough that, while paused at the centered overlay, the user will close
  // before the watchdog fires). For now, this is a non-issue.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  // Visual block extent below lineTargetRef = emoji radius + label gap (14) + label line-height (~14).
  // Mirrors EmojiPhysics.tsx uniformSize/labels.
  const belowLineExtent = isMobile ? 130 : 83;
  const toggleToEmojiGap = isMobile ? 70 : 90;
  // useLayoutEffect (instead of useEffect) so the centered top padding lands
  // synchronously after hydration, before the next paint — otherwise the
  // hero visibly jumps down by a dozen-plus px from the initial 40px fallback
  // to the centered value on the very next frame.
  useLayoutEffect(() => {
    const compute = () => {
      const heading = headingRef.current;
      const subheading = subheadingRef.current;
      const toggle = toggleRef.current;
      if (!heading || !subheading) return;
      const headingHeight = heading.getBoundingClientRect().height;
      const toggleHeight = toggle ? toggle.getBoundingClientRect().height : 51;
      const visualBlockHeight = toggleHeight + toggleToEmojiGap + belowLineExtent;
      const subheadingHeight = subheading.getBoundingClientRect().height;
      // Top padding centers the heading vertically between the section top (y = nav height = 74) and the
      // sticky subheading's top when scrolled to the very top (viewport.bottom - 20 - subheadingHeight).
      const visibleH = window.innerHeight - 74;
      const centeredPad = Math.max(40, (visibleH - subheadingHeight - 20 - headingHeight) / 2);
      setHeadingTopPad(centeredPad);
      // Section min height ensures sticky's natural-flow rest position is exactly BLOCK_GUTTER below the labels:
      // headingTopPad + heading + BLOCK_GUTTER + visualBlock + BLOCK_GUTTER + subheading + 80 (bottom padding).
      setHeroMinHeight(
        centeredPad + headingHeight + BLOCK_GUTTER + visualBlockHeight + BLOCK_GUTTER + subheadingHeight + 80,
      );
      setLayoutReady(true);
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
  }, [belowLineExtent, toggleToEmojiGap]);
  useEffect(() => {
    let pending: ReturnType<typeof setTimeout> | null = null;
    let lastTarget: 'physics' | 'lined' | null = null;
    const onScroll = () => {
      const y = window.scrollY;
      const op = Math.max(0, Math.min(1, (y - REVEAL_FADE_START) / (REVEAL_FADE_END - REVEAL_FADE_START)));
      setRevealOpacity(op);
      const target: 'physics' | 'lined' = y >= MODE_THRESHOLD ? 'lined' : 'physics';
      if (target === lastTarget) return;
      lastTarget = target;
      if (pending) clearTimeout(pending);
      pending = setTimeout(() => {
        setMode(target);
        pending = null;
      }, MODE_FLIP_DEBOUNCE_MS);
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
      <div
        className="hero-grid"
        ref={headingRef}
        style={{
          position: 'relative',
          // While the Drawers video is expanded, raise this stacking context
          // above the dim backdrop (z-index 1000) so the video — which is at
          // z-index 1001 *within* this context — sits over the dim layer.
          zIndex: expanded ? 1001 : 10,
          pointerEvents: 'none',
          // Top row ("A [WORD]") and the row below ("for each project" + video)
          // both center within this content-sized block.
          width: 'fit-content',
          maxWidth: '100%',
          marginInline: 'auto',
          // Hide until the layout effect computes the final centered top
          // padding — otherwise the block would visibly drop ~18px from the
          // 40px SSR fallback to the measured center on hydration.
          visibility: layoutReady ? 'visible' : 'hidden',
        }}
      >
        {/* Row 1: "A [WORD]" — full width, left-aligned. Inline flow (not flex)
            so the cycling word's baseline naturally aligns with "A". */}
        <h1
          className="serif hero-line-1"
          style={{
            fontSize: 'clamp(84px, 10.3vw, 148px)',
            lineHeight: 1.0,
            margin: 0,
            textAlign: 'left',
            // The Drawers wordmark image can overflow the headline column and
            // visually run into the video on the right. Raise the headline
            // above the inline video — but only while the video is at rest
            // (when expanded, the video gets a much higher z-index of its own
            // and should sit above everything).
            position: 'relative',
            zIndex: expanded ? 'auto' : 5,
          }}
        >
          A
          <span
            style={{
              fontSize: 'clamp(120px, 14.7vw, 212px)',
              lineHeight: 1.0,
              marginLeft: '0.18em',
            }}
          >
            <HeroFlipWord id={STEPS[step].word}>
              {STEPS[step].word === 'Drawers' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/drawer-word.png"
                  alt="Drawers"
                  style={{ height: '0.95em', width: 'auto', display: 'block' }}
                />
              ) : (
                STEPS[step].word
              )}
            </HeroFlipWord>
          </span>
        </h1>
        {/* Row 2: "for each / project" on the left (top-anchored), video on the
            right (bottom-anchored). The video's height is measured from the
            text block via ResizeObserver, so the text drives the video's size
            (not the other way around). */}
        <div
          className="hero-row-2"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 48,
            // Pull row 2 up slightly to close the half-leading the larger
            // cycling word's line-height adds below the baseline in row 1.
            marginTop: '-0.7vw',
          }}
        >
          <div
            ref={row2TextRef}
            className="serif"
            style={{
              fontSize: 'clamp(84px, 10.3vw, 148px)',
              lineHeight: 1.0,
              flex: '0 0 auto',
              textAlign: 'left',
              alignSelf: 'flex-start',
            }}
          >
            <div className="hero-line-2">for each</div>
            <div className="hero-line-3">project</div>
          </div>
          <div
            style={{
              pointerEvents: 'auto',
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              // Hide the video on non-Drawers steps. We use visibility + opacity
              // so layout (size, position) stays identical and the text columns
              // don't shift when stepping through words. Visibility is delayed
              // by the fade duration on the way out so child fades (notably the
              // "click to expand" hint below) are actually visible — without
              // the delay, visibility snaps to hidden and clips the fade.
              visibility: STEPS[step].word === 'Drawers' ? 'visible' : 'hidden',
              opacity: STEPS[step].word === 'Drawers' ? 1 : 0,
              transition:
                'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1), ' +
                'visibility 0s linear ' +
                (STEPS[step].word === 'Drawers' ? '0s' : '450ms'),
            }}
          >
            <div
              className="hero-video-wrap"
              style={{
                // Fallback height mirrors the row-2 text block (2 lines at
                // clamp(84px, 10.3vw, 148px) with line-height 1.0 = 2x). This
                // matters for the very first paint, before useLayoutEffect's
                // measurement lands — SSR'd HTML uses this height so the
                // headline block (width: fit-content) doesn't re-center on
                // hydration, which would visibly jolt the "A" left.
                height: row2TextHeight ?? 'clamp(168px, 20.6vw, 296px)',
                aspectRatio: `${STEPS[step].aspect}`,
              }}
            >
              <HeroVideoSequence
                step={step}
                onAdvance={() => setStep((s) => (s + 1) % STEPS.length)}
                onClick={
                  STEPS[step].word === 'Drawers'
                    ? () => setExpanded((v) => !v)
                    : undefined
                }
                expanded={expanded && STEPS[step].word === 'Drawers'}
              />
            </div>
            {/* Click-to-expand affordance — fades in/out with the video. */}
            <div
              className="mono-label"
              style={{
                marginTop: 12,
                textAlign: 'center',
                opacity:
                  STEPS[step].word === 'Drawers' && !expanded && videoVisible
                    ? 1
                    : 0,
                transition: 'opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
              }}
            >
              click to expand
            </div>
          </div>
        </div>
      </div>
      <HeroDemo
        mode={mode}
        onModeChange={setMode}
        revealOpacity={revealOpacity}
        toggleRef={toggleRef}
        lineTargetRef={lineTargetRef}
        style={{ position: 'relative', zIndex: 10, marginTop: BLOCK_GUTTER }}
      />
      {/* Reserves vertical room for the emoji + label area (overlaid by EmojiPhysics) plus the BLOCK_GUTTER gap to the subheading. */}
      <div aria-hidden style={{ height: belowLineExtent + BLOCK_GUTTER }} />
      <SubheadingGroup ref={subheadingRef} onWatchDemo={handleWatchDemo} />
      {/* Dim backdrop shown while the Drawers video is expanded. Click to close.
          The video itself stays mounted in the row 2 placeholder and animates
          itself to fill the centered overlay slot — see HeroVideoSequence. */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Drawers demo video"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 7, 5, 0.82)',
            zIndex: 1000,
            cursor: 'zoom-out',
            animation: 'hero-modal-fade-in 220ms ease-out',
          }}
        />
      )}
    </section>
  );
}
