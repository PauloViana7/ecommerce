import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import PaymentSecurityPolicy from './PaymentSecurityPolicy';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error));
    }, []);


    return (
        <div className='container-home'>
            <h1>Bem vindo a Stop Time</h1>
            <h2>Produtos em Destaque</h2>
            <br />
            <div className='box-card'>
                <ul>
                    {products.length > 0 ? (
                        products.map(product => (
                            <li key={product.id}>
                                <h2>{product.title}</h2>
                                <img src={product.image} alt={product.title}></img>
                                {product.price && (
                                    <b>
                                        {product.price.toLocaleString('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        })}
                                    </b>
                                )}
                                <Link to={`/ProductInfo?${product.id}`}>
                                    <button type="submit" className='btn-buy' name="btn-buy">
                                        Comprar
                                    </button>
                                </Link>
                                <br />
                            </li>
                        ))
                    ) : (
                        <p>Carregando...</p>
                    )}
                </ul>
            </div>
            <PaymentSecurityPolicy />
        </div>
    );
};


export default Home;
