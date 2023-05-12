require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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

const routes = require('./routes');

app.use(express.json());

app.use('/', routes);

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});


app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});