import { InputTypeOne, Button } from "Components";

export const SignupInputForm = ({
  signupFormSubmitHandler,
  inputChangeHandler,
  user,
  confirmPassword,
  confirmPasswordHandler,
  loginClickHandler,
}) => {
  return (
    <form onSubmit={signupFormSubmitHandler}>
      <InputTypeOne
        label="First Name"
        type="text"
        name="firstName"
        autoComplete="on"
        placeholder="Enter your first name"
        inputWrapper="outline-text-input"
        onChange={inputChangeHandler}
        value={user.firstName}
      />
      <InputTypeOne
        label="Last Name"
        type="text"
        name="lastName"
        autoComplete="on"
        placeholder="Enter your last name"
        inputWrapper="outline-text-input"
        onChange={inputChangeHandler}
        value={user.lastName}
      />
      <InputTypeOne
        label="Email *"
        type="email"
        name="email"
        required="required"
        autoComplete="email"
        placeholder="Enter your email *"
        inputWrapper="outline-email-input"
        onChange={inputChangeHandler}
        value={user.email}
      />
      <InputTypeOne
        label="Password *"
        type="password"
        name="password"
        required="required"
        autoComplete="current-password"
        placeholder="Enter your password"
        inputWrapper="outline-password-input"
        onChange={inputChangeHandler}
        value={user.password}
      />
      <InputTypeOne
        label="Confirm Password *"
        type="text"
        name="confirm-password"
        required="required"
        placeholder="Confirm password"
        inputWrapper="outline-password-input"
        onChange={confirmPasswordHandler}
        value={confirmPassword}
      />
      <p>
        By continuing you agree to our Terms of Service and
        <span> Privacy Policy</span>
      </p>
      <Button
        btnWrapper="signup-btn"
        type="submit"
        btnClassName="btn primary-btn-md"
        label=" Sign Up"
      />
      <div className="existing-account-btn" onClick={loginClickHandler}>
        <h2>
          already have an account
          <span>Login</span>
          <i className="fas fa-angle-right"></i>
        </h2>
      </div>
    </form>
  );
};
