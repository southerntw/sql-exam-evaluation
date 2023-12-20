import { QuestionItem } from "../_components/question-item";

interface Question {
  questionId: number;
  text: string;
  correctAnswer: string;
  jsonAnswer: string;
}

async function getQuestions(): Promise<Question[]> {
  const res = await fetch("http://localhost:3001/questions");

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}

export default async function Main() {
  const data = await getQuestions();
  const singular = {
    id: "A7",
    title: "Cepot dan Dewala",
  };

  return (
    <div>
      <h1>Questions</h1>
      <ul>
        {data.map((item) => (
          <QuestionItem key={item.questionId} item={item} />
        ))}
      </ul>
    </div>
  );
}
