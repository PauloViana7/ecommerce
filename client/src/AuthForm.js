import React, { useState } from 'react';
import './AuthForm.css';
import './Header';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleFormToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    const endpoint = isLoginForm ? 'http://localhost:3001/login' : 'http://localhost:3001/createUser';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

    
      if (response.status === 200) {
        const data = await response.json();

        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userName', data.userName);

        window.location.href = '/';
         
      } else {
        console.log('Erro no login');
      }
    } catch (error) {
      console.log(error);
    }
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
