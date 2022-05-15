export const IconButton = (props) => {
  return (
    <button onClick={props.onClick} className={props.btnClassName}>
      <i className={props.icon}></i>
    </button>
  );
};
