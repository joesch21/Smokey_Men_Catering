// src/pages/PackagesPage.jsx  — v2 redesign
// Smokey Men Catering — image-led packages overview
// Uses existing design tokens. Images served from /public/images/

import { packages } from "../data/packagesData.js";
import "../styles/packages.css";

const packageImages = {
  "weekend-bbq": {
    src: "/bundanoonnight.png",
    alt: "Bundanoon evening atmosphere anchoring a relaxed Southern Highlands smoked catering package",
    caption: "Bundanoon / Southern Highlands",
  },
  "corporate-weekday": {
    src: "/preview.webp",
    alt: "Polished smoked catering presentation for corporate lunches, client events and weekday team meals",
    caption: "Corporate / Weekday Service",
  },
  "midweek-dinner": {
    src: "/smoker.webp",
    alt: "Hardwood smoker working low and slow for an intimate midweek shared dinner",
    caption: "Hardwood / Low & Slow",
  },
  "birthday-dinner": {
    src: "/meat2.webp",
    alt: "Celebration smoked meat centrepiece for a birthday dinner table",
  },
  "wedding": {
    src: "/BeefCutBrisket-1024x611.jpg.webp",
    alt: "Premium smoked brisket suited to a Southern Highlands wedding feast",
  },
};

// Accent colours per package — maps to existing CSS vars
const accentHex = {
  "weekend-bbq":       "#C97B2A",   // season-summer amber
  "corporate-weekday": "#2E6DA4",   // season-winter blue
  "midweek-dinner":    "#B85C38",   // season-autumn coral
  "birthday-dinner":   "#4A9B6F",   // season-spring green
  "wedding":           "#6B4F8C",   // teal/plum
};

export default function PackagesPage({ onSelectPackage }) {
  return (
    <div className="ps-packages-page">

      {/* ── Page Hero Banner ── */}
      <div className="ps-page-hero">
        <div className="ps-page-hero-inner">
          <p className="ps-page-eyebrow">Bundanoon smokehouse catering</p>
          <h1 className="ps-page-title">Fire. Meat. Smoke. Gathering.</h1>
          <p className="ps-page-lead">
            Smoked catering packages for Southern Highlands events — from backyard feasts
            to weddings, birthdays and corporate tables.
          </p>
          <div className="ps-craft-row">
            <CraftPill icon="🔥" label="Australian hardwood" />
            <CraftPill icon="⏱" label="Low &amp; slow smoked" />
            <CraftPill icon="📍" label="Bundanoon, NSW" />
          </div>
        </div>
      </div>

      {/* ── Featured (Weekend) large card ── */}
      <section className="ps-choice-intro" aria-label="Package selection guide">
        <p className="ps-choice-kicker">Start with the occasion</p>
        <h2 className="ps-choice-title">A machine of fire, time and appetite — tuned to the event.</h2>
      </section>

      <div className="ps-featured-wrap">
        <FeaturedCard
          pkg={packages[0]}
          image={packageImages[packages[0].id]}
          accent={accentHex[packages[0].id]}
          onSelect={() => onSelectPackage(packages[0].id)}
        />
      </div>

      {/* ── Secondary cards grid (remaining 4) ── */}
      <div className="ps-section-heading">
        <p className="ps-section-kicker">More ways to feed the gathering</p>
        <h2 className="ps-section-title">Choose by service style</h2>
      </div>

      <div className="ps-secondary-grid">
        {packages.slice(1).map((pkg) => (
          <SecondaryCard
            key={pkg.id}
            pkg={pkg}
            image={packageImages[pkg.id]}
            accent={accentHex[pkg.id]}
            onSelect={() => onSelectPackage(pkg.id)}
          />
        ))}
      </div>

      {/* ── Process strip ── */}
      <div className="ps-process-strip">
        <ProcessStep n="01" title="Choose your package" body="Compare guest range, price point, inclusions and service style at a glance." />
        <div className="ps-process-divider" aria-hidden="true" />
        <ProcessStep n="02" title="Tell us about your event" body="Send us your date, guest count, location and dietary needs for a tailored quote." />
        <div className="ps-process-divider" aria-hidden="true" />
        <ProcessStep n="03" title="We cook, you celebrate" body="Our team arrives, fires up the hardwood, and delivers a feast worth remembering." />
      </div>

      {/* ── Footer CTA ── */}
      <div className="ps-footer-cta">
        <p className="ps-footer-cta-text">Not sure which package suits your event?</p>
        <button className="ps-btn-outline" onClick={() => onSelectPackage("enquire")}>
          Get in touch
        </button>
      </div>

    </div>
  );
}

