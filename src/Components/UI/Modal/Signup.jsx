import { IconButton } from "Components";
import "./Signup.css";
import { useAxiosCalls, useModal } from "Context";
import { useState } from "react";
import { SignupInputForm } from "./SignupInputForm/SignupInputForm";

const initialSignupState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const Signup = () => {
  const { setShowLogin, setShowSignup, setAlertText, setShowAlert } =
    useModal();
  const [user, setUser] = useState(initialSignupState);
  const { userSignup } = useAxiosCalls();
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupConfig = {
    url: "/api/auth/signup",
    data: user,
  };

  const emailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const passwordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

  const onSignupFormSubmitHandler = (e) => {
    e.preventDefault();
    if (
      user.password.match(passwordValidate) &&
      user.email.match(emailValidate)
    ) {
      if (user.password === confirmPassword) {
        userSignup(signupConfig);
        setShowSignup(false);
        setAlertText(
          "Account created Successfully, please login in to continue"
        );
        setUser(initialSignupState);
        setConfirmPassword("");
      } else {
        setConfirmPassword("");
        setAlertText("Password mismatched");
      }
    } else {
      setAlertText(
        "Minimum 8 char, 1 Uppercase, 1 Lowercase, 1 number & 1 Special Character required"
      );
    }
    setShowAlert(true);
  };

  const onInputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((oldData) => {
      return {
        ...oldData,
        [name]: value,
      };
    });
  };

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onCloseClick = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const onLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          setShowSignup(false);
        }}
      ></div>
      <div className="signup-modal-one">
        <h1>Sign Up</h1>
        <p>Please provide your details.</p>
        <IconButton
          btnClassName="btn icon-btn-sm close-modal-btn"
          icon="fas fa-times"
          onClick={onCloseClick}
        />
        <SignupInputForm
          onSignupFormSubmitHandler={onSignupFormSubmitHandler}
          onInputChangeHandler={onInputChangeHandler}
          user={user}
          confirmPassword={confirmPassword}
          onConfirmPasswordHandler={onConfirmPasswordHandler}
          onLoginClick={onLoginClick}
        />
      </div>
    </>
  );
};
