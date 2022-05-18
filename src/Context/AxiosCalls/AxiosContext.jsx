import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { useModal, useAnimation } from "Context";
import {
  AlertModal,
  AlertToast,
  Login,
  PlaylistModal,
  Signup,
  SignupAlertModal,
} from "Components";
import { useDispatch, useSelector } from "react-redux";
import { authActions, userActions, videoActions } from "Store/store";

const AxiosContext = createContext(null);

const AxiosCallProvider = ({ children }) => {
  const {
    modalState: {
      showLogin,
      showSignup,
      showSignupAlert,
      showAlert,
      showPlaylistModal,
    },
    modalDispatch,
  } = useModal();
  const { showLoader } = useAnimation();

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
          `Welcome back ${response.data.foundUser.firstName} ${response.data.foundUser.lastName}`
        );
        showLoader();
        dispatch(authActions.login(response.data));
        dispatch(videoActions.authDataInitialize(response.data.foundUser));

        dispatch(userActions.loginInput({ email: "", password: "" }));
        modalDispatch({ type: "showLogin", payload: false });
      }

      if (response.status === 201) {
        AlertToast("error", "Invalid Password, Try Again");
        showLoader();
      }
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
        modalDispatch({
          type: "alertText",
          payload: "Account created Successfully, please login in to continue",
        });
        modalDispatch({ type: "showSignupAlert", payload: true });
      }
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("success", "Video Liked");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Like Removed");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("success", "Added to watchlater");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Removed from watchlater");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "New Playlist Added");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Playlist Deleted");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("success", "Added in Playlist");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Deleted from Playlist");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Added in History");
      showLoader();
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Removed from History");
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("info", "Cleared All History");
    } catch (error) {
      AlertToast("error", error.response.data.errors[0]);
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
      AlertToast("error", error.response.data.errors[0]);
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
        AlertToast("error", error.response.data.errors[0]);
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
          AlertToast("error", error.response.data.errors[0]);
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
