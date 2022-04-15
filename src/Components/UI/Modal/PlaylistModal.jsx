import { useState } from "react";
import { useAuth, useAxiosCalls, useModal, useVideo } from "../../../Context";
import Button from "../Button/Button";
import IconButton from "../Button/IconButton";
import LabelIconButton from "../Button/LabelIconButton";
import "./PlaylistModal.css";

const initialPlaylist = {
  title: "",
  description: "",
};

export const PlaylistModal = () => {
  const {
    videoState: { playlists },
  } = useVideo();
  const {
    auth: { token },
  } = useAuth();
  const { addNewPlayListOnServer } = useAxiosCalls();
  const { setAlertText, setShowAlert, setShowPlaylistModal } = useModal();
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

  const onCreatePlaylistClickHandler = () => {
    if (
      newPlaylist.title.trim() === "" ||
      newPlaylist.description.trim() === ""
    ) {
      setAlertText("Input cannot be blank");
      setShowAlert(true);
    } else {
      addNewPlayListOnServer(playlistConfig);
      setNewPlaylist(initialPlaylist);
    }
  };

  const closePlaylistModal = () => {
    setShowPlaylistModal(false);
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
            {playlists.map((playlist) => (
              <label key={playlist._id}>
                <input type="checkbox" name="check" />
                {playlist.title}
              </label>
            ))}
          </div>
        )}
        {showCreate && (
          <div className="create-new-playlist-section ">
            <div className="no-outline-text-input">
              <input
                type="text"
                name="title"
                value={newPlaylist.title}
                placeholder="Enter playlist name"
                onChange={onPlaylistNameInputHandler}
              />
            </div>
            <textarea
              type="text"
              name="description"
              value={newPlaylist.description}
              placeholder="Enter description"
              onChange={onPlaylistNameInputHandler}
            />
            <div className="create-new-playlist-bottom-section">
              <Button
                label="Create"
                btnClassName="btn primary-text-btn-lg"
                onClick={onCreatePlaylistClickHandler}
              />
            </div>
          </div>
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
