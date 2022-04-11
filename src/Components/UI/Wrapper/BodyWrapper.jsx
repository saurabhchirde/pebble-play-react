import { useAuth } from "../../../Context";
import "./BodyWrapper.css";

const BodyWrapper = ({ children }) => {
  const { setShowProfileMenu } = useAuth();
  return (
    <div
      onClick={() => {
        setShowProfileMenu(false);
      }}
      className="bodyWrapper"
    >
      {children}
    </div>
  );
};

export default BodyWrapper;
