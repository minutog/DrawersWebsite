'use client';

import { useEffect, useRef, useState } from 'react';

// Each step pairs a label key with a video clip. Only the Drawers step's video
// is shown to the user (Hero hides the video wrap on the others); the Dock and
// space steps still mount a video instance to drive the cycle's auto-advance
// via `loops` count, but with a tight `holdMs` so they don't linger.
//
// `aspect` is the clip's width/height ratio (used to size the wrapper).
// `holdMs` is the time the word stays on screen for word-only beats. For the
// Drawers step, the cycle advances on `ended` (full video duration).
export const STEPS = [
  { word: 'Dock',    src: '/how-1-project-drawer.mp4', loops: 1, aspect: 1108 / 720,   holdMs: 1500 },
  { word: 'Space',   src: '/how-3-new-window.mp4',     loops: 1, aspect: 1108 / 720,   holdMs: 1500 },
  { word: 'Drawers', src: '/WhatIsADrawer_2.mp4',      loops: 1, aspect: 1660 / 1080,  holdMs: null as number | null },
] as const;

// Video fade timing. The word flip itself takes ~700ms. We bracket the flip
// with two black "hold" beats so the headline reads on its own both before the
// flip starts and after the new word lands:
//
//   [video fades OUT 450ms] [HOLD_BEFORE 350ms — old word, black video]
//   [step advances → word flips 700ms; new video mounted but still black]
//   [HOLD_AFTER 450ms — new word, black video]
//   [video fades IN 450ms]
//
// HOLD_AFTER is timed to start *after* the flip completes, so the user sees the
// new word fully settled at rest before the video reappears under it.
const FADE_MS = 450;
const HOLD_BEFORE_MS = 350;
const FLIP_MS = 700;
const HOLD_AFTER_MS = 450;

interface HeroVideoSequenceProps {
  step: number;
  onAdvance: () => void;
  /** Optional click handler. When provided, the video container is clickable. */
  onClick?: () => void;
  /** When true, the video container animates to a centered, larger overlay. */
  expanded?: boolean;
  /**
   * Controlled visibility — when true, the video is at opacity 1; false fades
   * to 0 with a 450ms transition. The parent owns this state so sibling UI
   * (e.g. a "click to expand" hint outside this component) can be driven from
   * the same value in the same render, guaranteeing lockstep opacity changes.
   */
  visible: boolean;
  /** Setter for `visible`. Called by the cycle's internal timing logic. */
  setVisible: (v: boolean) => void;
}

