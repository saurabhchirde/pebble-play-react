export const BadgeIconButton = (props) => {
  return (
    <div className={props.btnWrapper}>
      <button onClick={props.onClick} className={props.btnClassName}>
        <i className={props.icon}>
          <span className={props.badgeClassName}>{props.badgeValue}</span>
        </i>{" "}
        {props.label}
      </button>
    </div>
  );
};
