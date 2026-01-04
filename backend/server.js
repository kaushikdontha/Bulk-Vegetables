const express = require('express');
const cors = require('cors');
const { connectDB, seedProducts } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

const startServer = async () => {
    await connectDB();
    await seedProducts();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();
