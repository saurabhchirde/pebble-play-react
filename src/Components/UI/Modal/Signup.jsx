import { AlertToast, IconButton } from "Components";
import "./Signup.css";
import { useAxiosCalls, useTheme } from "Context";
import { useState } from "react";
import { SignupInputForm } from "./SignupInputForm/SignupInputForm";
import { modalActions } from "Store/store";
import { useDispatch } from "react-redux";

const initialSignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const Signup = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(initialSignupState);
  const { userSignup } = useAxiosCalls();
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const signupConfig = {
    url: "/api/auth/signup",
    data: user,
  };

  const emailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const signupFormSubmitHandler = (e) => {
    e.preventDefault();
    if (
      user.password.match(passwordValidate) &&
      user.email.match(emailValidate)
    ) {
      if (user.password === confirmPassword) {
        userSignup(signupConfig);
        dispatch(modalActions.showSignup(false));
        setUser(initialSignupState);
        setConfirmPassword("");
      } else {
        setConfirmPassword("");
        AlertToast("error", "Password mismatched", theme);
      }
    } else {
      AlertToast(
        "error",
        "Minimum 8 char, 1 Uppercase, 1 Lowercase, 1 number & 1 Special Character required",
        theme
      );
    }
  };

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const closeClickHandler = () => {
    dispatch(modalActions.showLogin(false));
    dispatch(modalActions.showSignup(false));
  };

  const loginClickHandler = () => {
    dispatch(modalActions.showLogin(true));
    dispatch(modalActions.showSignup(false));
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          dispatch(modalActions.showSignup(false));
        }}
      ></div>
      <div className="signup-modal-one">
        <h1>Sign Up</h1>
        <p>Please provide your details.</p>
        <IconButton
          btnClassName="btn icon-btn-sm close-modal-btn"
          icon="fas fa-times"
          onClick={closeClickHandler}
        />
        <SignupInputForm
          signupFormSubmitHandler={signupFormSubmitHandler}
          inputChangeHandler={inputChangeHandler}
          user={user}
          confirmPassword={confirmPassword}
          confirmPasswordHandler={confirmPasswordHandler}
          loginClickHandler={loginClickHandler}
        />
      </div>
    </>
  );
};
