import React, { createContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";

export const CartContext = createContext();

const getCartData = () => {
  const data = localStorage.getItem('cart');
  return data ? JSON.parse(data) : [];
}

const CartContextProvider = ({ children }) => {
  const [cart_state, cart_dispatch] = useReducer(reducer, { cart: getCartData() });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart_state.cart));
  }, [cart_state.cart]);

  return (
    <CartContext.Provider value={{ cart_state, cart_dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
