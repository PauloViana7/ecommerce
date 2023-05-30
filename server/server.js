require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//app.use(express.json());
app.use(express.urlencoded());

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const routes = require('./routes');


app.use('/', routes);

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

app.post('/createUser', (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) throw err;

    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    connection.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) throw err;
      console.log('Usuário inserido com ID:', result.insertId);
    });
  });
  res.send('Pagina de criar user');
});


app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});