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
import { batch, useDispatch, useSelector } from "react-redux";
import {
  authActions,
  modalActions,
  userActions,
  videoActions,
} from "Store/store";
import {
  CATEGORIES_ENDPOINT,
  HISTORY_ENDPOINT,
  LIKES_ENDPOINT,
  PLAYLISTS_ENDPOINT,
  VIDEOS_ENDPOINT,
  WATCH_LATER_ENDPOINT,
} from "Utils/endpoints";
import { useLocation } from "react-router-dom";

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
  const { pathname } = useLocation();

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

        batch(() => {
          dispatch(authActions.login(response.data));
          dispatch(videoActions.authDataInitialize(response.data.foundUser));
          dispatch(userActions.loginInput({ email: "", password: "" }));
          dispatch(modalActions.showLogin(false));
        });
      }

      if (response.status === 201) {
        AlertToast("error", "Invalid Password, Try Again", theme);
      }
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
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
        batch(() => {
          dispatch(
            modalActions.alertText(
              "Account created Successfully, please login in to continue"
            )
          );
          dispatch(modalActions.showSignupAlert(true));
          dispatch(modalActions.showSignup(false));
        });
      }
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
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
        dispatch(videoActions.getSingleVideo(response.data.video));
      }
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // like video
  const likeVideoOnServer = async (likeConfig) => {
    const { url, headers } = likeConfig;

    try {
      showLoader();
      const response = await axios.post(url, null, headers);
      dispatch(videoActions.likeVideo(response.data.likes));
      AlertToast("success", "Video Liked", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // un-like video
  const unLikeVideoOnServer = async (likeConfig) => {
    const { url, headers } = likeConfig;

    try {
      showLoader();
      const response = await axios.delete(url, headers);

      dispatch(videoActions.unLikeVideo(response.data.likes));
      AlertToast("info", "Like Removed", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // add to watchlater
  const addToWatchlaterOnServer = async (watchlaterConfig) => {
    const { url, headers } = watchlaterConfig;
    try {
      showLoader();
      const response = await axios.post(url, null, headers);

      dispatch(videoActions.addToWatchlater(response.data.watchlater));
      AlertToast("success", "Added to watchlater", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // remove from watchlater
  const removeFromWatchlaterOnServer = async (watchlaterConfig) => {
    const { url, headers } = watchlaterConfig;

    try {
      showLoader();
      const response = await axios.delete(url, headers);

      dispatch(videoActions.removeFromWatchlater(response.data.watchlater));
      AlertToast("info", "Removed from watchlater", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
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
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
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
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
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
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // post in selected playlist
  const addInSelectedPlaylistOnServer = async (addInPlaylistConfig) => {
    const { url, headers } = addInPlaylistConfig;

    try {
      showLoader();
      const response = await axios.post(url, null, headers);
      dispatch(videoActions.updatePlaylist(response.data.playlist));
      AlertToast("success", "Added in Playlist", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // delete video from selected playlist
  const deleteVideoFromPlaylistOnServer = async (deleteVideoConfig) => {
    const { url, headers } = deleteVideoConfig;

    try {
      showLoader();
      const response = await axios.delete(url, headers);
      dispatch(videoActions.deleteFromPlaylist(response.data.playlist));
      AlertToast("info", "Deleted from Playlist", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // add in history
  const addInHistoryListOnServer = async (historyConfig) => {
    const { url, headers } = historyConfig;

    try {
      showLoader();
      const response = await axios.post(url, null, headers);
      dispatch(videoActions.addInHistory(response.data.history));
      AlertToast("info", "Added in History", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // remove from history
  const removeFromHistoryListOnServer = async (historyConfig) => {
    const { url, headers, history } = historyConfig;

    try {
      showLoader();
      const response = await axios.delete(`${url}/${history._id}`, headers);

      dispatch(videoActions.removeFromHistory(response.data.history));
      AlertToast("info", "Removed from History", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // remove all from history
  const removeAllFromHistoryOnServer = async (historyConfig) => {
    const { url, headers } = historyConfig;

    try {
      showLoader();
      const response = await axios.delete(url, headers);

      dispatch(videoActions.removeAllFromHistory(response.data.history));
      AlertToast("info", "Cleared All History", theme);
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
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
    } catch (error) {
      AlertToast("error", error?.response?.data?.message, theme);
    } finally {
      showLoader();
    }
  };

  // get videos and categories
  useEffect(() => {
    const getVideos = async () => {
      try {
        showLoader();
        const [respVideos, respCategories] = await Promise.all([
          axios.get(VIDEOS_ENDPOINT),
          axios.get(CATEGORIES_ENDPOINT),
        ]);

        batch(() => {
          dispatch(videoActions.loadAllVideos(respVideos.data.videos));
          dispatch(
            videoActions.loadAllCategories(respCategories.data.categories)
          );
        });
      } catch (error) {
        AlertToast("error", error?.response?.data?.message, theme);
      } finally {
        showLoader();
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

          if (pathname === "/watchlater") {
            const respWatchlater = await axios.get(WATCH_LATER_ENDPOINT, {
              headers: { authorization: token },
            });
            dispatch(
              videoActions.getWatchlaterFromServer(
                respWatchlater.data.watchlater
              )
            );
          }

          if (pathname === "/playlists") {
            const respPlaylist = await axios.get(PLAYLISTS_ENDPOINT, {
              headers: { authorization: token },
            });
            dispatch(
              videoActions.getPlaylistFromServer(respPlaylist.data.playlists)
            );
          }

          if (pathname === "/history" || pathname.includes("/videos/")) {
            const respHistory = await axios.get(HISTORY_ENDPOINT, {
              headers: { authorization: token },
            });
            dispatch(
              videoActions.getHistoryFromServer(respHistory.data.history)
            );
          }

          if (pathname === "/liked") {
            const respLikes = await axios.get(LIKES_ENDPOINT, {
              headers: { authorization: token },
            });
            dispatch(videoActions.getLikesFromServer(respLikes.data.likes));
          }
        } catch (error) {
          AlertToast("error", error?.response?.data?.message, theme);
        } finally {
          showLoader();
        }
      };
      fetchData();
    }
  }, [token, pathname]);

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
