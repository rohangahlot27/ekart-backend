const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false, // ⬅️ changed from true → false
  },
  inStock: {
    type: Boolean,
    default: true, // ⬅️ this remains default, no need to send from frontend
  },
  description: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
