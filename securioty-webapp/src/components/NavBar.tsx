import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import accountData from "../scripts/accountData";
import AccountLoginForm from "./AccountLoginForm";

interface Props {
  onLoginChange: (arg0: boolean) => void;
  loggedIn: boolean;
}

const NavBar = ({ onLoginChange, loggedIn }: Props) => {
  const [account, setAccount] = useState<accountData>(() => {
    const localValue = localStorage.getItem("ACCOUNT");
    if (localValue == null) {
      return [];
    } else {
      return JSON.parse(localValue);
    }
  });
  const [loginMessage, setLoginMessage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("ACCOUNT", JSON.stringify(account));
  }, [account]);

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
    var emptyAccount: accountData = {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "",
      token: "",
    };
    setAccount(emptyAccount);
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
              {((loggedIn && account.role == "INSTRUCTOR") ||
                account.role == "ADMIN") && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle bg-danger btn mx-1"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Instructor tools
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        aria-current="page"
                        href="/creatinglab"
                      >
                        Create Lab
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        aria-current="page"
                        href="/instructor"
                      >
                        Grading
                      </a>
                    </li>
                  </ul>
                </li>
              )}

              {loggedIn && (
                <li className="nav-item ml-auto">
                  <a
                    className="nav-link active btn bg-primary text-white mx-1"
                    aria-current="page"
                    href="/profile"
                  >
                    Profile
                  </a>
                </li>
              )}

              <LoginButton loggedIn={loggedIn} />
              <AccountLoginForm
                onClickLogoutSet={onClickLogout}
                setAccountCredentials={setAccountCredentials}
                account={account}
                loggedIn={loggedIn}
                onLoginChange={setLoggedInState}
                setLoginMessagePrompt={setLoginMessagePrompt}
                loginMessage={loginMessage}
              />
              {loggedIn && (
                <li className="nav-item ml-auto">
                  <a
                    className="nav-link active btn bg-primary text-white mx-1"
                    aria-current="page"
                    href="/home"
                    onClick={onClickLogout}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
