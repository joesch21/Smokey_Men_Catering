const BASE = '/api';

async function req(path, method = 'GET', body) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
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
  getCostings: () => req('/costings'),
  updateCostings: (data) => req('/costings', 'PUT', data),
};
