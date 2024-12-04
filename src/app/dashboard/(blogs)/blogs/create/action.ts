'use server'

import { prisma } from "@/lib/prisma";
import { BlogInput, BlogSchema } from "@/schemas/blogSchema"
import slugify from "slugify";

export const saveBlog = async (data: BlogInput) => {
    const validatedData = BlogSchema.safeParse(data);

    if (!validatedData.success) {
        throw validatedData.error;
    }

    const { title, tags, content, authorId, isPublished} = validatedData.data;

    const slug = slugify(title, { lower: true });
    
    const array_tag = tags?.split(",").map(tag => tag.trim());

    const blog = await prisma.blog.create({
        data: {
            title,
            tags: array_tag,
            content,
            authorId,
            isPublished,
            slug
        }
    })

    return blog;
}