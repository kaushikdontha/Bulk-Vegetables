const express = require('express');
const router = express.Router();
const { Product } = require('../database');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;
