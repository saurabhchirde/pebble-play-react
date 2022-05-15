export const FloatingButton = (props) => {
  return (
    <a href={props.href} className="float-up-btn">
      <button className="btn floating-btn-md float-btn-dark-bg">
        <i className={props.icon}></i>
      </button>
    </a>
  );
};
