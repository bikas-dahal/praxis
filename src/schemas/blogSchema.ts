import { z } from 'zod';

// Zod Schema for Blog Validation
export const BlogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  tags: z
    .string()
    .optional(),
  authorId: z.string(),
  isPublished: z.boolean().optional().default(true),
});

// TypeScript type inferred from Zod Schema
export type BlogInput = z.infer<typeof BlogSchema>;

export const CommentSchema = z.object({
    content: z.string().min(1, 'Content is required'),
    userId: z.string(),
    blogId: z.string(),
});

export type CommentInput = z.infer<typeof CommentSchema>;
