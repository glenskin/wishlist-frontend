import { useWishlist } from '../hooks/useWishlist';

const WishlistForm = () => {
  const { newItem, setNewItem, addItem } = useWishlist();

  return (
    <form onSubmit={addItem} className="card mb-4 p-3">
      <h5>Add Item</h5>
      <div className="row">
        <div className="col-md-4">
          <input className="form-control mb-2" placeholder="Name"
            value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <input type="number" className="form-control mb-2" placeholder="Quantity"
            value={newItem.quantity} onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} min={1} />
        </div>
        <div className="col-md-3">
          <input className="form-control mb-2" placeholder="Category"
            value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })} />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">Add</button>
        </div>
      </div>
    </form>
  );
};

export default WishlistForm;
