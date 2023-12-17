"use client";

import { useParams } from "next/navigation";

export default function QuestionId() {
  const params = useParams();

  return (
    <div>
      <h1>Question {params.questionId}</h1>
    </div>
  );
}
