import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-icon">🥬</span>
                    <span className="brand-text">FreshBulk</span>
                </Link>

                <ul className="navbar-menu">
                    <li>
                        <Link
                            to="/"
                            className={`nav-link ${isActive('/') ? 'active' : ''}`}
                        >
                            Catalogue
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/order"
                            className={`nav-link ${isActive('/order') ? 'active' : ''}`}
                        >
                            Place Order
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/track"
                            className={`nav-link ${isActive('/track') ? 'active' : ''}`}
                        >
                            Track Order
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
