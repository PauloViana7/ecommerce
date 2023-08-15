const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  image: { type: String }, // Pode ser a URL da imagem
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
