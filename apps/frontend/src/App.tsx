import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import { SearchProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
