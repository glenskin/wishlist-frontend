import { useState } from 'react';

export default function ItemForm({ onSubmit }) {
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newItem);
    setNewItem({ name: '', quantity: 1, category: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-4 p-3 shadow">
      <h5>Добавить товар</h5>
      <div className="row">
        <div className="col-md-4">
          <input
            className="form-control mb-2"
            placeholder="Название"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Количество"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
            min={1}
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control mb-2"
            placeholder="Категория"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
}