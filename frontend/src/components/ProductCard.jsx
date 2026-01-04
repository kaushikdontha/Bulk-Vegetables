import { Link } from 'react-router-dom'
import './ProductCard.css'

const productImages = {
    'Tomatoes': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
    'Potatoes': 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=300&fit=crop',
    'Onions': 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=400&h=300&fit=crop',
    'Carrots': 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=400&h=300&fit=crop',
    'Apples': 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop',
    'Bananas': 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop',
    'Spinach': 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=400&h=300&fit=crop',
    'Cabbage': 'https://images.unsplash.com/photo-1598030343246-eec71cb44231?w=400&h=300&fit=crop'
}

const defaultImage = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop'

function ProductCard({ product }) {
    const imageUrl = product.image || productImages[product.name] || defaultImage

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = defaultImage
                    }}
                />
                <div className="product-image-overlay"></div>
            </div>
            <h3 className="product-name">{product.name}</h3>
            <div className="product-price">
                <span className="price-amount">₹{product.price}</span>
                <span className="price-unit">per {product.unit}</span>
            </div>
            <Link
                to={`/order?product=${encodeURIComponent(product.name)}`}
                className="btn btn-primary product-btn"
            >
                Order Now
            </Link>
        </div>
    )
}

export default ProductCard
