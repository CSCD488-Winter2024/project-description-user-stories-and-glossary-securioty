import React, { ReactInstance, ReactNode, useState } from "react";
import AnswerBox from "./AnswerBox";

interface Question {
  id: number;
  title: string;
  description: string;
}

interface Props {
  question: Question;
  labID: number;
}

const QuestionBox = ({ question, labID }: Props) => {
  return (
    <div className="accordion-item">
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
        aria-labelledby={`heading${question.id}`}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{question.description}</div>
        <AnswerBox labID={labID} questionID={question.id}></AnswerBox>
      </div>
    </div>
  );
};

export default QuestionBox;