export default function HeroVideoSequence({ step, onAdvance, onClick, expanded = false, visible, setVisible }: HeroVideoSequenceProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const loopCountRef = useRef(0);
  const advancingRef = useRef(false);
  // `visible` is a controlled prop owned by the parent so sibling UI (the
  // "click to expand" hint) can share the exact same state in the same render.
  // The cycle's timing logic — mount fade-in, advance fade-out, and the
  // expanded-force-true override — writes via `setVisible`; behavior is
  // otherwise identical to when `visible` was internal state.

  // FLIP animation state. We capture the inline placeholder's rect at the
  // moment `expanded` toggles, then animate from that rect to the centered
  // target rect (or vice-versa on close). The video element itself never
  // unmounts so playback position is preserved across the transition.
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const [inlineRect, setInlineRect] = useState<{
    top: number; left: number; width: number; height: number;
  } | null>(null);
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null);
  // 'inline'      = at rest, sized to placeholder, no transform.
  // 'fixed-start' = identity transform, transition disabled (paint then advance).
  // 'fixed-end'   = transform: translate+scale to centered target, transition on.
  // 'closing'     = transform: none, transition on (animates back to identity),
  //                 then we drop to 'inline' after the transition completes.
  const [phase, setPhase] = useState<'inline' | 'fixed-start' | 'fixed-end' | 'closing'>('inline');
  const current = STEPS[step];

  // Track viewport size for target rect computation.
  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Drive the phase state machine from `expanded`. Capture the inline rect at
  // the exact moment we need it (open: just before going fixed; close: just
  // before transitioning back).
  useEffect(() => {
    if (expanded) {
      // OPEN: capture placeholder rect, render at fixed-start (= captured rect)
      // for one paint. The advance to fixed-end happens in a separate effect
      // that watches `phase` directly (so StrictMode dep churn doesn't cancel
      // it before it fires).
      const el = placeholderRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setInlineRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      setPhase('fixed-start');
    } else {
      // CLOSE: re-measure placeholder rect (so the close transform is computed
      // against the current scroll position), keep phase at fixed-end so the
      // transition runs back to identity transform — but we re-render with no
      // flipTransform so the target is "none" (= back at the inline rect).
      // After the transition completes, drop back to inline.
      if (phase === 'inline') return;
      const el = placeholderRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setInlineRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      setPhase('closing'); // same as fixed-end but flipTransform === ''
      const t = setTimeout(() => setPhase('inline'), 400);
      return () => clearTimeout(t);
    }
    // We intentionally exclude `phase` from deps — this effect should fire only
    // on `expanded` toggles, not on our own phase updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);
  // Advance fixed-start → fixed-end on the next frame after the start state
  // paints. Separate effect so StrictMode's dep-churn cancellation can't kill
  // the timer before it fires.
  useEffect(() => {
    if (phase !== 'fixed-start') return;
    const t = setTimeout(() => setPhase('fixed-end'), 30);
    return () => clearTimeout(t);
  }, [phase]);
  // Force the video visible when expansion is requested, even if the
  // post-step-change fade-in hold timer hasn't fired yet. This handles the
  // case where the user (or the Watch-demo button) triggers expand before the
  // video has had a chance to fade back in after a step change — without this
  // override, the user would see a black box expand.
  useEffect(() => {
    if (expanded) setVisible(true);
  }, [expanded]);

  // When `step` changes: reset loop counter, schedule the fade-in, and either
  // schedule a fixed-duration auto-advance (Dock/space, via `holdMs`) or rely
  // on the video's `ended` event with a long watchdog (Drawers, full video).
  useEffect(() => {
    loopCountRef.current = 0;
    advancingRef.current = false;
    if (expanded) return; // pause cycle behaviors while expanded
    const fadeInTimer = setTimeout(() => setVisible(true), FLIP_MS + HOLD_AFTER_MS);
    const advanceTimer = setTimeout(
      triggerAdvance,
      current.holdMs ?? 60000, // Drawers: 60s watchdog; others: holdMs
    );
    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(advanceTimer);
    };
    // triggerAdvance is stable via ref-guard so we don't need it in deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, expanded]);

  // Fade out → wait → call onAdvance. Guarded so the watchdog and onError can't
  // double-trigger an advance during the fade window.
  function triggerAdvance() {
    if (advancingRef.current || expanded) return;
    advancingRef.current = true;
    setVisible(false);
    setTimeout(() => {
      onAdvance();
    }, FADE_MS + HOLD_BEFORE_MS);
  }

  const handleEnded = () => {
    if (expanded) {
      // While expanded, just loop the clip in place.
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
      return;
    }
    // Only the Drawers step uses ended-driven advance (holdMs is null).
    if (current.holdMs !== null) return;
    triggerAdvance();
  };

  // Compute the expanded target rect (centered in the viewport, sized to fit
  // 92vw × 92vh while preserving the clip's aspect ratio).
  let target: { top: number; left: number; width: number; height: number } | null = null;
  if (viewport) {
    const maxW = viewport.w * 0.92;
    const maxH = viewport.h * 0.92;
    const ratio = current.aspect;
    let w = maxW;
    let h = w / ratio;
    if (h > maxH) {
      h = maxH;
      w = h * ratio;
    }
    target = {
      top: (viewport.h - h) / 2,
      left: (viewport.w - w) / 2,
      width: w,
      height: h,
    };
  }

  // Compute the FLIP transform: when expanded, translate from the inline
  // position to the centered target, scaling up to the target size. Standard
  // FLIP technique — element stays at its inline DOM position, only `transform`
  // changes, so it transitions smoothly regardless of containing-block context.
  let flipTransform = '';
  if (phase === 'fixed-end' && target && inlineRect) {
    const dx = target.left + target.width / 2 - (inlineRect.left + inlineRect.width / 2);
    const dy = target.top + target.height / 2 - (inlineRect.top + inlineRect.height / 2);
    const scale = target.width / inlineRect.width;
    flipTransform = `translate(${dx}px, ${dy}px) scale(${scale})`;
  }

  const isAnimating = phase !== 'inline'; // covers fixed-start, fixed-end, closing

  return (
    <div
      ref={placeholderRef}
      style={{
        // Placeholder reserves the inline space in row 2.
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        onClick={onClick}
        data-flip-phase={phase}
        style={{
          aspectRatio: `${current.aspect}`,
          borderRadius: 14,
          overflow: 'hidden',
          background: '#1a140c',
          boxShadow:
            phase === 'fixed-end'
              ? '0 40px 80px -20px rgba(0,0,0,0.55)'
              : '0 30px 60px -20px rgba(26,20,12,0.25)',
          opacity: visible ? 1 : 0,
          cursor: onClick && !expanded ? 'pointer' : 'default',
          position: 'absolute',
          inset: 0,
          // FLIP: at rest, no transform. While animating, translate+scale to
          // the centered target. The inline DOM position never changes — we
          // just use transform so the same DOM node morphs in place.
          transform: flipTransform || 'none',
          transformOrigin: 'center center',
          // Lift above other content during animation so it visually sits over
          // the dim backdrop.
          zIndex: isAnimating ? 1001 : 'auto',
          transition:
            phase === 'fixed-start'
              ? // No transition while we paint the start state — instant.
                `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : phase === 'fixed-end' || phase === 'closing'
              ? `transform 380ms cubic-bezier(0.4, 0, 0.2, 1),
                 box-shadow 380ms cubic-bezier(0.4, 0, 0.2, 1),
                 opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
              : `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        <video
          key={step}
          ref={videoRef}
          src={current.src}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onError={triggerAdvance}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
