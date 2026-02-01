import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './hooks/useAuth';
import { wishlistApi, authApi } from './api/wishlist';
import AuthForm from './components/AuthForm';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import Header from './components/Header';
import ItemForm from './components/ItemForm';
import ItemTable from './components/ItemTable';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ name: '', quantity: 1, category: '' });

  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      loadWishlist();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  async function loadWishlist() {
    try {
      setLoading(true);
      const data = await wishlistApi.getAll();
      setItems(data);
      setError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(email, password) {
    try {
      const data = await authApi.login(email, password);
      login(data.access_token);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleRegister(email, password) {
    try {
      await authApi.register(email, password);
      setError('✅ Регистрация прошла успешно! Теперь войдите.');
      setIsRegister(false);
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleAddItem(item) {
    try {
      const newItem = await wishlistApi.create(item);
      setItems([...items, newItem]);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDeleteItem(id) {
    if (!confirm('Удалить товар?')) return;
    try {
      await wishlistApi.delete(id);
      setItems(items.filter((item) => item.id !== id));
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleUpdateItem(id) {
    try {
      const updatedItem = await wishlistApi.update(id, editItem);
      setItems(items.map((i) => (i.id === id ? updatedItem : i)));
      setEditingId(null);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setEditItem({ ...item });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  if (!isAuthenticated) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <div className="container mt-5 flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <AuthForm
                isRegister={isRegister}
                onToggle={() => setIsRegister(!isRegister)}
                onSubmit={isRegister ? handleRegister : handleLogin}
                error={error}
              />
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
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="container mt-5 flex-grow-1">
        <Header itemsCount={items.length} onLogout={logout} />
        {error && <div className="alert alert-danger">{error}</div>}
        <ItemForm onSubmit={handleAddItem} />
        <ItemTable
          items={items}
          editingId={editingId}
          editItem={editItem}
          onStartEdit={startEdit}
          onCancelEdit={cancelEdit}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
          setEditItem={setEditItem}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;