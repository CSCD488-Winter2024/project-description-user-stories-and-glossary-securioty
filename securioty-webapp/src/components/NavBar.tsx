import React, { useState } from "react";
import AccountPopup from "./AccountLoginForm";
import LoginButton from "./LoginButton";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  function setLoggedInState(loggedIn: boolean) {
    setLoggedIn(loggedIn);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand ms-3" href="/home">
            SecurIoTy
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item ml-auto">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/profile"
                >
                  Profile
                </a>
              </li>
              <LoginButton loggedIn={loggedIn} />
              <AccountPopup
                loggedIn={loggedIn}
                onLoginChange={setLoggedInState}
              />
              {loggedIn && (
                <button
                  className="btn btn-primary"
                  onClick={() => setLoggedInState(false)}
                >
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
