import { useFilter } from "Context";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

export const CategoryCard = ({ category }) => {
  const { filterDispatch } = useFilter();
  const navigate = useNavigate();

  const onCategoryClickHandler = () => {
    filterDispatch({ type: "FILTER_CATEGORY", payload: category.category });
    navigate("/videos");
  };

  return (
    <div
      onClick={onCategoryClickHandler}
      className="card-square-overlay category-card"
    >
      <div className="category-text-section">
        <i className={category.icon}></i>
        <h1 className="card-title">{category.categoryName}</h1>
      </div>
    </div>
  );
};
