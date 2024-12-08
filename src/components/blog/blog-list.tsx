import { BlogCard } from './blog-card';
import { prisma } from '@/lib/prisma';
import React from 'react';

export const BlogList: React.FC = async () => {
  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      slug: true,
      tags: true,
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  if (!blogs || blogs.length === 0) {
    return <div className="text-center text-neutral-500">No blogs available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};