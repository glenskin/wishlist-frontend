export default function EmptyState({ onAddClick }) {
  return (
    <div className="text-center py-5 my-5">
      <div className="mb-4">
        <i className="bi bi-gift" style={{ fontSize: '5rem', color: '#6c757d' }}></i>
      </div>
      <h3 className="mb-3">Список желаний пуст</h3>
      <p className="text-muted mb-4">
        Начните добавлять товары, которые хотите приобрести в будущем
      </p>
      <button 
        className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2"
        onClick={onAddClick}
      >
        <i className="bi bi-plus-lg"></i>
        Добавить первый товар
      </button>
    </div>
  );
}