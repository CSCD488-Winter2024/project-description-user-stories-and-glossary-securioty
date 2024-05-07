import React, { useEffect, useState } from "react";
import AnswerBox from "./AnswerBox";
import QuestionBox from "./QuestionBox";
import axios from "axios";
import accountData from "../scripts/accountData";
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

  useEffect(() => {
    getProgress();
  }, []);

  const [account, setAccount] = useState<accountData>(() => {
    const localValue = localStorage.getItem("ACCOUNT");
    if (localValue == null) {
      return [];
    } else {
      return JSON.parse(localValue);
    }
  });
  //ActiveLab.tsx , runs on first render of lab page
  function getProgress() {
    return axios
      .post("http://127.0.0.1:5000/Get_Progress", {
        LabID: labItem.id,
        UserID: account
      })
      .then(function (response) {
        const progressValue = response.data;
        setProgress(progressValue);
      })
      .catch(function (error) {
        console.error("Error fetching progress:", error);
      });
  }

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
