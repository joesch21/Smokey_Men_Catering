import React from 'react';
import '../styles/suppliers.css';

const villageSuppliers = [
  {
    name: 'The Village Grocer & Store (IGA)',
    category: 'Grocery & Produce',
    location: '65 Railway Ave, Bundanoon',
    note: 'Fresh seasonal produce, deli items, local growers and emergency top-ups.',
    detail: 'Open daily with extended Friday trading. Primary backup for last-minute produce and pantry gaps.',
    badge: 'Emergency top-up',
  },
  {
    name: 'Bundanoon Butchery',
    category: 'Meat',
    location: '19 Railway Ave, Bundanoon',
    note: 'Fresh-cut proteins and regionally raised product support.',
    detail: 'Useful for last-minute weekend protein top-ups and local provenance sourcing.',
    badge: 'Local protein',
  },
  {
    name: "Bundanoon Country Bakehouse / Potter's Pantry",
    category: 'Bread & Pastry',
    location: 'Bundanoon village',
    note: 'Fresh breads, pastries, breakfast items and morning tea supply.',
    detail: 'Strong fit for weekend breakfasts, retreat morning tea and grazing-board bread service.',
    badge: 'Daily bread',
  },
  {
    name: 'Bundanoon Delicatessen',
    category: 'Specialty Deli',
    location: 'Bundanoon village',
    note: 'Antipasto, local cheeses, pickles and grazing-board components.',
    detail: 'Useful for arrival boards, canapé support and premium local display items.',
    badge: 'Grazing boards',
  },
  {
    name: 'The Pioneer Flask Bottle Shop',
    category: 'Beverages',
    location: 'Bundanoon village',
    note: 'Beverage top-ups close to site.',
    detail: 'Pairs with The Pill Factory bar fridges once stocked for event service.',
    badge: 'Bar support',
  },
];

const wholesaleSuppliers = [
  {
    name: 'Grayco Foods',
    category: 'Primary Wholesale',
    location: 'Mittagong',
    note: 'Dry, chilled, frozen and packaging supply with Southern Highlands access.',
    detail: 'Use for advance orders, pick-up or delivery, especially for weekend residential service.',
    badge: 'Open account',
  },
  {
    name: 'V&C Foods',
    category: 'Full Foodservice Range',
    location: 'South Nowra',
    note: 'Large foodservice range covering meat, frozen, dry goods, chilled, chemicals and packaging.',
    detail: 'Useful second wholesale account for pricing depth and operational redundancy.',
    badge: 'Open account',
  },
  {
    name: 'CWP Distributors',
    category: 'Eco Packaging',
    location: 'Wollongong',
    note: 'Biodegradable and eco food packaging for outdoor BBQ and casual service formats.',
    detail: 'Important for picnic hampers, casual lunches, takeaway-style service and outdoor events.',
    badge: 'Eco packaging',
  },
];

const provenanceSuppliers = [
  {
    name: "St Maur / Sally's Corner / Banjo's Run / Sutton Forest Wines",
    category: 'Cool-climate Wines',
    location: 'Southern Highlands',
    note: 'Potential wine inclusion and local beverage partnership set.',
  },
  {
    name: 'Snake Creek Cattle Co. / Farm Club Australia',
    category: 'Artisan & Farm Gate',
    location: 'Southern Highlands',
    note: 'Pasture-raised meats, handcrafted pies and edible garden produce for hero ingredient sourcing.',
  },
];

function SupplierCard({ supplier }) {
  return (
    <article className="sup-card">
      <div className="sup-card-topline">
        <span className="sup-card-category">{supplier.category}</span>
        {supplier.badge && <span className="sup-card-badge">{supplier.badge}</span>}
      </div>
      <h2 className="sup-card-title">{supplier.name}</h2>
      <p className="sup-card-location">{supplier.location}</p>
      <p className="sup-card-note">{supplier.note}</p>
      {supplier.detail && <p className="sup-card-detail">{supplier.detail}</p>}
    </article>
  );
}

function SupplierMiniCard({ supplier }) {
  return (
    <article className="sup-mini-card">
      <p className="sup-card-category">{supplier.category}</p>
      <h3>{supplier.name}</h3>
      <p>{supplier.location}</p>
      <span>{supplier.note}</span>
    </article>
  );
}

export default function SuppliersPage() {
  return (
    <div className="sup-page">
      <section className="sup-hero">
        <div>
          <p className="sup-eyebrow">Supply chain map</p>
          <h1>Local suppliers for reliable Southern Highlands catering.</h1>
          <p className="sup-lead">
            A working supplier view for Bundanoon events: village top-ups, wholesale ordering,
            eco packaging and provenance-led hero ingredients.
          </p>
        </div>
        <div className="sup-hero-panel">
          <span>Operating principle</span>
          <strong>Order early. Top up locally. Tell the provenance story.</strong>
          <p>
            Wholesale ordering should happen midweek. Bundanoon village suppliers protect the service
            when weather, guests or menu changes create last-minute pressure.
          </p>
        </div>
      </section>

      <section className="sup-section">
        <div className="sup-section-heading">
          <p className="sup-eyebrow">Walking distance</p>
          <h2>Bundanoon village backup network</h2>
          <p>
            These suppliers protect service quality when the team needs fresh produce, proteins,
            bread, deli items or beverage top-ups close to The Pill Factory.
          </p>
        </div>
        <div className="sup-grid sup-grid-village">
          {villageSuppliers.map((supplier) => (
            <SupplierCard key={supplier.name} supplier={supplier} />
          ))}
        </div>
      </section>

      <section className="sup-section">
        <div className="sup-section-heading">
          <p className="sup-eyebrow">Delivery to site</p>
          <h2>Regional wholesale backbone</h2>
          <p>
            Use wholesale accounts for planned volume, price control and operational redundancy.
            Village suppliers remain the emergency layer, not the base costing model.
          </p>
        </div>
        <div className="sup-grid sup-grid-wholesale">
          {wholesaleSuppliers.map((supplier) => (
            <SupplierCard key={supplier.name} supplier={supplier} />
          ))}
        </div>
      </section>

      <section className="sup-provenance-band">
        <div>
          <p className="sup-eyebrow">Provenance advantage</p>
          <h2>Hero ingredients and local story</h2>
          <p>
            These relationships are less about emergency logistics and more about making the catering
            feel rooted in the Southern Highlands.
          </p>
        </div>
        <div className="sup-mini-grid">
          {provenanceSuppliers.map((supplier) => (
            <SupplierMiniCard key={supplier.name} supplier={supplier} />
          ))}
        </div>
      </section>

      <section className="sup-ops-strip">
        <div>
          <span>01</span>
          <strong>Order Wed/Thu</strong>
          <p>Place wholesale orders before the weekend service window.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Use village top-ups</strong>
          <p>Keep Village Grocer, Butchery, bakery and deli as local service protection.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Build account pricing</strong>
          <p>Open Grayco and V&C accounts before locking final menu costings.</p>
        </div>
      </section>
    </div>
  );
}
