import { useAuth, useModal, useVideo } from "../../Context";
import { NotLogged } from "../../Components/NotLogged/NotLogged";
import "./AllPlaylists.css";
import LabelIconButton from "../../Components/UI/Button/LabelIconButton";
import { PlaylistCard } from "../../Components/Cards/PlaylistCard";

export const AllPlaylists = () => {
  const {
    videoState: { playlists },
  } = useVideo();
  const {
    auth: { token },
  } = useAuth();
  const { setShowLogin, setShowPlaylistModal } = useModal();

  const onCreatePlaylistClickHandler = () => {
    if (token) {
      setShowPlaylistModal(true);
    } else {
      setShowLogin(true);
    }
  };

  const playlistAvailable = playlists.length > 0 ? true : false;

  return (
    <div className="playlist-body">
      {token ? (
        <>
          <h1 className="playlist-page-title">
            Playlists <i className="fas fa-list mg-point6-lt"></i>
          </h1>
          {playlistAvailable ? (
            <div className="playlist-section">
              {playlists.map((list) => (
                <div className="playlist-item" key={list._id}>
                  <PlaylistCard list={list} />
                  <h1 className="title-lg-wt-bold mg-point6-tb">
                    {list.title}
                  </h1>
                  <p className="p-lg mg-point6-tb">{list.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-col-center">
              <h2 className="playlist-page-sub-title">No playlist available</h2>
              <LabelIconButton
                label="Create Playlist"
                btnClassName="btn label-icon-outline-btn-md mg-1-tb"
                icon="fas fa-plus"
                onClick={onCreatePlaylistClickHandler}
              />
            </div>
          )}
        </>
      ) : (
        <NotLogged message="Login to see your playlist" />
      )}
    </div>
  );
};
