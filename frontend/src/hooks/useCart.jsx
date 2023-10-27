import React, {createContext, useState} from 'react'
import {sample_foods} from "../data.js";

const CartContext = createContext(null);
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(
        sample_foods
            .slice(1,4)
            .map(food => ({food, quantity: 1, price: food.price}))
    );
    const [totalPrice, setTotalPrice] = useState(40);
    const [totalCount, setTotalCount] = useState(3);


    return (
       <CartContext.Provider value={{cart:{items: cartItems, totalPrice, totalCount}}}>
           {children}
       </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = React.useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context;
}
