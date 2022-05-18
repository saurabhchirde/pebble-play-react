import { VideoCard, Button, NotLogged, AlertToast } from "Components";
import { useAxiosCalls } from "Context";
import { useSelector } from "react-redux";
import "./History.css";

export const History = () => {
  // redux
  const {
    auth: { token },
  } = useSelector((authState) => authState);
  const {
    videoState: { history },
  } = useSelector((videoState) => videoState);

  const { removeAllFromHistoryOnServer } = useAxiosCalls();

  const historyConfig = {
    url: "/api/user/history/all",
    headers: { headers: { authorization: token } },
  };

  const onRemoveAllHandler = () => {
    if (history.length < 1) {
      AlertToast("info", "No videos in History");
    } else {
      removeAllFromHistoryOnServer(historyConfig);
    }
  };

  const mapHistory =
    history.length > 0 ? (
      <div className="history-video-section flex-row">
        {history.map((video) => (
          <VideoCard key={video._id} videoDetail={video} />
        ))}
      </div>
    ) : (
      <h2 className="history-sub-title">No History Available </h2>
    );

  return (
    <div className="history-body">
      {token ? (
        <>
          <div className="flex-row-center flex-justify-space-between">
            <h1 className="history-title">
              Watched History <i className="fas fa-history mg-point6-lt"></i>
            </h1>
            <Button
              onClick={onRemoveAllHandler}
              btnClassName="btn primary-outline-btn-md"
              label="Remove all"
            />
          </div>
          {mapHistory}
        </>
      ) : (
        <NotLogged message="Login to see History" />
      )}
    </div>
  );
};
