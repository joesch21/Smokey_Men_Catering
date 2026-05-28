import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../hooks/api.js';
import SeasonTabs from '../components/SeasonTabs.jsx';
import { Card, Badge, Btn, Modal, FormField, SectionLabel, Toast, useConfirm } from '../components/UI.jsx';

const BADGE_OPTIONS = [
  { value: 'bbq', label: 'BBQ / Off-site smoke' },
  { value: 'local', label: 'Local / Regional' },
  { value: '', label: 'None' },
];

function MenuCardView({ menu, onEdit, onDelete }) {
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <p style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', marginBottom: 6 }}>
        {menu.service}
      </p>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, marginBottom: 10, lineHeight: 1.3 }}>
        {menu.title}
      </h3>
      <ul style={{ listStyle: 'none', flex: 1 }}>
        {(menu.items || []).map((item, i) => (
          <li key={i} style={{
            fontSize: 13, color: 'var(--text-secondary)', padding: '4px 0',
            borderBottom: i < menu.items.length - 1 ? '0.5px solid var(--border)' : 'none',
            lineHeight: 1.4,
          }}>
            <span style={{ color: 'var(--text-tertiary)', marginRight: 6 }}>—</span>{item}
          </li>
        ))}
      </ul>
      {menu.badge && (
        <div style={{ marginTop: 10 }}>
          <Badge type={menu.badgeType || 'bbq'}>{menu.badge}</Badge>
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, marginTop: 12, paddingTop: 10, borderTop: '0.5px solid var(--border)' }}>
        <Btn size="sm" onClick={() => onEdit(menu)}>Edit</Btn>
        <Btn size="sm" variant="danger" onClick={() => onDelete(menu.id)}>Delete</Btn>
      </div>
    </Card>
  );
}

function MenuForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || {
    service: '', title: '', badge: '', badgeType: '', items: [''],
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const setItem = (i, v) => {
    const items = [...form.items];
    items[i] = v;
    setForm(f => ({ ...f, items }));
  };
  const addItem = () => setForm(f => ({ ...f, items: [...f.items, ''] }));
  const removeItem = (i) => setForm(f => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }));

  return (
    <div>
      <FormField label="Service occasion (e.g. Friday Dinner — Seated 36)">
        <input value={form.service} onChange={e => set('service', e.target.value)} placeholder="Saturday Dinner — Celebration" />
      </FormField>
      <FormField label="Menu title">
        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Three-course Highlands Feast" />
      </FormField>
      <FormField label="Badge label (optional)">
        <input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Smoked off-site, reheated on-site" />
      </FormField>
      <FormField label="Badge type">
        <select value={form.badgeType} onChange={e => set('badgeType', e.target.value)}>
          {BADGE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </FormField>
      <FormField label="Menu items">
        {form.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            <input value={item} onChange={e => setItem(i, e.target.value)} placeholder={`Item ${i + 1}`} />
            {form.items.length > 1 && (
              <Btn size="sm" variant="danger" onClick={() => removeItem(i)} style={{ flexShrink: 0, width: 32 }}>✕</Btn>
            )}
          </div>
        ))}
        <Btn size="sm" onClick={addItem} style={{ marginTop: 4 }}>+ Add item</Btn>
      </FormField>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn variant="primary" onClick={() => onSave(form)} disabled={loading}>
          {loading ? 'Saving…' : 'Save menu'}
        </Btn>
      </div>
    </div>
  );
}

export default function MenusPage({ seasons }) {
  const [activeSeason, setActiveSeason] = useState(seasons[0]?.id || 'summer');
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // null | 'add' | { menu }
  const [toast, setToast] = useState(null);
  const { confirm, Dialog } = useConfirm();

  const season = seasons.find(s => s.id === activeSeason);

  const load = useCallback(async () => {
    const data = await api.getMenus(activeSeason);
    setMenus(data);
  }, [activeSeason]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    setLoading(true);
    try {
      if (modal === 'add') {
        await api.createMenu({ ...form, seasonId: activeSeason });
      } else {
        await api.updateMenu(modal.menu.id, form);
      }
      await load();
      setModal(null);
      setToast('Saved successfully');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    const ok = await confirm('Delete this menu card?');
    if (!ok) return;
    await api.deleteMenu(id);
    await load();
    setToast('Deleted');
  };

  return (
    <div>
      {Dialog}
      <SeasonTabs seasons={seasons} active={activeSeason} onChange={setActiveSeason} />

      {season && (
        <div style={{
          background: 'var(--bg-card)', border: '0.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem', marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, marginBottom: 4 }}>
                {season.name} — {season.months}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 600 }}>{season.description}</p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <SectionLabel>Marketing hook</SectionLabel>
              <p style={{
                fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic',
                borderLeft: `2px solid ${season.color}`, paddingLeft: 10, maxWidth: 340,
              }}>"{season.marketingHook}"</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <SectionLabel>Menu cards — {menus.length} services</SectionLabel>
        <Btn variant="primary" onClick={() => setModal('add')}>+ Add menu card</Btn>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
      }}>
        {menus.map(m => (
          <MenuCardView key={m.id} menu={m} onEdit={(menu) => setModal({ menu })} onDelete={handleDelete} />
        ))}
      </div>

      {modal && (
        <Modal
          title={modal === 'add' ? `Add menu card — ${season?.name}` : 'Edit menu card'}
          onClose={() => setModal(null)}
        >
          <MenuForm
            initial={modal !== 'add' ? modal.menu : null}
            onSave={handleSave}
            onCancel={() => setModal(null)}
            loading={loading}
          />
        </Modal>
      )}

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
