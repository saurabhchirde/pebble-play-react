import "./SignupAlertModal.css";
import { Button } from "Components";
import { modalActions } from "Store/store";
import { batch, useDispatch } from "react-redux";

export const SignupAlertModal = () => {
  const dispatch = useDispatch();

  const loginClickHandler = () => {
    batch(() => {
      dispatch(modalActions.showLogin(true));
      dispatch(modalActions.showSignup(false));
      dispatch(modalActions.showSignupAlert(false));
    });
  };

  const closeClickHandler = () => {
    batch(() => {
      dispatch(modalActions.showSignup(false));
      dispatch(modalActions.showSignupAlert(false));
    });
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="discard-modal-md">
        <p>
          Your account has been created successfully!
          <br />
          please login to continue
        </p>
        <div className="discard-modal-btn">
          <Button
            onClick={closeClickHandler}
            btnClassName="btn primary-outline-btn-md"
            label="Close"
          />
          <Button
            onClick={loginClickHandler}
            btnClassName="btn primary-btn-md"
            label="Login"
          />
        </div>
      </div>
    </>
  );
};
