import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../hooks/api.js';
import SeasonTabs from '../components/SeasonTabs.jsx';
import { Card, Badge, Btn, Modal, FormField, SectionLabel, Toast, useConfirm } from '../components/UI.jsx';

const TYPE_OPTIONS = [
  { value: 'hero', label: 'Hero value ingredient' },
  { value: 'local', label: 'Local / Regional signature' },
  { value: 'standard', label: 'Standard' },
];

const SOURCE_OPTIONS = [
  { value: 'flemington', label: 'Flemington Markets' },
  { value: 'local', label: 'Local / Southern Highlands' },
];

const UNITS = ['kg', 'each', 'bunch', 'head', 'loaf', 'punnet', 'dozen', 'bulb'];

function IngredientRow({ ing, onEdit, onDelete }) {
  return (
    <tr>
      <td style={{ padding: '10px 12px', fontSize: 14, fontWeight: 500 }}>{ing.name}</td>
      <td style={{ padding: '10px 12px' }}>
        <Badge type={ing.type}>{ing.type}</Badge>
      </td>
      <td style={{ padding: '10px 12px', fontSize: 13, color: 'var(--text-secondary)' }}>
        <Badge type={ing.source === 'flemington' ? 'flemington' : 'local'}>
          {ing.source === 'flemington' ? 'Flemington' : 'Local'}
        </Badge>
      </td>
      <td style={{ padding: '10px 12px', fontSize: 14, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        ${Number(ing.pricePerKg).toFixed(2)} / {ing.unit}
      </td>
      <td style={{ padding: '10px 12px', textAlign: 'right' }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
          <Btn size="sm" onClick={() => onEdit(ing)}>Edit</Btn>
          <Btn size="sm" variant="danger" onClick={() => onDelete(ing.id)}>✕</Btn>
        </div>
      </td>
    </tr>
  );
}

function IngredientForm({ initial, onSave, onCancel, loading }) {
  const [form, setForm] = useState(initial || {
    name: '', pricePerKg: '', unit: 'kg', type: 'hero', source: 'flemington',
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div>
      <FormField label="Ingredient name">
        <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Heirloom tomatoes" />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Price">
          <input type="number" step="0.1" min="0" value={form.pricePerKg} onChange={e => set('pricePerKg', e.target.value)} placeholder="2.80" />
        </FormField>
        <FormField label="Unit">
          <select value={form.unit} onChange={e => set('unit', e.target.value)}>
            {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Type">
        <select value={form.type} onChange={e => set('type', e.target.value)}>
          {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </FormField>
      <FormField label="Source">
        <select value={form.source} onChange={e => set('source', e.target.value)}>
          {SOURCE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </FormField>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
        <Btn onClick={onCancel}>Cancel</Btn>
        <Btn variant="primary" onClick={() => onSave(form)} disabled={loading}>
          {loading ? 'Saving…' : 'Save ingredient'}
        </Btn>
      </div>
    </div>
  );
}

export default function IngredientsPage({ seasons }) {
  const [activeSeason, setActiveSeason] = useState(seasons[0]?.id || 'summer');
  const [ingredients, setIngredients] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { confirm, Dialog } = useConfirm();

  const load = useCallback(async () => {
    const data = await api.getIngredients(activeSeason);
    setIngredients(data);
  }, [activeSeason]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (form) => {
    setLoading(true);
    try {
      if (modal === 'add') {
        await api.createIngredient({ ...form, seasonId: activeSeason, pricePerKg: parseFloat(form.pricePerKg) });
      } else {
        await api.updateIngredient(modal.ing.id, { ...form, pricePerKg: parseFloat(form.pricePerKg) });
      }
      await load();
      setModal(null);
      setToast('Saved');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    const ok = await confirm('Remove this ingredient?');
    if (!ok) return;
    await api.deleteIngredient(id);
    await load();
    setToast('Deleted');
  };

  const heroes = ingredients.filter(i => i.type === 'hero');
  const locals = ingredients.filter(i => i.type === 'local');
  const standards = ingredients.filter(i => i.type === 'standard');

  const avgHeroPrice = heroes.length
    ? (heroes.reduce((s, i) => s + i.pricePerKg, 0) / heroes.length).toFixed(2)
    : '—';

  return (
    <div>
      {Dialog}
      <SeasonTabs seasons={seasons} active={activeSeason} onChange={setActiveSeason} />

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 10, marginBottom: '1.5rem' }}>
        {[
          { label: 'Total ingredients', value: ingredients.length, sub: 'this season' },
          { label: 'Hero value items', value: heroes.length, sub: 'best-cost picks' },
          { label: 'Local / regional', value: locals.length, sub: 'story ingredients' },
          { label: 'Avg hero price', value: `$${avgHeroPrice}`, sub: 'per unit' },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{c.label}</p>
            <p style={{ fontSize: 22, fontWeight: 500 }}>{c.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{c.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <SectionLabel>Seasonal produce — {ingredients.length} items</SectionLabel>
        <Btn variant="primary" onClick={() => setModal('add')}>+ Add ingredient</Btn>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, marginBottom: '1rem', flexWrap: 'wrap' }}>
        {[
          { type: 'hero', label: 'Hero value ingredient' },
          { type: 'local', label: 'Local / regional' },
          { type: 'flemington', label: 'Flemington Markets' },
          { type: 'standard', label: 'Standard' },
        ].map(l => (
          <div key={l.type} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Badge type={l.type}>{l.label}</Badge>
          </div>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Ingredient', 'Type', 'Source', 'Price', ''].map(h => (
                <th key={h} style={{
                  padding: '8px 12px', fontSize: 12, fontWeight: 500,
                  color: 'var(--text-secondary)', textAlign: h === 'Price' || h === '' ? 'right' : 'left',
                  borderBottom: '0.5px solid var(--border)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...heroes, ...locals, ...standards].map((ing, i, arr) => (
              <React.Fragment key={ing.id}>
                <IngredientRow ing={ing} onEdit={(ing) => setModal({ ing })} onDelete={handleDelete} />
                {i < arr.length - 1 && (
                  <tr><td colSpan={5} style={{ borderBottom: '0.5px solid var(--border)', padding: 0 }} /></tr>
                )}
              </React.Fragment>
            ))}
            {ingredients.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                No ingredients yet. Add the first one.
              </td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {modal && (
        <Modal
          title={modal === 'add' ? 'Add ingredient' : 'Edit ingredient'}
          onClose={() => setModal(null)}
        >
          <IngredientForm
            initial={modal !== 'add' ? modal.ing : null}
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
