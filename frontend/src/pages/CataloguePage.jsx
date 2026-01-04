import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import './CataloguePage.css'

function CataloguePage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (!response.ok) {
                throw new Error('Failed to fetch products')
            }
            const data = await response.json()
            setProducts(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
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
                <h1>Fresh Produce Catalogue</h1>
                <p>Browse our selection of fresh vegetables and fruits for bulk orders</p>
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {products.length === 0 && (
                <div className="empty-state">
                    <p>No products available at the moment.</p>
                </div>
            )}
        </div>
    )
}

export default CataloguePage
