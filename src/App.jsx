import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [showAuth, setShowAuth] = useState(!userId);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: '' });
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: 1, category: '' });

  const API_BASE = 'https://glenskin.ru'; // Поменяй на прод

  const getHeaders = () => ({ 'X-User-Id': userId });

  async function apiCall(url, options = {}) {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { ...getHeaders(), 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail);
    }
    return res.json();
  }

  async function loadWishlist() {
    try {
      const data = await apiCall('/api/wishlist');
      setItems(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      const res = await fetch(`${API_BASE}/api/auth/login`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('userId', data.user_id);
      setUserId(data.user_id);
      setShowAuth(false);
      loadWishlist();
    } catch (e) {
      setError(e.message);
    }
  }

  async function register(e) {
    e.preventDefault();
    try {
      const data = await apiCall('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('userId', data.id);
      setUserId(data.id);
      setShowAuth(false);
      loadWishlist();
    } catch (e) {
      setError(e.message);
    }
  }

  async function addItem(e) {
    e.preventDefault();
    try {
      const item = await apiCall('/api/wishlist', {
        method: 'POST',
        body: JSON.stringify(newItem)
      });
      setItems([...items, item]);
      setNewItem({ name: '', quantity: 1, category: '' });
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteItem(id) {
    if (!confirm('Delete?')) return;
    try {
      await fetch(`${API_BASE}/api/wishlist/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      setItems(items.filter(item => item.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function updateItem(id) {
    try {
      const item = await apiCall(`/api/wishlist/${id}`, {
        method: 'PUT',
        body: JSON.stringify(editItem)
      });
      setItems(items.map(i => i.id === id ? item : i));
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
    localStorage.removeItem('userId');
    setUserId(null);
    setShowAuth(true);
    setItems([]);
  };

  useEffect(() => {
    if (userId) loadWishlist();
  }, [userId]);

  if (showAuth) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>{isRegister ? 'Register' : 'Login'}</h2>
            <form onSubmit={isRegister ? register : login}>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">
                {isRegister ? 'Register' : 'Login'}
              </button>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="button" className="btn btn-link w-100" onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}>
                {isRegister ? 'Already have account? Login' : "Don't have account? Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (loading) return <div className="container mt-5"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Wishlist ({items.length})</h1>
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={addItem} className="card mb-4 p-3">
        <h5>Add Item</h5>
        <div className="row">
          <div className="col-md-4">
            <input className="form-control mb-2" placeholder="Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} required />
          </div>
          <div className="col-md-3">
            <input type="number" className="form-control mb-2" placeholder="Quantity" value={newItem.quantity} onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value)})} min="1" />
          </div>
          <div className="col-md-3">
            <input className="form-control mb-2" placeholder="Category" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">Add</button>
          </div>
        </div>
      </form>

      {items.length === 0 ? (
        <div className="alert alert-info">Wishlist is empty. Add something!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th><th>Name</th><th>Quantity</th><th>Category</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{editingId === item.id ? 
                    <input className="form-control form-control-sm" value={editItem.name} onChange={e => setEditItem({...editItem, name: e.target.value})} /> :
                    item.name
                  }</td>
                  <td>{editingId === item.id ? 
                    <input type="number" className="form-control form-control-sm" value={editItem.quantity} onChange={e => setEditItem({...editItem, quantity: parseInt(e.target.value)})} min="1" /> :
                    <span className="badge bg-primary">{item.quantity}</span>
                  }</td>
                  <td>{editingId === item.id ? 
                    <input className="form-control form-control-sm" value={editItem.category} onChange={e => setEditItem({...editItem, category: e.target.value})} /> :
                    item.category || '-'
                  }</td>
                  <td>
                    {editingId === item.id ? (
                      <>
                        <button className="btn btn-sm btn-success me-1" onClick={() => updateItem(item.id)}>Save</button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-sm btn-warning me-1" onClick={() => startEdit(item)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
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
  );
}

export default App;
