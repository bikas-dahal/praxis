import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const quizzes = await prisma.quiz.findMany();
    return NextResponse.json(quizzes);
}

export async function POST(req: Request) {
    const body = await req.json();
    const quiz = await prisma.quiz.create({
        data: body
    });
    return NextResponse.json(quiz);
}