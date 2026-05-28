import React from 'react';

export default function SeasonTabs({ seasons, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
      {seasons.map(s => (
        <button
          key={s.id}
          onClick={() => onChange(s.id)}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
            padding: '8px 18px', borderRadius: 'var(--radius-md)',
            cursor: 'pointer', transition: 'all 0.15s',
            border: active === s.id ? `0.5px solid ${s.color}` : '0.5px solid var(--border)',
            background: active === s.id ? 'var(--bg-card)' : 'var(--bg-secondary)',
            color: active === s.id ? 'var(--text-primary)' : 'var(--text-secondary)',
            display: 'flex', alignItems: 'center', gap: 7,
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: s.color, display: 'inline-block', flexShrink: 0,
          }} />
          {s.name}
        </button>
      ))}
    </div>
  );
}
