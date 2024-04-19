import React from "react";

interface Props {
  loggedIn: boolean;
}

const LoginButton = ({ loggedIn }: Props) => {
  return (
    <>
      {!loggedIn && (
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          {loggedIn ? "Logout" : "Login/Register"}
        </button>
      )}
    </>
  );
};

export default LoginButton;
