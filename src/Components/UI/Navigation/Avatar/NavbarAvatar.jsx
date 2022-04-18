export const NavbarAvatar = (props) => {
  return (
    <>
      <div className={props.avatarWrapper} onClick={props.onClick}>
        <div className={props.avatarClassName}>
          {props.src}
          <img
            loading="lazy"
            src={props.src}
            alt="avatar"
            className={props.imgDisplay}
          />
        </div>
        <span className={props.statusBadge}></span>
      </div>
    </>
  );
};
