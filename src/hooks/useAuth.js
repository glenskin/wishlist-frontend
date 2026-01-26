import { useState, useEffect } from 'react';
import { apiCall } from '../services/api';

const APIBASE = 'https://glenskin.ru';  // ← ДОБАВИТЬ!

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showAuth, setShowAuth] = useState(!token);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    console.log('Login:', email);
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    try {
      const res = await fetch(`${APIBASE}/api/auth/token`, {  // ← APIBASE!
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Неверный email или пароль');
      const data = await res.json();
      console.log('Token OK');
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
      setShowAuth(false);
      setError('');
    } catch (e) {
      console.error('Login error:', e);
      setError(e.message);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    console.log('Register:', email);
    try {
      await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setError('✅ Зарегистрирован! Теперь войдите');
      setIsRegister(false);
    } catch (e) {
      setError(e.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setShowAuth(true);
    setEmail('');
    setPassword('');
  };

  return {
    token, showAuth, setShowAuth, isRegister, setIsRegister,
    email, setEmail, password, setPassword, error, setError,  // ← setError!
    login, register, logout,
  };
};
