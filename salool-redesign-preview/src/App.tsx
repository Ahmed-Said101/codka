import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import CartPage from './pages/CartPage'
import BranchesPage from './pages/BranchesPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import ItemPage from './pages/ItemPage'
import MenuPage from './pages/MenuPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderPage from './pages/OrderPage'
import RewardsPage from './pages/RewardsPage'
import StoryPage from './pages/StoryPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="menu/:id" element={<ItemPage />} />
        <Route path="story" element={<StoryPage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="branches" element={<BranchesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmed" element={<OrderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
