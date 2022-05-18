import ReactPlayer from "react-player/lazy";
import { useAxiosCalls } from "Context";
import { useSelector } from "react-redux";

export const PebblePlayer = ({ videoId, videoDetails, played, setPlayed }) => {
  const {
    auth: { token },
  } = useSelector((authState) => authState);

  const {
    videoState: { history },
  } = useSelector((videoState) => videoState);
  const { addInHistoryListOnServer } = useAxiosCalls();

  const historyConfig = {
    url: "/api/user/history",
    body: { video: { ...videoDetails } },
    headers: { headers: { authorization: token } },
  };

  const url = "https://www.youtube.com/watch?v=";

  const onPlayClickHandler = () => {
    if (!played) {
      setPlayed(true);
      if (token) {
        if (history.findIndex((el) => el._id === videoDetails._id) !== -1) {
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
      onPlay={onPlayClickHandler}
      className=""
    />
  );
};
