import { useState, useEffect } from 'react'
import api from '../config/api'
import './AdminPage.css'

function AdminPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updating, setUpdating] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${api.admin}/orders`)
            if (!response.ok) throw new Error('Failed to fetch orders')
            const data = await response.json()
            setOrders(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdating(orderId)
        try {
            const response = await fetch(`${api.admin}/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })

            if (!response.ok) {
                throw new Error('Failed to update order status')
            }

            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ))
        } catch (err) {
            alert('Error: ' + err.message)
        } finally {
            setUpdating(null)
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

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-error">
                    ⚠️ {error}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Manage and update order statuses</p>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <span className="stat-value">{orders.length}</span>
                    <span className="stat-label">Total Orders</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value stat-pending">
                        {orders.filter(o => o.status === 'Pending').length}
                    </span>
                    <span className="stat-label">Pending</span>
                </div>
                <div className="stat-card">
                    <span className="stat-value stat-delivered">
                        {orders.filter(o => o.status === 'Delivered').length}
                    </span>
                    <span className="stat-label">Delivered</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="empty-state">
                    <p>No orders yet.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Buyer Name</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Delivery Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>
                                        <code className="order-id">{order.id}</code>
                                    </td>
                                    <td>{order.buyer_name}</td>
                                    <td>{order.product_name}</td>
                                    <td>{order.quantity}</td>
                                    <td className="address-cell">{order.delivery_address}</td>
                                    <td>
                                        <span className={`badge ${order.status === 'Delivered' ? 'badge-delivered' : 'badge-pending'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        {order.status === 'Pending' ? (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => updateOrderStatus(order.id, 'Delivered')}
                                                disabled={updating === order.id}
                                            >
                                                {updating === order.id ? 'Updating...' : 'Mark Delivered'}
                                            </button>
                                        ) : (
                                            <span className="text-muted">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminPage
