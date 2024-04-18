import React, { useState } from "react";
import Card from "./LabCard";

const LabSet = () => {

  const initialLabArray = [
    { id: 1, title: 'Lab 1', description: 'Description for Lab 1' },
    { id: 2, title: 'Lab 2', description: 'Description for Lab 2' },
    { id: 3, title: 'Lab 3', description: 'Description for Lab 3' },
    { id: 4, title: 'Lab 4', description: 'Description for Lab 4' },
    { id: 5, title: 'Lab 5', description: 'Description for Lab 5' },
    { id: 6, title: 'Lab 6', description: 'Description for Lab 6' },
  ];
  

  const[labArray, setLabArray] = useState(initialLabArray)

  return (
    <>
      <div className="container text-center overflow-hidden px-4">
        <div className="row row-cols-3 gx-5 pt-5">
          
          {labArray.map(lab => {
            return(
            <div className="p-4" key={lab.id}>
            <Card title={lab.title}>
              {lab.description}
            </Card>
          </div>
          )
          })}
           
        </div>
      </div>
    </>
  );
};

export default LabSet;
