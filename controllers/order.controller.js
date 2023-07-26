const Order = require('../models/order.model');
const Cart = require('../models/cart.model');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in the request object after authentication
    const orderedProducts = req.body.products; // Array of objects with productId and quantity

    // Find the user's cart in the database and populate the product details
    const cart = await Cart.findOne({ user: userId }).populate('products.product', 'title price');

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: 'No products in the cart. Add products to the cart before placing an order.' });
    }

    // Validate the ordered products and calculate the total price of the order
    const totalPrice = orderedProducts.reduce((total, item) => {
      const cartItem = cart.products.find((cartItem) => cartItem.product._id.equals(item.productId));
      if (!cartItem) {
        return total; // Skip if the product is not in the cart
      }
      return total + cartItem.product.price * item.quantity;
    }, 0);

    // Create a new order instance and save it to the database
    const newOrder = new Order({
      user: userId,
      products: orderedProducts.map((item) => ({
        product: item.productId,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    await newOrder.save();

    // Clear the user's cart after placing the order
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({ message: 'Order placed successfully.', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in the request object after authentication

    // Find all orders for the user and sort them in descending order by orderDate
    const orderHistory = await Order.find({ user: userId }).sort('-orderDate');

    res.status(200).json({ orderHistory });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID in the database and populate the product details
    const order = await Order.findById(orderId).populate('products.product', 'title price');

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
