import { useEffect } from "react";
import { useAlert } from "Context";
import "./Alert.css";

export const Alert = () => {
  const {
    alertState: { alertText, alertType, alertIcon },
    alertDispatch,
  } = useAlert();

  useEffect(() => {
    const alertTime = setTimeout(() => {
      alertDispatch({ type: "HIDE_ALERT" });
    }, 1300);
    return () => {
      clearTimeout(alertTime);
    };
  }, [alertDispatch]);

  return (
    <div className={alertType}>
      <i className={alertIcon}></i>
      <span className="p-md">{alertText}</span>
    </div>
  );
};
