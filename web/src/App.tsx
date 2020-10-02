import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./store/auth/AuthActions";
import setAuthToken from "./utils/setAuthToken";
import { AppState } from "./store";

// Components
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/routes";
import Alerts from "./components/layout/Alerts";

interface Props {
  loadUser: () => void;
  token: string | null;
}

const App: React.FC<Props> = ({ loadUser, token }) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser();
  }, [token, loadUser]);

  return (
    <Router>
      <Alerts />
      <Navbar />
      <Routes />
    </Router>
  );
};

const mapStateToProps = (state: AppState) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { loadUser })(App);
