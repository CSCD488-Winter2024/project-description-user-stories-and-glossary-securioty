import React from "react";

const AnswerBox = () => {
  return (
    <form>
      <div className="mb-3">
        <label className="form-label">Answer</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button type="submit" className="bg-primary btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AnswerBox;
