import { Button } from "Components";
import "./NotLogged.css";
import { modalActions } from "Store/store";
import { useDispatch } from "react-redux";

export const NotLogged = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="not-logged">
      <p>{props.message}</p>
      <Button
        onClick={() => {
          dispatch(modalActions.showLogin(true));
        }}
        label="Login"
        btnClassName="btn primary-outline-btn-md"
      />
    </div>
  );
};
