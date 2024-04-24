import React, { useEffect, useState } from "react";
import AnswerBox from "./AnswerBox";
import QuestionBox from "./QuestionBox";
//import ProgressBar from 'react-bootstrap/ProgressBar';

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
  const [progress, setProgress] = useState(0);
  
  return (
    <>
      <body>
        <h2>{labItem.title}</h2>
      </body>
      <div
        className="d-inline-block accordion w-50 px-2 py-2"
        id="accordionExample"
      >
        <div className="progress-container" style={{ width: '100%' }}>
          <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar custom-progress" style={{ width: `${progress}%` }}>{progress}%</div>
          </div>
        </div>
        {labItem.questions.map(question => (
          <QuestionBox labID={labItem.id} question={question} setProgress={setProgress} />
        ))}
      </div>

    </>
  );
};

export default ActiveLab;
