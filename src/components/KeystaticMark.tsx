export default function KeystaticMark({
  colorScheme,
}: {
  colorScheme: 'light' | 'dark';
}) {
  const mutedColor = colorScheme === 'dark' ? '#9ca3af' : '#6b7280';

  return (
    <span
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px',
      }}
    >
      <img
        src="/logo.png"
        alt="digid"
        style={{ height: '18px', width: 'auto', opacity: 0.9 }}
      />
      <button
        onClick={() => {
          window.location.href = '/keystatic/deploy';
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '11px',
          color: mutedColor,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          letterSpacing: '0.03em',
          fontFamily: 'inherit',
        }}
      >
        🚀 Deploy to production
      </button>
    </span>
  );
}
