const Cart = require('../models/cart.model');
const Product = require('../models/product.model');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming the user ID is available in the request object after authentication

    // Check if the product ID exists in the database
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(400).json({ error: 'Invalid product ID. Product not found.' });
    }

    // Check if the user already has a cart
    let userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      // If the user does not have a cart, create a new one
      userCart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      // If the user already has a cart, check if the product is already in the cart
      const existingCartItem = userCart.products.find((item) => item.product.toString() === productId);
      if (existingCartItem) {
        // If the product is already in the cart, update the quantity
        existingCartItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it as a new item
        userCart.products.push({ product: productId, quantity });
      }
    }

    // Save the cart to the database
    await userCart.save();

    res.status(201).json({ message: 'Product added to cart successfully.', cart: userCart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming the user ID is available in the request object after authentication

    // Find the user's cart in the database and populate the products with product details
    const cart = await Cart.findOne({ user: userId }).populate('products.product', 'title price');

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

exports.updateCartItem = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user._id; // Assuming the user ID is available in the request object after authentication
  
      // Check if the product ID exists in the database
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(400).json({ error: 'Invalid product ID. Product not found.' });
      }
  
      // Find the user's cart in the database
      const userCart = await Cart.findOne({ user: userId });
  
      if (!userCart) {
        return res.status(404).json({ error: 'Cart not found.' });
      }
  
      // Find the product in the cart
      const existingCartItem = userCart.products.find((item) => item.product.toString() === productId);
  
      if (!existingCartItem) {
        return res.status(404).json({ error: 'Product not found in the cart.' });
      }
  
      // Update the quantity of the product in the cart
      existingCartItem.quantity = quantity;
  
      // Save the updated cart to the database
      await userCart.save();
  
      res.status(200).json({ message: 'Product quantity updated in the cart successfully.', cart: userCart });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  };
  
  exports.removeItemFromCart = async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.user._id; // Assuming the user ID is available in the request object after authentication
  
      // Find the user's cart in the database
      const userCart = await Cart.findOne({ user: userId });
  
      if (!userCart) {
        return res.status(404).json({ error: 'Cart not found.' });
      }
  
      // Remove the item from the cart based on the product ID
      userCart.products = userCart.products.filter((item) => item.product.toString() !== productId);
  
      // Save the updated cart to the database
      await userCart.save();
  
      res.status(200).json({ message: 'Product removed from the cart successfully.', cart: userCart });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  };