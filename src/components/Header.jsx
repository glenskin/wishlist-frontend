export default function Header({ itemsCount, onLogout, onAddClick }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 className="mb-1">🎯 Список желаемого</h1>
        <p className="text-muted mb-0">
          Всего товаров: <span className="badge bg-primary">{itemsCount}</span>
        </p>
      </div>
      <div className="d-flex gap-2">
        <button 
          className="btn btn-success d-flex align-items-center gap-2"
          onClick={onAddClick}
        >
          <i className="bi bi-plus-lg"></i>
          <span className="d-none d-md-inline">Добавить товар</span>
        </button>
        <button 
          className="btn btn-outline-danger d-flex align-items-center gap-2"
          onClick={onLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="d-none d-md-inline">Выйти</span>
        </button>
      </div>
    </div>
  );
}