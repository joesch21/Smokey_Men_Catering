import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { db } from './data.js';

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'smokey-demo-admin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_DIST = path.resolve(__dirname, '../../frontend/dist');

app.use(cors());
app.use(express.json());

function requireAdmin(req, res, next) {
  const supplied = req.get('x-admin-password');

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Admin password is not configured' });
  }

  if (supplied !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Admin password required' });
  }

  next();
}

// ── Seasons ─────────────────────────────────────────────────
app.get('/api/seasons', (_req, res) => res.json(db.seasons));

app.put('/api/seasons/:id', (req, res) => {
  const idx = db.seasons.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Season not found' });
  db.seasons[idx] = { ...db.seasons[idx], ...req.body, id: req.params.id };
  res.json(db.seasons[idx]);
});

// ── Ingredients ──────────────────────────────────────────────
app.get('/api/ingredients', (req, res) => {
  const { seasonId } = req.query;
  const list = seasonId ? db.ingredients.filter(i => i.seasonId === seasonId) : db.ingredients;
  res.json(list);
});

app.post('/api/ingredients', (req, res) => {
  const ingredient = { id: uuidv4(), ...req.body };
  db.ingredients.push(ingredient);
  res.status(201).json(ingredient);
});

app.put('/api/ingredients/:id', (req, res) => {
  const idx = db.ingredients.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.ingredients[idx] = { ...db.ingredients[idx], ...req.body, id: req.params.id };
  res.json(db.ingredients[idx]);
});

app.delete('/api/ingredients/:id', (req, res) => {
  const idx = db.ingredients.findIndex(i => i.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.ingredients.splice(idx, 1);
  res.json({ success: true });
});

// ── Menus ─────────────────────────────────────────────────────
app.get('/api/menus', (req, res) => {
  const { seasonId } = req.query;
  const list = seasonId ? db.menus.filter(m => m.seasonId === seasonId) : db.menus;
  res.json(list);
});

app.post('/api/menus', (req, res) => {
  const menu = { id: uuidv4(), ...req.body };
  db.menus.push(menu);
  res.status(201).json(menu);
});

app.put('/api/menus/:id', (req, res) => {
  const idx = db.menus.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.menus[idx] = { ...db.menus[idx], ...req.body, id: req.params.id };
  res.json(db.menus[idx]);
});

app.delete('/api/menus/:id', (req, res) => {
  const idx = db.menus.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.menus.splice(idx, 1);
  res.json({ success: true });
});

// ── Costings ─────────────────────────────────────────────────
app.get('/api/costings', requireAdmin, (_req, res) => res.json(db.costings));

app.put('/api/costings', requireAdmin, (req, res) => {
  Object.assign(db.costings, req.body);
  res.json(db.costings);
});

// ── Health ────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Production frontend serving ────────────────────────────────
app.use(express.static(FRONTEND_DIST));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(FRONTEND_DIST, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n🔥 Smokey Men Catering running on port ${PORT}\n`);
});
