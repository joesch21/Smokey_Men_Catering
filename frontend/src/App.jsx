import React, { useState, useEffect } from 'react';
import { api, setAdminPassword, clearAdminPassword } from './hooks/api.js';
import Header from './components/Header.jsx';
import MenusPage from './pages/MenusPage.jsx';
import IngredientsPage from './pages/IngredientsPage.jsx';
import CostingsPage from './pages/CostingsPage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import PackageDetailPage from './pages/PackageDetailPage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';

function AdminUnlock({ onUnlocked }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [checking, setChecking] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setChecking(true);
    setMessage('');

    try {
      setAdminPassword(password);
      await api.getCostings();
      window.sessionStorage.setItem('smokey-admin-unlocked', 'yes');
      onUnlocked();
    } catch {
      clearAdminPassword();
      setMessage('That password did not unlock the internal costing page.');
    } finally {
      setChecking(false);
    }
  }

  return (
    <section style={{
      maxWidth: 520,
      margin: '3rem auto',
      padding: '1.35rem',
      border: '0.5px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg-card)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <p style={{
        margin: '0 0 0.4rem',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.09em',
        textTransform: 'uppercase',
        color: 'var(--text-tertiary)',
      }}>
        Internal access
      </p>
      <h1 style={{
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 28,
        fontWeight: 400,
        color: 'var(--text-primary)',
      }}>
        Costings are admin-only for the draft site.
      </h1>
      <p style={{
        margin: '0.65rem 0 1rem',
        fontSize: 13,
        lineHeight: 1.55,
        color: 'var(--text-secondary)',
      }}>
        Enter the draft admin password to view pricing assumptions, margins and internal costing notes.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          style={{
            flex: 1,
            minWidth: 0,
            padding: '0.65rem 0.8rem',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
          }}
        />
        <button
          type="submit"
          disabled={checking || !password}
          style={{
            padding: '0.65rem 0.95rem',
            border: '0.5px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--text-primary)',
            color: '#fff',
            cursor: checking || !password ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {checking ? 'Checking…' : 'Unlock'}
        </button>
      </form>
      {message && (
        <p style={{
          margin: '0.75rem 0 0',
          fontSize: 12,
          color: '#A33A1A',
        }}>
          {message}
        </p>
      )}
    </section>
  );
}


export default function App() {
  const [page, setPage] = useState('packages');
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [activeSeasonId, setActiveSeasonId] = useState(null);
  const [adminUnlocked, setAdminUnlocked] = useState(() => (
    typeof window !== 'undefined'
      && window.sessionStorage.getItem('smokey-admin-unlocked') === 'yes'
      && Boolean(window.sessionStorage.getItem('smokey-admin-password'))
  ));

  useEffect(() => {
    api.getSeasons()
      .then((data) => {
        setSeasons(data);
        if (!activeSeasonId && data.length > 0) setActiveSeasonId(data[0].id);
      })
      .catch(() => setError('Cannot connect to the API. Make sure the backend is running on port 3001.'));
  }, []);

  function handleSetPage(newPage) {
    setSelectedPackageId(null);
    setPage(newPage);
  }

  // Called from PackageDetailPage season cards — navigate to Menus with that season active
  function handleViewMenus(seasonId) {
    setSelectedPackageId(null);
    setActiveSeasonId(seasonId);
    setPage('menus');
  }

  const isInternalPage = page === 'menus' || page === 'ingredients' || page === 'costings';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header activePage={page} setPage={handleSetPage} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>

        {error && (
          <div style={{
            background: '#FAECE7', border: '0.5px solid #D85A30', borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: 13, color: '#4A1B0C',
          }}>
            {error}
          </div>
        )}

        {/* Internal pages — need seasons loaded */}
        {isInternalPage && (
          seasons.length === 0 && !error
            ? <p style={{ color: 'var(--text-tertiary)', fontSize: 14 }}>Loading…</p>
            : <>
                {page === 'menus' && (
                  <MenusPage
                    seasons={seasons}
                    initialSeasonId={activeSeasonId}
                  />
                )}
                {page === 'ingredients' && <IngredientsPage seasons={seasons} />}
                {page === 'costings' && (
                  adminUnlocked
                    ? <CostingsPage />
                    : <AdminUnlock onUnlocked={() => setAdminUnlocked(true)} />
                )}
              </>
        )}

        {/* Public packages pages */}
        {page === 'packages' && !selectedPackageId && (
          <PackagesPage onSelectPackage={setSelectedPackageId} />
        )}
        {page === 'packages' && selectedPackageId && (
          <PackageDetailPage
            packageId={selectedPackageId}
            onBack={() => setSelectedPackageId(null)}
            onViewMenus={handleViewMenus}
          />
        )}

        {/* Supplier intelligence page */}
        {page === 'suppliers' && <SuppliersPage />}

      </main>
    </div>
  );
}
