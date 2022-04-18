import { useState } from "react";
import { useAlert, useAuth, useAxiosCalls, useModal, useVideo } from "Context";
import { Button, IconButton, LabelIconButton } from "Components";
import "./PlaylistModal.css";

const initialPlaylist = {
  title: "",
  description: "",
};

export const PlaylistModal = () => {
  const {
    videoState: { playlists },
    tempVideo,
    setTempVideo,
  } = useVideo();
  const { auth } = useAuth();
  const { token } = auth;
  const {
    addNewPlayListOnServer,
    addInSelectedPlaylistOnServer,
    deleteVideoFromPlaylistOnServer,
  } = useAxiosCalls();
  const { alertDispatch } = useAlert();
  const { setShowPlaylistModal } = useModal();
  const [showCreate, setShowCreate] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState(initialPlaylist);

  const playlistConfig = {
    url: "/api/user/playlists",
    body: { playlist: { ...newPlaylist } },
    headers: { headers: { authorization: token } },
  };

  const onNewPlaylistClickHandler = () => {
    setShowCreate(true);
  };

  const onPlaylistNameInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewPlaylist((oldData) => {
      return { ...oldData, [name]: value };
    });
  };

  const onPlaylistSubmitHandler = (e) => {
    e.preventDefault();
  };

  const onCreatePlaylistClickHandler = () => {
    if (newPlaylist.title.trim() === "") {
      alertDispatch({
        type: "ALERT",
        payload: {
          alertText: "Playlist name cannot be blank",
          alertType: "alert-info",
          alertIcon: "fas fa-info alert-icon",
        },
      });
      setNewPlaylist(initialPlaylist);
    } else {
      addNewPlayListOnServer(playlistConfig);
      setNewPlaylist(initialPlaylist);
    }
  };

  const onPlaylistSelectHandler = (playlist, e) => {
    if (e.target.checked) {
      const addInPlaylistConfig = {
        url: "/api/user/playlists",
        body: { video: { ...tempVideo } },
        headers: { headers: { authorization: token } },
        playlist: playlist,
      };
      tempVideo._id && addInSelectedPlaylistOnServer(addInPlaylistConfig);
    } else if (!e.target.checked) {
      const deleteVideoConfig = {
        url: "/api/user/playlists",
        headers: { headers: { authorization: token } },
        videoId: tempVideo._id,
        playlistId: playlist._id,
      };
      deleteVideoFromPlaylistOnServer(deleteVideoConfig);
    }
  };

  const closePlaylistModal = () => {
    setShowPlaylistModal(false);
    setTempVideo({});
  };

  const playlistAvailable = playlists.length > 0 ? true : false;

  return (
    <>
      <div className="modal-backdrop" onClick={closePlaylistModal}></div>
      <div className="discard-modal-md playlist-modal-container">
        <div className="playlist-modal-header">
          <h2 className="title-md-wt-4">
            {playlistAvailable
              ? "Save to"
              : showCreate
              ? "New Playlist"
              : "No Playlist available"}
          </h2>
          <IconButton
            icon="fas fa-times"
            btnClassName="btn icon-btn-md"
            onClick={closePlaylistModal}
          />
        </div>
        {playlistAvailable && (
          <div className="available-playlists">
            {playlists?.map((playlist) => (
              <label key={playlist._id}>
                <input
                  type="checkbox"
                  name="check"
                  checked={playlist?.videos.some(
                    (item) => item._id === tempVideo._id
                  )}
                  onChange={(e) => {
                    onPlaylistSelectHandler(playlist, e);
                  }}
                />
                {playlist.title}
              </label>
            ))}
          </div>
        )}
        {showCreate && (
          <form
            onSubmit={onPlaylistSubmitHandler}
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
                onChange={onPlaylistNameInputHandler}
              />
            </div>
            <textarea
              type="text"
              name="description"
              maxLength="50"
              value={newPlaylist.description}
              placeholder="Description (optional)"
              onChange={onPlaylistNameInputHandler}
            />
            <div className="create-new-playlist-bottom-section">
              <Button
                type="submit"
                label="Create"
                btnClassName="btn primary-text-btn-lg"
                onClick={onCreatePlaylistClickHandler}
              />
            </div>
          </form>
        )}
        {!showCreate && (
          <LabelIconButton
            label="Create Playlist"
            btnClassName="btn label-icon-outline-btn-md"
            onClick={onNewPlaylistClickHandler}
          />
        )}
      </div>
    </>
  );
};
