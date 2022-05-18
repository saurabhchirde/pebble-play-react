import { useDispatch } from "react-redux";
import { userActions } from "Store/store";
import "./BodyWrapper.css";

export const BodyWrapper = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(userActions.profileMenu(false));
      }}
      className="bodyWrapper"
    >
      {children}
    </div>
  );
};
