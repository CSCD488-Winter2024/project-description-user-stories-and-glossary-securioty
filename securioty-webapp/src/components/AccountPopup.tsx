import React, { useState } from "react";
import Popup from "reactjs-popup";

const AccountPopup = () => {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();

  const handleUserChange = (event: any) => {
    setUser(event.target.value);
    console.log(user);
  };

  const handlePassChange = (event: any) => {
    setPass(event.target.value);
    console.log(pass);
  };

  // username, password

  function onClickLogin() {
    // axios.post(‘api-link/login’, {user, pass})
    console.log("username: " + user);
    console.log("password: " + pass);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Login
      </button>
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
                onClick={onClickLogin}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPopup;
