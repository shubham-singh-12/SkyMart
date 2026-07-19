import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute, GuestRoute } from './routes/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout'
import CartDrawer from './components/CartDrawer'

export default function App() {
  return (
    <>
      <CartDrawer />
      <Routes>
        {/* ============================================================ ROOT ==> REDIRECT ============================================================ */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ========================================================== ONLY FOR GUEST ROUTE =========================================================== */}
        <Route element={<GuestRoute />}>
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* ========================================================= MUST BE LOGGIN ROUTES =========================================================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home"            element={<HomePage />} />
            <Route path="/products"        element={<ProductsPage />} />
            <Route path="/products/:id"    element={<ProductDetailPage />} />
            <Route path="/about"           element={<AboutPage />} />
          </Route>
        </Route>

        {/* ============================================================= PAGE NOT FOUND ============================================================== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}
