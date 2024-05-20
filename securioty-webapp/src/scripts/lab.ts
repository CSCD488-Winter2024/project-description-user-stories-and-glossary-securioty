import labQuestion from "./labQuestion";

interface lab {
    id: number;
    title: string;
    description: string;
    questions: labQuestion[];
  }

export default lab;