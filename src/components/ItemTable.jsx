import ItemRow from './ItemRow';

export default function ItemTable({
  items,
  editingId,
  editItem,
  onStartEdit,
  onCancelEdit,
  onUpdateItem,
  onDeleteItem,
  setEditItem,
}) {
  if (items.length === 0) {
    return (
      <div className="alert alert-info text-center">
        Список желаемого пуст. Добавьте первый товар!
      </div>
    );
  }

  return (
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
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              editingId={editingId}
              editItem={editItem}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
              onUpdateItem={onUpdateItem}
              onDeleteItem={onDeleteItem}
              setEditItem={setEditItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}