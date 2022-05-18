import { InputTypeOne, InputTypePassword, Button } from "Components";
import { useModal } from "Context";
export const LoginInputForm = ({
  loginSubmitHandler,
  modalInputHandler,
  loginInput,
  showPassword,
  setShowPassword,
  testButtonClickFormHandler,
}) => {
  const { modalDispatch } = useModal();
  return (
    <form onSubmit={loginSubmitHandler}>
      <InputTypeOne
        type="email"
        name="email"
        required="required"
        placeholder="Enter your email *"
        iconWrapper="input-icon"
        icon="far fa-envelope"
        inputWrapper="outline-email-input"
        onChange={modalInputHandler}
        value={loginInput.email}
      />
      <InputTypePassword
        type={showPassword ? "text" : "password"}
        name="password"
        required="required"
        placeholder="Enter your password *"
        iconWrapper="input-icon"
        icon="fas fa-key"
        eyeIcon={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
        inputWrapper="outline-password-input password-input-field"
        onChange={modalInputHandler}
        onEyeClick={() => {
          setShowPassword((preData) => !preData);
        }}
        value={loginInput.password}
      />
      <Button
        btnWrapper="signin-btn"
        type="submit"
        label="Sign In"
        btnClassName="btn primary-btn-md"
        onClick={loginSubmitHandler}
      />
      <Button
        btnWrapper="signin-btn"
        label="Test User"
        btnClassName="btn primary-outline-btn-md"
        onClick={testButtonClickFormHandler}
      />
      <p>
        Forgot your password? <span>Reset Password</span>
      </p>
      <button
        className="btn primary-text-btn-sm create-account-btn"
        onClick={() => {
          modalDispatch({ type: "showLogin", payload: false });
          modalDispatch({ type: "showSignup", payload: true });
        }}
      >
        <h2>
          Create New Account <i className="fas fa-angle-right"></i>
        </h2>
      </button>
    </form>
  );
};
