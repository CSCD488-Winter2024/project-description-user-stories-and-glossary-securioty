import axios from "axios";
import React, { FormEvent, useState } from "react";
import accountData from "../scripts/accountData";

interface Props {
  labID: number
  questionID: number
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

const AnswerBox = ({ labID, questionID, setProgress }: Props) => {
  const [answer, setAnswer] = useState("")
  const [answerFeedback, setAnswerFeedback] = useState("")

  const [account, setAccount] = useState<accountData>(() => {
    const localValue = localStorage.getItem("ACCOUNT");
    if (localValue == null) {
      return [];
    } else {
      return JSON.parse(localValue);
    }
  });

  function handleAnswer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();


    //AnswerBox.tsx, runs when user hits "Submit" button in lab
    axios
      .post("http://127.0.0.1:5000/Check_Answer", {
        answer: answer,
        LabID: labID,
        QuestionID: questionID,
        UserID: account
      })
      .then(function (response) {
        const responseData = response.data;
        const success = responseData[0];
        const progress = responseData[1];

        if (success) {
          setAnswerFeedback("Correct!");
          setProgress(progress);
        } else {
          setAnswerFeedback("Incorrect. Try again.");
        }

      })

  }


  return (
    <form onSubmit={handleAnswer}>
      <div className="mb-3">
        <label className="form-label">Answer</label>
        <input
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          type="text"
          className="form-control"
          id="answer1"
          name="answer"
        />
        {answerFeedback !== null && <div>{answerFeedback}</div>}
      </div>
      <button type="submit" className="bg-primary btn btn-primary">
        Submit

      </button>
    </form>
  );
};

export default AnswerBox;
