import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

const cartReducer = function(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1
      };
      existingItems[existingCartItemIndex] = updatedItem;
    } else {
      existingItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: existingItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const removeCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingItems = [...state.items];
    const removeCartItem = state.items[removeCartItemIndex];
    if (removeCartItem.quantity === 1) {
      existingItems.splice(removeCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...removeCartItem,
        quantity: removeCartItem.quantity - 1
      };
      existingItems[removeCartItemIndex] = updatedItem;
    }
    return { ...state, items: existingItems };
  }
  if (action.type === "CLEAR_CART"){
    return {...state, items: []}
  }
};

export function CartContextProvider({ children }) {
  const [cart, dispatchCartActions] = useReducer(cartReducer, { items: [] });
  function addItem(item) {
    dispatchCartActions({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    dispatchCartActions({ type: "REMOVE_ITEM", id });
  }
  function clearCart(){
    dispatchCartActions({ type: "CLEAR_CART"});
  }
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
