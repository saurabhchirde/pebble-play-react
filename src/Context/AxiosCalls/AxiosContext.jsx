import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useModal, useAnimation, useTheme } from "Context";
import {
  AlertModal,
  AlertToast,
  Login,
  PlaylistModal,
  Signup,
  SignupAlertModal,
} from "Components";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  modalActions,
  userActions,
  videoActions,
} from "Store/store";

const AxiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const { showLoader } = useAnimation();
  const { theme } = useTheme();
  const {
    modalState: {
      showLogin,
      showSignup,
      showSignupAlert,
      showAlert,
      showPlaylistModal,
    },
  } = useSelector((modalState) => modalState);
  const {
    auth: { token },
  } = useSelector((authState) => authState);
  const dispatch = useDispatch();

  // login
  const userLogin = async (loginConfig) => {
    const { url, data } = loginConfig;
    try {
      showLoader();
      const response = await axios.post(url, data);
      if (response.status === 200) {
        AlertToast(
          "success",
          `Welcome back ${response.data.foundUser.firstName} ${response.data.foundUser.lastName}`,
          theme
        );
        showLoader();
        dispatch(authActions.login(response.data));
        dispatch(videoActions.authDataInitialize(response.data.foundUser));
        dispatch(userActions.loginInput({ email: "", password: "" }));
        dispatch(modalActions.showLogin(false));
      }

      if (response.status === 201) {
        AlertToast("error", "Invalid Password, Try Again", theme);
        showLoader();
      }
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // signup
  const userSignup = async (signupConfig) => {
    const { url, data } = signupConfig;

    try {
      showLoader();
      const response = await axios.post(url, data);
      if (response.status === 200) {
        dispatch(
          modalActions.alertText(
            "Account created Successfully, please login in to continue"
          )
        );
        dispatch(modalActions.showSignupAlert(true));
      }
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // get single video
  const fetchVideoFromServer = async (videoConfig) => {
    const { url, videoId } = videoConfig;

    try {
      showLoader();
      const response = await axios.get(`${url}/${videoId}`);
      showLoader();
      if (response.status === 200) {
        dispatch(videoActions.getSingleVideo(response.data.video));
      }
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // like video
  const likeVideoOnServer = async (likeConfig) => {
    const { url, body, headers } = likeConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      dispatch(videoActions.likeVideo(response.data.likes));
      AlertToast("success", "Video Liked", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
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

      dispatch(videoActions.unLikeVideo(response.data.likes));
      AlertToast("info", "Like Removed", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // add to watchlater
  const addToWatchlaterOnServer = async (watchlaterConfig) => {
    const { url, body, headers } = watchlaterConfig;
    try {
      showLoader();
      const response = await axios.post(url, body, headers);

      dispatch(videoActions.addToWatchlater(response.data.watchlater));
      AlertToast("success", "Added to watchlater", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
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

      dispatch(videoActions.removeFromWatchlater(response.data.watchlater));
      AlertToast("info", "Removed from watchlater", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // add playlist
  const addNewPlayListOnServer = async (playlistConfig) => {
    const { url, body, headers } = playlistConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);

      dispatch(videoActions.addNewPlaylist(response.data.playlists));
      AlertToast("info", "New Playlist Added", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // remove playlist
  const removePlayListFromServer = async (playlistConfig) => {
    const { url, headers, playlistId } = playlistConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${playlistId}`, headers);
      dispatch(videoActions.removePlaylist(response.data.playlists));
      AlertToast("info", "Playlist Deleted", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // get playlist
  const getPlayListFromServer = async (getPlaylistConfig) => {
    const { url, headers, playlistId } = getPlaylistConfig;
    try {
      showLoader();
      const response = await axios.get(`${url}/${playlistId}`, headers);
      dispatch(videoActions.getParticularPlaylist(response.data.playlist));
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
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
      dispatch(videoActions.updatePlaylist(response.data.playlist));
      AlertToast("success", "Added in Playlist", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
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
      dispatch(videoActions.deleteFromPlaylist(response.data.playlist));
      AlertToast("info", "Deleted from Playlist", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // add in history
  const addInHistoryListOnServer = async (historyConfig) => {
    const { url, body, headers } = historyConfig;

    try {
      showLoader();
      const response = await axios.post(url, body, headers);
      dispatch(videoActions.addInHistory(response.data.history));
      AlertToast("info", "Added in History", theme);
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
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
      dispatch(videoActions.removeFromHistory(response.data.history));
      AlertToast("info", "Removed from History", theme);
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
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
      dispatch(videoActions.removeAllFromHistory(response.data.history));
      AlertToast("info", "Cleared All History", theme);
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // select category
  const selectCategoryOnServer = async (historyConfig) => {
    const { url, headers, category } = historyConfig;

    try {
      showLoader();
      const response = await axios.get(`${url}/${category._id}`, headers);
      dispatch(videoActions.selectCategory(response.data.category));
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0], theme);
      showLoader();
    }
  };

  // get videos and categories
  useEffect(() => {
    const getVideos = async () => {
      try {
        showLoader();
        const respVideos = await axios.get("/api/videos");
        showLoader();

        dispatch(videoActions.loadAllVideos(respVideos.data.videos));

        const respCategories = await axios.get("/api/categories");
        dispatch(
          videoActions.loadAllCategories(respCategories.data.categories)
        );
      } catch (error) {
        showLoader();
        AlertToast("error", error.response.data.errors[0], theme);
      }
    };
    getVideos();
  }, []);

  // fetch user data
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          showLoader();
          const respWatchlater = await axios.get("/api/user/watchlater", {
            headers: { authorization: token },
          });
          dispatch(
            videoActions.getWatchlaterFromServer(respWatchlater.data.watchlater)
          );

          const respPlaylist = await axios.get("/api/user/playlists", {
            headers: { authorization: token },
          });
          dispatch(
            videoActions.getPlaylistFromServer(respPlaylist.data.playlists)
          );

          const respHistory = await axios.get("/api/user/history", {
            headers: { authorization: token },
          });
          dispatch(videoActions.getHistoryFromServer(respHistory.data.history));

          const respLikes = await axios.get("/api/user/likes", {
            headers: { authorization: token },
          });
          dispatch(videoActions.getLikesFromServer(respLikes.data.likes));

          showLoader();
        } catch (error) {
          showLoader();
          AlertToast("error", error.response.data.errors[0], theme);
        }
      };
      fetchData();
    }
  }, [token]);

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
      {showLogin && <Login />}
      {showSignup && <Signup />}
      {showSignupAlert && <SignupAlertModal />}
      {showAlert && <AlertModal />}
      {showPlaylistModal && <PlaylistModal />}
      {children}
    </AxiosContext.Provider>
  );
};

const useAxiosCalls = () => useContext(AxiosContext);

export { AxiosCallProvider, useAxiosCalls };
