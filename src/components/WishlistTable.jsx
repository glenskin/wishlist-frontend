import { useWishlist } from '../hooks/useWishlist';

const WishlistTable = () => {
  const {
    items, editingId, editItem, setEditItem,
    updateItem, startEdit, deleteItem,
  } = useWishlist();

  return (
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
              <td>
                {editingId === item.id ? (
                  <input className="form-control form-control-sm"
                    value={editItem.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} />
                ) : item.name}
              </td>
              <td>
                {editingId === item.id ? (
                  <input type="number" className="form-control form-control-sm"
                    value={editItem.quantity} onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value) })} min={1} />
                ) : (
                  <span className="badge bg-primary">{item.quantity}</span>
                )}
              </td>
              <td>
                {editingId === item.id ? (
                  <input className="form-control form-control-sm"
                    value={editItem.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} />
                ) : item.category}
              </td>
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
  );
};

export default WishlistTable;
