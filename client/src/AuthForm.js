import React, { useState } from 'react';
import './AuthForm.css';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleFormToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementar lógica de autenticação ou registro aqui
  };

  return (
    <div className="login">
      <h2>{isLoginForm ? 'Faça seu login' : 'Cadastre-se'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLoginForm && (
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input type="password" id="password" name="password" minLength="6" required />
        </div>
        <button type="submit">{isLoginForm ? 'Entrar' : 'Cadastrar'}</button>
      </form>
      <div className="toggle-form-link" onClick={handleFormToggle}>
        {isLoginForm ? 'Ainda não tem uma conta? Cadastre-se agora' : 'Já tem uma conta? Faça login aqui'}
      </div>
    </div>
  );
};

export default Login;
