import { prisma } from "@/lib/prisma";
import {QuizCard} from "@/components/quiz/QuizCard";

export default async function QuizDashboard() {
  const quizzes = await prisma.quiz.findMany();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Quiz Dashboard</h1>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}