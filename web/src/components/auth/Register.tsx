import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { AppState } from "../../store";
import { register } from "../../store/auth/AuthActions";

interface Props {
  isAuthenticated: boolean | null;
  register: (formData: RegistrationForm) => void;
}

const Register: React.FC<Props> = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState<RegistrationForm>({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const { email, username, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className="form mt-3" onSubmit={handleSubmit}>
      <h1 className="bold">Register</h1>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
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
      <div className="form-group">
        <label htmlFor="password2">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          id="password2"
          value={password2}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary">Register</button>
      <div className="mt-3">
        <Link to="/">Have an account?</Link>
      </div>
    </form>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
