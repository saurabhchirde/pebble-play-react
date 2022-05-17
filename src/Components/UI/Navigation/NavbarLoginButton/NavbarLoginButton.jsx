import { Button } from "Components";
import { useModal } from "Context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "Store";

export const NavbarLoginButton = (props) => {
  const { setShowLogin, setShowSignup, setAlertText, setShowAlert } =
    useModal();
  const navigate = useNavigate();

  // redux
  const { auth } = useSelector((authState) => authState);
  const dispatch = useDispatch();

  const onNavbarLoginClickHandler = () => {
    if (!auth.login) {
      setShowLogin(true);
      setShowSignup(false);
    } else {
      setAlertText(`Logged out successfully`);
      setShowAlert(true);
      dispatch(authActions.logout());
      navigate("/videos");
      setShowLogin(false);
      setShowSignup(false);
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
