'use client'

import { useRouter } from "next/navigation";

interface QuizProps {
    quiz: {
        id: string;
        title: string;
        description: string;
    }
}

export const QuizCard = ({ quiz }: QuizProps) => {
    const router = useRouter()
    return (
        <div
          className="p-4 border rounded cursor-pointer hover:shadow-md"
          onClick={() => router.push(`/dashboard/quiz/${quiz.id}`)}
        >
          <h2 className="text-lg font-bold">{quiz.title}</h2>
          <div>{quiz.description}</div>
        </div>
      );
    }