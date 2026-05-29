const BASE = '/api';
const ADMIN_PASSWORD_KEY = 'smokey-admin-password';

function getAdminPassword() {
  if (typeof window === 'undefined') return '';
  return window.sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '';
}

export function setAdminPassword(password) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(ADMIN_PASSWORD_KEY, password);
}

export function clearAdminPassword() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(ADMIN_PASSWORD_KEY);
  window.sessionStorage.removeItem('smokey-admin-unlocked');
}

async function req(path, method = 'GET', body, options = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (options.admin) {
    headers['x-admin-password'] = getAdminPassword();
  }

  const opts = {
    method,
    headers,
  };

  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(BASE + path, opts);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  // Seasons
  getSeasons: () => req('/seasons'),
  updateSeason: (id, data) => req(`/seasons/${id}`, 'PUT', data),

  // Ingredients
  getIngredients: (seasonId) => req(`/ingredients${seasonId ? `?seasonId=${seasonId}` : ''}`),
  createIngredient: (data) => req('/ingredients', 'POST', data),
  updateIngredient: (id, data) => req(`/ingredients/${id}`, 'PUT', data),
  deleteIngredient: (id) => req(`/ingredients/${id}`, 'DELETE'),

  // Menus
  getMenus: (seasonId) => req(`/menus${seasonId ? `?seasonId=${seasonId}` : ''}`),
  createMenu: (data) => req('/menus', 'POST', data),
  updateMenu: (id, data) => req(`/menus/${id}`, 'PUT', data),
  deleteMenu: (id) => req(`/menus/${id}`, 'DELETE'),

  // Costings
  getCostings: () => req('/costings', 'GET', undefined, { admin: true }),
  updateCostings: (data) => req('/costings', 'PUT', data, { admin: true }),
};
