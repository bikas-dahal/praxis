import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

// Zod validation schema for likes
const LikeSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const body = await req.json();
    const data = LikeSchema.parse(body); // Validate with Zod

    const blog = await prisma.blog.findUnique({ where: { slug } });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const existingLike = await prisma.like.findFirst({
      where: { blogId: blog.id, userId: data.userId },
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return NextResponse.json({ message: "Like removed" });
    }

    const like = await prisma.like.create({
      data: {
        blogId: blog.id,
        userId: data.userId,
      },
    });

    return NextResponse.json(like, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
