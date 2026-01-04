const express = require('express');
const router = express.Router();
const { Order } = require('../database');

router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ created_at: -1 });

        const formattedOrders = orders.map(order => ({
            id: order.orderId,
            product_name: order.product_name,
            quantity: order.quantity,
            buyer_name: order.buyer_name,
            delivery_address: order.delivery_address,
            status: order.status,
            created_at: order.created_at
        }));

        res.json(formattedOrders);
    } catch (err) {
        console.error('Error fetching orders:', err.message);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

router.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Delivered'];
    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            error: 'Invalid status. Must be one of: Pending, Delivered'
        });
    }

    try {
        const order = await Order.findOneAndUpdate(
            { orderId: id },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order status updated', order_id: id, status });
    } catch (err) {
        console.error('Error updating order:', err.message);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

module.exports = router;
