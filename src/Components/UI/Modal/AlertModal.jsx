import "./AlertModal.css";
import { Button } from "Components";
import { modalActions } from "Store/store";
import { useDispatch, useSelector } from "react-redux";

export const AlertModal = () => {
  const {
    modalState: { alertText },
  } = useSelector((modalState) => modalState);
  const dispatch = useDispatch();

  const closeClickHandler = () => {
    dispatch(modalActions.showAlert(false));
    dispatch(modalActions.alertText(""));
  };

  return (
    <>
      <div className="modal-backdrop"></div>
      <div className="discard-modal-md">
        <p>{alertText}</p>
        <div className="error-modal-button">
          <Button
            onClick={closeClickHandler}
            btnClassName="btn primary-outline-btn-md"
            label="Close"
          />
        </div>
      </div>
    </>
  );
};
