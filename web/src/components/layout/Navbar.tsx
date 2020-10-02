import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "../../store";
import { AuthState } from "../../store/auth/types/Auth";
import { logout } from "../../store/auth/AuthActions";

interface Props {
  auth: AuthState;
  logout: () => void;
}

const Navbar: React.FC<Props> = ({
  auth: { isAuthenticated, user },
  logout,
}) => {
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    const current = window.location.href.split(":3000");
    setCurrentPath(current[current.length - 1]);
  }, []);

  const guestLinks = (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li
        className={
          currentPath === "/dashboard" ? "nav-item active" : "nav-item"
        }
      >
        <Link
          className="nav-link"
          to="/dashboard"
          onClick={() => setCurrentPath("/dashboard")}
        >
          Dashboard
        </Link>
      </li>
      <li className={currentPath === "/" ? "nav-item active" : "nav-item"}>
        <Link className="nav-link" to="/" onClick={() => setCurrentPath("/")}>
          Login
        </Link>
      </li>
      <li
        className={currentPath === "/register" ? "nav-item active" : "nav-item"}
      >
        <Link
          className="nav-link"
          to="/register"
          onClick={() => setCurrentPath("/register")}
        >
          Register
        </Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={navLinks}>
      <li style={{ margin: "0 8px" }}>
        <Link to="/files" className="nav-link">
          View All Files
        </Link>
      </li>
      <li style={{ margin: "0 8px" }}>
        <Link to="/upload-file" className="nav-link">
          Upload File
        </Link>
      </li>
      <li style={{ margin: "0 8px" }}>
        <h5>
          <span className="badge badge-secondary">
            {user ? user.username : null}
          </span>
        </h5>
      </li>
      <li style={{ margin: "0 8px" }}>
        <button className="btn btn-secondary" onClick={() => logout()}>
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
        style={{ outline: "none" }}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <Link className="navbar-brand" to="/" onClick={() => setCurrentPath("/")}>
        FILE-360
      </Link>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </nav>
  );
};

const navLinks = {
  width: "95%",
  // background: "red",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
