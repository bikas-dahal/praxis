'use server'

import { prisma } from "@/lib/prisma";

export async function createQuiz(data: { title: string; description: string; }) {
    return prisma.quiz.create({
        data
    })
}

export async function updateQuiz(id: string, data: { title?: string; description?: string }) {
    return prisma.quiz.update({
      where: { id },
      data,
    });
}

export async function deleteQuiz(id: string) {
return prisma.quiz.delete({
    where: { id },
});
}