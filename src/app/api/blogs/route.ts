import { prisma } from "@/lib/prisma";
import { BlogSchema } from "@/schemas/blogSchema";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { z } from "zod";

// Zod validation schema for POST request
// const BlogSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   content: z.string().min(1, "Content is required"),
//   tags: z.array(z.string()).optional(),
//   authorId: z.string().uuid("Invalid author ID"),
// });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const blogs = await prisma.blog.findMany({
    take: limit,
    skip,
    include: {
      author: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const totalBlogs = await prisma.blog.count();

  return NextResponse.json({ blogs, totalBlogs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = BlogSchema.safeParse(body); // Validate with Zod

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const data = parsedData.data;

    const slug = slugify(data.title, { lower: true });

    console.log('from route', data, slug);
    

    const blog = await prisma.blog.create({
      data: {
        ...data,
        slug,
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    
    
    return NextResponse.json({ error }, { status: 500 });
  }
}
