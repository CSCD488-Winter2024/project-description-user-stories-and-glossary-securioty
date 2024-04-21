import React, { FormEvent, useState } from "react";

interface Props{
  labID: number
  questionID: number
}

const AnswerBox = ({labID, questionID}:Props)=> {
  const [answer, setAnswer] = useState("")
  const [answerFeedback, setAnswerFeedback] = useState("")

  labID
  function handleAnswer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // axios.post('api-link/answer'), {labID, questionID})
    if (answer === "flag") {
      setAnswerFeedback("Correct!");
    } else {
      setAnswerFeedback("Incorrect. Try again.");
    }
}


  return (
    <form onSubmit={handleAnswer}>
      <div className="mb-3">
        <label className="form-label">Answer</label>
        <input
          value = {answer}
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
