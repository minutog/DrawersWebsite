'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

const FLIP_DURATION_MS = 700;

interface HeroFlipWordProps {
  // Stable identifier used to detect when the content actually changes (since
  // ReactNode is structural and re-renders pass new fragment objects each time).
  id: string | number;
  // What to render — text, image, or any inline content.
  children: ReactNode;
}

interface Layer {
  layerId: number;       // stable React key per mount
  contentId: string | number;
  content: ReactNode;
  state: 'enter' | 'idle' | 'leave';
}

export default function HeroFlipWord({ id, children }: HeroFlipWordProps) {
  const layerIdCounter = useRef(0);
  // Start empty so the first word ("Dock") animates in on page load via the
  // normal enter → idle flip flow, instead of being pre-rendered at idle.
  const [layers, setLayers] = useState<Layer[]>(() => []);

  useEffect(() => {
    const idleLayer = layers.find((l) => l.state === 'idle');
    const enteringLayer = layers.find((l) => l.state === 'enter');
    const visibleTarget = enteringLayer ?? idleLayer;
    if (visibleTarget && visibleTarget.contentId === id) return;

    const newLayerId = layerIdCounter.current++;
    setLayers((prev) => {
      // Re-check inside the updater: under React StrictMode the effect runs
      // twice on mount, and the captured `layers` above is the same stale
      // empty array both times — so without this guard, the first mount
      // queues two enter-layers for "Dock" and we see two flip directions
      // colliding on first appearance.
      const prevTarget = prev.find((l) => l.state === 'enter') ?? prev.find((l) => l.state === 'idle');
      if (prevTarget && prevTarget.contentId === id) return prev;
      const next = prev.map((l) =>
        l.state === 'idle' || l.state === 'enter'
          ? { ...l, state: 'leave' as const }
          : l,
      );
      return [...next, { layerId: newLayerId, contentId: id, content: children, state: 'enter' }];
    });

    // Promote the new layer from --enter to --idle on the next paint. We use
    // setTimeout(40ms) instead of double-rAF — more resilient to StrictMode
    // double-invocation: each effect run schedules its own timer for its own
    // newLayerId (no cross-cancellation needed).
    setTimeout(() => {
      setLayers((prev) =>
        prev.map((l) =>
          l.layerId === newLayerId ? { ...l, state: 'idle' as const } : l,
        ),
      );
    }, 40);

    // After the flip completes, drop the leaving layers from state. Each
    // run schedules its own timer scoped to the layers it just promoted.
    setTimeout(() => {
      setLayers((prev) => prev.filter((l) => l.state !== 'leave'));
    }, FLIP_DURATION_MS + 80);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <span className="flip-word" aria-live="polite">
      {/* Spacer reserves the wordmark's max width AND establishes the
          baseline via inline text rendered in the heading font. The img sets
          the slot's width; the text "Drawers" rendered after it sits inline
          and gets the spacer to inherit the text baseline. CSS hides the img
          but keeps it taking layout space, and zeroes the text's effective
          width so it doesn't add to the slot. */}
      <span className="flip-word__spacer" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="flip-word__spacer-img" src="/drawer-word.png" alt="" />
        <span className="flip-word__spacer-text">Drawers</span>
      </span>
      {layers.map((l) => (
        <span
          key={l.layerId}
          className={`flip-word__layer flip-word__layer--${l.state}`}
        >
          {l.content}
        </span>
      ))}
    </span>
  );
}
