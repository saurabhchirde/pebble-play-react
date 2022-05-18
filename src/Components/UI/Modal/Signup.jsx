import { AlertToast, IconButton } from "Components";
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
  const { modalDispatch } = useModal();
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

  const signupFormSubmitHandler = (e) => {
    e.preventDefault();
    if (
      user.password.match(passwordValidate) &&
      user.email.match(emailValidate)
    ) {
      if (user.password === confirmPassword) {
        userSignup(signupConfig);
        modalDispatch({ type: "showSignup", payload: false });
        setUser(initialSignupState);
        setConfirmPassword("");
      } else {
        setConfirmPassword("");
        AlertToast("error", "Password mismatched");
      }
    } else {
      AlertToast(
        "error",
        "Minimum 8 char, 1 Uppercase, 1 Lowercase, 1 number & 1 Special Character required"
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
    modalDispatch({ type: "showLogin", payload: false });
    modalDispatch({ type: "showSignup", payload: false });
  };

  const onLoginClick = () => {
    modalDispatch({ type: "showLogin", payload: true });
    modalDispatch({ type: "showSignup", payload: false });
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          modalDispatch({ type: "showSignup", payload: false });
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
          onLoginClick={onLoginClick}
        />
      </div>
    </>
  );
};
