import { useState } from 'react';

export default function AuthForm({ isRegister, onToggle, onSubmit, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <h2 className="text-center mb-4">{isRegister ? 'Регистрация' : 'Вход'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="button"
            className="btn btn-link w-100"
            onClick={() => {
              onToggle();
              setEmail('');
              setPassword('');
            }}
          >
            {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
}