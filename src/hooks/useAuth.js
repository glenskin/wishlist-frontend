import { useState, useEffect, useCallback } from 'react';
import { isTokenExpired } from '../utils/jwt';

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token && !isTokenExpired(token));

  const login = useCallback((newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    setIsAuthenticated(!!token && !isTokenExpired(token));
  }, [token]);

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}