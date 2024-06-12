import axios from "axios";
import React, { FormEvent, useState } from "react";

interface Props {
  labID: number;
  questionID: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const AnswerBox = ({ labID, questionID, setProgress }: Props) => {
  const [answer, setAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");

  function handleAnswer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //AnswerBox.tsx, runs when user hits "Submit" button in lab
    const accountData = localStorage.getItem("ACCOUNT");
    const account = accountData !== null ? JSON.parse(accountData) : "";
    console.log(account.token);
    const h = { Authorization: `Bearer ${account.token}` };
    console.log({
      lab_id: labID,
      question_id: questionID,
      answer: answer,
    });
    axios
      .post(
        "/labs/update_progress",
        {
          lab_id: labID,
          question_id: questionID,
          answer: answer,
        },
        { headers: h }
      )
      .then(function (response) {
        const responseData = response.data;
        const success: boolean = responseData.is_correct;

        if (success) {
          setAnswerFeedback("Correct!");
        } else {
          setAnswerFeedback("Incorrect. Try again.");
        }

        axios
          .get(
            "/labs/get_progress_percentage/" + labID,

            { headers: h }
          )
          .then(function (response) {
            setProgress(response.data.progress_percentage);
          })
          .catch(function (error) {
            console.log(error);
          });
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
