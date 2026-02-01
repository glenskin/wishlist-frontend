import { useState } from 'react';

export default function AddItemModal({ isOpen, onClose, onSubmit }) {
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newItem);
    setNewItem({ name: '', quantity: 1, category: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div 
        className="modal fade show d-block" 
        tabIndex="-1" 
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="bi bi-gift me-2"></i>
                Добавить новый товар
              </h5>
              <button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={onClose}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Название товара *</label>
                  <input
                    className="form-control form-control-lg"
                    placeholder="Например: iPhone 15 Pro"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Количество</label>
                    <div className="input-group">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setNewItem({ ...newItem, quantity: Math.max(1, newItem.quantity - 1) })}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                        min={1}
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => setNewItem({ ...newItem, quantity: newItem.quantity + 1 })}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Категория</label>
                    <input
                      className="form-control"
                      placeholder="Например: Электроника"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="text-muted small">
                  <i>* - обязательные поля</i>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary d-flex align-items-center gap-1" 
                  onClick={onClose}
                >
                  <i className="bi bi-x-circle"></i>
                  Отмена
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary px-4 d-flex align-items-center gap-1"
                >
                  <i className="bi bi-plus-circle"></i>
                  Добавить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}