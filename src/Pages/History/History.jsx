import { VideoCard, Button, NotLogged, AlertToast } from "Components";
import { useAxiosCalls, useTheme } from "Context";
import { useSelector } from "react-redux";
import "./History.css";
import { HISTORY_ENDPOINT } from "Utils/endpoints";

export const History = () => {
  const {
    auth: { token },
  } = useSelector((authState) => authState);
  const {
    videoState: { history },
  } = useSelector((videoState) => videoState);
  const { theme } = useTheme();

  const { removeAllFromHistoryOnServer } = useAxiosCalls();

  const historyConfig = {
    url: HISTORY_ENDPOINT,
    headers: { headers: { authorization: token } },
  };

  const removeAllHandler = () => {
    if (history.length < 1) {
      AlertToast("info", "No videos in History", theme);
    } else {
      removeAllFromHistoryOnServer(historyConfig);
    }
  };

  const mapHistory =
    history?.length > 0 ? (
      <div className="history-video-section flex-row">
        {history?.map((video) => (
          <VideoCard key={video?._id} videoDetail={video} />
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
              onClick={removeAllHandler}
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
