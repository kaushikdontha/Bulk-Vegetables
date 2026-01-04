const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { Order } = require('../database');

router.post('/', async (req, res) => {
    const { product_name, quantity, buyer_name, delivery_address } = req.body;

    if (!product_name || !quantity || !buyer_name || !delivery_address) {
        return res.status(400).json({
            error: 'All fields are required: product_name, quantity, buyer_name, delivery_address'
        });
    }

    try {
        const orderId = uuidv4().substring(0, 8).toUpperCase();

        const order = new Order({
            orderId,
            product_name,
            quantity,
            buyer_name,
            delivery_address,
            status: 'Pending'
        });

        await order.save();

        res.status(201).json({
            message: 'Order placed successfully',
            order_id: orderId,
            status: 'Pending'
        });
    } catch (err) {
        console.error('Error creating order:', err.message);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findOne({ orderId: id });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({
            id: order.orderId,
            product_name: order.product_name,
            quantity: order.quantity,
            buyer_name: order.buyer_name,
            delivery_address: order.delivery_address,
            status: order.status,
            created_at: order.created_at
        });
    } catch (err) {
        console.error('Error fetching order:', err.message);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

module.exports = router;
