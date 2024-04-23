import React, { ReactNode } from "react";

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

  const handleLabClick = () => {
    localStorage.setItem('currentLab', JSON.stringify(labItem));
  };

  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h5 className="card-title">{labItem.title}</h5>
          <p className="card-text">{children}</p>
          <a href="/lab" onClick={() => handleLabClick()}className="btn btn-primary">
            Start Learning!
          </a>
        </div>
      </div>
    </>
  );
};

export default LabCard;
