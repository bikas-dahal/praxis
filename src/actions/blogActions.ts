'use server';

import { prisma } from '@/lib/prisma';

export async function createBlog({
  title,
  content,
  tags,
  authorId,
}: {
  title: string;
  content: string;
  tags?: string[];
  authorId: string;
}) {
  if (!title || !content) {
    throw new Error('Title and content are required');
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      tags,
      slug,
      authorId,
    },
  });

  return blog;
}