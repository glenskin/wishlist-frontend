export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

export function isTokenExpired(token) {
  if (!token) return true;
  
  try {
    const payload = parseJwt(token);
    const exp = payload.exp * 1000; // Конвертируем в миллисекунды
    return Date.now() >= exp;
  } catch {
    return true;
  }
}