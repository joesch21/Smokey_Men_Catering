import React, { useState, useEffect } from 'react';
import { api } from './hooks/api.js';
import Header from './components/Header.jsx';
import MenusPage from './pages/MenusPage.jsx';
import IngredientsPage from './pages/IngredientsPage.jsx';
import CostingsPage from './pages/CostingsPage.jsx';
import PackagesPage from './pages/PackagesPage.jsx';
import PackageDetailPage from './pages/PackageDetailPage.jsx';
import SuppliersPage from './pages/SuppliersPage.jsx';

export default function App() {
  const [page, setPage] = useState('packages');
  const [seasons, setSeasons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [activeSeasonId, setActiveSeasonId] = useState(null);

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
                {page === 'costings'    && <CostingsPage />}
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
