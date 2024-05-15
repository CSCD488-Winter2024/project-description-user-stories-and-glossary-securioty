import axios from "axios";
import React, { FormEvent, useState } from "react";
import accountData from "../scripts/accountData";

interface Props {
  labID: number;
  questionID: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const AnswerBox = ({ labID, questionID, setProgress }: Props) => {
  const [answer, setAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");

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
    const accountData = localStorage.getItem("ACCOUNT");
    const account = accountData !== null ? JSON.parse(accountData) : "";
    //console.log(account);
    const h = { Authorization: `Bearer ${account.token.access_token}` };
    axios
      .post(
        "http://127.0.0.1:5000/update_progress",
        {
          lab_id: labID,
          question_id: questionID,
          answer: answer,
        },
        { headers: h }
      )
      .then(function (response) {
        const responseData = response.data;
        console.log(responseData);
        const success = responseData[0];
        const progress = responseData[1];

        if (success) {
          setAnswerFeedback("Correct!");
          setProgress(progress);
        } else {
          setAnswerFeedback("Incorrect. Try again.");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleAnswer}>
      <div className="mb-3">
        <label className="form-label">Answer</label>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          className="form-control"
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
