import React from "react";
import AnswerBox from "./AnswerBox";
import QuestionBox from "./QuestionBox";

interface LabItem {
  id: number;
  title: string;
  description: string;
  questions: { id: number; title: string; description: string }[];
}

interface Props {
  labItem: LabItem;
}

const ActiveLab = ({ labItem }: Props) => {


  return (
    <>
      <body>
        <h1>{labItem.title}</h1>
      </body>
      <div
          className="d-inline-block accordion w-50 px-2 py-2"
          id="accordionExample"
        >

      {labItem.questions.map(question => (
          <QuestionBox labID = {labItem.id} question={question} />
        ))}
      </div>
       
    </>
  );
};

export default ActiveLab;
