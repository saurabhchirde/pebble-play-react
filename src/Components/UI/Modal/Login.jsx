import { useAuth, useAxiosCalls, useModal } from "Context";
import { IconButton } from "Components";
import { useState } from "react";
import "./Login.css";
import { LoginInputForm } from "./LoginInputForm/LoginInputForm";

export const Login = () => {
  const { loginInput, setLoginInput } = useAuth();

  const { setShowLogin, setShowSignup, setAlertText, setShowAlert } =
    useModal();
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
      setAlertText("Input cannot be blank, try again");
      setShowAlert(true);
    } else {
      if (loginInput.email.match(emailValidate)) {
        userLogin(loginConfig);
      } else {
        setAlertText("Entered email is wrong, please try again");
        setShowAlert(true);
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
    setLoginInput((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const onTestButtonClickFormHandler = () => {
    userLogin(testLoginConfig);
  };

  return (
    <>
      <div
        className="modal-backdrop"
        onClick={() => {
          setShowLogin(false);
        }}
      ></div>
      <div className="signin-modal">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>{" "}
        <IconButton
          btnClassName="btn icon-btn-sm close-modal-btn"
          icon="fas fa-times"
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
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
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />
      </div>
    </>
  );
};
