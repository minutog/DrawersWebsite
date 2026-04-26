type Props = {
  label: string;
  ratio?: string;
  notes: string;
};

export default function Placeholder({ label, ratio = '16/10', notes }: Props) {
  const isVideo = /video/i.test(label);
  return (
    <div
      style={{
        position: 'relative',
        background: '#1a140c',
        borderRadius: 14,
        aspectRatio: ratio,
        overflow: 'hidden',
        border: '1px solid rgba(26,20,12,0.15)',
        boxShadow: '0 30px 60px -20px rgba(26,20,12,0.25)',
        color: 'var(--cream)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(250,245,231,0.04) 0 14px, transparent 14px 28px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 16,
          display: 'flex',
          gap: 6,
        }}
      >
        {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: c,
              opacity: 0.9,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 16,
          fontSize: 11,
          letterSpacing: 1.5,
          opacity: 0.7,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {isVideo ? '▶︎ ' : '▢ '}
        {label}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          placeItems: 'center',
          padding: 28,
        }}
      >
        <div
          style={{
            fontSize: 13,
            lineHeight: 1.65,
            maxWidth: 560,
            textAlign: 'left',
            background: 'rgba(0,0,0,0.35)',
            padding: '16px 20px',
            borderRadius: 8,
            border: '1px solid rgba(250,245,231,0.14)',
            opacity: 0.94,
            whiteSpace: 'pre-line',
          }}
        >
          {notes}
        </div>
      </div>
    </div>
  );
}
