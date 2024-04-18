import React, { useState } from "react";
import accountData from "../scripts/accountData";

interface Props {
  onLoginChange: (arg0: boolean) => void;
  loggedIn: boolean;
  account: accountData;
  setAccountCredentials: (arg0: accountData) => void;
  onClickLogoutSet: () => void;
  loginMessage: string;
  setLoginMessagePrompt: (arg0: string) => void;
}

const AccountLoginForm = ({
  onLoginChange,
  loggedIn,
  account,
  setAccountCredentials,
  onClickLogoutSet,
  setLoginMessagePrompt,
  loginMessage,
}: Props) => {
  const [registrationStatus, setRegistrationStatus] = useState<boolean>(false);

  function onClickSubmit() {
    if (registrationStatus) {
      // axios.post('api-link/register'), {user, pass, first, last, role})
      if (account.username != "exists") {
        setLoginMessagePrompt("Account Created!");
        onLoginChange(true);
        setRegistrationStatus(false);
      } else {
        setLoginMessagePrompt("Email already exists");
      }
    } else {
      // axios.post(‘api-link/login’, {user, pass})
      if (account.username === "exists") {
        onLoginChange(true);
        setLoginMessagePrompt("Successful login");
      } else {
        setLoginMessagePrompt("Invalid Credentials, try again");
      }
    }
  }

  function onClickLogout() {
    setLoginMessagePrompt("");
    onClickLogoutSet();
  }

  function onClickRegistration() {
    setRegistrationStatus(!registrationStatus);
  }

  const handleUserChange = (event: any) => {
    setAccountCredentials({ ...account, username: event.target.value });
  };

  const handlePassChange = (event: any) => {
    setAccountCredentials({ ...account, password: event.target.value });
  };
  const handleFirstChange = (event: any) => {
    setAccountCredentials({ ...account, firstname: event.target.value });
  };
  const handleLastChange = (event: any) => {
    setAccountCredentials({ ...account, lastname: event.target.value });
  };
  const handleRoleChange = (event: any) => {
    setAccountCredentials({ ...account, role: event.target.value });
  };

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
                {registrationStatus ? "Create Account" : "Login"}
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
                      value={account.username}
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
                      value={account.password}
                      onChange={handlePassChange}
                    ></input>
                  </div>
                </div>
                {registrationStatus && (
                  <div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        First Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          value={account.firstname}
                          onChange={handleFirstChange}
                        ></input>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label">
                        Last Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          value={account.lastname}
                          onChange={handleLastChange}
                        ></input>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={handleRoleChange}
                        >
                          <option selected>Role</option>
                          <option value="Student" onClick={handleRoleChange}>
                            Student
                          </option>
                          <option value="Instructor">Instructor</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                {loginMessage != "" && <p>{loginMessage}</p>}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {!loggedIn && (
                <button
                  className={"btn btn-dark"}
                  onClick={onClickRegistration}
                >
                  {registrationStatus ? "Login" : "Create Account"}
                </button>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                onClick={loggedIn ? onClickLogout : onClickSubmit}
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