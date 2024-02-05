const prisma = require('../config/database');

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
  
    try {
      const cartItem = await prisma.cart.create({
        data: {
          productId,
          quantity,
        },
      });
  
      res.status(201).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  };
  
  const updateCartItem = async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
  
    try {
      const updatedCartItem = await prisma.cart.update({
        where: { id: parseInt(cartItemId) },
        data: { quantity },
      });
  
      res.json(updatedCartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update cart item' });
    }
  };
  
  const deleteCartItem = async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      await prisma.cart.delete({
        where: { id: parseInt(cartItemId) },
      });
  
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete cart item' });
    }
  };
  
  const getTotalPrice = async (req, res) => {
    try {
      const total = await prisma.cart.aggregate({
        _sum: {
          total: true,
        },
      });
  
      res.json(total);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get total price' });
    }
  };
  
  const submitOrder = async (req, res) => {
    try {
      // Lakukan pemrosesan transaksi dan redirect ke transaction details
      // ...
  
      res.json({ success: true, message: 'Order submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit order' });
    }
  };
  
  module.exports = {
    addToCart,
    updateCartItem,
    deleteCartItem,
    getTotalPrice,
    submitOrder,
  };
  