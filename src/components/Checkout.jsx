import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { CurrencyFormatter } from "../util/CurrencyFormatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UseProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const { data, isLoading, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    const reqBody = {
      order: {
        customer: customerData,
        items: cartCtx.items
      }
    };
    sendRequest(JSON.stringify(reqBody));
  }
  let loadingContent = (
    <>
      <Button textOnly type="button" onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isLoading) {
    loadingContent = <span>Sending Request...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!!</h2>
        <p>Order placed Successfully!!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {CurrencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-flow">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="city" type="text" id="city" />
        </div>
        {error && (
          <Error title="Failed to submit order" message={error.message} />
        )}
        <p className="modal-actions">{loadingContent}</p>
      </form>
    </Modal>
  );
}
