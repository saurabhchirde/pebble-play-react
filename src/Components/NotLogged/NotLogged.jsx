import { useAuth, useModal } from "../../Context";
import Button from "../UI/Button/Button";
import "./NotLogged.css";

export const NotLogged = () => {
  const {
    auth: { token },
  } = useAuth();
  const { setShowLogin } = useModal();

  return (
    <div className="not-logged">
      <p>Login to add videos in your Watch later</p>
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
