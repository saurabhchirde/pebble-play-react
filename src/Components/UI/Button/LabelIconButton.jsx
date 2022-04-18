export const LabelIconButton = (props) => {
  return (
    <button className={props.btnClassName} onClick={props.onClick}>
      <i className={props.icon}></i>
      {props.label}
    </button>
  );
};
