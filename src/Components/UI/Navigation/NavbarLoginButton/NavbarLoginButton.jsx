import { AlertToast, Button } from "Components";
import { useNavigate } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { authActions, modalActions } from "Store/store";
import { useTheme } from "Context";

export const NavbarLoginButton = (props) => {
  const navigate = useNavigate();

  const { auth } = useSelector((authState) => authState);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const navbarLoginClickHandler = () => {
    if (!auth.login) {
      batch(() => {
        dispatch(modalActions.showLogin(true));
        dispatch(modalActions.showSignup(false));
      });
    } else {
      batch(() => {
        AlertToast("success", "Logged out Successfully", theme);
        dispatch(authActions.logout());
        navigate("/videos");
        dispatch(modalActions.showLogin(false));
        dispatch(modalActions.showSignup(false));
      });
    }
  };

  return (
    <Button
      btnWrapper="signin"
      label={props.label}
      btnClassName={props.btnClassName}
      onClick={navbarLoginClickHandler}
    />
  );
};
