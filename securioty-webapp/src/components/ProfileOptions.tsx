import React, { ReactNode } from "react";

const ProfileOptions = () => {
  return (
    <div
      className="btn-group-vertical container d-flex mt-5 pt-5"
      role="group"
      aria-label="Vertical button group"
    >
      <button
        type="button"
        className="btn btn-primary d-flex justify-content-center align-items-center mt-5 pt-3 pb-3"
      >
        Change Password
      </button>
      <button
        type="button"
        className="btn btn-primary d-flex justify-content-center align-items-center mt-5 pt-3 pb-3"
      >
        Change Email
      </button>
      <button
        type="button"
        className="btn btn-primary d-flex justify-content-center align-items-center mt-5 pt-3 pb-3"
      >
        Reset Progress/ Delete Account
      </button>
    </div>
  );
};

export default ProfileOptions;
