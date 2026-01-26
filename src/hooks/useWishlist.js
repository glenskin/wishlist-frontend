import { useState, useEffect } from 'react';
import { apiCall } from '../services/api';

export const useWishlist = (token) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: '' });
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: 1, category: '' });

  const loadWishlist = async () => {
    console.log('Loading /wishlist...');
    try {
      setLoading(true);
      // ← Явно GET без Content-Type!
      const res = await fetch(`https://glenskin.ru/api/wishlist`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log('Wishlist loaded:', data);
      setItems(data);
    } catch (e) {
      console.error('Wishlist error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };


  const addItem = async (e) => {
    e.preventDefault();
    try {
      const item = await apiCall('/wishlist', {
        method: 'POST',
        body: JSON.stringify(newItem),
      }, token);
      setItems([...items, item]);
      setNewItem({ name: '', quantity: 1, category: '' });
    } catch (e) {
      setError(e.message);
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await fetch(`${APIBASE}/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setItems(items.filter(item => item.id !== id));
    } catch (e) {
      setError(e.message);
    }
  };

  const updateItem = async (id) => {
    try {
      const item = await apiCall(`/wishlist/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editItem),
      }, token);
      setItems(items.map(i => i.id === id ? item : i));
      setEditingId(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditItem({ ...item });
  };

  useEffect(() => {
    if (token) loadWishlist();
  }, [token]);

  return {
    items, loading, error, setError,
    newItem, setNewItem,
    editingId, editItem, setEditItem,
    addItem, deleteItem, updateItem, startEdit,
  };
};
