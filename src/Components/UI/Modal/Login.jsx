import { useAuth, useAxiosCalls, useModal } from "../../../Context";
import Button from "../Button/Button";
import InputTypeOne from "../Input/InputTypeOne";
import "./Login.css";

const Login = () => {
  const { loginInput, setLoginInput } = useAuth();

  const { setShowLogin, setShowSignup, setAlertText, setShowAlert } =
    useModal();
  const { userLogin } = useAxiosCalls();

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
        <p>Enter your credentials to access your account</p>
        <a
          onClick={() => {
            setShowLogin(false);
            setShowSignup(false);
          }}
        >
          <i className="fas fa-times"></i>
        </a>
        <form onSubmit={onLoginSubmitHandler}>
          <InputTypeOne
            type="email"
            name="email"
            required="required"
            placeholder="Enter your email *"
            iconWrapper="input-icon"
            icon="far fa-envelope"
            inputWrapper="outline-email-input"
            onChange={onModalInputHandler}
            value={loginInput.email}
          />
          <InputTypeOne
            type="password"
            name="password"
            required="required"
            placeholder="Enter your password *"
            iconWrapper="input-icon"
            icon="fas fa-key"
            inputWrapper="outline-password-input"
            onChange={onModalInputHandler}
            value={loginInput.password}
          />
          <Button
            btnWrapper="signin-btn"
            type="submit"
            label="Sign In"
            btnClassName="btn primary-btn-md"
            onClick={onLoginClickFormHandler}
          />
          <Button
            btnWrapper="signin-btn"
            type="submit"
            label="Test User"
            btnClassName="btn primary-outline-btn-md"
            onClick={onTestButtonClickFormHandler}
          />
          <p>
            Forgot your password? <span>Reset Password</span>
          </p>
          <button
            className="btn primary-text-btn-sm create-account-btn"
            onClick={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          >
            <h2>
              Create New Account <i className="fas fa-angle-right"></i>
            </h2>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
