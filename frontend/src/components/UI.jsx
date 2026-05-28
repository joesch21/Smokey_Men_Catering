import React, { useState } from 'react';

// ── Badge ────────────────────────────────────────────────────
export function Badge({ type, children }) {
  const styles = {
    bbq: { background: 'var(--amber-bg)', color: 'var(--amber-text)', border: '0.5px solid var(--amber)' },
    local: { background: 'var(--teal-bg)', color: 'var(--teal-text)', border: '0.5px solid var(--teal)' },
    hero: { background: 'var(--green-bg)', color: 'var(--green-text)', border: '0.5px solid var(--green)' },
    standard: { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '0.5px solid var(--border)' },
    flemington: { background: 'var(--blue-bg)', color: 'var(--blue-text)', border: '0.5px solid var(--blue)' },
  };
  return (
    <span style={{
      fontSize: 11, fontFamily: 'var(--font-body)', fontWeight: 500,
      padding: '3px 9px', borderRadius: 20, display: 'inline-block',
      ...(styles[type] || styles.standard),
    }}>{children}</span>
  );
}

// ── Card ─────────────────────────────────────────────────────
export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1rem 1.25rem',
      boxShadow: 'var(--shadow-sm)',
      ...style,
    }}>{children}</div>
  );
}

// ── Section Label ─────────────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 11, fontWeight: 500, letterSpacing: '0.08em',
      textTransform: 'uppercase', color: 'var(--text-tertiary)',
      marginBottom: 10,
    }}>{children}</p>
  );
}

// ── Btn ───────────────────────────────────────────────────────
export function Btn({ onClick, variant = 'default', size = 'md', children, style, disabled }) {
  const base = {
    fontFamily: 'var(--font-body)', fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
    borderRadius: 'var(--radius-md)', transition: 'all 0.15s', border: '0.5px solid',
    opacity: disabled ? 0.5 : 1,
    ...(size === 'sm' ? { fontSize: 12, padding: '5px 12px' } : { fontSize: 13, padding: '8px 16px' }),
  };
  const variants = {
    default: { background: 'var(--bg-card)', borderColor: 'var(--border-strong)', color: 'var(--text-primary)' },
    primary: { background: 'var(--text-primary)', borderColor: 'var(--text-primary)', color: 'white' },
    danger: { background: 'var(--coral-bg)', borderColor: 'var(--coral)', color: 'var(--coral-text)' },
    ghost: { background: 'transparent', borderColor: 'transparent', color: 'var(--text-secondary)' },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

// ── Modal ─────────────────────────────────────────────────────
export function Modal({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: 560,
        maxHeight: '85vh', overflow: 'auto',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem 1.5rem', borderBottom: '0.5px solid var(--border)',
          position: 'sticky', top: 0, background: 'var(--bg-card)', zIndex: 1,
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 400 }}>{title}</h3>
          <Btn variant="ghost" size="sm" onClick={onClose} style={{ fontSize: 18, padding: '4px 8px' }}>✕</Btn>
        </div>
        <div style={{ padding: '1.25rem 1.5rem' }}>{children}</div>
      </div>
    </div>
  );
}

// ── FormField ─────────────────────────────────────────────────
export function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'block', marginBottom: 5, fontWeight: 500 }}>{label}</label>
      {children}
    </div>
  );
}

// ── Metric Card ───────────────────────────────────────────────
export function MetricCard({ label, value, sub }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem',
    }}>
      <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 500, color: 'var(--text-primary)' }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{sub}</p>}
    </div>
  );
}

// ── Toast ─────────────────────────────────────────────────────
export function Toast({ message, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 2000,
      background: 'var(--text-primary)', color: 'white',
      padding: '10px 18px', borderRadius: 'var(--radius-md)',
      fontSize: 13, boxShadow: 'var(--shadow-md)',
      animation: 'slideUp 0.2s ease',
    }}>
      {message}
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}

// ── Confirm dialog ────────────────────────────────────────────
export function useConfirm() {
  const [pending, setPending] = useState(null);
  const confirm = (msg) => new Promise(resolve => setPending({ msg, resolve }));
  const Dialog = pending ? (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100,
    }}>
      <Card style={{ maxWidth: 360, width: '100%' }}>
        <p style={{ fontSize: 14, marginBottom: 16 }}>{pending.msg}</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <Btn variant="default" onClick={() => { pending.resolve(false); setPending(null); }}>Cancel</Btn>
          <Btn variant="danger" onClick={() => { pending.resolve(true); setPending(null); }}>Delete</Btn>
        </div>
      </Card>
    </div>
  ) : null;
  return { confirm, Dialog };
}
