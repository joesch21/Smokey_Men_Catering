import React from 'react';

export default function Header({ activePage, setPage }) {
  const nav = [
    { id: 'packages',    label: 'Packages' },
    { id: 'menus',       label: 'Menus' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'costings',    label: 'Costings' },
  ];

  return (
    <header style={{
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--bg-card)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', gap: '2rem',
        height: 60,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400, letterSpacing: '-0.01em' }}>
            Smokey Men Catering
          </span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 500 }}>
            Southern Highlands
          </span>
        </div>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          {nav.map(n => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                padding: '6px 14px', borderRadius: 'var(--radius-md)',
                border: 'none', cursor: 'pointer',
                background: activePage === n.id ? 'var(--bg-secondary)' : 'transparent',
                color: activePage === n.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'all 0.15s',
              }}
            >
              {n.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
