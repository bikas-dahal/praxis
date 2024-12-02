import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Add a comment
export async function POST(req: Request) {
  const { content, blogId, userId } = await req.json();

  const comment = await prisma.comment.create({
    data: { content, blogId, userId },
  });

  return NextResponse.json(comment);
}
y