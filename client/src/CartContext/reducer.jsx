
export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProductIndex = state.cart.findIndex((product) => product.id === action.payload.id);

      if (existingProductIndex !== -1) {
        // If product exists in cart, update its quantity
        const updatedCart = state.cart.map((product, index) =>
          index === existingProductIndex ? { ...product, quantity: product.quantity + action.payload.quantity } : product
        );
        return { ...state, cart: updatedCart };
      } else {
        // If product doesn't exist in cart, add it
        return { ...state, cart: [...state.cart, action.payload] };
      }
    }

    case 'INCREMENT_QUANTITY': {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { ...state, cart: updatedCart };
    }

    case 'DECREMENT_QUANTITY': {
      const updatedCart = state.cart.map((item) =>
        item.id === action.payload.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      return { ...state, cart: updatedCart };
    }

    case 'REMOVE_ITEM': {
      const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
      return { ...state, cart: updatedCart };
    }

    case 'CLEAR_CART': {
      return { ...state, cart: [] };
    }

    default: {
      return state;
    }
  }
};
