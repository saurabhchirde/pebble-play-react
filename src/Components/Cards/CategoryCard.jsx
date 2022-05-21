import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterActions } from "Store/store";
import "./CategoryCard.css";

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryClickHandler = () => {
    dispatch(filterActions.filterByCategory(category.category));
    navigate("/videos");
  };

  return (
    <div
      onClick={categoryClickHandler}
      className="card-square-overlay category-card"
    >
      <div className="category-text-section">
        <i className={category.icon}></i>
        <h1 className="card-title">{category.categoryName}</h1>
      </div>
    </div>
  );
};
