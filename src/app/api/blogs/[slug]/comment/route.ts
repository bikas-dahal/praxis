import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const CommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
  userId: z.string().uuid("Invalid user ID"),
});

export async function POST(req: Request, { params }: { params: { slug: string } }) {

  try {

    const { slug } = params;
    const body = await req.json();

    const parsedData = CommentSchema.safeParse(body); // Validate with Zod

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const data = parsedData.data;

    const blog = await prisma.blog.findUnique({ where: { slug } });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        userId: data.userId,
        blogId: blog.id,
      },
    });

    return NextResponse.json(comment, { status: 201 });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    
  }

}