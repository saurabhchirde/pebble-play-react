import { useState } from "react";
import { useAxiosCalls, useTheme } from "Context";
import { AlertToast, Button, IconButton, LabelIconButton } from "Components";
import "./PlaylistModal.css";
import { batch, useDispatch, useSelector } from "react-redux";
import { modalActions, videoActions } from "Store/store";
import { PLAYLISTS_ENDPOINT } from "Utils/endpoints";

const initialPlaylist = {
  title: "",
  description: "",
};

export const PlaylistModal = () => {
  const {
    videoState: { playlists, tempVideo },
  } = useSelector((videoState) => videoState);
  const dispatch = useDispatch();

  const { auth } = useSelector((authState) => authState);
  const { token } = auth;
  const { theme } = useTheme();

  const {
    addNewPlayListOnServer,
    addInSelectedPlaylistOnServer,
    deleteVideoFromPlaylistOnServer,
  } = useAxiosCalls();
  const [showCreate, setShowCreate] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState(initialPlaylist);

  const playlistConfig = {
    url: PLAYLISTS_ENDPOINT,
    body: newPlaylist,
    headers: { headers: { authorization: token } },
  };

  const newPlaylistClickHandler = () => {
    setShowCreate(true);
  };

  const playlistNameInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewPlaylist((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const playlistSubmitHandler = (e) => {
    e.preventDefault();
  };

  const createPlaylistClickHandler = () => {
    if (newPlaylist.title.trim() === "") {
      AlertToast("info", "Playlist name cannot be blank", theme);
      setNewPlaylist(initialPlaylist);
    } else {
      addNewPlayListOnServer(playlistConfig);
      setNewPlaylist(initialPlaylist);
    }
  };

  const playlistSelectHandler = (playlist, e) => {
    if (e.target.checked) {
      const addInPlaylistConfig = {
        url: `${PLAYLISTS_ENDPOINT}/${playlist.id}/video/${tempVideo._id}`,
        headers: { headers: { authorization: token } },
      };
      tempVideo._id && addInSelectedPlaylistOnServer(addInPlaylistConfig);
    } else if (!e.target.checked) {
      const deleteVideoConfig = {
        url: `${PLAYLISTS_ENDPOINT}/${playlist.id}/video/${tempVideo._id}`,
        headers: { headers: { authorization: token } },
      };
      deleteVideoFromPlaylistOnServer(deleteVideoConfig);
    }
  };

  const closePlaylistModal = () => {
    batch(() => {
      dispatch(modalActions.showPlaylistModal(false));
      dispatch(videoActions.tempCacheVideo({}));
    });
  };

  const playlistAvailable = playlists.length > 0 ? true : false;

  const modalTitle = playlistAvailable
    ? "Save to"
    : showCreate
    ? "New Playlist"
    : "No Playlist available";

  const mapPlaylists = playlists?.map((playlist) => (
    <label key={playlist._id}>
      <input
        type="checkbox"
        name="check"
        checked={playlist?.videos.some((item) => item._id === tempVideo._id)}
        onChange={(e) => {
          playlistSelectHandler(playlist, e);
        }}
      />
      {playlist.title}
    </label>
  ));

  return (
    <>
      <div className="modal-backdrop" onClick={closePlaylistModal}></div>
      <div className="discard-modal-md playlist-modal-container">
        <div className="playlist-modal-header">
          <h2 className="title-md-wt-4">{modalTitle}</h2>
          <IconButton
            icon="fas fa-times"
            btnClassName="btn icon-btn-md"
            onClick={closePlaylistModal}
          />
        </div>
        {playlistAvailable && (
          <div className="available-playlists">{mapPlaylists}</div>
        )}
        {showCreate && (
          <form
            onSubmit={playlistSubmitHandler}
            className="create-new-playlist-section"
          >
            <div className="no-outline-text-input">
              <input
                type="text"
                name="title"
                maxLength="20"
                autoFocus
                value={newPlaylist.title}
                placeholder="Enter playlist name"
                onChange={playlistNameInputHandler}
              />
            </div>
            <textarea
              type="text"
              name="description"
              maxLength="50"
              value={newPlaylist.description}
              placeholder="Description (optional)"
              onChange={playlistNameInputHandler}
            />
            <div className="create-new-playlist-bottom-section">
              <Button
                type="submit"
                label="Create"
                btnClassName="btn primary-text-btn-lg"
                onClick={createPlaylistClickHandler}
              />
            </div>
          </form>
        )}
        {!showCreate && (
          <LabelIconButton
            label="Create Playlist"
            btnClassName="btn label-icon-outline-btn-md"
            onClick={newPlaylistClickHandler}
          />
        )}
      </div>
    </>
  );
};
