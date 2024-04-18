import React from "react";
import AnswerBox from "./AnswerBox";

const ActiveLab = () => {

  const labQuestions = [
    { id: 1, title: 'Question 1', description: 'Description for Question 1' },
    { id: 2, title: 'Question 2', description: 'Description for Question 2' },
    { id: 3, title: 'Question 3', description: 'Description for Question 3' },
    { id: 4, title: 'Question 4', description: 'Description for Question 4' },
  ];

  return (
    <>
      <div
        className="d-inline-block accordion w-50 px-2 py-2"
        id="accordionExample"
      >
       {labQuestions.map(question => (
  <div className="accordion-item" key={question.id}>
    <h2 className="accordion-header">
      <button
        className="accordion-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#collapse${question.id}`} // Use question.id for unique target
        aria-expanded="false"
        aria-controls={`collapse${question.id}`} // Use question.id for unique control
      >
        {question.title}
      </button>
    </h2>
    <div
      id={`collapse${question.id}`} // Use question.id for unique collapse ID
      className="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div className="accordion-body">
        {question.description}
      </div>
      <AnswerBox />
    </div>
  </div>
))}

      </div>
    </>
  );
};

export default ActiveLab;
