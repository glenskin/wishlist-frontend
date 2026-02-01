export default function Header({ itemsCount, onLogout }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1>Список желаемого ({itemsCount})</h1>
      <button className="btn btn-outline-danger" onClick={onLogout}>
        Выйти
      </button>
    </div>
  );
}