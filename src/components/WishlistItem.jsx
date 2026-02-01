import { useState } from 'react';

export default function WishlistItem({
  item,
  editingId,
  editItem,
  onStartEdit,
  onCancelEdit,
  onUpdateItem,
  onDeleteItem,
  setEditItem,
}) {
  const isEditing = editingId === item.id;
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
      return;
    }
    onDeleteItem(item.id);
    setShowConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="card mb-3 border-primary">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-5 mb-3">
              <input
                className="form-control form-control-lg"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                placeholder="Название товара"
              />
            </div>
            <div className="col-md-2 mb-3">
              <div className="input-group">
                <span className="input-group-text bg-light">Кол-во</span>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  value={editItem.quantity}
                  onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value) || 1 })}
                  min={1}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <input
                className="form-control form-control-lg"
                value={editItem.category}
                onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                placeholder="Категория"
              />
            </div>
            <div className="col-md-2 mb-3 d-flex gap-2">
              <button 
                className="btn btn-success btn-lg flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                onClick={() => onUpdateItem(item.id)}
              >
                <i className="bi bi-check-lg"></i>
                Сохранить
              </button>
              <button 
                className="btn btn-outline-secondary btn-lg"
                onClick={onCancelEdit}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3 shadow-sm hover-shadow">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-5">
            <h5 className="card-title mb-1">{item.name}</h5>
            {item.category && (
              <span className="badge bg-light text-dark border">{item.category}</span>
            )}
          </div>
          <div className="col-md-2">
            <div className="d-flex align-items-center">
              <span className="fs-4 fw-bold text-primary me-2">{item.quantity}</span>
              <span className="text-muted">шт.</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="text-muted small">
              ID: <span className="badge bg-secondary">{item.id}</span>
            </div>
          </div>
          <div className="col-md-2">
            <div className="d-flex gap-2 justify-content-end">
              <button 
                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                onClick={() => onStartEdit(item)}
                title="Редактировать"
              >
                <i className="bi bi-pencil"></i>
                <span className="d-none d-md-inline">Изменить</span>
              </button>
              
              {showConfirm ? (
                <button 
                  className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                  onClick={handleDelete}
                  title="Подтвердить удаление"
                >
                  <i className="bi bi-trash"></i>
                  <span>Точно?</span>
                </button>
              ) : (
                <button 
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                  onClick={handleDelete}
                  title="Удалить"
                >
                  <i className="bi bi-trash"></i>
                  <span className="d-none d-md-inline">Удалить</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}