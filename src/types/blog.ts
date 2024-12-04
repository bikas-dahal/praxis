// lib/types/blog.ts
import { z } from 'zod';

// Zod schema for blog validation
export const BlogSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  slug: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  _count: z.object({
    likes: z.number().optional(),
    comments: z.number().optional()
  }).optional()
});

// Type for Blog creation/update
export type BlogInput = z.infer<typeof BlogSchema>;

// Type for Blog with possible optional fields
export type Blog = z.infer<typeof BlogSchema> & {
  author?: {
    id: string;
    name?: string;
  } 
};

