import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import FoodPage from "./pages/Food/FoodPage.jsx";
import {CartPage} from "./pages/Cart/CartPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import CheckoutPage from "./pages/Checkout/CheckoutPage.jsx";
import AuthRoute from "./components/AuthRoute/AuthRoute.jsx";
import PaymentPage from "./pages/Payment/PaymentPage.jsx";
import OrderTrackPage from "./pages/OrderTrack/OrderTrackPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:searchTerm" element={<HomePage />} />
            <Route path="/tag/:tag" element={<HomePage />} />
            <Route path="/food/:foodId" element={<FoodPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<AuthRoute>
                <CheckoutPage />
            </AuthRoute> } />
            <Route
                path="/payment"
                element={
                    <AuthRoute>
                        <PaymentPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/track/:orderId"
                element={
                    <AuthRoute>
                        <OrderTrackPage />
                    </AuthRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <AuthRoute>
                        <ProfilePage />
                    </AuthRoute>
                }
            />
            <Route
                path="/orders/:filter?"
                element={
                    <AuthRoute>
                        <OrdersPage />
                    </AuthRoute>
                }
            />
        </Routes>
    );
}

export default AppRoutes;