// Exemplo de inserção de um usuário na tabela users: javascript
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
};

connection.query('INSERT INTO users SET ?', user, (err, result) => {
  if (err) throw err;
  console.log('Usuário inserido com ID:', result.insertId);
});
// Exemplo de seleção de todos os produtos da tabela products:
connection.query('SELECT * FROM products', (err, rows) => {
  if (err) throw err;
  console.log('Produtos:', rows);
});
// Exemplo de atualização de um produto na tabela products:
const productId = 1;
const updatedProduct = {
  name: 'Novo nome do produto',
  price: 9.99,
  description: 'Nova descrição do produto',
};

connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (err) => {
  if (err) throw err;
  console.log('Produto atualizado');
});



// Recupera o hash da senha do banco de dados

bcrypt.compare(loginPassword, storedHash, (err, result) => {
  if (err) throw err;

  if (result) {
    // Senha correta, faça o login
  } else {
    // Senha incorreta, trate o erro
  }
});