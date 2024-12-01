import { useQuery } from "@tanstack/react-query";

export function useQuiz(quizId: string) { 
  return useQuery(["quiz", quizId], async () => {
    const res = await fetch(`/api/quiz/${quizId}`); 
    if (!res.ok) throw new Error("Failed to fetch quiz"); 
    return res.json();
  });
}