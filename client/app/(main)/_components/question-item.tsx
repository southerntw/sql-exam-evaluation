interface QuestionItemProps {
  id: string;
  title: string;
}

export const QuestionItem = ({ id, title }: QuestionItemProps) => {
  return (
    <div className="border-2 border-neutral-300 w-64">
      <p className="text-sm p-2">{id}</p>
      <h3 className="text-base font-medium p-2">{title}</h3>
    </div>
  );
};
