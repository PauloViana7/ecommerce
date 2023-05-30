import React from 'react';
import './PaymentSecurityPolicy.css';

const PaymentSecurityPolicy = () => {
  return (
    <div className="payment-security-policy">
      <h2><i className='bx bx-credit-card'></i> Informações de Pagamento</h2>
      <p>Aceitamos as seguintes formas de pagamento:</p>
      <ul>
        <li>Cartões de Crédito</li>
        <li>PIX</li>
        <li>PagSeguro</li>
      </ul>

      <h2><i className='bx bx-shield-quarter'></i> Segurança</h2>
      <p>Nos preocupamos com a segurança de seus dados e adotamos medidas para garantir que suas informações estejam sempre protegidas.</p>
      <p>Usamos certificados SSL para criptografar as informações transmitidas pelo site e mantemos as informações do cliente seguras em nosso banco de dados.</p>

      <h2><i className='bx bxs-spreadsheet'></i> Política de Privacidade</h2>
      <p>Leia nossa <a href="/politica-de-privacidade"> Política de Privacidade</a> para saber mais sobre como coletamos, usamos e protegemos suas informações pessoais.</p>
    </div>
  );
};

export default PaymentSecurityPolicy;
