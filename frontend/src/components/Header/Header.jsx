import React from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import {useCart} from "../../hooks/useCart.jsx";
import {useAuth} from "../../hooks/useAuth.jsx";

const Header = () => {
    const {user, logout} = useAuth();
    const { cart } = useCart();

    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <Link to="/" className={classes.logo}>E-Commerce</Link>
                <nav className={classes.nav}>
                    <ul>
                        {
                            user ? (
                                <li className={classes.menu_container}>
                                    <Link to="/profile">{user.name}</Link>
                                    <div className={classes.menu}>
                                        <Link to="/profile" className={classes.menu_item}>Profile</Link>
                                        <Link to="/orders" className={classes.menu_item}>Orders</Link>
                                        <a onClick={logout} className={classes.menu_item}>Logout</a>
                                    </div>
                                </li> ) : (
                                <Link to="/login" className={classes.menu}>Login</Link>
                            )
                        }
                        <li className={classes.menu_container}>
                            <Link to="/cart">
                                Cart {cart.totalCount > 0 && <span className={classes.cart_count}>{cart.totalCount}</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;