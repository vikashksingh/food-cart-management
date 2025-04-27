import Logo from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UseProgressContext";
import Button from "./UI/Button";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartItems = cartCtx.items.reduce(
    (total, item) => (total += item.quantity),
    0
  );
  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="Food order logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
