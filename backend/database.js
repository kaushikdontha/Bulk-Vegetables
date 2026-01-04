require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vegetable_orders';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  image: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  product_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  buyer_name: { type: String, required: true },
  delivery_address: { type: String, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Delivered'] },
  created_at: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      const products = [
        { name: 'Tomatoes', price: 40, unit: 'kg', image: 'https://images.unsplash.com/photo-1546470427-227c7b5d7c71?w=400&h=300&fit=crop' },
        { name: 'Potatoes', price: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber7sa?w=400&h=300&fit=crop' },
        { name: 'Onions', price: 35, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8ae?w=400&h=300&fit=crop' },
        { name: 'Carrots', price: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop' },
        { name: 'Apples', price: 120, unit: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop' },
        { name: 'Bananas', price: 50, unit: 'dozen', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop' },
        { name: 'Spinach', price: 25, unit: 'bunch', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop' },
        { name: 'Cabbage', price: 30, unit: 'piece', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=400&h=300&fit=crop' }
      ];
      await Product.insertMany(products);
      console.log('Database seeded with initial products');
    }
  } catch (err) {
    console.error('Error seeding products:', err.message);
  }
};

module.exports = { connectDB, seedProducts, Product, Order };
