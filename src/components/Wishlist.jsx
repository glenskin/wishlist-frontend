import WishlistForm from './WishlistForm';
import WishlistTable from './WishlistTable';
import { useWishlist } from '../hooks/useWishlist';
import { useAuth } from '../hooks/useAuth';

const Wishlist = () => {
  const { logout } = useAuth();
  const { items, loading, error, setError } = useWishlist();

  if (loading) return (
    <div className="container mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Wishlist ({items.length})</h1>
        <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <WishlistForm />
      {items.length === 0 ? (
        <div className="alert alert-info">Wishlist is empty. Add something!</div>
      ) : (
        <WishlistTable />
      )}
    </div>
  );
};

export default Wishlist;
