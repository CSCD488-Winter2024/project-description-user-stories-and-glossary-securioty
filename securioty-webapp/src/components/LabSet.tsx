import React, { useEffect, useState } from "react";
import Card from "./LabCard";
import axios from "axios";
import Lab from "../pages/Lab";
import lab from "../scripts/lab";

const LabSet = () => {
  //Hook that calls the showLabs method on component load
  const [labArray, setLabArray] = useState<lab[]>();
  useEffect(() => {
    showLabs();
  }, []);

  // Dummy data set for testing
  /*
  const Labs = [
    {
      id: 1,
      title: "Lab 1",
      description: "Description for Lab 1",
      questions: [
        {
          id: 1,
          title: "Question 1",
          description: "Description for Lab 1 Question 1",
          answer: "dogs",
        },
        {
          id: 2,
          title: "Question 2",
          description: "Description for Lab 1 Question 2",
          answer: "dogs",
        },
        {
          id: 3,
          title: "Question 3",
          description: "Description for Lab 1 Question 3",
          answer: "dogs",
        },
      ],
    },
    {
      id: 2,
      title: "Lab 2",
      description: "Description for Lab 2",
      questions: [
        {
          id: 1,
          title: "Question 1",
          description: "Description for Lab 2 Question 1",
          answer: "dogs",
        },
        {
          id: 2,
          title: "Question 2",
          description: "Description for Lab 2 Question 2",
          answer: "dogs",
        },
      ],
    },
  ];
  */

  //API call to get all labs within the db
  function showLabs() {
    axios
      .get("http://127.0.0.1:5000/labs/get_labs", {})
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          const calledLabs = response.data;
          setLabArray(calledLabs);
          console.log(labArray);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="container text-center overflow-hidden px-4">
        <div className="row row-cols-3 gx-5 pt-5">
          {labArray !== undefined &&
            labArray.map((lab) => {
              return (
                <div className="p-4" key={lab.id}>
                  <Card labItem={lab}>{lab.description}</Card>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default LabSet;
