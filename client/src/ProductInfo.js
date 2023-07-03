import React, { useEffect, useState } from 'react';
import './ProductInfo.css';
import PaymentSecurityPolicy from './PaymentSecurityPolicy';




const ProductInfo = () => {
  const [product, setProduct] = useState([]);
  
  useEffect(() => {
    const idProduct = window.location.search.replace("?", " ");
    fetch('https://fakestoreapi.com/products/' + idProduct)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error));
  }, []);


  return (
    <div className='box-product'>
      {product && Object.keys(product).length > 0 ? (
        <div className="product-info">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details">
            <h1>{product.title}</h1>
            <p className="description">{product.description}</p>
            <br />
            {product.price && (
              <b className="price">
                {product.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </b>
            )}
            <div className="add-to-cart">
              <p>QUANTIDADE:<input type='number' id='qnt' min={0} placeholder='0'></input></p>
              <button type="button" className='btn-buy'>Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
      <PaymentSecurityPolicy />
    </div>
  );

};

export default ProductInfo;
