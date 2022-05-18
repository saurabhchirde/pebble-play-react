import { useModal } from "Context";
import "./AlertModal.css";
import { Button } from "Components";

export const AlertModal = () => {
  const {
    modalDispatch,
    modalState: { alertText },
  } = useModal();

  const closeClickHandler = () => {
    modalDispatch({ type: "showAlert", payload: false });
    modalDispatch({ type: "alertText", payload: "" });
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
