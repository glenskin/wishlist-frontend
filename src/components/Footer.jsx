export default function Footer() {
  return (
    <footer className="mt-5 pt-4 border-top">
      <div className="text-center text-muted">
        <p>&copy; 2026 Список желаемого. Создано с ❤️ на FastAPI + React + Docker.</p>
        <p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            GitHub
          </a>{' '}
          | v1.0
        </p>
      </div>
    </footer>
  );
}