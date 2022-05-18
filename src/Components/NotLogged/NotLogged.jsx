import { useModal } from "Context";
import { Button } from "Components";
import "./NotLogged.css";

export const NotLogged = (props) => {
  const { modalDispatch } = useModal();

  return (
    <div className="not-logged">
      <p>{props.message}</p>
      <Button
        onClick={() => {
          modalDispatch({ type: "showLogin", payload: true });
        }}
        label="Login"
        btnClassName="btn primary-outline-btn-md"
      />
    </div>
  );
};
