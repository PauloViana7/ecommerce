import React, { useEffect, useState } from 'react';
import './Cart.css'
import PaymentSecurityPolicy from './PaymentSecurityPolicy';

const Cart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Função para obter os produtos do servidor
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <div className='container-cart'>
      <h2>Carrinho de Compras</h2>
      <div className='finish'>
        <p>Total</p>
      </div>
      <div className='cart'>
        {products.map((product) => (
          <div className='box-cart' key={product.id}>
            <h3>{product.title} </h3>
            <img src={product.image} alt={product.title}></img>
            <b>{product.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL'
            })}</b>
            <i className='bx bxs-message-square-x'></i>
          </div>
        ))}
        <PaymentSecurityPolicy />
      </div>
    </div>
  );
};

export default Cart;
