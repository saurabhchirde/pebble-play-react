export const InputTypeTwo = (props) => {
  return (
    <label>
      <div onClick={props.onClick} className={props.inputWrapper}>
        <div className={props.iconWrapper}>
          <i className={props.icon}></i>
          <input
            type={props.type}
            name={props.name}
            required={props.required}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            onChange={props.onChange}
            checked={props.checked}
          />
        </div>
        {props.label}
      </div>
    </label>
  );
};
