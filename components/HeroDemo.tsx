'use client';

import { forwardRef, type CSSProperties } from 'react';

type Mode = 'physics' | 'lined';

type HeroDemoProps = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  revealOpacity: number;
  toggleRef: React.RefObject<HTMLDivElement | null>;
  lineTargetRef: React.RefObject<HTMLDivElement | null>;
  style?: CSSProperties;
};

const HeroDemo = forwardRef<HTMLDivElement, HeroDemoProps>(function HeroDemo(
  { mode, onModeChange, revealOpacity, toggleRef, lineTargetRef, style },
  wrapperRef,
) {
  return (
    <div
      ref={wrapperRef}
      className="hero-demo"
      style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        pointerEvents: 'none',
        opacity: revealOpacity,
        transition: 'opacity 200ms ease-out',
        ...style,
      }}
    >
      <div
        ref={toggleRef}
        className="hero-mode-toggle"
        role="group"
        aria-label="Drawers mode"
        style={{
          position: 'relative',
          display: 'inline-grid',
          gridTemplateColumns: '1fr 1fr',
          border: '1.5px solid var(--ink)',
          borderRadius: 999,
          padding: 4,
          background: 'transparent',
          pointerEvents: revealOpacity > 0.5 ? 'auto' : 'none',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: mode === 'physics' ? 4 : '50%',
            width: 'calc(50% - 4px)',
            background: 'var(--ink)',
            borderRadius: 999,
            transition: 'left 280ms cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 0,
          }}
        />
        <button
          type="button"
          onClick={() => onModeChange('physics')}
          aria-pressed={mode === 'physics'}
          style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            padding: '12px 22px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            background: 'transparent',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: mode === 'physics' ? 'var(--cream)' : 'var(--ink)',
            transition: 'color 280ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Without Drawers
        </button>
        <button
          type="button"
          onClick={() => onModeChange('lined')}
          aria-pressed={mode === 'lined'}
          style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            padding: '12px 22px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            background: 'transparent',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: mode === 'lined' ? 'var(--cream)' : 'var(--ink)',
            transition: 'color 280ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          With Drawers
        </button>
      </div>
      <div
        ref={lineTargetRef}
        aria-hidden
        style={{ marginTop: 90, height: 1, width: '100%' }}
      />
    </div>
  );
});

export default HeroDemo;
