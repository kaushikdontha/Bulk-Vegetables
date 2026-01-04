# FreshBulk - Bulk Vegetable & Fruit Ordering Platform

A full-stack web application for bulk ordering of vegetables and fruits. Built with React.js frontend and Node.js/Express backend with MongoDB database.

![License](https://img.shields.io/badge/license-MIT-green)

## Features

- 🥬 **Product Catalogue** - Browse available vegetables and fruits with images and prices
- 📝 **Place Orders** - Easy ordering system with quantity selection
- 🔍 **Track Orders** - Check order status using order ID
- 👨‍💼 **Admin Panel** - View all orders and update delivery status

## Tech Stack

**Frontend:**
- React.js 18
- React Router DOM
- Vite
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- UUID for order IDs

## Project Structure

```
Vegetables/
├── backend/
│   ├── routes/
│   │   ├── admin.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── database.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/freshbulk.git
   cd freshbulk
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. **Start the Backend** (from `backend/` folder)
   ```bash
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start the Frontend** (from `frontend/` folder)
   ```bash
   npm run dev
   ```
   App runs on http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/:id` | Get order status |
| GET | `/api/admin/orders` | Get all orders (admin) |
| PUT | `/api/admin/orders/:id` | Update order status |
| GET | `/api/health` | Health check |

## Environment Variables

Create a `.env` file in the `backend/` folder:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Screenshots

### Product Catalogue
Browse fresh vegetables and fruits with real-time pricing.

### Order Tracking
Track your order status using your unique order ID.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Made with ❤️ for fresh produce lovers
