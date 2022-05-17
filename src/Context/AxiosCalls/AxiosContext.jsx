import { createContext, useContext } from "react";
import axios from "axios";
import { useVideo, useModal, useAuth, useAnimation } from "Context";
import { AlertToast } from "Components";
import { useDispatch } from "react-redux";
import { authActions } from "Store";

const AxiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const { videoDispatch } = useVideo();
  const { setAlertText, setShowLogin, setShowSignupAlert } = useModal();
  const { setLoginInput } = useAuth();
  const { showLoader } = useAnimation();

  // redux
  const dispatch = useDispatch();

  // login
  const userLogin = async (loginConfig) => {
    const { url, data } = loginConfig;

    try {
      showLoader();
      const response = await axios.post(url, data);
      if (response.status === 200) {
        setAlertText(
          `Welcome back ${response.data.foundUser.firstName} ${response.data.foundUser.lastName}`
        );
        showLoader();
        // redux
        dispatch(authActions.login(response.data));

        AlertToast("success", "Successfully Logged In");
        //set initial data
        videoDispatch({
          type: "AUTH_DATA_INITIALIZE",
          payload: response.data.foundUser,
        });
        // setShowAlert(true);
        setLoginInput({ email: "", password: "" });
        setShowLogin(false);
      }

      if (response.status === 201) {
        AlertToast("error", "Invalid Password, Try Again");
        showLoader();
      }
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // signup
  const userSignup = async (signupConfig) => {
    const { url, data } = signupConfig;

    try {
      showLoader();
      const response = await axios.post(url, data);
      if (response.status === 201) {
        setShowSignupAlert(true);
      }
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // get single video
  const fetchVideoFromServer = async (videoConfig) => {
    const { url, videoId } = videoConfig;

    try {
      showLoader();
      const response = await axios.get(`${url}/${videoId}`);
      if (response.status === 200) {
        showLoader();
        videoDispatch({
          type: "GET_SINGLE_VIDEO",
          payload: response.data.video,
        });
      }
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // like video
  const likeVideoOnServer = async (likeConfig) => {
    const { url, body, headers } = likeConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      videoDispatch({ type: "LIKE_VIDEO", payload: response.data.likes });
      AlertToast("success", "Video Liked");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // un-like video
  const unLikeVideoOnServer = async (likeConfig) => {
    const {
      url,
      body: { video },
      headers,
    } = likeConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${video._id}`, headers);
      videoDispatch({ type: "UN_LIKE_VIDEO", payload: response.data.likes });
      AlertToast("info", "Like Removed");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // add to watchlater
  const addToWatchlaterOnServer = async (watchlaterConfig) => {
    const { url, body, headers } = watchlaterConfig;
    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      videoDispatch({
        type: "ADD_TO_WATCH_LATER",
        payload: response.data.watchlater,
      });
      AlertToast("success", "Added to watchlater");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // remove from watchlater
  const removeFromWatchlaterOnServer = async (watchlaterConfig) => {
    const {
      url,
      body: { video },
      headers,
    } = watchlaterConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${video._id}`, headers);
      videoDispatch({
        type: "REMOVE_FROM_WATCH_LATER",
        payload: response.data.watchlater,
      });
      AlertToast("info", "Removed from watchlater");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // add playlist
  const addNewPlayListOnServer = async (playlistConfig) => {
    const { url, body, headers } = playlistConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      videoDispatch({
        type: "ADD_NEW_PLAYLIST",
        payload: response.data.playlists,
      });
      AlertToast("info", "New Playlist Added");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // remove playlist
  const removePlayListFromServer = async (playlistConfig) => {
    const { url, headers, playlistId } = playlistConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${playlistId}`, headers);
      videoDispatch({
        type: "REMOVE_PLAYLIST",
        payload: response.data.playlists,
      });
      AlertToast("info", "Playlist Deleted");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // get playlist
  const getPlayListFromServer = async (getPlaylistConfig) => {
    const { url, headers, playlistId } = getPlaylistConfig;
    try {
      showLoader();
      const response = await axios.get(`${url}/${playlistId}`, headers);
      videoDispatch({
        type: "GET_PARTICULAR_PLAYLIST",
        payload: response.data.playlist,
      });
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // post in selected playlist
  const addInSelectedPlaylistOnServer = async (addInPlaylistConfig) => {
    const { url, body, headers, playlist } = addInPlaylistConfig;

    try {
      showLoader();
      const response = await axios.post(
        `${url}/${playlist._id}`,
        body,
        headers
      );
      videoDispatch({
        type: "UPDATE_PLAYLIST",
        payload: response.data.playlist,
      });
      AlertToast("success", "Added in Playlist");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // delete video from selected playlist
  const deleteVideoFromPlaylistOnServer = async (deleteVideoConfig) => {
    const { url, headers, videoId, playlistId } = deleteVideoConfig;

    try {
      showLoader();
      const response = await axios.delete(
        `${url}/${playlistId}/${videoId}`,
        headers
      );
      videoDispatch({
        type: "DELETE_VIDEO_FROM_PLAYLIST",
        payload: response.data.playlist,
      });
      AlertToast("info", "Deleted from Playlist");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // add in history
  const addInHistoryListOnServer = async (historyConfig) => {
    const { url, body, headers } = historyConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      videoDispatch({
        type: "ADD_IN_HISTORY",
        payload: response.data.history,
      });
      AlertToast("info", "Added in History");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // remove from history
  const removeFromHistoryListOnServer = async (historyConfig) => {
    const { url, headers, history } = historyConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${history._id}`, headers);
      showLoader();
      videoDispatch({
        type: "REMOVE_FROM_HISTORY",
        payload: response.data.history,
      });
      AlertToast("info", "Removed from History");
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // remove all from history
  const removeAllFromHistoryOnServer = async (historyConfig) => {
    const { url, headers } = historyConfig;

    try {
      showLoader();
      const response = await axios.delete(url, headers);
      showLoader();
      videoDispatch({
        type: "REMOVE_ALL_FROM_HISTORY",
        payload: response.data.history,
      });
      AlertToast("info", "Cleared All History");
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  // select category
  const selectCategoryOnServer = async (historyConfig) => {
    const { url, headers, category } = historyConfig;

    try {
      showLoader();
      const response = await axios.get(`${url}/${category._id}`, headers);
      videoDispatch({
        type: "SELECT_CATEGORY",
        payload: response.data.category,
      });
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors);
      showLoader();
    }
  };

  return (
    <AxiosContext.Provider
      value={{
        userLogin,
        userSignup,
        likeVideoOnServer,
        unLikeVideoOnServer,
        addToWatchlaterOnServer,
        removeFromWatchlaterOnServer,
        addNewPlayListOnServer,
        removePlayListFromServer,
        getPlayListFromServer,
        addInSelectedPlaylistOnServer,
        deleteVideoFromPlaylistOnServer,
        fetchVideoFromServer,
        addInHistoryListOnServer,
        removeFromHistoryListOnServer,
        removeAllFromHistoryOnServer,
        selectCategoryOnServer,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

const useAxiosCalls = () => useContext(AxiosContext);

export { AxiosCallProvider, useAxiosCalls };
