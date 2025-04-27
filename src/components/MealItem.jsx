import { CurrencyFormatter } from "../util/CurrencyFormatter";
import Button from "./UI/Button";
import CreateContext from "../store/CartContext";
import { useContext } from "react";
export default function MealItem({ meal }) {
  const cartCtx = useContext(CreateContext);
  function updateCart(meal) {
    cartCtx.addItem(meal);
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.image} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {CurrencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => updateCart(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
