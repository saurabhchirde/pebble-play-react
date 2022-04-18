import { useModal } from "Context";
import { Button } from "Components";
import "./NotLogged.css";

export const NotLogged = (props) => {
  const { setShowLogin } = useModal();

  return (
    <div className="not-logged">
      <p>{props.message}</p>
      <Button
        onClick={() => {
          setShowLogin(true);
        }}
        label="Login"
        btnClassName="btn primary-outline-btn-md"
      />
    </div>
  );
};
