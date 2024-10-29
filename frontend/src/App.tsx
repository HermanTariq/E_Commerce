import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/client/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CartProvider from "./context/Cart/CartProvider";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrderPage from "./pages/client/MyOrdersPage";
import FavoritesProvider from "./context/Favorites/FavoritesProvider";
import FavoritesPage from "./pages/FavoritesPage";
import AdminDashboardPage from "./pages/adminpages/AdminDashboard";
import AdminUsersPage from "./pages/adminpages/AdminUsersPage";
import AdminOrdersPage from "./pages/adminpages/AdminOrdersPage"
import AddProductPage from "./pages/adminpages/AddProductPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/my-orders" element={<MyOrderPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route element={<ProtectedRoute isAdminRoute={true} />}>
                  <Route path="/admin-dashboard"element={<AdminDashboardPage />}/>
                  <Route path="/admin/users" element={<AdminUsersPage />} />
                  <Route path="/admin/orders" element={<AdminOrdersPage />} />
                  <Route path="/admin/add-product" element={<AddProductPage/>} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
