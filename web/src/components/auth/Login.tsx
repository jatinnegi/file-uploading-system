import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/auth/AuthActions";
import { AppState } from "../../store";

interface Props {
  login: (formData: LoginForm) => void;
  isAuthenticated: boolean | null;
}

const Login: React.FC<Props> = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState<LoginForm>({
    usernameOrEmail: "",
    password: "",
  });

  const { usernameOrEmail, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="bold">Sign In</h1>
      <div className="form-group">
        <label htmlFor="usernameOrEmail">Username Or Email</label>
        <input
          type="text"
          className="form-control"
          id="usernameOrEmail"
          value={usernameOrEmail}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary">Sign In</button>
      <div className="mt-3">
        <Link to="/register">Don't have an account?</Link>
      </div>
    </form>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
