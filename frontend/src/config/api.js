const API_URL = import.meta.env.VITE_API_URL || ''

export const api = {
    products: `${API_URL}/api/products`,
    orders: `${API_URL}/api/orders`,
    admin: `${API_URL}/api/admin`
}

export default api
