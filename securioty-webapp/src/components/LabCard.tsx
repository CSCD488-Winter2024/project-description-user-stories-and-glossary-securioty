import React, { ReactNode, useState } from "react";
import AccountPopup from "./AccountLoginForm";
import LoginButton from "./LoginButton";
import accountData from "../scripts/accountData";

interface LabItem {
  id: number;
  title: string;
  description: string;
  questions: { id: number; title: string; description: string }[];
}

interface Props {
  children: ReactNode;
  labItem: LabItem;
}




const LabCard = ({ children, labItem }: Props) => {

  //Commented out code so I can code without backend setup

  /*
  const [account, setAccount] = useState<accountData>({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    role: ''
  });
  */
  const [account, setAccount] = useState<accountData>(() => {
    const localValue = localStorage.getItem("ACCOUNT");
    if (localValue == null) {
      return [];
    } else {
      return JSON.parse(localValue);
    }
  });
  
  const handleLabClick = () => {

      localStorage.setItem('currentLab', JSON.stringify(labItem));
      window.location.href = '/lab';
  };

  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h5 className="card-title">{labItem.title}</h5>
          <p className="card-text">{children}</p>
          {Object.keys(account).length > 0 ? (
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
}

export default LabCard;
