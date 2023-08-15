import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
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

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', event.target.elements.image.files[0]);

    try {
      const response = await fetch('http://localhost:3001/products', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro na solicitação');
      }

      fetchProducts();
      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handleProductUpdate = async (productId, updatedTitle, updatedPrice, updatedDescription, updatedCategory) => {
    try {
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedTitle, price: updatedPrice, description: updatedDescription, category: updatedCategory }),
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
      const response = await fetch(`http://localhost:3001/products/${productId}`, {
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
    <div className='product-form'>
      <div className='submit-form'>
        <h1>Formulario de envio</h1>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <input
            type="file"
            name="image"
            placeholder="Imagem"
          />
          <button type="submit" className='btn-add'>Add Produto</button>
        </form>
      </div>
        <h2>Produtos</h2>
        <div className='list-products'>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div className='list-cart' key={product.id}>
                <h3>{product.title} </h3>
                <br />
                <p>{product.category}</p>
                <img src={'http://localhost:3001/images/' + product.image} alt={product.title}></img>
                <b>{product.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL'
                })}</b>
                <div className='list-button'>
                <button onClick={() => handleProductDelete(product.id)}><i className='bx bxs-message-square-x'></i></button>
                <button
                  onClick={() => {
                    const updatedTitle = prompt('Entre com novo Titulo:', product.title);
                    const updatedPrice = prompt('Entre com novo Preço:', product.price);
                    const updatedDescription = prompt('Entre com a nova descrição:', product.description);
                    const updatedCategory = prompt('Entre com a nova Categoria:', product.category);
                    
                    handleProductUpdate(product.id, updatedTitle, updatedPrice, updatedDescription, updatedCategory);
                  }}
                ><i className='bx bx-sort-up'></i>
                </button>
                </div>
              </div>


            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductForm;
