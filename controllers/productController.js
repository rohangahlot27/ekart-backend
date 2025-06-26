const Product = require('../models/Product');

// ✅ Create a product
exports.createProduct = async (req, res) => {
  try {
    console.log('Incoming product data:', req.body); // ✅ Add this line
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err.message); // ✅ Add this line
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all products with pagination and filtering
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, brand, inStock } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = brand;
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      products
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ✅ Update product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
