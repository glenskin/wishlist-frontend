import WishlistItem from './WishlistItem';

export default function WishlistTable({
  items,
  editingId,
  editItem,
  onStartEdit,
  onCancelEdit,
  onUpdateItem,
  onDeleteItem,
  setEditItem,
}) {
  if (items.length === 0) return null;

  // Заголовки для десктопа
  const DesktopHeaders = () => (
    <div className="row mb-2 px-3 d-none d-md-flex">
      <div className="col-md-5">
        <small className="text-uppercase text-muted fw-bold">Товар</small>
      </div>
      <div className="col-md-2">
        <small className="text-uppercase text-muted fw-bold">Количество</small>
      </div>
      <div className="col-md-3">
        <small className="text-uppercase text-muted fw-bold">Информация</small>
      </div>
      <div className="col-md-2 text-end">
        <small className="text-uppercase text-muted fw-bold">Действия</small>
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      <DesktopHeaders />
      
      <div className="items-list">
        {items.map((item) => (
          <WishlistItem
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
      </div>
      
      <div className="text-center mt-4 text-muted">
        <small>
          Всего товаров: {items.length} • 
          Кликните на товар для редактирования
        </small>
      </div>
    </div>
  );
}