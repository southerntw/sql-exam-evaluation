interface QuestionItemProps {
  item: {
    questionId: number;
    text: string;
    correctAnswer: string;
    jsonAnswer: string;
  };
}

export const QuestionItem = ({ item }: QuestionItemProps) => {
  return (
    <div className="border-2 border-neutral-300 w-64">
      <p className="text-sm p-2">{item.questionId}</p>
      <h3 className="text-base font-medium p-2">{item.text}</h3>
    </div>
  );
};
