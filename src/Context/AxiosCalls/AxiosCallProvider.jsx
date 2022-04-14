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
  const { authDispatch, setLoginInput, setShowAddressModal } = useAuth();
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
      setAlertText(error.response.data.errors);
      setShowAlert(true);
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
      setAlertText(error.response.data.errors);
      showLoader();
      setShowAlert(true);
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
      setAlertText("Server Down, Try Later");
      showLoader();
      setShowAlert(true);
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
      console.log(response.data.likes);
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Like Removed ",
          alertType: "alert-success",
          alertIcon: "fas fa-check-circle alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      setAlertText(error.response.data.errors);
      showLoader();
      setShowAlert(true);
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
      setAlertText(error.response.data.errors);
      showLoader();
      setShowAlert(true);
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
      setAlertText(error.response.data.errors);
      showLoader();
      setShowAlert(true);
    }
  };

  // add playlist
  const addNewPlayListOnServer = async (playlistConfig) => {
    const { url, body, headers } = playlistConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      authDispatch({
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
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // remove playlist
  const removePlayListFromServer = async (playlistConfig) => {
    const { url, headers, playlist } = playlistConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${playlist._id}`, headers);
      authDispatch({
        type: "REMOVE_PLAYLIST",
        payload: response.data.playlists,
      });
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Playlist Removed",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      showLoader();
    } catch (error) {
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // get playlist
  const getPlayListFromServer = async (playlistConfig) => {
    const { url, headers, playlist } = playlistConfig;

    try {
      showLoader();
      const response = await axios.get(`${url}/${playlist._id}`, headers);
      authDispatch({
        type: "GET_PARTICULAR_PLAYLIST",
        payload: response.data.playlist,
      });
      showLoader();
    } catch (error) {
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // post in selected playlist
  const updateSelectedPlaylistOnServer = async (playlistConfig) => {
    const { url, body, headers } = playlistConfig;
    const { playlist } = body;
    try {
      showLoader();
      const response = await axios.post(
        `${url}/${playlist._id}`,
        body,
        headers
      );
      console.log("Update", response);
      authDispatch({
        type: "UPDATE_PLAYLIST",
        payload: response.data.playlist,
      });
      setShowAddressModal(false);
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Playlist Updated",
          alertType: "alert-success",
          alertIcon: "fas fa-check-circle alert-icon",
        },
      });
      setShowAlert(true);
      console.log("Update", response.data);
      showLoader();
    } catch (error) {
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // delete video from selected playlist
  const deleteVideoFromPlaylistOnServer = async (updateAddressConfig) => {
    const { url, body, headers } = updateAddressConfig;
    const { playlist } = body;
    try {
      showLoader();
      const response = await axios.delete(`${url}/${playlist._id}`, headers);
      console.log("Update", response);
      authDispatch({
        type: "DELETE_VIDEO_FROM_PLAYLIST",
        payload: response.data.playlist,
      });
      setShowAddressModal(false);
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Playlist Deleted",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      setShowAlert(true);
      console.log("Update", response.data);
      showLoader();
    } catch (error) {
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // add in history
  const addInHistoryListOnServer = async (historyConfig) => {
    const { url, body, headers } = historyConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      authDispatch({
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
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // remove playlist
  const removeFromHistoryListOnServer = async (historyConfig) => {
    const { url, headers, history } = historyConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${history._id}`, headers);
      authDispatch({
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
      showLoader();
    } catch (error) {
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
    }
  };

  // select category
  const selectCategoryOnServer = async (historyConfig) => {
    const { url, headers, category } = historyConfig;

    try {
      showLoader();
      const response = await axios.get(`${url}/${category._id}`, headers);
      authDispatch({
        type: "SELECT_CATEGORY",
        payload: response.data.category,
      });
      showLoader();
    } catch (error) {
      setAlertText("Server Down, try later");
      showLoader();
      setShowAlert(true);
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
        updateSelectedPlaylistOnServer,
        deleteVideoFromPlaylistOnServer,
        addInHistoryListOnServer,
        removeFromHistoryListOnServer,
        selectCategoryOnServer,
      }}
    >
      {children}
    </axiosContext.Provider>
  );
};

const useAxiosCalls = () => useContext(axiosContext);

export { AxiosCallProvider, useAxiosCalls };
