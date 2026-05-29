// src/pages/PackageDetailPage.jsx  — v2
// Smokey Men Catering — package detail page, redesigned
// Integrates with seasonal menus. Accepts: packageId, onBack, seasons, onViewMenus

import { packages } from "../data/packagesData.js";

// Season colours from data.js — kept in sync here for badge rendering
const SEASON_META = {
  summer: { label: "Summer",  color: "#EF9F27", months: "Dec – Feb" },
  autumn: { label: "Autumn",  color: "#D85A30", months: "Mar – May" },
  winter: { label: "Winter",  color: "#378ADD", months: "Jun – Aug" },
  spring: { label: "Spring",  color: "#639922", months: "Sep – Nov" },
};

// Which seasons each package is best suited for — drives the menu link section
const PACKAGE_SEASONS = {
  "weekend-bbq":       ["summer", "autumn", "winter", "spring"],
  "corporate-weekday": ["autumn", "winter", "spring"],
  "midweek-dinner":    ["summer", "autumn", "winter", "spring"],
  "birthday-dinner":   ["spring", "summer"],
  "wedding":           ["spring", "summer", "autumn"],
};

// Accent colours per package (matches PackagesPage)
const ACCENT = {
  "weekend-bbq":       "#C97B2A",
  "corporate-weekday": "#2E6DA4",
  "midweek-dinner":    "#B85C38",
  "birthday-dinner":   "#4A9B6F",
  "wedding":           "#6B4F8C",
};

// Hero images
const HERO_IMAGES = {
  "weekend-bbq":       "/smoker.webp",
  "corporate-weekday": "/preview.webp",
  "midweek-dinner":    "/australianhardwood.webp",
  "birthday-dinner":   "/meat2.webp",
  "wedding":           "/BeefCutBrisket-1024x611.jpg.webp",
};

