import { parseJwt, isTokenExpired } from '../utils/jwt';

const API_BASE = 'https://glenskin.ru';

export const getHeaders = () => {
  const headers = {};
  const token = localStorage.getItem('token');
  
  if (token) {
    if (isTokenExpired(token)) {
      console.log('Token expired');
      localStorage.removeItem('token');
      return headers;
    }
    
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export async function apiCall(url, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getHeaders(),
    ...options.headers,
  };

  if (options.body && typeof options.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}/api/${url}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  console.log(`API ${url}:`, res.status, res.statusText);

  if (res.status === 401) {
    localStorage.removeItem('token');
    throw new Error('Сессия истекла. Войдите снова.');
  }

  if (!res.ok) {
    const text = await res.text();
    let detail = 'Ошибка сервера';
    try {
      const json = JSON.parse(text);
      detail = json.detail || json.message || text;
    } catch {
      detail = text || res.statusText;
    }
    throw new Error(detail);
  }

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }

  return res.json();
}