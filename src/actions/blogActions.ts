'use server';

import { prisma } from '@/lib/prisma';
import { CommentInput, CommentSchema } from "@/schemas/blogSchema"
import { revalidatePath } from 'next/cache';


export const postComment = async (data: CommentInput) => {
  try {
    const validatedData = CommentSchema.safeParse(data);
    
    if (!validatedData.success) {
      // Convert Zod error to a more serializable format
      const errorMessages = validatedData.error.errors.map(
        (err) => `${err.path.join('.')}: ${err.message}`
      );
      
      throw new Error(`Validation failed: ${errorMessages.join(', ')}`);
    }

    const comment = await prisma.comment.create({
      data: validatedData.data,
    });

    revalidatePath(`/dashboard/blog/${data.blogId}`);

    return comment;
  } catch (error) {
    // Ensure the error is serializable
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
};


export const blogIsLiked = async (blogId: string, userId: string) => {
  try {
    const like = await prisma.like.findFirst({
      where: {
        blogId,
        userId,
      },
    });

    return !!like;
  } catch (error) {
    throw new Error('Something went wrong');
  }
};

export const likeBlog = async (blogId: string, userId: string ) => {
  try {
    const like = await prisma.like.findFirst({
      where: {
        blogId,
        userId,
      },
    });

    if (like) {
      await prisma.like.delete({
        where: {
          id: like.id,
        },
      });

      revalidatePath(`/dashboard/blog/${blogId}`);
      revalidatePath(`/dashboard/blogs`);

      return { message: 'Like removed' };
    }

    await prisma.like.create({
      data: {
        blogId,
        userId,
      },
    });

    revalidatePath(`/dashboard/blog/${blogId}`);

    return { message: 'Like added' };
  } catch (error) {
    throw new Error('Something went wrong');
  }
}