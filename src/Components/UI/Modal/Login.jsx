import { useAxiosCalls, useModal, useTheme } from "Context";
import { AlertToast, IconButton } from "Components";
import { useState } from "react";
import "./Login.css";
import { LoginInputForm } from "./LoginInputForm/LoginInputForm";
import { useDispatch, useSelector } from "react-redux";
import { modalActions, userActions } from "Store/store";

export const Login = () => {
  const {
    userInput: { loginInput },
  } = useSelector((userState) => userState);
  const dispatch = useDispatch();

  const { userLogin } = useAxiosCalls();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

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

  const loginClickFormHandler = () => {
    if (loginInput.email.trim() === "" || loginInput.password.trim() === "") {
      AlertToast(
        "error",
        "Email or Password cannot be blank, try again",
        theme
      );
    } else {
      if (loginInput.email.match(emailValidate)) {
        userLogin(loginConfig);
      } else {
        AlertToast("error", "Entered email is wrong, please try again", theme);
      }
    }
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    loginClickFormHandler();
  };

  const modalInputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    dispatch(userActions.loginInput({ ...loginInput, [name]: value }));
  };

  const testButtonClickFormHandler = () => {
    userLogin(testLoginConfig);
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          dispatch(modalActions.showLogin(false));
        }}
      ></div>
      <div className="signin-modal">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>{" "}
        <IconButton
          btnClassName="btn icon-btn-sm close-modal-btn"
          icon="fas fa-times"
          onClick={() => {
            dispatch(modalActions.showLogin(false));
            dispatch(modalActions.showSignup(false));
          }}
        />
        <LoginInputForm
          loginSubmitHandler={loginSubmitHandler}
          modalInputHandler={modalInputHandler}
          loginInput={loginInput}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loginClickFormHandler={loginClickFormHandler}
          testButtonClickFormHandler={testButtonClickFormHandler}
        />
      </div>
    </>
  );
};
