const APIBASE = 'https://glenskin.ru';

const getHeaders = (token) => {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export const apiCall = async (url, options = {}, token) => {
  const headers = getHeaders(token);
  
  // ← Фикс: Content-Type ТОЛЬКО при body!
  if (options.body && !options.headers?.['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${APIBASE}/api${url}`, {
    headers,
    ...options,  // method, body отзывается
  });
  
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
};
