const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.use(cors());


// Rota para obter todos os produtos
router.get('/products', (req, res) => {
  // Lógica para buscar todos os produtos no banco de dados
  // ...

  // Retorna os produtos em formato JSON
  res.json(products);
});

// Rota para obter um produto específico pelo ID
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  // Lógica para buscar um produto específico pelo ID no banco de dados
  // ...

  // Retorna o produto em formato JSON
  res.json(product);
});

// Rota para criar um novo produto
router.post('/products', (req, res) => {
  const productData = req.body;

  console.log(productData)

  // Extrai os dados do produto do corpo da requisição
  const { title, price, description, category, image } = productData;

  // Constrói a consulta SQL de inserção
  const query = 'INSERT INTO products (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)';

  // Executa a consulta SQL passando os valores como parâmetros
  connection.query(query, [title, price, description, category, image], (err, result) => {
    if (err) {
      console.error('Erro ao criar um novo produto:', err);
      res.status(500).send('Erro ao criar um novo produto');
    } else {
      console.log('Produto criado com sucesso!');
      res.send('Produto criado com sucesso!');
    }
  });
});


// Rota para atualizar um produto existente pelo ID
router.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  // Lógica para atualizar um produto existente no banco de dados usando os dados recebidos
  // ...

  // Retorna uma resposta de sucesso
  res.send('Produto atualizado com sucesso!');
});

// Rota para excluir um produto pelo ID
router.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  // Lógica para excluir um produto pelo ID no banco de dados
  // ...

  // Retorna uma resposta de sucesso
  res.send('Produto excluído com sucesso!');
});

module.exports = router;
