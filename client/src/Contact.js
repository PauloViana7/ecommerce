import React from 'react';
import './Contact.css';
import PaymentSecurityPolicy from './PaymentSecurityPolicy';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Entre em Contato</h1>
      <b>Entre em contato conosco por e-mail ou telefone:</b>
      <div className="contact-info">
        <div>
          <h3>Email</h3>
          <p>contato@example.com</p>
        </div>
        <div>
          <h3>Telefone</h3>
          <p>(11) 1234-5678</p>
        </div>
      </div>
      <div className="form-contact">
  <form method="POST">
    <fieldset>
      <legend>
        <p>Deixe sua Mansagem</p>
      </legend>
      <br />
      <div className="inputBox">
        <input
          type="text"
          name="nome"
          id="nome"
          className="inputUser"
          required
        />
        <label htmlFor="nome" className="labelInput">
          Nome
        </label>
      </div>
      <br />
      <br />
      <div className="inputBox">
        <input
          type="text"
          name="email"
          id="email"
          className="inputUser"
          required
        />
        <label htmlFor="email" className="labelInput">
          Email
        </label>
      </div>
      <br />
      <br />
      <div className="inputBox">
        <input
          type="text"
          name="assunto"
          id="assunto"
          className="inputUser"
          required
        />
        <label htmlFor="assunto" className="labelInput">
          Assunto
        </label>
      </div>
      <br />
      <br />
      <div className="inputBox">
        <textarea
          className="inputUser"
          name="mensagem"
          id="mensagem"
          cols={30}
          rows={5}
          required
          defaultValue={""}
        />
        <label htmlFor="mensagem" className="labelInput">
          Mensagem
        </label>
      </div>
      <input type="submit" name="submit" id="submit" />
    </fieldset>
  </form>
</div>

      <PaymentSecurityPolicy />
    </div>
  );
}

export default Contact;
