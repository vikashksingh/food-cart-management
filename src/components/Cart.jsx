import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UseProgressContext";
import { CurrencyFormatter } from "../util/CurrencyFormatter";
import Button from "./UI/Button";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  function handleCartClose() {
    userProgressCtx.hideCart();
  }
  function handleCartQuantity(ops, cartData) {
    if (ops === "add") {
      cartCtx.addItem(cartData);
    } else {
      cartCtx.removeItem(cartData);
    }
  }
  function handleCartCheckout() {
    userProgressCtx.showCheckout();
  }
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCartClose : null}
    >
      <h2>Items</h2>
      <ul className="">
        {cartCtx.items.length > 0 &&
          cartCtx.items.map(item => (
            <li className="cart-item" key={item.id}>
              <p>
                {item.name} - {item.quantity} x{" "}
                {CurrencyFormatter.format(item.price)}
              </p>
              <p className="cart-item-actions">
                <Button
                  textOnly
                  onClick={() => handleCartQuantity("remove", item.id)}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  textOnly
                  onClick={() => handleCartQuantity("add", item)}
                >
                  +
                </Button>
              </p>
            </li>
          ))}
      </ul>
      <p className="cart-total">{CurrencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCartClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCartCheckout}>Click to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
