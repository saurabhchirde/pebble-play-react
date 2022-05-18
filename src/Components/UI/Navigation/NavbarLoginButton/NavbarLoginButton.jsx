import { Button } from "Components";
import { useModal } from "Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";

export const NavbarLoginButton = (props) => {
  const { modalDispatch } = useModal();
  const navigate = useNavigate();

  // redux
  const { auth } = useSelector((authState) => authState);
  const dispatch = useDispatch();

  const onNavbarLoginClickHandler = () => {
    if (!auth.login) {
      modalDispatch({ type: "showLogin", payload: true });
      modalDispatch({ type: "showSignup", payload: false });
    } else {
      modalDispatch({ type: "showAlert", payload: true });
      dispatch(authActions.logout());
      navigate("/videos");
      modalDispatch({ type: "showLogin", payload: false });
      modalDispatch({ type: "showSignup", payload: false });
    }
  };

  return (
    <Button
      btnWrapper="signin"
      label={props.label}
      btnClassName={props.btnClassName}
      onClick={onNavbarLoginClickHandler}
    />
  );
};
