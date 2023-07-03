import React, { useState, useEffect } from 'react';

const ProductForm = () => {
  const [title, setName] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


    const handleFormSubmit = async (event) => {
        event.preventDefault();
      
        const productData = {
          title,
          price,
          image: 'url_da_imagem',
          description: 'descrição_do_produto',
          category: 'teste',
        };
      
        try {
          const response = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
      
          if (!response.ok) {
            throw new Error('Erro na solicitação');
          }
      
          fetchProducts();
          setName('');
          setPrice('');
        } catch (error) {
          console.error('Error submitting product:', error);
        }
      };
      

  const handleProductUpdate = async (productId, updatedName, updatedPrice) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: updatedName, price: updatedPrice }),
      });
      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Form</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleProductDelete(product.id)}>Delete</button>
            <button
              onClick={() => {
                const updatedName = prompt('Enter the updated name:', product.name);
                const updatedPrice = prompt('Enter the updated price:', product.price);
                handleProductUpdate(product.id, updatedName, updatedPrice);
              }}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;
