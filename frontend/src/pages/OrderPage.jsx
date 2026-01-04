import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import './OrderPage.css'

function OrderPage() {
    const [searchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [orderResult, setOrderResult] = useState(null)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        product_name: searchParams.get('product') || '',
        quantity: '',
        buyer_name: '',
        delivery_address: ''
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (!response.ok) throw new Error('Failed to fetch products')
            const data = await response.json()
            setProducts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    quantity: parseInt(formData.quantity)
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order')
            }

            setOrderResult(data)
            setFormData({
                product_name: '',
                quantity: '',
                buyer_name: '',
                delivery_address: ''
            })
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <div className="spinner"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Place Your Order</h1>
                <p>Fill in the details below to place a bulk order</p>
            </div>

            <div className="order-form-container">
                {orderResult ? (
                    <div className="order-success">
                        <div className="success-icon">✅</div>
                        <h2>Order Placed Successfully!</h2>
                        <div className="order-id-display">
                            <span className="order-id-label">Your Order ID</span>
                            <span className="order-id-value">{orderResult.order_id}</span>
                        </div>
                        <p className="success-message">
                            Save this Order ID to track your order status.
                        </p>
                        <div className="success-actions">
                            <Link to="/track" className="btn btn-primary">
                                Track Order
                            </Link>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setOrderResult(null)}
                            >
                                Place Another Order
                            </button>
                        </div>
                    </div>
                ) : (
                    <form className="order-form" onSubmit={handleSubmit}>
                        {error && (
                            <div className="alert alert-error">
                                ⚠️ {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="product_name">
                                Select Product *
                            </label>
                            <select
                                id="product_name"
                                name="product_name"
                                className="form-select"
                                value={formData.product_name}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose a vegetable/fruit</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.name}>
                                        {product.name} - ₹{product.price}/{product.unit}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="quantity">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="form-input"
                                placeholder="Enter quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                min="1"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="buyer_name">
                                Your Name *
                            </label>
                            <input
                                type="text"
                                id="buyer_name"
                                name="buyer_name"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={formData.buyer_name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="delivery_address">
                                Delivery Address *
                            </label>
                            <textarea
                                id="delivery_address"
                                name="delivery_address"
                                className="form-textarea"
                                placeholder="Enter complete delivery address"
                                value={formData.delivery_address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-submit"
                            disabled={submitting}
                        >
                            {submitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default OrderPage
