import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import slugify from 'slugify';

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
                    comments: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const totalBlogs = await prisma.blog.count();

    return NextResponse.json({
        blogs,
        totalBlogs
    })

}

export async function POST(req: Request) {
    const { title, content, tags, authorId } = await req.json();

    const slug = slugify(title, { lower: true });

    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            tags,
            slug,
            authorId
        }
    })

    return NextResponse.json(blog)
}

