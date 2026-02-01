import { apiCall } from './index';

export const wishlistApi = {
  async getAll() {
    try {
      return await apiCall('wishlist/');
    } catch (e) {
      // Если со слешем не работает, пробуем без слеша
      return await apiCall('wishlist');
    }
  },

  async create(item) {
    return await apiCall('wishlist/', {
      method: 'POST',
      body: JSON.stringify(item),
    });
  },

  async update(id, item) {
    return await apiCall(`wishlist/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
    });
  },

  async delete(id) {
    return await apiCall(`wishlist/${id}`, {
      method: 'DELETE',
    });
  },
};

export const authApi = {
  async login(email, password) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const res = await fetch('https://glenskin.ru/api/auth/token', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) throw new Error('Неверный email или пароль');
    return res.json();
  },

  async register(email, password) {
    return await apiCall('auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};