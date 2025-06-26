const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order' });
  }
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};
