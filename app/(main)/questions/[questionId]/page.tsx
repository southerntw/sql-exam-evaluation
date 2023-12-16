"use client";

import { useParams } from "next/navigation";

export default function QuestionId() {
  const params = useParams();

  return (
    <div>
      <p>Here's {params.questionId}</p>
    </div>
  );
}
