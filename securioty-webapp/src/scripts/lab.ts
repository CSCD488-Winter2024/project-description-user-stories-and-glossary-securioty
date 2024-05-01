import labQuestion from "./labQuestion";

interface lab {
    title: string;
    description: string;
    questions: labQuestion[];
    answers: string[];
  }

export default lab;