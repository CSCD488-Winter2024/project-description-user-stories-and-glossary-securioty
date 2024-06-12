import { useEffect, useState } from "react";
import QuestionBox from "./QuestionBox";
import axios from "axios";

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

  //ActiveLab.tsx , runs on first render of lab page
  function getProgress() {
    const accountData = localStorage.getItem("ACCOUNT");
    const account = accountData !== null ? JSON.parse(accountData) : "";
    const h = { Authorization: `Bearer ${account.token}` };
    axios
      .get("/labs/get_progress_percentage/" + labItem.id, { headers: h })
      .then(function (response) {
        const progressValue = response.data.progress_percentage;
        setProgress(progressValue);
        console.log(response.data.progress_percentage);
      })
      .catch(function (error) {
        console.error("Error fetching progress:", error);
      });
  }

  return (
    <>
      <h2 className="btn-primary">{labItem.title}</h2>

      <div
        className="d-inline-block accordion w-50 px-2 py-2"
        id="accordionExample"
      >
        <div className="progress-container" style={{ width: "100%" }}>
          <div
            className="progress"
            role="progressbar"
            aria-label="Example with label"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="progress-bar custom-progress"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
        {labItem.questions.map((question) => (
          <QuestionBox
            labID={labItem.id}
            question={question}
            setProgress={setProgress}
          />
        ))}
      </div>
    </>
  );
};

export default ActiveLab;
