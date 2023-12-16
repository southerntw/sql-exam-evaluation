import { QuestionItem } from "../_components/question-item";

export default function Main() {
  const singular = {
    id: "A7",
    title: "Cepot dan Dewala",
  };

  const questions = new Array(10).fill(singular);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row flex-wrap px-10 gap-y-2 justify-center">
        {questions.map((question, index) => {
          return (
            <QuestionItem key={index} title={question.title} id={question.id} />
          );
        })}
      </div>
    </div>
  );
}
