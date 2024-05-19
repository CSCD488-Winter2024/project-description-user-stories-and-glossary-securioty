import { ReactNode, useState } from "react";

import accountData from "../scripts/accountData";
import lab from "../scripts/lab";

interface Props {
  children: ReactNode;
  labItem: lab;
}

const LabCard = ({ children, labItem }: Props) => {
  const [account, setAccount] = useState<accountData>(() => {
    const localValue = localStorage.getItem("ACCOUNT");
    if (localValue == null) {
      return [];
    } else {
      return JSON.parse(localValue);
    }
  });

  const handleLabClick = () => {
    localStorage.setItem("currentLab", JSON.stringify(labItem));
    console.log(labItem);
    window.location.href = "/takinglab";
  };

  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h5 className="card-title">{labItem.title}</h5>
          <p className="card-text">{children}</p>
          {account.token != "" ? (
            <button onClick={handleLabClick} className="btn btn-primary">
              Start Learning!
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Login to Start Learning!
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default LabCard;
