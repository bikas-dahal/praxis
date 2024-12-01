import { prisma } from "@/lib/prisma";

export default async function QuizPage({ params }: { params: { quizId: string } }) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: params.quizId },
    include: { questions: true },
  });

  if (!quiz) {
    return <div>Quiz not found!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{quiz.title}</h1>
      <p>{quiz.description}</p>
      <ul>
        {quiz.questions.map((q) => (
          <li key={q.id}>{q.text}</li>
        ))}
      </ul>
    </div>
  );
}