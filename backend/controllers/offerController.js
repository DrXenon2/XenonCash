const ProductModel = require('../models/productModel');

exports.getOffers = async (req, res) => {
  try {
    const offers = await ProductModel.getActiveProducts();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const { name, description, commission_rate, price, niche } = req.body;
    const offer = await ProductModel.createProduct(name, description, commission_rate, price, niche);
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};