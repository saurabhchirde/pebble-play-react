import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { videoReducer } from "./videoReducer";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import { useModal } from "../Modal/ModalContext";
import { useAnimation } from "Context";

const initialVideoState = {
  videos: [],
  singleVideo: {},
  watchlater: [],
  playlists: [],
  singlePlaylist: {},
  history: [],
  likes: [],
  categories: [],
  singleCategory: [],
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

const VideoContext = createContext({});

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(
    videoReducer,
    initialVideoState
  );
  const [newVideo, setNewVideo] = useState(initialVideoDetail);
  const { auth, authDispatch } = useAuth();
  const { setAlertText, setShowAlert } = useModal();
  const [tempVideo, setTempVideo] = useState({});
  const { showLoader } = useAnimation();

  useEffect(() => {
    const getVideos = async () => {
      try {
        showLoader();
        const respVideos = await axios.get("/api/videos");
        showLoader();
        videoDispatch({
          type: "LOAD_ALL_VIDEOS",
          payload: respVideos.data.videos,
        });
        const respCategories = await axios.get("/api/categories");
        videoDispatch({
          type: "LOAD_ALL_CATEGORIES",
          payload: respCategories.data.categories,
        });
      } catch (error) {
        console.error(error.message);
        showLoader();
      }
    };
    getVideos();
  }, [videoDispatch, auth.login]);

  useEffect(() => {
    if (auth.login) {
      const fetchData = async () => {
        try {
          showLoader();
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
          showLoader();
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
    <VideoContext.Provider
      value={{
        videoState,
        videoDispatch,
        newVideo,
        setNewVideo,
        tempVideo,
        setTempVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

const useVideo = () => useContext(VideoContext);

export { VideoProvider, useVideo };
