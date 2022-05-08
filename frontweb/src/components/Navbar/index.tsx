import "bootstrap/js/src/collapse.js";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "AuthContext";

import "./styles.css";
import { isAuthenticated } from "utils/auth";
import { removeAuthData } from "utils/storage";
import history from "utils/history";

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true
      })
    } else {
      setAuthContextData({
        authenticated: false
      })
    }
  }, [setAuthContextData])

  const handleLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({authenticated:false});
    history.replace("/");
  }

  return (
    <nav className="navbar navbar-nav navbar-light bg-primary navbar-container">
        <a className="nav-brand" href="#">
          MovieFlix
        </a>
        {authContextData.authenticated && (
          <button className="btn-logout btn-primary" onClick={handleLogoutClick}>
            <h6>Sair</h6>
          </button>
        )}
    </nav>
  );
};

export default Navbar;