/* ── Featured large card ── */
function FeaturedCard({ pkg, image, accent, onSelect }) {
  return (
    <article className="ps-featured-card" onClick={onSelect}
      tabIndex={0} role="button" aria-label={`View ${pkg.title} package`}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <div className="ps-featured-img-wrap">
        <img src={image.src} alt={image.alt} className="ps-featured-img" loading="lazy" />
        <div className="ps-featured-img-overlay" />
        <span className="ps-featured-badge" style={{ background: accent }}>
          {pkg.tag}
        </span>
      </div>
      <div className="ps-featured-body">
        <div className="ps-featured-meta">
          <span className="ps-event-label">{pkg.label} Event</span>
          <span className="ps-price-chip" style={{ color: accent }}>
            From ${Math.min(...pkg.packages.map(p => p.pricePerHead))}<span className="ps-price-unit"> / head</span>
          </span>
        </div>
        <h2 className="ps-featured-title">{pkg.title}</h2>
        <p className="ps-featured-desc">{pkg.heroDescription}</p>
        <div className="ps-featured-stats">
          <StatPill label="Guests" value={`${pkg.minGuests}–${pkg.maxGuests >= 500 ? "500+" : pkg.maxGuests}`} />
          <StatPill label="Available" value={pkg.availability} />
          <StatPill label="Lead time" value={pkg.leadTime} />
        </div>
        <div className="ps-featured-includes">
          {pkg.includes.slice(0, 4).map((item, i) => (
            <div key={i} className="ps-include-row">
              <span className="ps-include-tick" style={{ color: accent }} aria-hidden="true">✓</span>
              <span className="ps-include-text">{item}</span>
            </div>
          ))}
          {pkg.includes.length > 4 && (
            <div className="ps-include-row ps-include-more">
              +{pkg.includes.length - 4} more included
            </div>
          )}
        </div>
        <button className="ps-btn-primary" style={{ background: accent, borderColor: accent }}
          onClick={(e) => { e.stopPropagation(); onSelect(); }}>
          Explore this package →
        </button>
      </div>
    </article>
  );
}

/* ── Secondary card ── */
function SecondaryCard({ pkg, image, accent, onSelect }) {
  const lowestPrice = Math.min(...pkg.packages.map(p => p.pricePerHead));
  return (
    <article className="ps-secondary-card" onClick={onSelect}
      tabIndex={0} role="button" aria-label={`View ${pkg.title} package`}
      onKeyDown={(e) => e.key === "Enter" && onSelect()}
    >
      <div className="ps-secondary-img-wrap">
        <img src={image.src} alt={image.alt} className="ps-secondary-img" loading="lazy" />
        <span className="ps-secondary-badge" style={{ background: accent }}>{pkg.tag}</span>
      </div>
      <div className="ps-secondary-body">
        <div className="ps-secondary-meta">
          <span className="ps-event-label">{pkg.label}</span>
          <span className="ps-price-chip" style={{ color: accent }}>
            From ${lowestPrice}<span className="ps-price-unit"> / head</span>
          </span>
        </div>
        <h2 className="ps-secondary-title">{pkg.title}</h2>
        <p className="ps-secondary-subtitle">{pkg.subtitle}</p>
        <div className="ps-secondary-pills">
          <StatPill label="Guests" value={`${pkg.minGuests}–${pkg.maxGuests >= 500 ? "500+" : pkg.maxGuests}`} />
          <StatPill label="Days" value={pkg.availability} />
        </div>
        <div className="ps-secondary-includes">
          {pkg.includes.slice(0, 3).map((item, i) => (
            <div key={i} className="ps-include-row">
              <span className="ps-include-tick" style={{ color: accent }} aria-hidden="true">✓</span>
              <span className="ps-include-text">{item}</span>
            </div>
          ))}
        </div>
        <span className="ps-card-cta" style={{ color: accent }}>Explore package →</span>
      </div>
    </article>
  );
}

/* ── Small helpers ── */
function StatPill({ label, value }) {
  return (
    <div className="ps-stat-pill">
      <span className="ps-stat-label">{label}</span>
      <span className="ps-stat-value">{value}</span>
    </div>
  );
}

function CraftPill({ icon, label }) {
  return (
    <span className="ps-craft-pill">
      <span aria-hidden="true">{icon}</span>
      <span dangerouslySetInnerHTML={{ __html: label }} />
    </span>
  );
}

function ProcessStep({ n, title, body }) {
  return (
    <div className="ps-process-step">
      <span className="ps-process-n">{n}</span>
      <h3 className="ps-process-title">{title}</h3>
      <p className="ps-process-body">{body}</p>
    </div>
  );
}
