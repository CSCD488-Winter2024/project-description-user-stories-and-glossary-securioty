import React, { useState } from "react";
import lab from "../scripts/lab";
import axios from "axios";

const LabCreationForm = () => {
  const [newLab, setNewLab] = useState<lab>({
    id: 99,
    title: "",
    description: "",
    questions: [{ id: 1, title: "", description: "", answer: "" }],
  });
  const [questionCount, setQuestionCount] = useState<number>(2);

  //Triggered when the "Add Question" button is clicked
  //Dynamically adds a new question field
  const addQuestion = () => {
    setQuestionCount(questionCount + 1);
    console.log(questionCount);
    const newQuestions = [
      ...newLab.questions,
      { id: questionCount, title: "", description: "", answer: "" },
    ];
    setNewLab({ ...newLab, questions: newQuestions });
    console.log(newLab);
  };

  //Triggered when the "Remove Question" button is clicked
  //Dynamically removes a question field
  const removeQuestion = () => {
    if (questionCount > 1) {
      setQuestionCount(questionCount - 1);
    } else {
      return;
    }
    console.log(questionCount);
    const newQuestions = [...newLab.questions];
    newQuestions.pop();
    console.log(newQuestions);

    setNewLab({ ...newLab, questions: newQuestions });
    console.log(newLab);
  };

  //Field updating so state is stored properly
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLab({ ...newLab, title: e.target.value });
    console.log(newLab);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLab({ ...newLab, description: e.target.value });
    console.log(newLab);
  };
  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
    field: string
  ) => {
    const newQuestions = newLab.questions.map((question) => {
      if (question.id === id) {
        // we know we need to update this question
        const updatedQuestion = { ...question, [field]: e.target.value };
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setNewLab({ ...newLab, questions: newQuestions });
    console.log(newLab);
  };
  // End field updating -----------------------------------------------------

  //Triggered when submit is pressed
  //Calls API endpoint to create new lab with current data fields
  const submitLab = () => {
    const accountData = localStorage.getItem("ACCOUNT");
    const account = accountData !== null ? JSON.parse(accountData) : "";
    console.log(account.token.access_token);
    const h = { Authorization: `Bearer ${account.token.access_token}` };
    axios
      .post("http://127.0.0.1:5000/labs/create_lab", newLab, { headers: h })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          alert("Successfully created!");
          setNewLab({
            id: 99,
            title: "",
            description: "",
            questions: [{ id: 1, title: "", description: "", answer: "" }],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container bg-secondary ">
        <div className="mb-3">
          <label className="form-label">Lab Title</label>
          <input
            type="text"
            className="form-control"
            value={newLab.title}
            placeholder="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lab Description</label>
          <input
            type="text"
            className="form-control"
            value={newLab.description}
            placeholder="Description"
            onChange={handleDescriptionChange}
          />
        </div>
        {newLab.questions.map((question) => (
          <div className="mb-3">
            <label className="form-label">Question {question.id}</label>
            <input
              type="text"
              className="form-control"
              value={question.title}
              key={question.id}
              placeholder="Title"
              onChange={(e) => handleQuestionChange(e, question.id, "title")}
            />
            <input
              type="text"
              className="form-control"
              value={question.description}
              key={question.id}
              placeholder="Description"
              onChange={(e) =>
                handleQuestionChange(e, question.id, "description")
              }
            />

            <input
              type="text"
              className="form-control"
              value={question.answer}
              placeholder="Answer"
              onChange={(e) => handleQuestionChange(e, question.id, "answer")}
            />
          </div>
        ))}
        <button className="btn btn-primary m-2" onClick={addQuestion}>
          Add Question
        </button>
        <button className="btn btn-primary m-2" onClick={removeQuestion}>
          Remove Question
        </button>
        <button
          className="btn btn-primary m-2 justify-content-end"
          onClick={submitLab}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default LabCreationForm;
