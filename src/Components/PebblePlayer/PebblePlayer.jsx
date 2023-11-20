import ReactPlayer from "react-player/lazy";
import { useAxiosCalls } from "Context";
import { useSelector } from "react-redux";
import { HISTORY_ENDPOINT } from "Utils/endpoints";

export const PebblePlayer = ({ videoId, videoDetails, played, setPlayed }) => {
  const {
    auth: { token },
  } = useSelector((authState) => authState);

  const {
    videoState: { history },
  } = useSelector((videoState) => videoState);
  const { addInHistoryListOnServer } = useAxiosCalls();

  const historyConfig = {
    url: `${HISTORY_ENDPOINT}/${videoDetails._id}`,
    headers: { headers: { authorization: token } },
  };

  const url = "https://www.youtube.com/watch?v=";

  const playClickHandler = () => {
    if (!played) {
      setPlayed(true);
      if (token) {
        if (history?.some((el) => el?._id === videoDetails?._id)) {
          return null;
        } else {
          addInHistoryListOnServer(historyConfig);
        }
      }
    }
  };

  return (
    <ReactPlayer
      url={`${url}${videoId}`}
      width="100%"
      height="70vh"
      controls
      onPlay={playClickHandler}
      className=""
    />
  );
};
