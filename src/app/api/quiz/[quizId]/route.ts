import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: {params: {quizId: string}}) {
    const quizId = params.quizId;
    const quiz = await prisma.quiz.findUnique({
        where: {
            id: quizId
        }
    });
    return NextResponse.json(quiz);
}

export async function DELETE(req: Request, { params }: { params: { quizId: string } }) {
    await prisma.quiz.delete({
      where: { id: params.quizId },
    });
    return NextResponse.json({ message: "Quiz deleted successfully!" });
  }