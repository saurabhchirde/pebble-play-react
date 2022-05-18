import { NavbarLoginButton, NotLogged } from "Components";
import "./User.css";
import { useSelector } from "react-redux";
export const User = () => {
  const {
    auth: { token, user },
  } = useSelector((authState) => authState);

  const { firstName, lastName, email, dp } = user;

  return (
    <div className="user-page-body">
      {token ? (
        <div className="user-details-card">
          <div className="flex-row-center">
            <div className="avatar text-avatar-sm-round">{dp}</div>
            <div className="user-details">
              <h1 className="user-details-title">
                {firstName} {lastName}
              </h1>
              <p>{email}</p>
            </div>
            <NavbarLoginButton
              label="log out"
              btnClassName="btn secondary-outline-btn-md"
            />
          </div>
        </div>
      ) : (
        <NotLogged message="You are not logged in" />
      )}
    </div>
  );
};
