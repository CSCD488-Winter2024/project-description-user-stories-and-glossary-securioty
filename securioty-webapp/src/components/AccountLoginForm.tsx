import React, { useState } from "react";

interface Props {
  onLoginChange: (arg0: boolean) => void;
  loggedIn: boolean;
}

const AccountLoginForm = ({ onLoginChange, loggedIn }: Props) => {
  const [user, setUser] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [loginMessage, setLoginMessage] = useState<string>("");

  const handleUserChange = (event: any) => {
    setUser(event.target.value);
    console.log(user);
  };

  const handlePassChange = (event: any) => {
    setPass(event.target.value);
    console.log(pass);
  };

  function onClickLogin() {
    // axios.post(‘api-link/login’, {user, pass})
    console.log("username: " + user);
    console.log("password: " + pass);
    console.log(loggedIn);

    if (user === "billy@gmail.com") {
      onLoginChange(true);
      setLoginMessage("Successful login")
    }
    else {
      setLoginMessage("Invalid Credentials, try again")
    }
  }

  function onClickLogout() {
    onLoginChange(false);
    setLoginMessage("Logged out")
    setUser("")
    setPass("")
  }

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Login
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="bg-light">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      className="form-control"
                      value={user}
                      onChange={handleUserChange}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <input
                      type="password"
                      className="form-control"
                      value={pass}
                      onChange={handlePassChange}
                    ></input>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              {loginMessage != "" && <button
                className={"btn btn-dark"}
                data-bs-dismiss="modal"
              >
                {loginMessage}
              </button>}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loggedIn? onClickLogout : onClickLogin}
              >
                {loggedIn ? "Logout" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountLoginForm;