export default function PackageDetailPage({ packageId, onBack, onViewMenus }) {
  const pkg = packages.find((p) => p.id === packageId);

  if (!pkg) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <p style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
          Package not found.
        </p>
        <button className="psd-btn-outline" onClick={onBack}>← Back to packages</button>
      </div>
    );
  }

  const accent = ACCENT[pkg.id] || "#C97B2A";
  const heroImg = HERO_IMAGES[pkg.id];
  const suitableSeasons = PACKAGE_SEASONS[pkg.id] || [];
  const lowestPrice = Math.min(...pkg.packages.map((p) => p.pricePerHead));
  const highestPrice = Math.max(...pkg.packages.map((p) => p.pricePerHead));

  return (
    <div className="psd-page">

      {/* ── Back nav ── */}
      <button className="psd-back-btn" onClick={onBack}>
        ← Back to packages
      </button>

      {/* ── Hero ── */}
      <div className="psd-hero">
        <div className="psd-hero-img-wrap">
          {heroImg && (
            <img src={heroImg} alt={pkg.title} className="psd-hero-img" />
          )}
          <div className="psd-hero-img-scrim" />
          <div className="psd-hero-overlay-content">
            <span className="psd-hero-badge" style={{ background: accent }}>
              {pkg.tag}
            </span>
            <h1 className="psd-hero-title">{pkg.title}</h1>
            <p className="psd-hero-subtitle">{pkg.subtitle}</p>
          </div>
        </div>

        {/* ── Key stats bar ── */}
        <div className="psd-stats-bar">
          <div className="psd-stat-block">
            <span className="psd-stat-label">Price range</span>
            <span className="psd-stat-value" style={{ color: accent }}>
              ${lowestPrice}–${highestPrice}<span className="psd-stat-unit"> / head</span>
            </span>
          </div>
          <div className="psd-stat-divider" />
          <div className="psd-stat-block">
            <span className="psd-stat-label">Guest range</span>
            <span className="psd-stat-value">
              {pkg.minGuests}–{pkg.maxGuests >= 500 ? "500+" : pkg.maxGuests}
            </span>
          </div>
          <div className="psd-stat-divider" />
          <div className="psd-stat-block">
            <span className="psd-stat-label">Available</span>
            <span className="psd-stat-value">{pkg.availability}</span>
          </div>
          <div className="psd-stat-divider" />
          <div className="psd-stat-block">
            <span className="psd-stat-label">Lead time</span>
            <span className="psd-stat-value">{pkg.leadTime}</span>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="psd-body">

        {/* ── Left column ── */}
        <div className="psd-main-col">

          {/* About */}
          <section className="psd-section">
            <p className="psd-lead-text">{pkg.heroDescription}</p>
          </section>

          {/* Pricing tiers */}
          <section className="psd-section">
            <h2 className="psd-section-title">Pricing tiers</h2>
            <div className="psd-tiers-grid">
              {pkg.packages.map((tier, i) => (
                <div
                  key={i}
                  className={`psd-tier-card ${i === 1 ? "psd-tier-featured" : ""}`}
                  style={i === 1 ? { borderColor: accent } : {}}
                >
                  {i === 1 && (
                    <span className="psd-tier-badge" style={{ background: accent }}>
                      Recommended
                    </span>
                  )}
                  <p className="psd-tier-name">{tier.name}</p>
                  <p className="psd-tier-guests">{tier.guests} guests</p>
                  <p className="psd-tier-price" style={{ color: accent }}>
                    ${tier.pricePerHead}
                    <span className="psd-tier-price-unit"> per head</span>
                  </p>
                  <p className="psd-tier-desc">{tier.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's included */}
          <section className="psd-section">
            <h2 className="psd-section-title">What's included</h2>
            <div className="psd-includes-grid">
              {pkg.includes.map((item, i) => (
                <div key={i} className="psd-include-item">
                  <span className="psd-include-tick" style={{ color: accent }}>✓</span>
                  <span className="psd-include-text">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Seasonal menus link */}
          <section className="psd-section">
            <h2 className="psd-section-title">Seasonal menus for this package</h2>
            <p className="psd-section-body">
              Every Pill &amp; Smoke package is built around what's growing in the
              Southern Highlands right now — sourced from Flemington Markets at dawn
              and locally from Snake Creek and Bundanoon producers.
            </p>
            <div className="psd-seasons-grid">
              {suitableSeasons.map((sid) => {
                const s = SEASON_META[sid];
                return (
                  <button
                    key={sid}
                    className="psd-season-card"
                    style={{ borderColor: s.color + "55" }}
                    onClick={() => onViewMenus && onViewMenus(sid)}
                  >
                    <span
                      className="psd-season-dot"
                      style={{ background: s.color }}
                    />
                    <div className="psd-season-text">
                      <span className="psd-season-name" style={{ color: s.color }}>
                        {s.label}
                      </span>
                      <span className="psd-season-months">{s.months}</span>
                    </div>
                    <span className="psd-season-arrow" style={{ color: s.color }}>→</span>
                  </button>
                );
              })}
            </div>
            <p className="psd-season-note">
              Each season brings a different feast. Click any season above to browse
              the full menu cards — Friday arrival boards, Saturday dinners,
              celebration feasts and more.
            </p>
          </section>

        </div>

        {/* ── Right column ── */}
        <div className="psd-side-col">

          {/* Add-ons */}
          <div className="psd-side-card">
            <h3 className="psd-side-title">Optional add-ons</h3>
            <div className="psd-addons-list">
              {pkg.addOns.map((addon, i) => (
                <div key={i} className="psd-addon-row">
                  <span className="psd-addon-name">{addon.name}</span>
                  <span className="psd-addon-price" style={{ color: accent }}>
                    {addon.flat ? `$${addon.price}` : `+$${addon.price}/head`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Enquiry CTA */}
          <div className="psd-cta-card" style={{ borderColor: accent + "44" }}>
            <div
              className="psd-cta-accent-bar"
              style={{ background: accent }}
            />
            <div className="psd-cta-inner">
              <h3 className="psd-cta-title">Ready to book?</h3>
              <p className="psd-cta-body">
                Tell us your date, guest count and any dietary needs. We'll send a
                tailored quote within one business day.
              </p>
              <a
                href={`mailto:smokeymenbookings@gmail.com?subject=Smokey%20Men%20Catering%20booking%20enquiry%20-%20${pkg.title}`}
                className="psd-btn-primary"
                style={{ background: accent }}
              >
                Email us →
              </a>
              <button className="psd-btn-outline" onClick={onBack}>
                Browse other packages
              </button>
            </div>
          </div>

          {/* Craft credentials */}
          <div className="psd-side-card psd-craft-card">
            <h3 className="psd-side-title">Our craft</h3>
            <div className="psd-craft-list">
              <CraftItem icon="🪵" label="Australian hardwood" detail="Red gum & ironbark for consistent heat and clean smoke" />
              <CraftItem icon="⏱" label="Low & slow" detail="12–18 hours depending on the cut" />
              <CraftItem icon="📍" label="Bundanoon, NSW" detail="Southern Highlands, 2 hours from Sydney" />
              <CraftItem icon="🌿" label="Seasonal sourcing" detail="Flemington Markets at dawn, local producers first" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CraftItem({ icon, label, detail }) {
  return (
    <div className="psd-craft-item">
      <span className="psd-craft-icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="psd-craft-label">{label}</p>
        <p className="psd-craft-detail">{detail}</p>
      </div>
    </div>
  );
}
