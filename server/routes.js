const express = require('express');
const router = express.Router();
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });


const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

router.use(cors());


router.get('/products', (req, res) => {
  const query = 'SELECT * FROM products'; 
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ error: 'Erro ao obter produtos' });
    } else {
      res.json(results);
    }
  });
});

// Rota para obter um produto pelo ID
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'SELECT * FROM products WHERE id = ?';

  connection.query(query, [productId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar o produto:', err);
      res.status(500).json({ error: 'Erro ao obter o produto' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Produto não encontrado' });
      } else {
        const product = results[0];
        res.json(product);
      }
    }
  });
});

// criar produto
router.post('/products', upload.single('image'), (req, res) => {
  const productData = req.body;

  const { title, price, description, category } = productData;
  const imageName = req.file.filename;

  const query = 'INSERT INTO products (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [title, price, description, category, imageName], (err, result) => {
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

  const { title, price, description, category } = productData;

  const query = 'UPDATE products SET title = ?, price = ?, description = ?, category = ? WHERE id = ?';

  connection.query(query, [title, price, description, category, productId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar o produto:', err);
      res.status(500).send('Erro ao atualizar o produto');
    } else {
      console.log('Produto atualizado com sucesso!');
      res.send('Produto atualizado com sucesso!');
    }
  });
});

// Deletar produtos
router.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  const query = 'DELETE FROM products WHERE id = ?';

  connection.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Erro ao excluir o produto:', err);
      res.status(500).send('Erro ao excluir o produto');
    } else {
      console.log('Produto excluído com sucesso!');
      res.send('Produto excluído com sucesso!');
    }
  });
});

router.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'uploads', filename);

  res.sendFile(imagePath);
});

module.exports = router;
