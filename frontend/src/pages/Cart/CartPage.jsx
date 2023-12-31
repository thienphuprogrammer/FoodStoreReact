import React from 'react';
import classes from "./cartPage.module.css";
import {useCart} from "../../hooks/useCart.jsx";
import {Title} from "../../components/Title/Title.jsx";
import {Link} from "react-router-dom";
import Price from "../../components/Price/Price.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";

export const CartPage = () => {
    const {cart, removeFromCart, changeQuantity} = useCart();

    return (
        <>
            <Title title="Cart Page" fonsSize="2rem" margin="1.5rem 0 0 2.5rem"/>
            {
                cart.items.length === 0 ? (
                    <NotFound message={"Cart Page is Empty!!"} linkText={"Return Home Page"}/>
                ) : (
                    <div className={classes.container}>
                        <ul className={classes.list}>
                            {
                                cart.items.map(item => (
                                    <li key={item.food.id} className={classes.item}>
                                        <div>
                                            <img className={classes.image} src={item.food.imageUrl}
                                                 alt={item.food.name}/>
                                        </div>
                                        <div>
                                            <Link
                                                className={classes.name}
                                                to={`/food/${item.food.id}`}
                                            >{item.food.name}</Link>
                                        </div>

                                        <div>
                                            <select
                                                value={item.quantity}
                                                className={classes.select}
                                                onChange={e => changeQuantity(item, Number(e.target.value))}
                                            >
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value="6">6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Price price={item.price}/>
                                        </div>

                                        <div>
                                            <button
                                                className={classes.remove_button}
                                                onClick={() => removeFromCart(item.food.id)}
                                            >Remove
                                            </button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                        <div className={classes.checkout}>
                            <div>
                                <div className={classes.foods_count}>{cart.totalCount}</div>
                                <div className={classes.total_price}><Price price={cart.totalPrice}/></div>
                            </div>
                            <Link to="/checkout">Checkout</Link>
                        </div>
                    </div>
                )
            }
        </>
    )
}
