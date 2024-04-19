import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

const LabCard = ({ children, title }: Props) => {
  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{children}</p>
          <a href="/lab" className="btn btn-primary">
            Start Learning!
          </a>
        </div>
      </div>
    </>
  );
};

export default LabCard;
