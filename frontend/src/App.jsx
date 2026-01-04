import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CataloguePage from './pages/CataloguePage'
import OrderPage from './pages/OrderPage'
import TrackOrderPage from './pages/TrackOrderPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<CataloguePage />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/track" element={<TrackOrderPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
