import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";
const requestConfig = {};
export default function Meals() {
  const { data: meals, isLoading, error, sendRequest } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );
  if (isLoading) {
    return <p className="center">Fetching data...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals" message={error.message} />;
  }
  return (
    <ul id="meals">
      {meals.length &&
        meals.map(meal => <MealItem meal={meal} key={meal.id} />)}
    </ul>
  );
}
