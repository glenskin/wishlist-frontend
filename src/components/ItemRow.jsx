import { useState } from 'react';

export default function ItemRow({
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

  if (isEditing) {
    return (
      <tr>
        <td>{item.id}</td>
        <td>
          <input
            className="form-control form-control-sm"
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control form-control-sm"
            value={editItem.quantity}
            onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value) || 1 })}
            min={1}
          />
        </td>
        <td>
          <input
            className="form-control form-control-sm"
            value={editItem.category}
            onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
          />
        </td>
        <td>
          <button className="btn btn-sm btn-success me-1" onClick={() => onUpdateItem(item.id)}>
            Сохранить
          </button>
          <button className="btn btn-sm btn-secondary" onClick={onCancelEdit}>
            Отмена
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>
        <span className="badge bg-primary fs-6">{item.quantity}</span>
      </td>
      <td>{item.category || '-'}</td>
      <td>
        <button className="btn btn-sm btn-warning me-1" onClick={() => onStartEdit(item)}>
          Редактировать
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDeleteItem(item.id)}>
          Удалить
        </button>
      </td>
    </tr>
  );
}