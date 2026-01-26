import { useAuth } from '../hooks/useAuth';

const Auth = () => {  // ← Убрал setShowAuth — управляет useAuth!
  const {
    isRegister, setIsRegister, email, setEmail, password, setPassword, error,
    login, register,
  } = useAuth();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>{isRegister ? 'Регистрация' : 'Вход'}</h2>
          <form onSubmit={isRegister ? register : login}>
            <div className="mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Электронная почта"
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
              className="btn btn-link w-100 text-start"
              onClick={() => { 
                setIsRegister(!isRegister); 
                setError(''); 
              }}
            >
              {isRegister 
                ? 'Уже есть аккаунт? Войти' 
                : 'Нет аккаунта? Регистрация'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;