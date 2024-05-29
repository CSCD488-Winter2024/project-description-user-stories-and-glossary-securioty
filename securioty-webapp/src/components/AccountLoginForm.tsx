import { useState } from "react";
import accountData from "../scripts/accountData";
import axios from "axios";

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
  const [secretPhrase, setSecretPhrase] = useState<string>("");

  //Triggered when submit button is pressed within login form
  //Calls the register endpoint if registrationStatus is True, otherwise calls Login endpoint
  function login() {
    axios
      .post("/auth/login", {
        email: account.username,
        password: account.password,
      })
      .then(function (response) {
        if (response.status === 200) {
          onLoginChange(true);
          setLoginMessagePrompt("Successful login!");
          setAccountCredentials({
            ...account,
            token: response.data.access_token,
            firstname: response.data.first,
            lastname: response.data.last,
            role: response.data.role,
          });
          console.log(account);
          console.log(response.data.first);
          console.log(response.data.access_token);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoginMessagePrompt("Invalid Credentials, try again");
      });
  }

  function onClickSubmit() {
    if (
      registrationStatus &&
      account.role != "STUDENT" &&
      secretPhrase != "chickenpizza"
    ) {
      alert("Incorrect phrase");
      return;
    }
    if (registrationStatus) {
      axios
        .post("/auth/register", {
          email: account.username,
          password: account.password,
          first: account.firstname,
          last: account.lastname,
          role: account.role,
        })
        .then(function (response) {
          if (response.status === 201) {
            onLoginChange(true);
            setRegistrationStatus(false);
            login();
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoginMessagePrompt("Email already exists");
        });
    } else {
      login();
    }
  }

  function onClickRegistration() {
    setRegistrationStatus(!registrationStatus);
  }

  //Handling state change
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
  const handleSecretPhraseChange = (event: any) => {
    setSecretPhrase(event.target.value);
  };
  //End state change handling --------------------------------

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
                          <option value="STUDENT" onClick={handleRoleChange}>
                            Student
                          </option>
                          <option value="INSTRUCTOR">Instructor</option>
                          <option value="ADMIN">Admin</option>
                        </select>
                      </div>
                    </div>

                    {(account.role == "INSTRUCTOR" ||
                      account.role == "ADMIN") && (
                      <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">
                          Secret Phrase
                        </label>
                        <div className="col-sm-10">
                          <input
                            className="form-control"
                            value={secretPhrase}
                            onChange={handleSecretPhraseChange}
                          ></input>
                        </div>
                      </div>
                    )}
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
                onClick={loggedIn ? onClickLogoutSet : onClickSubmit}
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
