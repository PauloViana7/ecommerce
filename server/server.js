require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Banco de Dados Ok');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const routes = require('./routes');


app.use('/', routes);

app.get('/', (req, res) => {
  res.send('----OK----');
});

app.use(cors());

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



app.post('/login', (req, res) => {
  const { email, password } = req.body;

  connection.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      console.log('---> Usuário não encontrado');
      res.status(401).send('Usuário não encontrado');
    } else {
      const user = results[0];


      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          const { id, name } = user;

          console.log('---> Login realizado com sucesso! com ID:', user.id);
          res.send({
            message: 'Login realizado com sucesso!',
            userId: id,
            userName: name,
          });

        } else {
          console.log('---> Senha incorreta');
          res.status(401).send('Senha incorreta');
        }
      });
    }
  });
});




app.listen(port, () => {
  console.log(`----Server----ON----Port: ${port}`);
});