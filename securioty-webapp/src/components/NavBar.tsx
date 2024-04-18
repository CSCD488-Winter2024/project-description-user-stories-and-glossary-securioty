import React, { useState } from "react";
import AccountPopup from "./AccountLoginForm";
import LoginButton from "./LoginButton";
import accountData from "../scripts/accountData";

interface Props {
  onLoginChange: (arg0: boolean) => void;
  loggedIn: boolean;
}

const NavBar = ({ onLoginChange, loggedIn }: Props) => {
  const [account, setAccount] = useState<accountData>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    role: "",
  });
  const [loginMessage, setLoginMessage] = useState<string>("");

  function setLoggedInState(loggedIn: boolean) {
    onLoginChange(loggedIn);
  }

  function setAccountCredentials(account: accountData) {
    setAccount(account);
  }

  function setLoginMessagePrompt(message: string) {
    setLoginMessage(message);
  }

  function onClickLogout() {
    setLoggedInState(false);
    setAccountCredentials({ ...account, username: "", password: "" });
    setLoginMessage("");
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
              {loggedIn && (
                <li className="nav-item ml-auto">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
              )}
              <LoginButton loggedIn={loggedIn} />
              <AccountPopup
                onClickLogoutSet={onClickLogout}
                setAccountCredentials={setAccountCredentials}
                account={account}
                loggedIn={loggedIn}
                onLoginChange={setLoggedInState}
                setLoginMessagePrompt={setLoginMessagePrompt}
                loginMessage={loginMessage}
              />
              {loggedIn && (
                <button className="btn btn-primary" onClick={onClickLogout}>
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