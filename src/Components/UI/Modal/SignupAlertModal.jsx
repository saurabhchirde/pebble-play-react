import { useModal } from "Context";
import "./SignupAlertModal.css";
import { Button } from "Components";

export const SignupAlertModal = () => {
  const { modalDispatch } = useModal();

  const loginClickHandler = () => {
    modalDispatch({ type: "showLogin", payload: true });
    modalDispatch({ type: "showSignup", payload: false });
  };

  const closeClickHandler = () => {
    modalDispatch({ type: "showSignup", payload: false });
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
