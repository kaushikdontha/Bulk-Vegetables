import { useState } from 'react'
import api from '../config/api'
import './TrackOrderPage.css'

function TrackOrderPage() {
    const [orderId, setOrderId] = useState('')
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searched, setSearched] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!orderId.trim()) return

        setLoading(true)
        setError(null)
        setOrder(null)
        setSearched(true)

        try {
            const response = await fetch(`${api.orders}/${orderId.trim()}`)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Order not found')
            }

            setOrder(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Track Your Order</h1>
                <p>Enter your Order ID to check the delivery status</p>
            </div>

            <div className="track-container">
                <form className="track-form" onSubmit={handleSubmit}>
                    <div className="track-input-group">
                        <input
                            type="text"
                            className="form-input track-input"
                            placeholder="Enter Order ID (e.g., A1B2C3D4)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                        />
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || !orderId.trim()}
                        >
                            {loading ? 'Searching...' : 'Track'}
                        </button>
                    </div>
                </form>

                {loading && (
                    <div className="loading">
                        <div className="spinner"></div>
                    </div>
                )}

                {error && searched && (
                    <div className="track-result">
                        <div className="alert alert-error">
                            ⚠️ {error}
                        </div>
                    </div>
                )}

                {order && (
                    <div className="track-result">
                        <div className="order-details-card">
                            <div className="order-status-header">
                                <span className={`badge ${order.status === 'Delivered' ? 'badge-delivered' : 'badge-pending'}`}>
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-info">
                                <div className="info-row">
                                    <span className="info-label">Order ID</span>
                                    <span className="info-value">{order.id}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Product</span>
                                    <span className="info-value">{order.product_name}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Quantity</span>
                                    <span className="info-value">{order.quantity}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Buyer Name</span>
                                    <span className="info-value">{order.buyer_name}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Delivery Address</span>
                                    <span className="info-value">{order.delivery_address}</span>
                                </div>
                                <div className="info-row">
                                    <span className="info-label">Ordered On</span>
                                    <span className="info-value">
                                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                            </div>

                            <div className="order-progress">
                                <div className={`progress-step ${order.status === 'Pending' || order.status === 'Delivered' ? 'active' : ''}`}>
                                    <div className="step-dot">1</div>
                                    <span className="step-label">Order Placed</span>
                                </div>
                                <div className="progress-line"></div>
                                <div className={`progress-step ${order.status === 'Delivered' ? 'active' : ''}`}>
                                    <div className="step-dot">2</div>
                                    <span className="step-label">Delivered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TrackOrderPage
