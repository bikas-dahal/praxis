import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { blogId, userId } = await req.json();

    const existingLike = await prisma.like.findFirst({
        where: {
            blogId,
            userId
        }
    })

    // i think need to come later
    if (existingLike) {
        await prisma.like.delete({
            where: {
                id: existingLike.id
            }
        })

        return NextResponse.json({
            message: "Like removed"
        })
    } 

    await prisma.like.create({
        data: {
            blogId,
            userId
        }
    })
    return NextResponse.json({message: "Blog liked"})    
}