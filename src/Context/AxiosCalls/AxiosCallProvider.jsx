import { createContext, useContext } from "react";
import axios from "axios";
import { useVideo } from "../Video/VideoProvider";
import { useModal } from "../Modal/ModalProvider";
import { useAuth } from "../Auth/AuthProvider";
import { useAnimation } from "../index";
import { useAlert } from "../Alerts/AlertsProvider";

const axiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const { videoDispatch } = useVideo();
  const { setAlertText, setShowAlert, setShowLogin, setShowSignupAlert } =
    useModal();
  const { alertDispatch } = useAlert();
  const { authDispatch, setLoginInput } = useAuth();
  const { showLoader } = useAnimation();

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
        //save login credentials
        authDispatch({
          type: "login",
          payload: response.data,
        });
        alertDispatch({
          type: "ALERT",
          payload: {
            alertText: "Successfully Logged In",
            alertType: "alert-success",
            alertIcon: "fas fa-check-circle alert-icon",
          },
        });
        //set initial data
        videoDispatch({
          type: "AUTH_DATA_INITIALIZE",
          payload: response.data.foundUser,
        });
        setShowAlert(true);
        setLoginInput({ email: "", password: "" });
        setShowLogin(false);
      }

      if (response.status === 201) {
        setAlertText("Invalid Password, Try Again");
        showLoader();
        setShowAlert(true);
      }
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      showLoader();
      console.log(error);
    }
  };

  // like video
  const likeVideoOnServer = async (likeConfig) => {
    const { url, body, headers } = likeConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      videoDispatch({ type: "LIKE_VIDEO", payload: response.data.likes });
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Liked",
          alertType: "alert-success",
          alertIcon: "fas fa-check-circle alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Like Removed",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Added to watchlater",
          alertType: "alert-success",
          alertIcon: "fas fa-check-circle alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Removed from watchlater",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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

      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "New Playlist Added",
          alertType: "alert-success",
          alertIcon: "fas fa-check-circle alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Playlist Deleted",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Added in Playlist",
          alertType: "alert-success",
          alertIcon: "fas fa-check-circle alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Deleted from Playlist",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Added in History",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Removed from History",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Cleared All History",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
    } catch (error) {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
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
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: error.response.data.errors,
          alertType: "alert-error",
          alertIcon: "fas  fa-exclamation-circle alert-icon",
        },
      });
      showLoader();
    }
  };

  return (
    <axiosContext.Provider
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
    </axiosContext.Provider>
  );
};

const useAxiosCalls = () => useContext(axiosContext);

export { AxiosCallProvider, useAxiosCalls };
