import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: { slug: string}}) {
    const { slug } = params;

    const blog = await prisma.blog.findUnique({
        where: {
            slug
        },
        include: {
            author: true,
            comments: {
                include: {
                    user: true
                }
            },
            likes: true
        }
    })

    if (!blog) {
        return {
            status: 404,
            body: {
                message: "Blog not found"
            }
        }
    }

    return NextResponse.json(blog)
}