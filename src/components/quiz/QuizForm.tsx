"use client";

import { useState } from "react";
import { createQuiz } from "@/actions/quizActions";

export default function QuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ text: "", options: ["", ""], correctAnswer: "" }]);

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    if (field === "text") updatedQuestions[index].text = value;
    if (field === "correctAnswer") updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", ""], correctAnswer: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuiz({ title, description, questions });
    alert("Quiz created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Create a Quiz</h1>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <h2 className="text-lg font-semibold">Questions</h2>
      {questions.map((question, index) => (
        <div key={index} className="space-y-2">
          <input
            type="text"
            placeholder="Question text"
            value={question.text}
            onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
            className="border p-2 w-full"
            required
          />
          <textarea
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
      ))}
      <button type="button" onClick={addQuestion} className="bg-blue-500 text-white p-2">
        Add Question
      </button>
      <button type="submit" className="bg-green-500 text-white p-2">
        Submit Quiz
      </button>
    </form>
  );
}
