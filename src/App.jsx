import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showAuth, setShowAuth] = useState(!token);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: '' });
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: 1, category: '' });

  const API_BASE = 'https://glenskin.ru';

  function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return {};
  }
}

/*const getHeaders = () => {
  const headers = {};
  if (token) {
    const payload = parseJwt(token);
    headers['X-User-Id'] = payload.sub;  // 17!
  }
  return headers;
};*/

  const getHeaders = () => {
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  async function apiCall(url, options) {
    const res = await fetch(`${API_BASE}/api/${url}`, {
      headers: { ...getHeaders(), 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail);
    }
    return res.json();
  }

  async function loadWishlist() {
    try {
      const data = await apiCall('wishlist');
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function login(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    try {
      const res = await fetch(`${API_BASE}/api/auth/token`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Неверный email или пароль');
      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      setToken(data.access_token);
      setShowAuth(false);
      setError('');
      loadWishlist();
    } catch (e) {
      setError(e.message);
    }
  }

  async function register(e) {
    e.preventDefault();
    try {
      await apiCall('auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setError('✅ Регистрация прошла успешно! Теперь войдите.');
      setIsRegister(false);
    } catch (e) {
      setError(e.message);
    }
  }

  async function addItem(e) {
    e.preventDefault();
    try {
      const item = await apiCall('wishlist', {
        method: 'POST',
        body: JSON.stringify(newItem),
      });
      setItems([...items, item]);
      setNewItem({ name: '', quantity: 1, category: '' });
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteItem(id) {
    if (!confirm('Удалить товар?')) return;
    try {
      await fetch(`${API_BASE}/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      setItems(items.filter(item => item.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function updateItem(id) {
    try {
      const item = await apiCall(`wishlist/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editItem),
      });
      setItems(items.map(i => (i.id === id ? item : i)));
      setEditingId(null);
    } catch (e) {
      setError(e.message);
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditItem({ ...item });
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setShowAuth(true);
    setItems([]);
  };

  useEffect(() => {
    if (token) loadWishlist();
  }, [token]);

  const Footer = () => (
    <footer className="mt-5 pt-4 border-top">
      <div className="text-center text-muted">
        <p>&copy; 2026 Список желаемого. Создано с ❤️ на FastAPI + React + Docker.</p>
        <p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            GitHub
          </a>{' '}
          | v1.0
        </p>
      </div>
    </footer>
  );

  if (showAuth) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <div className="container mt-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow">
                <div className="card-body">
                  <h2 className="text-center mb-4">{isRegister ? 'Регистрация' : 'Вход'}</h2>
                  <form onSubmit={isRegister ? register : login}>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mb-2">
                      {isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button
                      type="button"
                      className="btn btn-link w-100"
                      onClick={() => {
                        setIsRegister(!isRegister);
                        setError('');
                      }}
                    >
                      {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <div className="container mt-5 flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Загрузка...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container mt-5 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Список желаемого ({items.length})</h1>
          <button className="btn btn-outline-danger" onClick={logout}>
            Выйти
          </button>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={addItem} className="card mb-4 p-3 shadow">
          <h5>Добавить товар</h5>
          <div className="row">
            <div className="col-md-4">
              <input
                className="form-control mb-2"
                placeholder="Название"
                value={newItem.name}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Количество"
                value={newItem.quantity}
                onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                min={1}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control mb-2"
                placeholder="Категория"
                value={newItem.category}
                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-success w-100">Добавить</button>
            </div>
          </div>
        </form>
        {items.length === 0 ? (
          <div className="alert alert-info text-center">Список желаемого пуст. Добавьте первый товар!</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Количество</th>
                  <th>Категория</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          className="form-control form-control-sm"
                          value={editItem.name}
                          onChange={e => setEditItem({ ...editItem, name: e.target.value })}
                        />
                      ) : (
                        item.name
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={editItem.quantity}
                          onChange={e => setEditItem({ ...editItem, quantity: parseInt(e.target.value) || 1 })}
                          min={1}
                        />
                      ) : (
                        <span className="badge bg-primary fs-6">{item.quantity}</span>
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <input
                          className="form-control form-control-sm"
                          value={editItem.category}
                          onChange={e => setEditItem({ ...editItem, category: e.target.value })}
                        />
                      ) : (
                        item.category || '-'
                      )}
                    </td>
                    <td>
                      {editingId === item.id ? (
                        <>
                          <button className="btn btn-sm btn-success me-1" onClick={() => updateItem(item.id)}>
                            Сохранить
                          </button>
                          <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>
                            Отмена
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn btn-sm btn-warning me-1" onClick={() => startEdit(item)}>
                            Редактировать
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteItem(item.id)}>
                            Удалить
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;