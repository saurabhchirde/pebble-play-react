import { useAxiosCalls, useModal } from "Context";
import { AlertToast, IconButton } from "Components";
import { useState } from "react";
import "./Login.css";
import { LoginInputForm } from "./LoginInputForm/LoginInputForm";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "Store/store";

export const Login = () => {

  const {
    userInput: { loginInput },
  } = useSelector((userState) => userState);
  const dispatch = useDispatch();

  const { modalDispatch } = useModal();
  const { userLogin } = useAxiosCalls();
  const [showPassword, setShowPassword] = useState(false);

  const loginConfig = {
    url: "/api/auth/login",
    data: loginInput,
  };

  const testLoginConfig = {
    url: "/api/auth/login",
    data: {
      email: "test@gmail.com",
      password: "test@123",
    },
  };

  const emailValidate =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onLoginClickFormHandler = () => {
    if (loginInput.email.trim() === "" || loginInput.password.trim() === "") {
      AlertToast("error", "Email or Password cannot be blank, try again");
    } else {
      if (loginInput.email.match(emailValidate)) {
        userLogin(loginConfig);
      } else {
        AlertToast("error", "Entered email is wrong, please try again");
      }
    }
  };

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    onLoginClickFormHandler();
  };

  const onModalInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    dispatch(userActions.loginInput({ ...loginInput, [name]: value }));
  };

  const onTestButtonClickFormHandler = () => {
    userLogin(testLoginConfig);
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          modalDispatch({ type: "showLogin", payload: false });
        }}
      ></div>
      <div className="signin-modal">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>{" "}
        <IconButton
          btnClassName="btn icon-btn-sm close-modal-btn"
          icon="fas fa-times"
          onClick={() => {
            modalDispatch({ type: "showLogin", payload: false });
            modalDispatch({ type: "showSignup", payload: false });
          }}
        />
        <LoginInputForm
          onLoginSubmitHandler={onLoginSubmitHandler}
          onModalInputHandler={onModalInputHandler}
          loginInput={loginInput}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onLoginClickFormHandler={onLoginClickFormHandler}
          onTestButtonClickFormHandler={onTestButtonClickFormHandler}
        />
      </div>
    </>
  );
};
