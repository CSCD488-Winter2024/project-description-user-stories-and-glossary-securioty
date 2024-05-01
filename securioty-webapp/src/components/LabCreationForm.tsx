import React, { useState } from "react";
import lab from "../scripts/lab";

const LabCreationForm = () => {
  const [newLab, setNewLab] = useState<lab>({
    title: "",
    description: "",
    questions: [{ id: 1, description: "", title: "" }],
    answers: [],
  });

  const addQuestion = () => {
    const newQuestions = [
      ...newLab.questions,
      { id: 123, description: "", title: "" },
    ];
    setNewLab({ ...newLab, questions: newQuestions });
    console.log(newLab);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLab({ ...newLab, title: e.target.value });
    console.log(newLab);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLab({ ...newLab, description: e.target.value });
    console.log(newLab);
  };

  const handleQuestionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newQuestions = newLab.questions.map((question) => {
      if (question.id === id) {
        // we know we need to update this question
        const updatedQuestion = question;
        updatedQuestion.description = e.target.value;
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setNewLab({ ...newLab, questions: newQuestions });
    console.log(newLab);
  };

  const answers = [""];
  return (
    <>
      <div className="container bg-secondary">
        <div className="mb-3">
          <label className="form-label">Lab Title</label>
          <input
            type="text"
            className="form-control"
            value={newLab.title}
            placeholder="Dog Lab"
            onChange={handleTitleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Lab Description</label>
          <input
            type="text"
            className="form-control"
            value={newLab.description}
            placeholder="Really fun lab about dogs!"
            onChange={handleDescriptionChange}
          />
        </div>
        {newLab.questions.map((question) => (
          <div className="mb-3">
            <label className="form-label">Question</label>
            <input
              type="text"
              className="form-control"
              value={question.description}
              key={question.id}
              placeholder="Dog Lab"
              onChange={(e) => handleQuestionsChange(e, question.id)}
            />
          </div>
        ))}
        <button className="btn btn-primary" onClick={addQuestion}>
          Add Question
        </button>
      </div>
    </>
  );
};

export default LabCreationForm;
