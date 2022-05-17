import { useModal, useVideo } from "Context";
import { NotLogged, LabelIconButton, PlaylistCard } from "Components";
import "./Playlists.css";
import { useSelector } from "react-redux";

export const Playlists = () => {
  const {
    videoState: { playlists },
  } = useVideo();

  // redux
  const {
    auth: { token },
  } = useSelector((authState) => authState);

  const { setShowLogin, setShowPlaylistModal } = useModal();

  const onCreatePlaylistClickHandler = () => {
    if (token) {
      setShowPlaylistModal(true);
    } else {
      setShowLogin(true);
    }
  };

  const playlistAvailable = playlists?.length > 0 ? true : false;

  const mapPlaylist = playlistAvailable ? (
    <div className="playlists-section">
      {playlists?.map((list) => (
        <div className="playlists-item" key={list._id}>
          <PlaylistCard list={list} />
          <p className="p-lg mg-point6-tb">{list.description}</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex-col-center">
      <h2 className="playlists-page-sub-title">No playlist available</h2>
    </div>
  );

  return (
    <div className="playlists-body">
      {token ? (
        <>
          <h1 className="playlists-page-title">
            Playlists <i className="fas fa-list mg-point6-lt"></i>
            <LabelIconButton
              label="Create Playlist"
              btnClassName="btn label-icon-outline-btn-md"
              icon="fas fa-plus"
              onClick={onCreatePlaylistClickHandler}
            />
          </h1>
          {mapPlaylist}
        </>
      ) : (
        <NotLogged message="Login to see your playlist" />
      )}
    </div>
  );
};
