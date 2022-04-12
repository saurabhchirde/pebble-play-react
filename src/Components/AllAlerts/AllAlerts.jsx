import { useAlert } from "../../Context";
import Alert from "./Alert/Alert";

export const AllAlerts = () => {
  const {
    alertState: { addToWatchlatertAlert, removeFromWatchlaterAlert },
  } = useAlert();
  return (
    <>
      {addToWatchlatertAlert && (
        <Alert
          alert="alert-success"
          icon="fas fa-check-circle alert-icon"
          text="Video Added to Watch Laterr"
          dispatchType="HIDE_ADD_TO_WATCH_LATER_ALERT"
        />
      )}
      {removeFromWatchlaterAlert && (
        <Alert
          alert="alert-info"
          icon="fas fa-info alert-icon"
          text="Video Removed from Watch Later"
          dispatchType="HIDE_REMOVE_FROM_WATCH_LATER_Alert"
        />
      )}
    </>
  );
};
