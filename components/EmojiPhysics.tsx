'use client';

import { useEffect, useRef, useState, useMemo, type CSSProperties, type RefObject } from 'react';

type Body = {
  id: number;
  asset: string;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  scale: number;
};

type Mode = 'physics' | 'lined';

type Props = {
  assets: string[];
  count?: number;
  minSize?: number;
  maxSize?: number;
  gravity?: number;
  friction?: number;
  bounce?: number;
  seed?: number;
  zIndex?: number;
  mode?: Mode;
  lineTargetRef?: RefObject<HTMLElement | null>;
};

export default function EmojiPhysics({
  assets,
  count: countProp = 14,
  minSize: minSizeProp = 70,
  maxSize: maxSizeProp = 130,
  gravity = 0.0025,
  friction = 1,
  bounce = 1,
  seed = 1,
  zIndex = 2,
  mode = 'physics',
  lineTargetRef,
}: Props) {
  // On phones, downscale emoji sizes (and slightly reduce count) so the
  // floating physics doesn't dominate the layout. Also cap count to the
  // number of unique assets so emojis never repeat.
  const isMobile = useIsMobile();
  const requested = isMobile ? Math.max(4, Math.round(countProp * 0.7)) : countProp;
  const count = Math.min(requested, assets.length);
  const minSize = isMobile ? Math.round(minSizeProp * 0.5) : minSizeProp;
  const maxSize = isMobile ? Math.round(maxSizeProp * 0.5) : maxSizeProp;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bodiesRef = useRef<Body[]>([]);
  const elsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [seeded, setSeeded] = useState<Body[]>([]);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef<{ id: number } | null>(null);
  const lastMoveRef = useRef({ x: 0, y: 0, t: 0 });
  const modeRef = useRef<Mode>(mode);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const prev = modeRef.current;
    modeRef.current = mode;
    if (prev === 'lined' && mode === 'physics') {
      const bodies = bodiesRef.current;
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        b.vx = (Math.random() - 0.5) * 3.5;
        b.vy = (Math.random() - 0.5) * 3.5;
        b.vr = (Math.random() - 0.5) * 1.5;
      }
    }
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      reducedMotionRef.current = mq.matches;
    };
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const rand = useMemo(() => {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }, [seed]);

  // Seed bodies once: render them as DOM nodes, then animate via direct
  // transform writes (no React state per frame).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const W = rect.width || 1200;
    const H = rect.height || 800;
    const list: Body[] = Array.from({ length: count }, (_, i) => {
      const asset = assets[i % assets.length];
      const s = minSize + rand() * (maxSize - minSize);
      return {
        id: i,
        asset,
        size: s,
        x: rand() * Math.max(1, W - s),
        y: rand() * Math.max(1, H - s),
        vx: (rand() - 0.5) * 3.5,
        vy: (rand() - 0.5) * 3.5,
        rot: (rand() - 0.5) * 30,
        vr: (rand() - 0.5) * 1.5,
        scale: 1,
      };
    });
    bodiesRef.current = list;
    setSeeded(list);
  }, [count, assets, minSize, maxSize, rand]);

  useEffect(() => {
    if (!seeded.length) return;
    const el = containerRef.current;
    if (!el) return;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const dragId = draggingRef.current?.id;
      const bodies = bodiesRef.current;
      const currentMode = modeRef.current;

      let targetY = H - 200;
      let gap = 0;
      let rowStart = 0;
      let uniformSize = 0;
      if (currentMode === 'lined') {
        const lineEl = lineTargetRef?.current;
        if (lineEl) {
          const lineRect = lineEl.getBoundingClientRect();
          targetY = lineRect.top - rect.top;
        }
        uniformSize = isMobile ? 64 : 110;
        const spacing = isMobile ? 20 : 32;
        gap = uniformSize + spacing;
        const totalWidth = gap * Math.max(1, bodies.length) - spacing;
        rowStart = (W - totalWidth) / 2;
      }
      const reduce = reducedMotionRef.current;
      const lerp = reduce ? 1 : 0.06;
      const rotLerp = reduce ? 1 : 0.08;
      const scaleLerp = reduce ? 1 : 0.06;

      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        if (b.id !== dragId) {
          if (currentMode === 'lined') {
            const targetCenterX = rowStart + i * gap + uniformSize / 2;
            const targetX = targetCenterX - b.size / 2;
            const targetTopY = targetY - b.size / 2;
            b.vx = 0;
            b.vy = 0;
            b.vr = 0;
            b.x += (targetX - b.x) * lerp;
            b.y += (targetTopY - b.y) * lerp;
            b.rot += (0 - b.rot) * rotLerp;
            const targetScale = uniformSize / b.size;
            b.scale += (targetScale - b.scale) * scaleLerp;
          } else {
            b.vy += gravity;
            b.vx *= friction;
            b.vy *= friction;
            b.x += b.vx;
            b.y += b.vy;
            b.rot += b.vr;
            b.scale += (1 - b.scale) * scaleLerp;
            if (b.x < 0) {
              b.x = 0;
              b.vx = -b.vx * bounce;
              b.vr = b.vr * 0.9 + b.vx * 0.3;
            }
            if (b.x + b.size > W) {
              b.x = W - b.size;
              b.vx = -b.vx * bounce;
              b.vr = b.vr * 0.9 + b.vx * 0.3;
            }
            if (b.y < 0) {
              b.y = 0;
              b.vy = -b.vy * bounce;
            }
            if (b.y + b.size > H) {
              b.y = H - b.size;
              b.vy = -b.vy * bounce;
            }
          }
        }
        const node = elsRef.current[i];
        if (node) {
          node.style.transform = `translate(${b.x}px, ${b.y}px) rotate(${b.rot}deg) scale(${b.scale})`;
        }
        const labelNode = labelsRef.current[i];
        if (labelNode && currentMode === 'lined') {
          const slotCenterX = rowStart + i * gap + uniformSize / 2;
          const labelY = targetY + uniformSize / 2 + 14;
          labelNode.style.transform = `translate(${slotCenterX}px, ${labelY}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [seeded.length, gravity, friction, bounce]);

  const onDown = (e: React.MouseEvent | React.TouchEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const me = e as React.MouseEvent;
    const te = e as React.TouchEvent;
    const px = me.clientX ?? te.touches?.[0]?.clientX;
    const py = me.clientY ?? te.touches?.[0]?.clientY;
    if (px == null || py == null) return;
    draggingRef.current = { id };
    const b = bodiesRef.current.find((x) => x.id === id);
    if (b) {
      b.vx = 0;
      b.vy = 0;
    }
    lastMoveRef.current = { x: px - rect.left, y: py - rect.top, t: performance.now() };
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const me = e as MouseEvent;
      const te = e as TouchEvent;
      const px = me.clientX ?? te.touches?.[0]?.clientX;
      const py = me.clientY ?? te.touches?.[0]?.clientY;
      if (px == null || isNaN(px)) return;
      const x = px - rect.left;
      const y = py - rect.top;
      const now = performance.now();
      const dt = Math.max(1, now - lastMoveRef.current.t);
      const vx = ((x - lastMoveRef.current.x) / dt) * 16;
      const vy = ((y - lastMoveRef.current.y) / dt) * 16;
      const id = draggingRef.current.id;
      const b = bodiesRef.current.find((x) => x.id === id);
      if (b) {
        b.x = x - b.size / 2;
        b.y = y - b.size / 2;
        b.vx = vx;
        b.vy = vy;
      }
      lastMoveRef.current = { x, y, t: now };
    };
    const onUp = () => {
      draggingRef.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, []);

  const containerStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    zIndex,
    overflow: 'hidden',
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {seeded.map((b, i) => (
        <div
          key={b.id}
          ref={(node) => {
            elsRef.current[i] = node;
          }}
          onMouseDown={(e) => onDown(e, b.id)}
          onTouchStart={(e) => onDown(e, b.id)}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(${b.x}px, ${b.y}px) rotate(${b.rot}deg)`,
            width: b.size,
            height: b.size,
            fontSize: b.size * 0.92,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            pointerEvents: 'auto',
            cursor: 'grab',
            willChange: 'transform',
            fontFamily:
              '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
            filter: 'drop-shadow(0 8px 14px rgba(40,20,0,0.15))',
          }}
        >
          {b.asset}
        </div>
      ))}
      {seeded.map((b, i) => (
        <div
          key={`label-${b.id}`}
          ref={(node) => {
            labelsRef.current[i] = node;
          }}
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'translate(-9999px, -9999px)',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            whiteSpace: 'nowrap',
            translate: '-50% 0',
            opacity: mode === 'lined' ? 1 : 0,
            transition: 'opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
            userSelect: 'none',
            willChange: 'transform, opacity',
          }}
        >
          Project {i + 1}
        </div>
      ))}
    </div>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isMobile;
}

export const EMOJIS = [
  '💾',
  '🧻',
  '⛺',
  '🪩',
  '🕯️',
  '🥨',
  '🎲',
  '📎',
  '🪺',
  '🍄',
  '🧃',
  '🪞',
];
