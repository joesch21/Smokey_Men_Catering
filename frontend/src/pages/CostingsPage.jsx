import React, { useState, useEffect } from 'react';
import { api } from '../hooks/api.js';
import { Card, SectionLabel, MetricCard, Btn, Toast } from '../components/UI.jsx';

function fmt(n) { return `$${Number(n).toLocaleString()}`; }

function PackageTable({ pkg, label, onChange }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <SectionLabel>{label}</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Line item', 'Note', 'Low estimate', 'High estimate'].map((h, i) => (
                <th key={h} style={{
                  padding: '8px 12px', fontSize: 12, fontWeight: 500,
                  color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)',
                  textAlign: i >= 2 ? 'right' : 'left',
                  width: i === 0 ? '28%' : i === 1 ? '32%' : '20%',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pkg.lines.map((line, idx) => {
              const isTotal = idx === pkg.lines.length - 1;
              return (
                <tr key={idx} style={{ background: isTotal ? 'var(--bg-secondary)' : undefined }}>
                  <td style={{ padding: '9px 12px', fontSize: 13, fontWeight: isTotal ? 500 : 400, borderBottom: '0.5px solid var(--border)' }}>
                    {line.label}
                  </td>
                  <td style={{ padding: '9px 12px', fontSize: 12, color: 'var(--text-tertiary)', borderBottom: '0.5px solid var(--border)' }}>
                    <input
                      style={{ fontSize: 12, padding: '4px 8px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                      value={line.note}
                      onChange={e => onChange(idx, 'note', e.target.value)}
                    />
                  </td>
                  <td style={{ padding: '9px 12px', textAlign: 'right', borderBottom: '0.5px solid var(--border)' }}>
                    <input
                      type="number" style={{ fontSize: 13, padding: '4px 8px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'right', width: 90 }}
                      value={line.low}
                      onChange={e => onChange(idx, 'low', Number(e.target.value))}
                    />
                  </td>
                  <td style={{ padding: '9px 12px', textAlign: 'right', borderBottom: '0.5px solid var(--border)' }}>
                    <input
                      type="number" style={{ fontSize: 13, padding: '4px 8px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'right', width: 90 }}
                      value={line.high}
                      onChange={e => onChange(idx, 'high', Number(e.target.value))}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

const SEASON_COLORS = { Summer: '#EF9F27', Autumn: '#D85A30', Winter: '#378ADD', Spring: '#639922' };

export default function CostingsPage() {
  const [costings, setCostings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { api.getCostings().then(setCostings); }, []);

  const updateLine = (pkg, idx, field, val) => {
    setCostings(c => {
      const lines = [...c[pkg].lines];
      lines[idx] = { ...lines[idx], [field]: val };
      return { ...c, [pkg]: { ...c[pkg], lines } };
    });
  };

  const updateVariance = (idx, field, val) => {
    setCostings(c => {
      const sv = [...c.seasonalVariance];
      sv[idx] = { ...sv[idx], [field]: val };
      return { ...c, seasonalVariance: sv };
    });
  };

  const save = async () => {
    setLoading(true);
    try {
      await api.updateCostings(costings);
      setToast('Costings saved');
    } finally { setLoading(false); }
  };

  if (!costings) return <p style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>Loading…</p>;

  const sellA = costings.packageA.lines.find(l => l.label.startsWith('Recommended'));
  const sellB = costings.packageB.lines.find(l => l.label.startsWith('Recommended'));

  return (
    <div>
      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 10, marginBottom: '1.5rem' }}>
        <MetricCard label="Package A sell price" value={sellA ? `${fmt(sellA.low)}–${fmt(sellA.high)}` : '—'} sub="Full weekend, 36 pax" />
        <MetricCard label="Package B sell price" value={sellB ? `${fmt(sellB.low)}–${fmt(sellB.high)}` : '—'} sub="Celebration event, 36 pax" />
        <MetricCard label="Best margin season" value="Winter" sub="~61% gross margin" />
        <MetricCard label="Flemington pickup" value="4 am" sub="Sydney departure for 10am arrival" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Btn variant="primary" onClick={save} disabled={loading}>{loading ? 'Saving…' : 'Save all costings'}</Btn>
      </div>

      <PackageTable
        pkg={costings.packageA}
        label={costings.packageA.label}
        onChange={(idx, field, val) => updateLine('packageA', idx, field, val)}
      />

      <PackageTable
        pkg={costings.packageB}
        label={costings.packageB.label}
        onChange={(idx, field, val) => updateLine('packageB', idx, field, val)}
      />

      <SectionLabel>Seasonal food cost variance</SectionLabel>
      <Card style={{ padding: 0, overflow: 'hidden', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              {['Season', 'Cost adjustment', 'Driver', 'Gross margin %'].map((h, i) => (
                <th key={h} style={{
                  padding: '8px 12px', fontSize: 12, fontWeight: 500,
                  color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)',
                  textAlign: i === 3 ? 'right' : 'left',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {costings.seasonalVariance.map((row, idx) => (
              <tr key={row.season}>
                <td style={{ padding: '9px 12px', fontSize: 13, fontWeight: 500, borderBottom: '0.5px solid var(--border)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: SEASON_COLORS[row.season], display: 'inline-block' }} />
                    {row.season}
                  </span>
                </td>
                <td style={{ padding: '9px 12px', fontSize: 13, borderBottom: '0.5px solid var(--border)' }}>
                  <input type="number" style={{ width: 90, fontSize: 13, padding: '4px 8px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                    value={row.adj} onChange={e => updateVariance(idx, 'adj', Number(e.target.value))} />
                </td>
                <td style={{ padding: '9px 12px', fontSize: 12, color: 'var(--text-secondary)', borderBottom: '0.5px solid var(--border)' }}>
                  <input style={{ fontSize: 12, padding: '4px 8px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                    value={row.driver} onChange={e => updateVariance(idx, 'driver', e.target.value)} />
                </td>
                <td style={{ padding: '9px 12px', textAlign: 'right', borderBottom: '0.5px solid var(--border)' }}>
                  <input type="number" style={{ width: 70, fontSize: 13, padding: '4px 8px', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'right' }}
                    value={row.margin} onChange={e => updateVariance(idx, 'margin', Number(e.target.value))} />
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 4 }}>%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <SectionLabel>BBQ banquet model — key operational notes</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { icon: '✓', color: 'var(--teal)', text: 'Off-site smoker eliminates the on-site extraction bottleneck — smoke is now an asset, not a risk' },
          { icon: '✓', color: 'var(--teal)', text: 'Bain-marie reheating replaces live fire cooking for mains — single portable induction handles saucing and sides' },
          { icon: '✓', color: 'var(--teal)', text: 'Flemington sourcing (5 am morning-of pickup) gives fresher produce than any advance wholesale order' },
          { icon: '✓', color: 'var(--teal)', text: 'Shared banquet format reduces plates in circulation — single domestic dishwasher is now adequate' },
          { icon: '✓', color: 'var(--teal)', text: 'Zero-waste breakfasts (brisket hash, rib hash, chicken omelettes) reduce food cost by 15–20%' },
          { icon: '▲', color: 'var(--amber)', text: 'Smoker partner SLA critical — build 10% cost buffer for weather-delay days' },
          { icon: '▲', color: 'var(--amber)', text: 'Flemington pickup requires 4 am Sydney departure — factor driver cost or chef travel into staffing line' },
        ].map((n, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: n.color, fontWeight: 500, flexShrink: 0, fontSize: 15, marginTop: 1 }}>{n.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{n.text}</span>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
