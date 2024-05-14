import React, { useState } from "react";
import Card from "./LabCard";

const LabSet = () => {

  const Labs = [
    {
      id: 1,
      title: 'Lab 1',
      description: 'Description for Lab 1',
      questions: [
        { id: 1, title: 'Question 1', description: 'Description for Lab 1 Question 1' },
        { id: 2, title: 'Question 2', description: 'Description for Lab 1 Question 2' },
        { id: 3, title: 'Question 3', description: 'Description for Lab 1 Question 3' },

      ]
    },
    {
      id: 2,
      title: 'Lab 2',
      description: 'Description for Lab 2',
      questions: [
        { id: 1, title: 'Question 1', description: 'Description for Lab 2 Question 1' },
        { id: 2, title: 'Question 2', description: 'Description for Lab 2 Question 2' },
      ]
    },
  ];


  const [labArray, setLabArray] = useState(Labs)


  return (
    <>
      <div className="container text-center overflow-hidden px-4">
        <div className="row row-cols-3 gx-5 pt-5">

          {labArray.map(lab => {
            return (
              <div className="p-4" key={lab.id}>
                <Card labItem={lab}>
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
