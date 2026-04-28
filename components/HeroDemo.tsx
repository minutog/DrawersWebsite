'use client';

import { forwardRef, useEffect, useState, type CSSProperties } from 'react';

type Mode = 'physics' | 'lined';

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

type HeroDemoProps = {
  mode: Mode;
  onModeChange: (m: Mode) => void;
  revealOpacity: number;
  toggleRef: React.RefObject<HTMLDivElement>;
  lineTargetRef: React.RefObject<HTMLDivElement>;
  style?: CSSProperties;
};

const HeroDemo = forwardRef<HTMLDivElement, HeroDemoProps>(function HeroDemo(
  { mode, onModeChange, revealOpacity, toggleRef, lineTargetRef, style },
  wrapperRef,
) {
  const isMobile = useIsMobile();
  const buttonPadding = isMobile ? '8px 14px' : '12px 22px';
  const buttonFontSize = isMobile ? 12 : 14;
  const lineMarginTop = isMobile ? 70 : 90;
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
            padding: buttonPadding,
            borderRadius: 999,
            fontSize: buttonFontSize,
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
            padding: buttonPadding,
            borderRadius: 999,
            fontSize: buttonFontSize,
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
        style={{ marginTop: lineMarginTop, height: 1, width: '100%' }}
      />
    </div>
  );
});

export default HeroDemo;
