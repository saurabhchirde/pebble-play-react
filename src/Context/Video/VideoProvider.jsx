import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { videoReducer } from "./videoReducer";
import { useAuth } from "../Auth/AuthProvider";
import axios from "axios";
import { useModal } from "../Modal/ModalProvider";

const initialVideoState = {
  videos: [],
  watchlater: [],
  playlists: [],
  singlePlaylist: {},
  history: [],
  likes: [],
};

const initialVideoDetail = {
  _id: "",
  snippet: {
    title: "",
    description: "",
    thumbnails: {},
  },
  statistics: {
    viewCount: "",
    likeCount: "",
    favoriteCount: "0",
    commentCount: "",
  },
  notes: [],
};

const cartContext = createContext({});

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(
    videoReducer,
    initialVideoState
  );
  const [newVideo, setNewVideo] = useState(initialVideoDetail);
  const { auth, authDispatch } = useAuth();
  const { setAlertText, setShowAlert } = useModal();

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await axios.get("/api/videos");
        videoDispatch({
          type: "LOAD_ALL_VIDEOS",
          payload: response.data.videos,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    getVideos();
  }, [videoDispatch]);

  useEffect(() => {
    if (auth.login) {
      const fetchData = async () => {
        try {
          const respWatchlater = await axios.get("/api/user/watchlater", {
            headers: { authorization: auth.token },
          });
          const respPlaylist = await axios.get("/api/user/playlists", {
            headers: { authorization: auth.token },
          });
          const respHistory = await axios.get("/api/user/history", {
            headers: { authorization: auth.token },
          });
          const respLikes = await axios.get("/api/user/likes", {
            headers: { authorization: auth.token },
          });

          videoDispatch({
            type: "GET_WATCHLATER_FROM_SERVER",
            payload: respWatchlater.data.watchlater,
          });
          videoDispatch({
            type: "GET_PLAYLIST_FROM_SERVER",
            payload: respPlaylist.data.playlists,
          });
          authDispatch({
            type: "GET_HISTORY_FROM_SERVER",
            payload: respHistory.data.history,
          });
          authDispatch({
            type: "GET_LIKES_FROM_SERVER",
            payload: respLikes.data.likes,
          });
        } catch (error) {
          setAlertText(error.message);
          setShowAlert(true);
        }
      };
      fetchData();
    } else {
      videoDispatch({ type: "EMPTY_ALL_LISTS" });
    }
  }, [
    auth.login,
    auth.token,
    authDispatch,
    videoDispatch,
    setAlertText,
    setShowAlert,
  ]);

  return (
    <cartContext.Provider
      value={{
        videoState,
        videoDispatch,
        newVideo,
        setNewVideo,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

const useVideo = () => useContext(cartContext);

export { VideoProvider, useVideo };
